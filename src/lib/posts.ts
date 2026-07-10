export async function getAllPosts() {
  const modules = import.meta.glob('../../content/posts/*.md', { eager: true });
  const posts = Object.values(modules).map((module: any) => ({
    data: {
      ...module.frontmatter,
      date: new Date(module.frontmatter.date),
      image: module.frontmatter.image || '/images/sample.jpg',
      tags: module.frontmatter.tags || []
    },
    Content: module.default
  }));

  return posts
    .filter((post) => !post.data.draft)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export function getPostUrl(slug: string) {
  return `/posts/${slug}/`;
}

export function normalizePathSegment(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, '-');
}

export function getCategoryUrl(category: string) {
  return `/category/${normalizePathSegment(category)}/`;
}

export function getTagUrl(tag: string) {
  return `/tag/${normalizePathSegment(tag)}/`;
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}

export function getCategories(posts: Awaited<ReturnType<typeof getAllPosts>>) {
  return [...new Set(posts.map((post) => post.data.category))].sort((a, b) => a.localeCompare(b));
}

export function getTags(posts: Awaited<ReturnType<typeof getAllPosts>>) {
  return [...new Set(posts.flatMap((post) => post.data.tags))].sort((a, b) => a.localeCompare(b));
}
