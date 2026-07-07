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

## Signal Decision editorial gate

The 100-point matrix determines whether the underlying material is sufficiently strong. Every survivor must then become a normalized Signal Decision object before final selection:

- source type, source name, source role, title, canonical URL, and evidence excerpt;
- one primary theme and one primary signal class;
- one-sentence `why_it_matters` and `implication`;
- one conservative action tag;
- five positive scores, two penalties, total score, and machine-readable score evidence.

Use these themes: `model_capability`, `inference_infra`, `agent_workflow`, `tool_interface`, `memory_context`, `evals_reliability`, `developer_experience`, `enterprise_adoption`, `org_talent`, `distribution_go_to_market`, `consumer_use_case`, `security_governance`.

Use these signal classes: `product_signal`, `infra_signal`, `workflow_signal`, `research_signal`, `org_talent_signal`, `market_structure_signal`, `distribution_signal`, `warning_signal`.

Score each positive dimension from 1 to 5:

- novelty;
- specificity;
- decision value;
- credibility;
- durability.

Subtract `hype_penalty` and `noise_penalty`, each from 0 to 3:

`decision_score = novelty + specificity + decision_value + credibility + durability - hype_penalty - noise_penalty`

Interpretation:

- `22-25`: Lead / Top Signal.
- `18-21`: Publish / Secondary Signal.
- `15-17`: Diagnostic only; never use as formal backfill.
- Below `15`: Drop.

Credibility must be code-controlled from the verified source policy and trust score. Fame and popularity cannot raise it. Keep score evidence for every dimension. Reject missing URLs, missing evidence, promotion without information gain, social chatter, old consensus without a new angle, and candidates whose importance or implication cannot be stated cleanly.

Deduplicate at the theme and event level after scoring. When two different links express the same theme, signal class, and substantially similar event, keep the stronger evidence record. URL uniqueness alone does not establish signal uniqueness.

Published action tags are `watch`, `test`, `adopt`, or `escalate`; choose the smallest honest action. `ignore` belongs only in dropped diagnostics.

Feed at least five dated, transcript-backed, evidence-scored non-winning podcast candidates into the editorial gate when available, so a sub-threshold item does not make the required final three impossible. A cautious discovery floor as low as 48/100 may decide whether a candidate reaches this second gate, but it is not publication approval. Expand transcript-backed coverage instead of lowering the formal 18/25 threshold.

The daily radar must build a supply pool of at least 50 plausible trusted candidates before final filtering. For runtime speed, the model-facing summary subset may be capped around 30 items, but it must preserve the required layers first: up to the configured Builder candidate cap, at least five transcript-backed non-winning podcast candidates when available, and enough independent/official sources to satisfy the final 5-item layer. A small model-facing subset is acceptable only when the larger candidate pool and layer diagnostics are preserved.

When the same-day podcast candidate pool is thin, recover from the seven-day transcript-backed scored candidate window. Do not lower transcript, evidence, or score requirements. Label the original publication date and comparison date so a window re-comparison is not misrepresented as a same-day release.

After the final ten are fixed, synthesize Today's Core Judgment in a separate evidence-only pass. Every judgment must retain visible indexes for at least two distinct sources and classify the relationship as the same concrete mechanism, a problem and solution in the same domain, a real tension, or an explicit boundary. Broad shared words such as AI, feedback, iteration, efficiency, or user experience do not establish a relationship.

Do not turn a descriptive number into a mandatory threshold. Every Arabic number in an action or watchpoint must appear verbatim in the selected evidence. Reject claims such as proof, inevitability, complete replacement, or universal adoption when the evidence is only a small set of cases.

An incomplete model batch is a failed batch. Missing indexes, missing required fields, or debug fallback text must never enter the formal synthesis cache. Key the cache on prompt version, model, canonical URL, source body, and stable evidence identity.

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
- Cache synthesis by prompt version, model, and stable evidence identity. Repeated runs over unchanged evidence must reuse the same synthesis; prompt or evidence-version changes must invalidate the cache.

## Three-layer minimum

The final brief must contain:

1. Primary Builder signals.
2. Recent non-winning podcast candidates with transcripts.
3. Independent experts or engineering teams from the scored pool.

The accepted baseline is two Builder items, three transcript-backed non-winning podcast candidates, and five independent-expert or official-team items. If any layer falls short, expand verified primary-source coverage or fail closed instead of publishing an empty-layer explanation.

## Final audit

Before publishing:

1. Open every selected original URL.
2. Check all ten selected items against source text or transcript.
3. Confirm all podcast dates are known and no older than seven days.
4. Confirm ten qualified signals with at least two Builder items, three transcript-backed non-winning podcast candidates, and five independent-expert or official-team items. A shortfall is a failed run and must not be published externally.
5. Confirm every signal has a Bottom line, mechanism, importance, reusable lesson, and link.
6. Confirm the five final takeaways are synthesized rather than copied from headings.
7. Run `scripts/validate_digest.mjs`.

## Failure-closed publishing

Do not publish a document whose body says that no content was found. A retrieval or filtering shortfall describes pipeline state, not the state of the world.

Persist a diagnostic ledger with:

- fetched item count;
- candidates surviving source and freshness filters;
- candidates sent to model summarization;
- items sent for synthesis;
- items rejected by the quality gate and their reasons;
- final selected count;
- preselected, quality-passing, and final counts by layer;
- Signal Decision counts and layer shortfall causes;
- layers that were required because qualifying candidates existed;
- failed sources and timeouts.

Internal filtering rules belong in diagnostics, not in the reader-facing brief.
