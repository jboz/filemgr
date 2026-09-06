#!/usr/bin/env bash
#
# dev.sh — run filemgr in dev mode (venv + uvicorn --reload).
#
# The server must run as root (PAM reads /etc/shadow, helper does per-request
# setuid), so this script re-invokes itself under `sudo` when needed. No
# systemd / service install involved.
#
# Usage:  ./dev.sh [--install] [--port 8765] [--host 127.0.0.1]
set -euo pipefail

cd "$(dirname "$0")"

VENV="${VENV:-.venv}"
PORT="${PORT:-8765}"
HOST="${HOST:-127.0.0.1}"
CONFIG="${FILEMGR_CONFIG:-./config.toml}"
RELOAD_DIR="src"

need_install=false
for arg in "$@"; do
  case "$arg" in
    --install) need_install=true ;;
    *) ;;
  esac
done

# --- venv bootstrap ---------------------------------------------------------
if [ ! -x "$VENV/bin/python" ]; then
  echo "▸ creating venv at $VENV"
  python3 -m venv "$VENV"
  need_install=true
fi

if [ "$need_install" = true ]; then
  echo "▸ installing (editable, with thumbnails extra)"
  "$VENV/bin/pip" install --upgrade pip
  "$VENV/bin/pip" install -e '.[thumbnails]'
fi

# --- config bootstrap --------------------------------------------------------
if [ ! -f "$CONFIG" ]; then
  echo "▸ writing $CONFIG with the current user whitelisted"
  "$VENV/bin/filemgr" init-config "$CONFIG" --users "$(id -un)"
fi

# --- escalate to root --------------------------------------------------------
if [ "$(id -u)" -ne 0 ]; then
  echo "▸ re-running under sudo (root required for PAM + setuid)"
  exec sudo env FILEMGR_CONFIG="$CONFIG" "PATH=$PATH" bash "$0" "$@"
fi

echo "▸ starting uvicorn on $HOST:$PORT (reload dir: $RELOAD_DIR)"
exec env FILEMGR_CONFIG="$CONFIG" PATH="$PATH" "$VENV/bin/python" -m uvicorn \
  filemgr.app:app \
  --host "$HOST" \
  --port "$PORT" \
  --reload \
  --reload-dir "$RELOAD_DIR" \
  --log-level info