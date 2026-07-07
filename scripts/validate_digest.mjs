#!/usr/bin/env node

import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const file = process.argv[2];
if (!file) {
  console.error("Usage: node scripts/validate_digest.mjs path/to/digest.md");
  process.exit(2);
}

const text = await readFile(resolve(file), "utf8");
const errors = [];

const requiredSections = [
  "## 今日总判断",
  "## 一、一手 Builder 信号",
  "## 二、最新播客候选精华",
  "## 三、独立作者与工程团队洞见",
  "## 今天真正值得带走的 5 个判断",
  "### What to Update",
  "### Watch Next",
  "## 质量说明"
];

for (const section of requiredSections) {
  if (!text.includes(section)) errors.push(`Missing section: ${section}`);
}

const h1Count = (text.match(/^# /gm) || []).length;
if (h1Count !== 1) errors.push(`Expected exactly one H1, found ${h1Count}`);

const itemCount = (text.match(/^### \d+\.\s/gm) || []).length;
if (itemCount !== 10) errors.push(`Expected exactly 10 signal items, found ${itemCount}`);

function sectionItemCount(start, end) {
  const body = text.split(start)[1]?.split(end)[0] || "";
  return (body.match(/^### \d+\.\s/gm) || []).length;
}

const builderItems = sectionItemCount(
  "## 一、一手 Builder 信号",
  "## 二、最新播客候选精华"
);
const podcastItems = sectionItemCount(
  "## 二、最新播客候选精华",
  "## 三、独立作者与工程团队洞见"
);
const nonWinnerPodcastItems = (text.match(/为什么没入选深度日刊/g) || []).length;
const independentItems = sectionItemCount(
  "## 三、独立作者与工程团队洞见",
  "## 今天真正值得带走的 5 个判断"
);
if (builderItems < 2) errors.push(`Expected at least 2 Builder items, found ${builderItems}`);
if (podcastItems < 3) errors.push(`Expected at least 3 podcast candidates, found ${podcastItems}`);
if (nonWinnerPodcastItems < 3) errors.push(`Expected 3 scored non-winning podcast candidates, found ${nonWinnerPodcastItems}`);
if (independentItems < 5) errors.push(`Expected at least 5 independent or official items, found ${independentItems}`);

const fieldMinimums = [
  ["Bottom line", 10],
  ["为什么重要", 10],
  ["可借鉴之处", 10],
  ["信号判断", 10],
  ["决策评分", 10],
  ["建议动作", 10]
];

for (const [field, minimum] of fieldMinimums) {
  const count = text.split(field).length - 1;
  if (count < minimum) errors.push(`Expected at least ${minimum} occurrences of "${field}", found ${count}`);
}

const decisionScores = [...text.matchAll(/决策评分：(\d+)\/25/g)].map((match) => Number(match[1]));
if (decisionScores.length !== 10) errors.push(`Expected 10 decision scores, found ${decisionScores.length}`);
if (decisionScores.some((score) => score < 18 || score > 25)) {
  errors.push("Every published decision score must be between 18 and 25");
}
const actions = text.match(/建议动作：(watch|test|adopt|escalate)/g) || [];
if (actions.length !== 10) errors.push(`Expected 10 publishable action tags, found ${actions.length}`);

const coreJudgmentSection = text.split("## 今日总判断")[1]?.split("## 一、一手 Builder 信号")[0] || "";
const crossSourceJudgments = (coreJudgmentSection.match(/交叉依据：/g) || []).length;
if (crossSourceJudgments < 3) {
  errors.push(`Expected at least 3 cross-source core judgments, found ${crossSourceJudgments}`);
}

const urls = new Set(text.match(/https?:\/\/[^\s)>\]]+/g) || []);
if (urls.size < 10) errors.push(`Expected at least 10 distinct original URLs, found ${urls.size}`);

const chineseChars = (text.match(/[\u3400-\u9fff]/g) || []).length;
if (chineseChars < 3000) errors.push(`Chinese substantive content is too short: ${chineseChars} characters`);

const emptyPhrases = [
  "值得关注行业趋势",
  "提供研究支持",
  "意义重大",
  "未来可期",
  "不容错过",
  "颠覆行业",
  "本层本次没有通过质量门的内容",
  "今天没有新的高可信信号"
];

for (const phrase of emptyPhrases) {
  if (text.includes(phrase)) errors.push(`Replace empty phrase with a specific mechanism: ${phrase}`);
}

const takeawaySection = text.split("## 今天真正值得带走的 5 个判断")[1]?.split("## 质量说明")[0] || "";
const takeawayCount = (takeawaySection.match(/^\d+\.\s/gm) || []).length;
if (takeawayCount !== 5) errors.push(`Expected exactly 5 final takeaways, found ${takeawayCount}`);

if (!/时区|timezone/i.test(text)) errors.push("Quality note must state the timezone");
if (!/Transcript|逐字稿/i.test(text)) errors.push("Digest must disclose transcript coverage");

if (errors.length > 0) {
  console.error("Digest validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(JSON.stringify({
  ok: true,
  file: resolve(file),
  signalItems: itemCount,
  builderItems,
  podcastItems,
  nonWinnerPodcastItems,
  independentItems,
  originalUrls: urls.size,
  chineseCharacters: chineseChars,
  decisionScores,
  finalTakeaways: takeawayCount
}, null, 2));
