---
title: Building RAG for Production Beyond Just a Demo
description: Practical lessons from building retrieval-augmented generation systems used by real users—from chunking and evaluation to latency budgets and failure modes that truly matter in production.
date: 2026-08-07
tags:
  - AI
  - RAG
  - Engineering
draft: false
---

Building a retrieval-augmented generation (RAG) prototype is already a complex task. When the system is intended to be used in a production environment, we have the responsibility to keep it accurate under high load, cost pressure, and various user queries that are not always clean or well-structured. This makes production RAG a different and more challenging problem.

This note summarizes several patterns and considerations I have used when developing a RAG system that originally started as a notebook demo and gradually became a system that is actually used in a campus environment.

## Start with the retrieval contract

Before tuning the prompt, it is better to first understand what “good retrieval” actually means.

- Which documents should be considered the most authoritative sources?
- How long can information remain relevant before it is considered outdated?
- What miss rate is still acceptable for high-risk answers?

If you cannot evaluate retrieval quality separately from the generation process, you may spend weeks discussing model temperature while the actual problem is in the index.

## Chunking is a product decision

Chunk size is not simply a number that can be selected randomly. Chunking represents a sequence of information units that should reflect how users ask questions.

For document collections such as policies and SOPs, slightly larger semantic chunks with overlap usually work better for preserving context and constraints. Meanwhile, for API documentation and source code, smaller units combined with strong metadata filters often provide better results.

Measure both using **recall@k** and **answer faithfulness**, rather than relying only on cosine similarity scores from embeddings.

## Latency budgets matter more than chasing the latest model

One baseline that can be useful for production is:

```ts
type RagBudget = {
  retrieveMs: number;
  generateMs: number;
  totalMs: number;
};

const defaultBudget: RagBudget = {
  retrieveMs: 250,
  generateMs: 1500,
  totalMs: 2000,
};
```

If your p95 latency exceeds this budget, it may be better to consider hybrid search + reranking rather than immediately moving to a larger model.

Users usually notice long waiting times more than small differences in answer quality or richer wording.

## Evaluate failure modes, not only happy paths

A demo that looks good usually does not include cases such as:

- Ambiguous queries with two possible answers
- Missing documents that should cause the system to abstain
- Conflicting sources within the same index
- Prompt injection through user-uploaded files

These cases should be included in the regression suite.

A RAG system that confidently provides an answer when its sources contradict each other can be more dangerous than a system that chooses to say it does not know.

## What I prioritize now

1. **Traceability** — every answer should be able to show the chunks used as its sources.
2. **Abstention** — the system should refuse to answer when the available evidence is too weak.
3. **Observability** — store logs of retrieval results, not only the final generated text.
4. **Cost ceilings** — limit the number of context tokens for each request category.

In the end, production RAG is largely about systems engineering, with the LLM being only one component of the overall system.

Treat retrieval quality as a first-class service in the system, and the generation process becomes much easier to understand, evaluate, and control.
