'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';

export default function PostDetailsClient({ slug }: { slug: string }) {
  const router = useRouter();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        setLoading(true);
        // 🔥 Live Render Backend URL se post fetch karna
        const res = await axios.get(`https://rojgar-mduq.onrender.com/api/posts/${slug}`);
        
        if (res.data.success) {
          setPost(res.data.data);
        } else {
          setError('Post nahi mili!');
        }
      } catch (err: any) {
        console.error("Error fetching post:", err);
        setError('❌ 404: Yeh job post database mein nahi mili ya delete ho chuki hai.');
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchPostDetails();
  }, [slug]);

  // Date ko readable Indian format mein badalna
  const formatDate = (dateString: string) => {
    if (!dateString) return 'Not Specified';
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? dateString : date.toLocaleDateString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-center items-center">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="font-bold text-lg text-slate-700 dark:text-slate-300">Loading Job Details... ⏳</p>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-center items-center p-4 text-center">
        <h1 className="text-4xl font-extrabold text-red-600 mb-4">404 - Post Not Found</h1>
        <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-md">{error}</p>
        <Link href="/" className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:bg-blue-700 transition">
          ← Back to Homepage
        </Link>
      </div>
    );
  }

  // 🔥 GOOGLE RICH SNIPPET (JSON-LD STRUCTURED DATA)
  const jsonLdSchema = {
    "@context": "https://schema.org/",
    "@type": "JobPosting",
    "title": post.title,
    "description": post.shortInformation || "Government Job Recruitment Notification.",
    "identifier": {
      "@type": "PropertyValue",
      "name": "Rojgar Safar",
      "value": post.slug
    },
    "datePosted": new Date(post.createdAt || new Date()).toISOString().split('T')[0],
    "validThrough": post.importantDates && Array.isArray(post.importantDates) 
      ? (post.importantDates.find((d: any) => d.label?.toLowerCase().includes('last date'))?.date || "2026-12-31")
      : "2026-12-31",
    "employmentType": "FULL_TIME",
    "hiringOrganization": {
      "@type": "Organization",
      "name": "Government of India / State Govt",
      "sameAs": "https://rojgarsafar.com",
      "logo": "https://rojgarsafar.com/logo.png"
    },
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "IN"
      }
    }
  };

  return (
    <main className="min-h-screen bg-[#f8fafc] dark:bg-slate-950 font-sans pb-20 transition-colors duration-300">
      
      {/* INVISIBLE GOOGLE SCHEMA SCRIPT */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />

      {/* HEADER SECTION */}
      <header className="bg-slate-950 text-white pt-10 pb-12 border-b-4 border-blue-500 px-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="inline-block text-xs font-bold text-blue-400 bg-blue-950/60 px-4 py-2 rounded-full hover:bg-blue-900 transition mb-6">
            ← Back to Homepage
          </Link>
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 bg-blue-600 text-white text-xs font-extrabold rounded-md uppercase tracking-wider">
              {post.category || 'Job Update'}
            </span>
            <span className="text-xs text-slate-400">
              Posted: {formatDate(post.createdAt)}
            </span>
          </div>
          <h1 className="text-2xl md:text-4xl font-black leading-tight text-slate-100">
            {post.title}
          </h1>
        </div>
      </header>

      {/* MAIN CONTENT CONTAINER */}
      <div className="max-w-4xl mx-auto px-4 mt-8 space-y-8">
        
        {/* 1. SHORT INFORMATION */}
        <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200/80 dark:border-slate-800">
          <h2 className="text-lg font-bold text-blue-600 dark:text-blue-400 mb-2 border-b pb-2 border-slate-100 dark:border-slate-800">
            📌 Short Information
          </h2>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm md:text-base">
            {post.shortInformation}
          </p>
        </div>

        {/* 2. DATES & FEES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* IMPORTANT DATES */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200/80 dark:border-slate-800">
            <h2 className="text-lg font-bold text-indigo-600 dark:text-indigo-400 mb-4 border-b pb-2 border-slate-100 dark:border-slate-800 flex items-center gap-2">
              📅 Important Dates & Updates
            </h2>
            <ul className="space-y-3 text-sm">
              {Array.isArray(post.importantDates) ? (
                post.importantDates.map((item: any, idx: number) => (
                  <li key={idx} className="flex justify-between items-center border-b border-dashed border-slate-200 dark:border-slate-800 pb-2.5">
                    <span className="font-semibold text-slate-600 dark:text-slate-400">{item.label || 'Update'}:</span>
                    <span className="font-extrabold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-md text-xs md:text-sm">
                      {item.date || 'To be notified'}
                    </span>
                  </li>
                ))
              ) : (
                <li className="text-slate-400 text-center py-4">Check notification for dates.</li>
              )}
            </ul>
          </div>

          {/* APPLICATION FEE */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200/80 dark:border-slate-800">
            <h2 className="text-lg font-bold text-emerald-600 dark:text-emerald-400 mb-4 border-b pb-2 border-slate-100 dark:border-slate-800 flex items-center gap-2">
              💳 Application Fee
            </h2>
            <ul className="space-y-3 text-sm">
              <li className="flex justify-between border-b border-dashed border-slate-200 dark:border-slate-800 pb-2">
                <span className="font-semibold text-slate-600 dark:text-slate-400">General / OBC / EWS:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">₹ {post.applicationFee?.generalOBC_EWS ?? 0}</span>
              </li>
              <li className="flex justify-between border-b border-dashed border-slate-200 dark:border-slate-800 pb-2">
                <span className="font-semibold text-slate-600 dark:text-slate-400">SC / ST:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">₹ {post.applicationFee?.scST ?? 0}</span>
              </li>
              <li className="flex justify-between border-b border-dashed border-slate-200 dark:border-slate-800 pb-2">
                <span className="font-semibold text-slate-600 dark:text-slate-400">PH (Divyang):</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">₹ {post.applicationFee?.ph ?? 0}</span>
              </li>
              <li className="pt-2">
                <span className="block text-xs font-semibold text-slate-500 mb-1">Payment Mode:</span>
                <span className="inline-block bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 font-medium">
                  {post.applicationFee?.paymentModeText || 'Online Debit Card, Credit Card, Net Banking'}
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* 3. AGE LIMIT DETAILS */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200/80 dark:border-slate-800">
          <h2 className="text-lg font-bold text-orange-600 dark:text-orange-400 mb-4 border-b pb-2 border-slate-100 dark:border-slate-800 flex items-center gap-2">
            ⏳ Age Limit Details {post.ageLimit?.ageAsOn && <span className="text-xs font-normal text-slate-500">(As on {formatDate(post.ageLimit.ageAsOn)})</span>}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
            <div className="bg-orange-50/50 dark:bg-slate-800/50 p-3.5 rounded-xl border border-orange-100 dark:border-slate-700 text-center">
              <span className="block text-xs text-slate-500 font-semibold uppercase">Minimum Age</span>
              <span className="text-xl font-black text-slate-800 dark:text-slate-200 mt-1 block">{post.ageLimit?.minimumAge || 'NA'} Years</span>
            </div>
            <div className="bg-orange-50/50 dark:bg-slate-800/50 p-3.5 rounded-xl border border-orange-100 dark:border-slate-700 text-center">
              <span className="block text-xs text-slate-500 font-semibold uppercase">Maximum Age</span>
              <span className="text-xl font-black text-slate-800 dark:text-slate-200 mt-1 block">{post.ageLimit?.maximumAge || 'NA'} Years</span>
            </div>
            <div className="col-span-2 md:col-span-1 bg-orange-50/50 dark:bg-slate-800/50 p-3.5 rounded-xl border border-orange-100 dark:border-slate-700 flex flex-col justify-center text-center">
              <span className="block text-xs text-slate-500 font-semibold uppercase">Age Relaxation</span>
              <span className="text-xs font-bold text-orange-700 dark:text-orange-300 mt-1 block">As per Rules</span>
            </div>
          </div>
          {post.ageLimit?.extraAgeRelaxationDetails && (
            <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
              📌 <strong className="text-slate-800 dark:text-slate-200">Extra Note:</strong> {post.ageLimit.extraAgeRelaxationDetails}
            </p>
          )}
        </div>

        {/* 4. VACANCY DETAILS TABLE */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200/80 dark:border-slate-800 overflow-hidden">
          <h2 className="text-lg font-bold text-purple-600 dark:text-purple-400 mb-4 border-b pb-2 border-slate-100 dark:border-slate-800 flex items-center gap-2">
            🏢 Vacancy Details
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-purple-50 dark:bg-purple-950/40 text-purple-900 dark:text-purple-200 text-xs md:text-sm border-b border-purple-100 dark:border-purple-900">
                  <th className="p-3.5 font-extrabold rounded-tl-xl">Post Name</th>
                  <th className="p-3.5 font-extrabold text-center">Total Posts</th>
                  <th className="p-3.5 font-extrabold rounded-tr-xl">Eligibility Criteria</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                {post.vacancyDetails && post.vacancyDetails.length > 0 ? (
                  post.vacancyDetails.map((vac: any, idx: number) => (
                    <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                      <td className="p-3.5 font-bold text-slate-800 dark:text-slate-200">{vac.postName || 'General Post'}</td>
                      <td className="p-3.5 text-center font-black text-purple-600 dark:text-purple-400 bg-purple-50/30 dark:bg-purple-900/10">{vac.totalPosts || 0}</td>
                      <td className="p-3.5 text-slate-600 dark:text-slate-400 text-xs md:text-sm leading-relaxed">{vac.eligibilityCriteria || 'Check Notification'}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="p-6 text-center text-slate-400">No specific vacancy breakdown available.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* 5. IMPORTANT LINKS */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200/80 dark:border-slate-800">
          <h2 className="text-lg font-bold text-rose-600 dark:text-rose-400 mb-4 border-b pb-2 border-slate-100 dark:border-slate-800 flex items-center gap-2">
            ⚡ Important Links
          </h2>
          <div className="space-y-3">
            {post.importantLinks && post.importantLinks.length > 0 ? (
              post.importantLinks.map((linkItem: any, idx: number) => (
                <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 gap-3 hover:border-rose-300 dark:hover:border-rose-700 transition">
                  <span className="font-bold text-slate-800 dark:text-slate-200 text-sm md:text-base flex items-center gap-2">
                    <span className="text-rose-500 font-black">#</span>
                    {linkItem.linkTitle || 'Official Link'}
                  </span>
                  {linkItem.url ? (
                    <a 
                      href={linkItem.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-xs md:text-sm rounded-lg text-center shadow-md hover:scale-105 transition-all"
                    >
                      Click Here →
                    </a>
                  ) : (
                    <span className="px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 text-xs font-bold rounded-lg text-center cursor-not-allowed">
                      Link Soon
                    </span>
                  )}
                </div>
              ))
            ) : (
              <p className="text-center py-6 text-slate-400 text-sm">No external links provided for this post.</p>
            )}
          </div>
        </div>

{/* 🔥 FULL CONTENT SECTION (For SEO & AdSense) */}
{post.fullContent && (
  <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-800 overflow-hidden mt-8 p-6">
    <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-4 border-b pb-2">
      📝 Detailed Selection Process & Apply Guide
    </h2>
    
    {/* dangerouslySetInnerHTML: Yeh HTML tags ko actual design me convert kar dega */}
    <div 
      className="prose max-w-none text-slate-700 dark:text-slate-300 space-y-4"
      dangerouslySetInnerHTML={{ __html: post.fullContent }} 
    />
    
  </div>
)}

        {/* =========================================================
    🔥 DYNAMIC FAQ SECTION (FOR PUBLIC JOB PAGE)
   ========================================================= */}
{/* Check karenge ki database me is post ke andar faqs hain ya nahi */}
{post.faqs && post.faqs.length > 0 && (
  <div className="mt-10 p-5 md:p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm">
    <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 border-b border-slate-200 dark:border-slate-700 pb-3">
      Frequently Asked Questions (FAQs)
    </h2>
    
    <div className="space-y-4">
      {post.faqs.map((faq: { question: string; answer: string }, index: number) => (
        // <details> tag se automatic click-to-open (accordion) ban jata hai bina kisi extra state ke!
        <details 
          key={index} 
          className="group bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer transition-all duration-300"
        >
          <summary className="flex justify-between items-center font-semibold text-slate-800 dark:text-slate-200 p-4 focus:outline-none">
            {faq.question}
            <span className="text-slate-400 group-open:rotate-180 transition-transform duration-300">
              ▼
            </span>
          </summary>
          <div className="p-4 pt-0 text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed border-t border-slate-200 dark:border-slate-700 mt-2">
            {faq.answer}
          </div>
        </details>
      ))}
    </div>
  </div>
)}

      </div>
    </main>
  );
}