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
  "## 质量说明"
];

for (const section of requiredSections) {
  if (!text.includes(section)) errors.push(`Missing section: ${section}`);
}

const h1Count = (text.match(/^# /gm) || []).length;
if (h1Count !== 1) errors.push(`Expected exactly one H1, found ${h1Count}`);

const itemCount = (text.match(/^### /gm) || []).length;
if (itemCount < 8) errors.push(`Expected at least 8 signal items, found ${itemCount}`);

const fieldMinimums = [
  ["Bottom line", 8],
  ["为什么重要", 8],
  ["可借鉴之处", 8]
];

for (const [field, minimum] of fieldMinimums) {
  const count = text.split(field).length - 1;
  if (count < minimum) errors.push(`Expected at least ${minimum} occurrences of "${field}", found ${count}`);
}

const urls = new Set(text.match(/https?:\/\/[^\s)>\]]+/g) || []);
if (urls.size < 8) errors.push(`Expected at least 8 distinct original URLs, found ${urls.size}`);

const chineseChars = (text.match(/[\u3400-\u9fff]/g) || []).length;
if (chineseChars < 1200) errors.push(`Chinese substantive content is too short: ${chineseChars} characters`);

const emptyPhrases = [
  "值得关注行业趋势",
  "提供研究支持",
  "意义重大",
  "未来可期",
  "不容错过",
  "颠覆行业"
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
  originalUrls: urls.size,
  chineseCharacters: chineseChars,
  finalTakeaways: takeawayCount
}, null, 2));
