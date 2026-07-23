# Git Discipline

Never modify git remote URLs. If `git push` fails due to a transport or auth error (e.g. SSH unavailable, credentials missing), report the exact error message and ask the user how to proceed.

Banned:
- `git remote set-url` — any variant, for any reason
- `git remote add` to shadow an existing remote
- Switching a remote from SSH to HTTPS (or vice versa) to work around a sandbox limitation

If the remote uses SSH and SSH is unavailable in the environment, push via an explicit HTTPS URL without touching the remote:

```bash
git push https://github.com/ORG/REPO.git BRANCH
```

The sandbox proxy injects GitHub credentials for HTTPS automatically. This leaves the configured remote unchanged.
