import Link from 'next/link';
import { Metadata } from 'next';

// 1. 🔥 DYNAMIC SEO METADATA (Zero (0) Issue Fix)
export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await props.params;
  const slug = resolvedParams.slug;
  const pageTitle = slug ? slug.replace('-', ' ').toUpperCase() : 'CATEGORIES';

  return {
    title: `${pageTitle} | Rojgar Safar`,
    description: `Get all the latest and verified updates for ${pageTitle} including admit cards, results, and online forms.`,
    alternates: {
      canonical: `https://www.rojgarsafar.com/category/${slug}`,
    }
  };
}

// 2. 🔥 SERVER-SIDE FETCHING WITH ISR (Instant Loading)
async function getCategoryPosts() {
  try {
    const res = await fetch('https://rojgar-mduq.onrender.com/api/posts', {
      next: { revalidate: 60 } // Har 60 second me auto-update hoga
    });
    if (!res.ok) return [];
    const json = await res.json();
    return json.success ? json.data : [];
  } catch (error) {
    console.error("Error fetching category posts:", error);
    return [];
  }
}

export default async function CategoryPage(props: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await props.params;
  const slug = resolvedParams.slug;

  // Data ab direct server par fetch hoga (bina useEffect aur loading state ke)
  const posts = await getCategoryPosts();

  // Smart Category Filters
  const filteredPosts = posts.filter((post: any) => {
    if (!post.category) return false;
    const dbCategory = post.category.toLowerCase();
    
    if (slug === 'latest-job' && dbCategory.includes('job')) return true;
    if (slug === 'result' && dbCategory.includes('result')) return true;
    if (slug === 'admit-card' && dbCategory.includes('admit')) return true;
    if (slug === 'answer-key' && dbCategory.includes('answer')) return true;
    if (slug === 'syllabus' && dbCategory.includes('syllabus')) return true;
    if (slug === 'admission' && dbCategory.includes('admission')) return true;
    
    return false;
  });

  const pageTitle = slug ? slug.replace('-', ' ').toUpperCase() : 'CATEGORIES';

  return (
    <main className="min-h-screen bg-white font-sans pb-20 text-black">
      
      {/* CLASSIC HEADER SECTION - MAROON */}
      <div className="bg-[#9E0000] text-white pt-6 pb-6 px-4 border-b-4 border-black">
        <div className="max-w-4xl mx-auto text-center">
          <Link href="/" className="inline-block mb-4 px-4 py-1 border border-white hover:bg-white hover:text-[#9E0000] transition-colors text-sm font-bold">
            ← Back to Home
          </Link>
          {/* Main Title se (0) hata diya gaya hai taaki UI aur SEO dono clean rahein */}
          <h1 className="text-2xl md:text-4xl font-extrabold uppercase tracking-wide leading-tight">
             {pageTitle}
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 mt-8">
        
        {/* CLASSIC SARKARI LIST BOX */}
        <div className="border-2 border-gray-400 bg-white overflow-hidden">
          <div className="bg-[#0000FF] p-2 text-center border-b-2 border-gray-400">
            <h2 className="text-lg font-bold text-white uppercase tracking-wider">
              List of {pageTitle}
            </h2>
          </div>
          
          {filteredPosts.length > 0 ? (
            <ul className="divide-y divide-gray-400">
              {filteredPosts.map((post: any) => (
                <li key={post._id} className="hover:bg-gray-100 transition-colors">
                  <Link 
                    href={`/post/${post.slug}`} 
                    className="flex justify-between items-center p-3 md:p-4 text-blue-800 hover:text-red-600 font-bold text-sm md:text-base"
                  >
                    <span>{post.title}</span>
                    <span className="underline decoration-2 underline-offset-4 ml-4 whitespace-nowrap text-xs md:text-sm">
                      Click Here
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-12 text-gray-700 font-bold border-t-2 border-gray-400">
              No updates found for this category.
            </div>
          )}
        </div>

      </div>
    </main>
  );
}