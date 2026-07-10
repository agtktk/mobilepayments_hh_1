import fs from 'node:fs';
import path from 'node:path';

const [title, category = '미분류', rawTags = ''] = process.argv.slice(2);

if (!title) {
  console.error('Usage: npm run new-post "글 제목" "카테고리" "태그1,태그2"');
  process.exit(1);
}

const today = new Date().toISOString().slice(0, 10);
const tags = rawTags
  .split(',')
  .map((tag) => tag.trim())
  .filter(Boolean);

function slugify(value) {
  const asciiSlug = value
    .normalize('NFKD')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .toLowerCase()
    .replace(/[-\s]+/g, '-')
    .replace(/^-|-$/g, '');

  return asciiSlug || `post-${today.replaceAll('-', '')}`;
}

const slug = slugify(title);
const postsDir = path.join(process.cwd(), 'content', 'posts');
const filePath = path.join(postsDir, `${today}-${slug}.md`);

if (!fs.existsSync(postsDir)) {
  fs.mkdirSync(postsDir, { recursive: true });
}

if (fs.existsSync(filePath)) {
  console.error(`Post already exists: ${filePath}`);
  process.exit(1);
}

const frontmatter = `---
title: "${title.replaceAll('"', '\\"')}"
description: "메타 설명을 입력하세요."
slug: "${slug}"
date: "${today}"
category: "${category.replaceAll('"', '\\"')}"
tags: ${JSON.stringify(tags)}
image: "/images/sample.jpg"
---

본문을 작성하세요.
`;

fs.writeFileSync(filePath, frontmatter, 'utf8');
console.log(`Created ${filePath}`);
