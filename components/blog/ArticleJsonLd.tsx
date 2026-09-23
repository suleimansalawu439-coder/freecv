// JSON-LD structured data for a blog article. Rendered by the article page JSX.
// Only fields that exist on `post` are included (all fields are defensive).
export function ArticleJsonLd({ post }: { post: any }) {
  const jsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
  };

  if (post?.title) {
    jsonLd.headline = post.title;
  }
  if (post?.meta_description) {
    jsonLd.description = post.meta_description;
  }
  const datePublished = post?.created_at || post?.datePublished;
  if (datePublished) {
    jsonLd.datePublished = datePublished;
  }
  if (post?.updated_at) {
    jsonLd.dateModified = post.updated_at;
  }
  const authorName = post?.author?.name || post?.author_name || (typeof post?.author === 'string' ? post.author : null);
  if (authorName) {
    jsonLd.author = { '@type': 'Person', name: authorName };
  }
  if (post?.header_image) {
    const raw = String(post.header_image);
    jsonLd.image = raw.startsWith('http') ? raw : `https://cvyon.com${raw.startsWith('/') ? '' : '/'}${raw}`;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        // Scrub '<' to neutralize any embedded HTML (XSS-safe JSON-LD).
        __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
      }}
    />
  );
}
