# Requirements Drift Detection Skill

## Purpose
Compare graph truth with repository reality.

## Checks
- Missing or renamed artifacts
- Requirements marked complete without code/tests/evidence
- Code capabilities with no requirement or owner
- Stale statuses
- Conflicts between current state and graph
- Deleted graph sources

## Gate
Drift produces a report and blocks certification for affected scope until resolved or explicitly accepted.