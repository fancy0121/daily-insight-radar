# Podcast Deep-Dive Standard

Use this standard when the task selects one recent podcast or video and turns it into a Chinese knowledge-base article.

## Candidate coverage

- Use verified original channel feeds as the primary discovery path; use keyword search only as a supplement.
- Require at least five candidates published within seven days and at least three usable transcripts before claiming a credible daily comparison.
- Reject clips and short excerpts below 15 minutes unless the user explicitly requests short-form analysis.
- Prefer the latest 72 hours. Never present an older classic interview as today's winner.

Useful starter channels include YC Root Access, No Priors, Every, Google DeepMind, Lenny's Podcast, Dwarkesh, Lex Fridman, TWIML, and The Cognitive Revolution. Verify channel identity and current URLs before use.

## Scoring

Use a 100-point score:

- deterministic source reliability and freshness: 30 points;
- transcript-based problem importance, mechanism, evidence density, transferability, novelty, and noise: 70 points.

Run transcript content scoring twice and average each dimension. Sample long transcripts evenly across the full episode so length does not create a scoring disadvantage. Fame and popularity receive no direct points.

## Article contract

- Use a short Chinese title that states the intellectual subject; keep the original episode title as metadata.
- Begin with one central thesis and one causal chain from observation through mechanism, constraint, result, and transferable lesson.
- Organize four to six progressive chapters around logical questions, not transcript chronology.
- Keep source evidence, mechanism explanation, editorial inference, and transferable action distinct.
- Direct quotations must be verbatim and carry valid transcript timestamps. Paraphrases must not use quotation marks.
- Label company performance, customer outcomes, employee sentiment, revenue, and funding claims as guest self-report or company claims unless independently verified.
- Target 6,000-9,000 Chinese characters. Reject fewer than 6,000 or more than 12,000.
- Reject machine preambles, invalid timestamps, mixed quote/paraphrase labels, unsupported verification claims, and mechanically repeated section headings.

Keep the candidate table concise and reader-facing. Preserve detailed diagnostics separately.

## Runtime resilience

- Retry transient model/network failures, but do not retry non-retryable 4xx errors blindly.
- Keep fetch/tool errors in diagnostics. Never inject unbounded stderr, subtitle output, or tool traces into the generation prompt.
- Set explicit limits for generation-prompt size, model response size, and repair-input size. Reject oversized intermediate output instead of feeding it back into the model.
- Preserve beginning, middle, and ending transcript coverage when compressing long evidence.
- Record the failed pipeline stage. A bare `fetch failed` message is not sufficient diagnosis.
- Treat delivery as complete only when both the full-document identifier and the notification-message identifier are recorded.
