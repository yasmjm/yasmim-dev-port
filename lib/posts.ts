import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts');

export interface PostMeta {
  slug: string;
  title: string;
  summary: string;
  date: string;
  tags: string[];
  draft: boolean;
  readingMinutes: number;
}

export interface Post extends PostMeta {
  content: string;
}

/** Rascunhos aparecem em `npm run dev`, mas nunca no site publicado. */
const SHOW_DRAFTS = process.env.NODE_ENV === 'development';

function listFiles(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith('.mdx') || f.endsWith('.md'));
}

function parseFile(fileName: string): Post {
  const raw = fs.readFileSync(path.join(POSTS_DIR, fileName), 'utf-8');
  const { data, content } = matter(raw);

  const slug = String(data.slug ?? fileName.replace(/\.mdx?$/, ''));

  if (!data.title) throw new Error(`Post "${fileName}" está sem "title" no frontmatter.`);
  if (!data.date) throw new Error(`Post "${fileName}" está sem "date" no frontmatter.`);

  return {
    slug,
    title: String(data.title),
    summary: String(data.summary ?? ''),
    date: new Date(data.date).toISOString(),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    draft: Boolean(data.draft),
    readingMinutes: Math.max(1, Math.round(readingTime(content).minutes)),
    content,
  };
}

export function getAllPosts(): PostMeta[] {
  return listFiles()
    .map(parseFile)
    .filter((post) => SHOW_DRAFTS || !post.draft)
    .sort((a, b) => b.date.localeCompare(a.date))
    .map(({ content: _content, ...meta }) => meta);
}

export function getPostBySlug(slug: string): Post | null {
  const file = listFiles().find((f) => f.replace(/\.mdx?$/, '') === slug);
  if (!file) return null;

  const post = parseFile(file);
  if (post.draft && !SHOW_DRAFTS) return null;
  return post;
}

export function getAllTags(): { tag: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const post of getAllPosts()) {
    for (const tag of post.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}
