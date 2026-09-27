import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/admin/*'], // Admin panel ko Google search se chhupe rakho (Security + SEO)
    },
    sitemap: 'https://rojgar-mduq.onrender.com/sitemap.xml',
  };
}