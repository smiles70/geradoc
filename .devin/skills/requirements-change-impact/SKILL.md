# Requirements Change Impact Skill

## Purpose
Determine the blast radius of a requirement or source-artifact change.

## Procedure
1. Locate the changed graph node.
2. Traverse `refines`, `implements`, `depends_on`, `verified_by`, and `evidenced_by` edges.
3. List impacted code, APIs, tests, epics, runbooks, security controls, and releases.
4. Create or update the impact record.
5. Require affected owners to review.

A change is not closed until affected graph edges are refreshed.