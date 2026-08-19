# Requirements Graph Integrity Skill

## Purpose
Validate graph structure before Process closeout.

## Checks
- Unique node IDs
- Unique edge keys
- Valid node and relation types
- No dangling edges
- Required provenance fields
- Stable node/edge ordering
- No unsupported status transitions
- Graph hash reproducibility

Return `PASS`, `WARN`, or `BLOCK`; never repair silently.