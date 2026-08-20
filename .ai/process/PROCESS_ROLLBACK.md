# Process Rollback

## Purpose

Roll back a Process agent, skill, score, gate, or rubric change that produces unsafe or inaccurate results.

## Procedure

1. Identify Process version, skill, agent, score, and evidence version.
2. Disable the affected feature/skill or return it to shadow mode.
3. Restore the previous version from Git.
4. Re-run graph, artifact, tests, and self-check gates.
5. Record the incident and rollback in `PROCESS_CHANGELOG.md`.
6. Assign an owner and follow-up corrective action.

No rollback may delete evidence of the failed Process behavior.
