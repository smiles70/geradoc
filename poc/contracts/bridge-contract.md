# Demo-to-POC Bridge Contract

**Bridge ID**: BRIDGE-001-A  
**Status**: Frozen for bridge implementation  
**Owner**: @Kmiles  
**Compatibility**: Legacy mocked-demo shape preserved

## Purpose

This contract allows production-facing POC components to consume real processing results without changing the completed `demo/` implementation.

## Required legacy fields

```ts
interface DocumentResult {
  id: string;
  type: string;
  title: string;
  fileName: string;
  pages: number;
  summary: {
    simple: string;
    standard: string;
    detailed: string;
  };
  keyInfo: KeyInfo[];
  actions: ActionItem[];
  savedAt?: string;
  researchMetadata?: ResearchMetadata;
}
```

## Compatibility rules

1. `summary.simple`, `summary.standard`, and `summary.detailed` remain strings.
2. `keyInfo` and `actions` remain arrays, even when empty.
3. `researchMetadata` is optional and additive.
4. The frontend must not require APUCS metadata to render a result.
5. The frontend must not independently select an APUCS presentation state.
6. `REVIEW` is a backend-approved state, not a client-side inference.
7. The `demo/` directory is not modified by bridge work.

## Research metadata

```ts
interface ResearchMetadata {
  algorithmVersion?: string;
  mode?: 'baseline' | 'shadow-only' | 'production';
  presentationState?: 'SIMPLE' | 'STANDARD' | 'DETAILED' | 'REVIEW';
  preservedAnchors?: unknown[];
  confidence?: number;
  sourceReferences?: unknown[];
  provenanceMap?: Record<string, unknown>;
  reviewFlags?: string[];
  auditRecord?: Record<string, unknown>;
}
```

## Error contract

```ts
interface ProcessingError {
  error: string;
  code?: string;
  retryable?: boolean;
  jobId?: string;
}
```

Errors must be rendered in plain language. Stack traces and provider details must not be exposed to end users.

## Ownership boundary

```text
demo/             completed mocked experience; do not edit
poc/frontend/     bridge/product-facing UI
poc/backend/      real processing and persistence
poc/contracts/    shared contract definitions
```

## Gate

This contract is frozen for BRIDGE-001-B and BRIDGE-001-C. Any breaking change requires a new contract version and a separate review.
