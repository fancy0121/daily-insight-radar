# Quality Standard

## Purpose

The digest is a decision and learning instrument, not a news feed. Select signals that improve a durable mental model, expose an important mechanism, or support a concrete action.

## Source hierarchy

Use sources in this order:

1. Original research, official engineering posts, first-party product explanations, and direct statements from responsible builders.
2. Full podcast or video transcripts from established interviewers and technical channels.
3. Original analysis from consistently high-quality independent writers.
4. Search results and secondary coverage only for discovery or cross-checking.

Exclude rumor accounts, generic news rewrites, funding gossip, tool-list content, unexplained viral posts, and claims available only through screenshots.

The Builder layer must come from the configured trusted original Builder feed and contain a concrete mechanism or action value. Independent-writer items must be the author's own analysis; reject quote-only posts, news roundups, community compilations, link digests, and rewritten reporting before synthesis.

## 100-point ranking matrix

Score every candidate with evidence:

| Dimension | Points | High-score evidence |
| --- | ---: | --- |
| Source reliability | 15 | Primary source, accountable author, stable canonical link |
| Freshness | 15 | Published within 24 hours; gradual decay to 72 hours |
| Problem importance | 15 | Addresses a consequential, recurring, or long-term problem |
| Mechanism and reasoning | 20 | Explains causality, constraints, tradeoffs, or system structure |
| Evidence density | 15 | Includes transcript detail, data, examples, implementation, or falsifiable claims |
| Transferability | 15 | Changes a decision or yields a reusable framework or action |
| Novelty | 5 | Adds a view unavailable from ordinary summaries |

Interpretation:

- `85-100`: exceptional; strong deep-dive candidate.
- `75-84`: include in the daily brief.
- `68-74`: include only when it contributes a unique local insight and evidence is explicit.
- Below `68`: reject.

Fame, follower count, production quality, controversy, and virality receive no direct points.

## Evidence rules

- Verify publication date, title, author, URL, and quoted wording.
- Distinguish facts, source opinions, and the digest author's inference.
- Use transcript evidence for podcast claims. A title or description is insufficient.
- Sample long transcripts evenly across their full duration. Do not compare a short episode's broad coverage against only the opening of a longer episode.
- Preserve uncertainty. Write "the source argues", "the experiment suggests", or "this remains unverified" when appropriate.
- Treat numeric claims as high-risk: verify the number, unit, sample, comparison, and source context.
- Note commercial incentives when an author discusses their own product, company, or investment.

## Writing standard

- Write the substantive explanation in Chinese.
- Give each selected signal roughly 250-600 Chinese characters when the evidence supports it.
- Explain the actual mechanism. Avoid empty phrases such as "值得关注行业趋势", "提供研究支持", "意义重大", or "未来可期".
- Use short paragraphs, specific nouns, and direct verbs.
- Keep quotations short. A quotation must preserve wording and add value that paraphrase would lose.
- Do not imitate a source's personal voice or claim personal experience.

## Three-layer minimum

The final brief must contain:

1. Primary Builder signals.
2. Recent non-winning podcast candidates with transcripts.
3. Independent experts or engineering teams from the scored pool.

The layers are not mechanical quotas, but an empty layer must be supported by rejection evidence. If the Builder pool contains a post with a concrete mechanism, constraint, implementation change, or actionable workflow, retain at least one Builder item. If the scored podcast pool contains transcript-backed non-winning candidates above the configured inclusion score and within seven days, retain two to three of them. If qualifying candidates exist before synthesis but the final layer is empty, fail closed instead of publishing an empty-layer explanation.

## Final audit

Before publishing:

1. Open every selected original URL.
2. Check at least eight important assertions against source text or transcript.
3. Confirm all podcast dates are known and no older than seven days.
4. Confirm at least eight qualified signals. A shortfall is a failed run and must not be published externally.
5. Confirm every signal has a Bottom line, mechanism, importance, reusable lesson, and link.
6. Confirm the five final takeaways are synthesized rather than copied from headings.
7. Run `scripts/validate_digest.mjs`.

## Failure-closed publishing

Do not publish a document whose body says that no content was found. A retrieval or filtering shortfall describes pipeline state, not the state of the world.

Persist a diagnostic ledger with:

- fetched item count;
- candidates surviving source and freshness filters;
- items sent for synthesis;
- items rejected by the quality gate and their reasons;
- final selected count;
- preselected, quality-passing, and final counts by layer;
- layers that were required because qualifying candidates existed;
- failed sources and timeouts.

Internal filtering rules belong in diagnostics, not in the reader-facing brief.
