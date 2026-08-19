# Requirements Conflict Audit Skill

## Purpose
Detect incompatible requirements and authority/status conflicts.

## Checks
- Conflicting numeric limits
- Conflicting states or statuses
- Scope contradictions
- Draft versus approved authority conflicts
- Architecture versus implementation differences
- Language/domain capability mismatches

## Output
Emit a conflict ID, sources, values, impact, owner, resolution, and residual status. Do not silently choose a value.