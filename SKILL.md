---
name: daily-insight-radar
description: Build an evidence-backed Chinese daily intelligence digest from trusted AI, technology, engineering, startup, and research sources. Use when Codex needs to scan current primary sources, rank daily signals, summarize recent podcast candidates, extract transferable insights, create a Markdown knowledge brief, or publish a concise notification plus full document.
---

# Daily Insight Radar

Produce a Chinese daily brief that helps the reader build durable judgment. Treat freshness, source quality, evidence, and transferability as hard requirements.

## Required references

Before producing a digest, read:

- `references/quality-standard.md` for ranking and evidence rules.
- `references/source-pool.md` for the scored starter source pool.
- `references/output-contract.md` for the required document structure.
- `references/podcast-deep-dive.md` when selecting and writing a daily long-form podcast knowledge article.

Use `assets/digest-template.md` as a structural starting point. Do not copy placeholder text into the final brief.

## Workflow

### 1. Set the evidence window

- Use the reader's local date and timezone.
- Scan the latest 24 hours first.
- Expand ordinary written signals to 72 hours when fewer than ten qualified items remain, and label them as supplementary.
- Prefer podcast episodes from the latest 72 hours. Reject episodes older than seven days or without a reliable publication date.
- Never present an older item as today's news.

### 2. Build the candidate pool

Browse current primary sources. Do not rely on memory for dates, titles, model claims, scores, roles, or links.

Collect at least 32 plausible candidates before quality filtering. Scan multiple independent sources; never let one feed, platform, or author determine whether the day has content.

Collect candidates from three independent layers:

1. Primary Builder signals: original posts from the configured trusted Builder feed. Keep only posts with a concrete fact, mechanism, constraint, or action value.
2. Recent podcast candidates: episodes with a transcript or reliable full text. Exclude the same-day long-form winner when a separate deep dive already covers it.
3. Independent experts and engineering teams: recent original analysis and first-party engineering or research posts from the scored source pool.

Prefer original URLs. Treat search results, reposts, newsletters that only summarize others, and popularity rankings as discovery aids rather than evidence.

For podcast discovery, use verified channel feeds as the primary path and keyword search only as a supplement. A long-form winner requires at least five recent candidates and at least three usable transcripts.

Reject secondary writer formats before model synthesis, including quote-only posts, news roundups, community-answer compilations, link digests, and rewritten reporting. A reputable platform does not make a community submission first-party evidence.

### 3. Create an evidence packet

For every candidate record:

- author or organization;
- exact title;
- canonical URL;
- publication timestamp and timezone when available;
- source type;
- factual claims supported by the source;
- a short necessary quotation, if useful;
- uncertainty, commercial incentives, and missing context;
- transcript status for audio or video;
- why the item may change a decision or mental model.

Reject a candidate when the source body is unavailable, the date is unknown, the claim cannot be traced, or the content is mostly promotion.

### 4. Rank before writing

Apply the deterministic 100-point matrix in `references/quality-standard.md`. Keep score evidence beside each dimension.

- Do not reward fame by itself.
- Do not let a famous guest beat a denser primary source without evidence.
- Keep ten qualified signals, matching the accepted 2026-07-01 baseline.
- Require at least two Builder signals, three transcript-backed non-winning podcast candidates, and five independent-expert or official-team items.
- If any layer falls below that baseline, expand verified primary-source coverage and inspect the rejection evidence.
- If the final result still falls short, fail closed: save diagnostics and do not create an external document or message.

### 5. Write the three-layer digest

Follow `references/output-contract.md`.

For each selected item explain in natural Chinese:

- Bottom line;
- what specifically happened or was argued;
- the mechanism, constraint, conflict, or causal chain;
- why it matters;
- what the reader can reuse in learning, product, engineering, organization, investing, or entrepreneurship;
- evidence and original link.

Preserve an author's meaning. Keep verbatim excerpts short and necessary. Label source-backed facts or author views separately from the digest's inference and reusable advice.

For each non-winning podcast candidate include its date, score, one-sentence topic, valuable insight, why it did not win, practical takeaway, transcript status, and original link.

### 6. Synthesize across sources

Add:

- three to five daily judgments that connect multiple signals;
- exactly five durable takeaways, decision rules, or actions;
- a quality note listing time windows, unavailable modules, evidence limitations, and uncertainty.

The synthesis must add structure. Do not repeat titles in different words.

### 7. Validate

Save the full brief as UTF-8 Markdown and run:

```bash
node scripts/validate_digest.mjs path/to/digest.md
```

Fix every error before calling the digest complete. Then manually verify all ten selected items against their original sources.

### 8. Publish

Always keep the local Markdown artifact.

Publish to an external document or message system only when the user has explicitly authorized the destination and write action. Use:

- a full document for the complete digest;
- one short message containing the daily judgments, all ten item headlines with one-line Bottom lines, and the full-document link.

Before any external write, assert that ten items passed with the required 2/3/5 layer distribution and every item has a Bottom line, mechanism, importance, reusable lesson, evidence, and original URL. Treat an empty-layer or shortfall document as a failed run, never as a valid daily brief.

On publish failure, keep the local file and report the failed stage. Do not silently retry a real external write.

## Failure rules

- If live browsing is unavailable, do not fabricate a current digest. Produce a clearly labeled offline test only when requested.
- If the language model or API needed for Chinese synthesis is unavailable, stop formal publishing.
- If a podcast lacks a transcript, it may appear only as an unverified discovery note, never as a summarized insight.
- If evidence conflicts, show the conflict and lower the score.
- Record counts for fetched, preselected, summarized, quality-passing, and final items. When a run fails, preserve the rejection reasons instead of publishing internal filtering rules as reader-facing content.
- Never expose API keys, tokens, user identities, folder IDs, or local authorization state.
