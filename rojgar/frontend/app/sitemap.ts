import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // ✅ FIX 1: BASE URL (Frontend ka Link) -> Wahi exact link daalo jo Google Search Console me verified hai!
  // Agar tumne custom domain le liya hai to use likho: 'https://rojgarsafar.com'
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.rojgarsafar.com'; 

  // 🔥 BACKEND API URL -> Data fetch karne ke liye Render ka link alag rakha hai
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://rojgar-mduq.onrender.com';

  // 1. Static Pages
  const staticPages = [
    '',
    '/category/latest-job',
    '/category/result',
    '/category/admit-card',
    '/disclaimer',
    '/privacy-policy',
    '/terms',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // 2. Dynamic Job Posts from Backend Database
  try {
    // ✅ FIX 2: Yahan humne apiUrl ka use kiya hai taaki data backend se properly load ho
    const res = await fetch(`${apiUrl}/api/posts`, {
      next: { revalidate: 3600 } // Har 1 ghante me sitemap update
    });
    const json = await res.json();
    
    let dynamicPosts: any[] = [];
    if (json.success && json.data) {
      dynamicPosts = json.data.map((post: any) => ({
        // Yahan auto-generate hone wale links par baseUrl (Frontend URL) hi lagega!
        url: `${baseUrl}/post/${post.slug}`,
        lastModified: new Date(post.updatedAt || post.createdAt || new Date()),
        changeFrequency: 'hourly' as const,
        priority: 0.9, // Job posts ko high priority
      }));
    }

    return [...staticPages, ...dynamicPosts];
  } catch (error) {
    console.error('Sitemap fetch error:', error);
    return staticPages;
  }
}