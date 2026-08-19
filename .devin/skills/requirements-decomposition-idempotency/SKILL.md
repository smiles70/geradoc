# Requirements Decomposition Idempotency Skill

## Purpose
Make repeated decomposition runs deterministic and duplicate-free.

## Rules
- Derive stable IDs from canonical source, entity type, and canonical key.
- Upsert nodes; never append blindly.
- Derive stable edge keys from `from::relation::to`.
- Sort nodes and edges before writing.
- Preserve source/parser/ontology hashes.
- Never silently delete a node; mark source removal first.
- Produce the same graph for the same inputs and versions.

## Gate
A rerun with unchanged source and versions must produce no graph diff.