# AGENTS.md

## Création de PR (règle absolue)

Utiliser **OBLIGATOIREMENT la ligne de commande** (`gh`) pour créer toute PR, jamais l'URL `.../pull/new/...` du navigateur.

Sur un fork, l'URL `pull/new/...` cible par défaut le **repo parent (upstream)**. Pour créer une PR **dans notre propre fork** (`jboz/filemgr`), utiliser :

```bash
gh pr create --repo jboz/filemgr --base <base_branch> --head <feature_branch> --title "..." --body "..."
```

- `--repo jboz/filemgr` force le dépôt **où la PR est créée** (notre fork).
- `--base <base_branch>` et `--head <feature_branch>` garantissent que base et head sont dans ce même repo (PR interne au fork).
- Ne jamais utiliser l'URL navigateur `pull/new/...`, ni `gh pr create` sans `--repo`, sinon la PR part vers upstream `Lings01/filemgr`.
- Après création, vérifier l'URL retournée contient bien `jboz/filemgr/pull/`.
