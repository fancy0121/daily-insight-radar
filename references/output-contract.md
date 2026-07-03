# Output Contract

## Full document

Use one H1 title:

`# 每日洞见雷达 YYYY-MM-DD`

Then use these sections in order:

1. `## 今日总判断`
2. `## 一、一手 Builder 信号`
3. `## 二、最新播客候选精华`
4. `## 三、独立作者与工程团队洞见`
5. `## 今天真正值得带走的 5 个判断`
6. `## 质量说明`

## Ordinary signal

Use one H3 per item and include:

- `**Bottom line：**`
- `**关键信号：**`
- `**为什么重要：**`
- `**可借鉴之处：**`
- `**证据与原始链接：**`

The key signal section must explain facts and mechanism, not repeat the headline.

## Podcast candidate

Use one H3 per episode and include:

- source and publication date;
- score;
- one-sentence topic;
- valuable insight;
- why it did not win;
- practical takeaway;
- transcript status;
- original link.

Never describe a non-winning candidate as rejected garbage. It lost the relative daily ranking but still passed the inclusion threshold.

Match the accepted 2026-07-01 baseline: include at least three transcript-backed non-winning podcast candidates, at least two qualified first-party Builder posts, and five independent-expert or official-team items. Any shortfall is a validation failure, not a publishable "no content" section.

## Daily judgments

Write three to five cross-source conclusions. Each conclusion must connect at least two observations or explain a shared structural change.

## Five takeaways

Write exactly five numbered takeaways. Each must remain useful after the news cycle and be expressible as a decision rule, mental model, or concrete action.

## Quality note

State:

- local date and timezone;
- normal and expanded collection windows;
- source layers successfully scanned;
- unavailable or failed sources;
- transcript coverage;
- supplementary items;
- unresolved uncertainty.

If the ten-item 2/3/5 baseline is not satisfied, do not generate a publishable full document or notification. Return a local diagnostic report instead.

## Message notification

Keep the notification short:

- title and date;
- three daily judgments;
- all ten selected item titles with one-sentence Bottom lines;
- full-document link.

Do not paste the full brief into chat.

## Non-negotiable delivery contract

- On-time, quality-compliant, quantity-compliant delivery is one indivisible result.
- The radar requires exactly ten qualified signals with the 2/3/5 layer distribution. The podcast workflow requires one transcript-backed long-form article within its configured Chinese-length range.
- Never lower evidence, freshness, transcript, source, or writing standards to meet a deadline or item count.
- A failed quality gate is not a successful delivery. Preserve diagnostics and use the configured retry or catch-up path; do not publish an empty or reduced document.
- A scheduled deployment should run an idempotent delivery watchdog after the primary deadlines so transient outages can recover without waiting for the next login or the next day.
- Treat external delivery as complete only after both the full-document identifier and notification-message identifier are recorded and verifiable.
