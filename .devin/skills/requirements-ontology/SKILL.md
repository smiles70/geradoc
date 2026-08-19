# Requirements Ontology Skill

## Purpose
Define and normalize the canonical ontology for requirements-heavy work.

## Required entities
`SourceArtifact`, `Requirement`, `Capability`, `Epic`, `UserStory`, `AcceptanceCriterion`, `Test`, `Evidence`, `Owner`, `Decision`, `Dependency`, `Gap`, `Conflict`, `Assumption`.

## Procedure
1. Inventory authoritative sources.
2. Extract IDs, names, status, authority, owner, dependencies, and acceptance criteria.
3. Normalize duplicate entities.
4. Assign source provenance.
5. Emit graph nodes and validate required properties.

Never mark a requirement complete solely because it appears in documentation.