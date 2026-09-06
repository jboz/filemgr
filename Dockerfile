# syntax=docker/dockerfile:1
#
# filemgr — web file manager with PAM auth + per-user setuid isolation.
#
# IMPORTANT: the service MUST run as root (it forks a helper subprocess and
# drops privileges via setuid for each request). The image therefore does NOT
# set a non-root USER. Helper subprocesses are spawned with `sys.executable
# -I -m filemgr.helper` and run as the logged-in system account.
#
# PAM in a container authenticates against the container's own passwd/shadow.
# To back it against host accounts, bind-mount the host identity stack at
# runtime, e.g.:
#   docker run --rm -it -p 8765:8765 \
#     -v /etc/passwd:/etc/passwd:ro \
#     -v /etc/group:/etc/group:ro \
#     -v /etc/shadow:/etc/shadow:ro \
#     -v /etc/nsswitch.conf:/etc/nsswitch.conf:ro \
#     -v /etc/pam.d:/etc/pam.d:ro \
#     -v /home:/home \
#     -v /path/to/config.toml:/etc/filemgr/config.toml:ro \
#     ghcr.io/OWNER/filemgr

############################ build stage: wheels ############################
FROM python:3.12-slim AS build

RUN apt-get update \
    && apt-get install -y --no-install-recommends build-essential libpam0g-dev \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /build

# Build the filemgr wheel, then download every dependency — including the
# optional Pillow (thumbnails) extra — into /wheels so the slim runtime stage
# never needs a compiler or PAM headers. `pip download` builds the project in
# a temp dir and discards the wheel, so it is copied in explicitly.
COPY pyproject.toml README.md LICENSE ./
COPY src ./src
RUN pip install --no-cache-dir --upgrade pip build \
    && python -m build --wheel --outdir /dist \
    && pip download --no-cache-dir --dest /wheels ".[thumbnails]" \
    && cp /dist/*.whl /wheels/

############################ runtime stage: slim ############################
FROM python:3.12-slim

RUN apt-get update \
    && apt-get install -y --no-install-recommends libpam0g \
    && rm -rf /var/lib/apt/lists/*

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    FILEMGR_CONFIG=/etc/filemgr/config.toml

# Install the wheels built in the previous stage (no build tooling needed).
# Installing by name with the thumbnails extra pulls in Pillow from /wheels.
COPY --from=build /wheels /wheels
RUN pip install --no-cache-dir --no-index --find-links /wheels "filemgr[thumbnails]" \
    && rm -rf /wheels /root/.cache

# The app drops privileges per request; it must run as root. Users, homes and
# PAM identity come from host mounts at runtime (see header comment).

EXPOSE 8765
VOLUME /etc/filemgr

ENTRYPOINT ["filemgr"]
CMD ["run"]