import rss from '@astrojs/rss';
import { siteConfig } from '../../site.config.js';
import { getAllPosts, getPostUrl } from '../lib/posts';

export async function GET(context) {
  const posts = await getAllPosts();

  return rss({
    title: siteConfig.siteName,
    description: siteConfig.siteDescription,
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: getPostUrl(post.data.slug),
      customData: `<category>${post.data.category}</category>`
    }))
  });
}
