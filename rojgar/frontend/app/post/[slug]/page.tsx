// import Link from 'next/link';
// import { Metadata } from 'next';
// import { notFound } from 'next/navigation';

// // Helper function date format karne ke liye (FIXED for Invalid Dates)
// const formatDate = (dateString: string | null) => {
//   if (!dateString) return 'Notified Soon';
  
//   const date = new Date(dateString);
  
//   // Agar date string valid date nahi hai (jaise "Notify Later"), toh wahi text wapas bhej do
//   if (isNaN(date.getTime())) {
//     return dateString; 
//   }
  
//   return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
// };

// // Server component se data fetch karna
// async function getSinglePost(slug: string) {
//   try {
//     const res = await fetch(`https://rojgarsafar.onrender.com/api/posts/${slug}`, { cache: 'no-store' });
//     if (!res.ok) return null;
//     const json = await res.json();
//     return json.data;
//   } catch (error) {
//     console.error("Fetch error:", error);
//     return null;
//   }
// }

// // =====================================================================
// // 🔥 DYNAMIC SEO CODE
// // =====================================================================
// export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
//   const resolvedParams = await props.params;
//   const slug = resolvedParams.slug;
//   const post = await getSinglePost(slug);

//   if (!post) {
//    notFound();
//   }

//   const postTitle = post.title;

//   return {
//     title: `${postTitle} | Apply Online, Admit Card, Syllabus`,
//     description: post.shortInformation || `Get the latest update and complete details for ${postTitle}. Check important dates, application fee, and eligibility.`,
//     keywords: [
//       postTitle,
//       `${postTitle} 2026`,
//       `${postTitle} apply online`,
//       `${postTitle} syllabus`,
//       `${postTitle} admit card download`,
//       `${postTitle} sarkari result`,
//       "Sarkari Naukri",
//       "Job Safar",  
//       "Job Sarfar"  
//     ],
//     alternates: {
//       canonical: `https://www.rojgarsafar.com/post/${slug}`,
//     }
//   };
// }
// // =====================================================================

// export default async function PostDetail(props: { params: Promise<{ slug: string }> }) {
//   const resolvedParams = await props.params;
//   const slug = resolvedParams.slug;
//   const post = await getSinglePost(slug);

//   if (!post) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] dark:bg-slate-950">
//         <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Post Not Found 😕</h1>
//       </div>
//     );
//   }

//   return (
//     <main className="min-h-screen bg-[#f8fafc] dark:bg-slate-950 font-sans pb-20 transition-colors duration-300">

//       {/* HEADER SECTION */}
//       <div className="bg-gradient-to-r from-blue-900 to-indigo-800 dark:from-slate-900 dark:to-slate-900 border-b-4 border-blue-500 pt-10 pb-16 px-4">
//         <div className="max-w-5xl mx-auto text-center">
//           <Link href="/" className="inline-block mb-6 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full text-sm font-medium backdrop-blur-md transition-all">
//             ← Back to Home
//           </Link>
//           <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
//             {post.title}
//           </h1>
//           <span className="bg-emerald-500 text-white px-4 py-1.5 rounded-full text-sm font-bold tracking-wider uppercase shadow-lg">
//             {post.category}
//           </span>
//         </div>
//       </div>

//       {/* MAIN CONTENT AREA */}
//       <div className="max-w-5xl mx-auto px-4 -mt-8 relative z-10 space-y-8">

//         {/* Short Information Box */}
//         <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-800">
//           <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-3 flex items-center gap-2">
//             <span className="text-blue-500">📌</span> Short Information:
//           </h2>
//           <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
//             {post.shortInformation}
//           </p>
//         </div>

//         {/* 2-COLUMN GRID (Dates & Fees) */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           {/* Important Dates */}
//           <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-800 overflow-hidden">
//             <div className="bg-blue-50 dark:bg-slate-800/50 p-4 border-b border-blue-100 dark:border-slate-700">
//               <h3 className="text-lg font-bold text-blue-800 dark:text-blue-400 flex items-center gap-2">📅 Important Dates</h3>
//             </div>
//             <div className="p-0">
//               <table className="w-full text-left text-sm text-slate-700 dark:text-slate-300">
//                 <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
//                   {post.importantDates && post.importantDates.length > 0 ? (
//                     post.importantDates.map((item: any, index: number) => (
//                       <tr key={index}>
//                         <th className="py-3 px-4 font-semibold">{item.label}</th>
//                         <td className={`py-3 px-4 ${item.label.toLowerCase().includes('last') ? 'font-bold text-red-500' : ''}`}>
//                           {formatDate(item.date)}
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan={2} className="py-3 px-4 text-center text-slate-500">Dates will be updated soon</td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>

//           {/* Application Fee */}
//           <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-800 overflow-hidden">
//             <div className="bg-emerald-50 dark:bg-slate-800/50 p-4 border-b border-emerald-100 dark:border-slate-700">
//               <h3 className="text-lg font-bold text-emerald-800 dark:text-emerald-400 flex items-center gap-2">💰 Application Fee</h3>
//             </div>
//             <div className="p-0">
//               <table className="w-full text-left text-sm text-slate-700 dark:text-slate-300">
//                 <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
//                   <tr><th className="py-3 px-4 font-semibold">General / OBC / EWS</th><td className="py-3 px-4 font-bold">₹ {post.applicationFee?.generalOBC_EWS}</td></tr>
//                   <tr><th className="py-3 px-4 font-semibold">SC / ST</th><td className="py-3 px-4 font-bold">₹ {post.applicationFee?.scST}</td></tr>
//                   <tr><th className="py-3 px-4 font-semibold">PH (Divyang)</th><td className="py-3 px-4 font-bold">₹ {post.applicationFee?.ph}</td></tr>
//                 </tbody>
//               </table>
//             </div>
//             <div className="p-4 bg-slate-50 dark:bg-slate-800/30 text-xs text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800">
//               <strong>Payment Mode:</strong> {post.applicationFee?.paymentModeText}
//             </div>
//           </div>
//         </div>
  
//         {/* ==============================================================
//             🔥 3. AGE LIMIT SECTION (FIXED FOR OBJECT DATA & FORMATTED DATE)
//             ============================================================== */}
//         {post.ageLimit && (
//           <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-800 overflow-hidden mb-8">
//             <div className="bg-orange-50 dark:bg-slate-800/50 p-4 border-b border-orange-100 dark:border-slate-700">
//               <h3 className="text-lg font-bold text-orange-800 dark:text-orange-400 flex items-center gap-2">
//                 ⏳ Age Limit Details
//               </h3>
//             </div>
//             <div className="p-4 md:p-6 text-slate-700 dark:text-slate-300">
              
//               {/* Check if ageLimit is an Object (Naye format ke liye) */}
//               {typeof post.ageLimit === 'object' ? (
//                 <div className="space-y-3 font-medium">
//                   {post.ageLimit.ageAsOn && (
//                     <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
//                       <span className="text-orange-500">📌</span> 
//                       {/* 👇 Yahan par formatDate lagaya gaya hai 👇 */}
//                       <span>Age Limit as on: <strong className="text-blue-600 dark:text-blue-400">{formatDate(post.ageLimit.ageAsOn)}</strong></span>
//                     </div>
//                   )}
//                   <div className="flex flex-col sm:flex-row sm:gap-8 gap-3">
//                     {post.ageLimit.minimumAge && (
//                       <div className="flex items-center gap-2">
//                         <span className="text-orange-500">🔹</span> 
//                         <span>Minimum Age: <strong>{post.ageLimit.minimumAge}</strong></span>
//                       </div>
//                     )}
//                     {post.ageLimit.maximumAge && (
//                       <div className="flex items-center gap-2">
//                         <span className="text-orange-500">🔹</span> 
//                         <span>Maximum Age: <strong>{post.ageLimit.maximumAge}</strong></span>
//                       </div>
//                     )}
//                   </div>
                  
//                   {post.ageLimit.extraAgeRelaxationDetails && (
//                     <div className="mt-4 p-3 bg-orange-50/50 dark:bg-slate-800/30 text-sm rounded border border-orange-100/50 dark:border-slate-700">
//                       <strong>Age Relaxation:</strong> {post.ageLimit.extraAgeRelaxationDetails}
//                     </div>
//                   )}
//                 </div>
//               ) : (
//                 <p className="whitespace-pre-wrap leading-relaxed font-medium">
//                   {post.ageLimit}
//                 </p>
//               )}

//             </div>
//           </div>
//         )}

//         {/* Vacancy Details Table */}
//         {post.vacancyDetails && post.vacancyDetails.length > 0 && (
//           <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-800 overflow-hidden">
//             <div className="bg-purple-50 dark:bg-slate-800/50 p-4 border-b border-purple-100 dark:border-slate-700 text-center">
//               <h3 className="text-xl font-bold text-purple-800 dark:text-purple-400">📊 Vacancy Details Total</h3>
//             </div>
//             <div className="overflow-x-auto">
//               <table className="w-full text-left text-sm text-slate-700 dark:text-slate-300">
//                 <thead className="bg-slate-50 dark:bg-slate-800/50">
//                   <tr>
//                     <th className="py-3 px-4 font-bold">Post Name</th>
//                     <th className="py-3 px-4 font-bold">Total Posts</th>
//                     <th className="py-3 px-4 font-bold">Eligibility Criteria</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
//                   {post.vacancyDetails.map((vacancy: any, index: number) => (
//                     <tr key={index} className="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors">
//                       <td className="py-4 px-4 font-semibold text-blue-600 dark:text-blue-400">{vacancy.postName}</td>
//                       <td className="py-4 px-4 font-bold bg-purple-50/50 dark:bg-transparent">{vacancy.totalPosts}</td>
//                       <td className="py-4 px-4">{vacancy.eligibilityCriteria}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}

//         {/* Important Links Section */}
//         {post.importantLinks && post.importantLinks.length > 0 && (
//           <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-800 overflow-hidden">
//             <div className="bg-red-50 dark:bg-slate-800/50 p-4 border-b border-red-100 dark:border-slate-700 text-center">
//               <h3 className="text-xl font-bold text-red-800 dark:text-red-400">🔗 Some Useful Important Links</h3>
//             </div>
//             <div className="p-6 space-y-4">
//               {post.importantLinks.map((link: any, index: number) => (
//                 <div key={index} className="flex flex-col sm:flex-row items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-500/50 transition-all bg-slate-50 dark:bg-slate-800/30">
//                   <span className="font-bold text-slate-700 dark:text-slate-200 mb-3 sm:mb-0 text-center sm:text-left">{link.linkTitle}</span>
//                   <a
//                     href={link.url.startsWith('http') ? link.url : `https://${link.url}`}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="w-full sm:w-auto text-center bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-2.5 px-8 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
//                   >
//                     Click Here
//                   </a>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* ==============================================================
//             🔥 1. FULL CONTENT / SEO ARTICLE SECTION
//             ============================================================== */}
//        {/* ==============================================================
//             🔥 1. FULL CONTENT / SEO ARTICLE SECTION (NOW RESPONSIVE)
//             ============================================================== */}
//         {post.fullContent && post.fullContent !== '<p><br></p>' && post.fullContent !== '<p></p>' && (
//           <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-800 overflow-hidden p-6 md:p-8 w-full max-w-full">
//             <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 border-b border-slate-100 dark:border-slate-700 pb-3">
//               📝 Detailed Selection Process & Information
//             </h2>
            
//             {/* overflow-x-auto aur break-words ensures tables and long text don't break the layout */}
//             <div className="overflow-x-auto w-full">
//               <div 
//                 className="prose prose-sm sm:prose-base lg:prose-lg max-w-none text-slate-700 dark:text-slate-300 break-words prose-tables:w-full prose-tables:overflow-x-auto prose-img:max-w-full prose-img:h-auto space-y-4"
//                 dangerouslySetInnerHTML={{ __html: post.fullContent }} 
//               />
//             </div>
//           </div>
//         )}

//         {/* ==============================================================
//             🔥 2. DYNAMIC FAQ SECTION
//             ============================================================== */}
//         {post.faqs && post.faqs.filter((f: any) => f.question && f.question.trim() !== '').length > 0 && (
//           <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-800 overflow-hidden mb-10 p-6 md:p-8">
//             <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 border-b border-slate-100 dark:border-slate-700 pb-3">
//               ❓ Frequently Asked Questions (FAQs)
//             </h2>
            
//             <div className="space-y-4">
//               {post.faqs
//                 .filter((faq: any) => faq.question && faq.question.trim() !== '') 
//                 .map((faq: any, index: number) => (
//                 <details 
//                   key={index} 
//                   className="group bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer transition-all duration-300"
//                 >
//                   <summary className="flex justify-between items-center font-semibold text-slate-800 dark:text-slate-200 p-4 focus:outline-none">
//                     {faq.question}
//                     <span className="text-slate-400 group-open:rotate-180 transition-transform duration-300">
//                       ▼
//                     </span>
//                   </summary>
//                   <div className="p-4 pt-0 text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed border-t border-slate-200 dark:border-slate-700 mt-2">
//                     {faq.answer}
//                   </div>
//                 </details>
//               ))}
//             </div>
//           </div>
//         )}

//       </div>
//     </main>
//   );
// }


import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

// Helper function date format karne ke liye (FIXED for Invalid Dates)
const formatDate = (dateString: string | null) => {
  if (!dateString) return 'Notified Soon';
  
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return dateString; 
  }
  
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
};

// Server component se data fetch karna
async function getSinglePost(slug: string) {
  try {
    const res = await fetch(`https://rojgarsafar.onrender.com/api/posts/${slug}`, { cache: 'no-store' });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
}

// =====================================================================
// 🔥 DYNAMIC SEO CODE (UNCHANGED)
// =====================================================================
export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await props.params;
  const slug = resolvedParams.slug;
  const post = await getSinglePost(slug);

  if (!post) {
   notFound();
  }

  const postTitle = post.title;

  return {
    title: `${postTitle} | Apply Online, Admit Card, Syllabus`,
    description: post.shortInformation || `Get the latest update and complete details for ${postTitle}.`,
    keywords: [postTitle, `${postTitle} 2026`, "Sarkari Naukri", "Job Safar"],
    alternates: {
      canonical: `https://www.rojgarsafar.com/post/${slug}`,
    }
  };
}
// =====================================================================

export default async function PostDetail(props: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await props.params;
  const slug = resolvedParams.slug;
  const post = await getSinglePost(slug);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <h1 className="text-3xl font-bold text-red-600">Post Not Found 😕</h1>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white font-sans pb-20 text-black">

      {/* CLASSIC HEADER SECTION - MAROON COLOR */}
      <div className="bg-[#9E0000] text-white pt-6 pb-6 px-4 border-b-4 border-black">
        <div className="max-w-5xl mx-auto text-center">
          <Link href="/" className="inline-block mb-4 px-4 py-1 border border-white hover:bg-white hover:text-[#9E0000] transition-colors text-sm font-bold">
            ← Back to Home
          </Link>
          <h1 className="text-2xl md:text-4xl font-extrabold uppercase tracking-wide leading-tight">
            {post.title}
          </h1>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="max-w-4xl mx-auto px-4 mt-6 space-y-6">

        {/* Short Information Box */}
        <div className="border-2 border-gray-400 p-4 bg-gray-50 text-center">
          <h2 className="text-xl font-bold text-[#9E0000] mb-2 underline decoration-2 underline-offset-4">
            Short Details of Notification
          </h2>
          <p className="text-gray-800 font-semibold text-sm md:text-base leading-relaxed">
            {post.shortInformation}
          </p>
        </div>

        {/* CLASSIC 2-COLUMN GRID (Dates & Fees) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Important Dates Table */}
          <div className="border-2 border-gray-400 overflow-hidden">
            <div className="bg-[#0000FF] p-2 text-center border-b-2 border-gray-400">
              <h3 className="text-lg font-bold text-white uppercase tracking-wider">Important Dates</h3>
            </div>
            <table className="w-full text-left text-sm md:text-base">
              <tbody className="divide-y divide-gray-300">
                {post.importantDates && post.importantDates.length > 0 ? (
                  post.importantDates.map((item: any, index: number) => (
                    <tr key={index}>
                      <td className="py-2 px-3 font-bold border-r border-gray-300 w-1/2 text-gray-700">{item.label} :</td>
                      <td className="py-2 px-3 font-bold text-red-600">
                        {formatDate(item.date)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={2} className="py-3 px-4 text-center text-gray-500">Dates will be updated soon</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Application Fee Table */}
          <div className="border-2 border-gray-400 overflow-hidden">
            <div className="bg-[#0000FF] p-2 text-center border-b-2 border-gray-400">
              <h3 className="text-lg font-bold text-white uppercase tracking-wider">Application Fee</h3>
            </div>
            <table className="w-full text-left text-sm md:text-base">
              <tbody className="divide-y divide-gray-300">
                <tr>
                  <td className="py-2 px-3 font-bold border-r border-gray-300 w-1/2 text-gray-700">General / OBC / EWS :</td>
                  <td className="py-2 px-3 font-bold text-red-600">₹ {post.applicationFee?.generalOBC_EWS}</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-bold border-r border-gray-300 text-gray-700">SC / ST :</td>
                  <td className="py-2 px-3 font-bold text-red-600">₹ {post.applicationFee?.scST}</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-bold border-r border-gray-300 text-gray-700">PH (Divyang) :</td>
                  <td className="py-2 px-3 font-bold text-red-600">₹ {post.applicationFee?.ph}</td>
                </tr>
              </tbody>
            </table>
            <div className="p-3 bg-gray-100 text-xs md:text-sm text-gray-800 border-t-2 border-gray-400 font-semibold text-center">
              Pay the Exam Fee Through : <span className="text-blue-700">{post.applicationFee?.paymentModeText}</span>
            </div>
          </div>
        </div>
  
        {/* AGE LIMIT SECTION */}
        {post.ageLimit && (
          <div className="border-2 border-gray-400 overflow-hidden">
            <div className="bg-[#008000] p-2 text-center border-b-2 border-gray-400">
              <h3 className="text-lg font-bold text-white uppercase tracking-wider">
                Age Limit Details
              </h3>
            </div>
            <div className="p-4 bg-white">
              {typeof post.ageLimit === 'object' ? (
                <div className="space-y-2 text-center font-bold text-gray-800">
                  {post.ageLimit.ageAsOn && (
                    <div className="pb-2 border-b border-dashed border-gray-400">
                      Age Limit as on : <span className="text-blue-700">{formatDate(post.ageLimit.ageAsOn)}</span>
                    </div>
                  )}
                  <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-10 pt-2">
                    {post.ageLimit.minimumAge && (
                      <div>Minimum Age : <span className="text-red-600">{post.ageLimit.minimumAge}</span></div>
                    )}
                    {post.ageLimit.maximumAge && (
                      <div>Maximum Age : <span className="text-red-600">{post.ageLimit.maximumAge}</span></div>
                    )}
                  </div>
                  {post.ageLimit.extraAgeRelaxationDetails && (
                    <div className="mt-4 pt-3 border-t border-dashed border-gray-400 text-sm text-gray-700">
                      Age Relaxation Extra as per Rules: <br/> <span className="text-green-700">{post.ageLimit.extraAgeRelaxationDetails}</span>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-center font-bold text-gray-800 whitespace-pre-wrap">
                  {post.ageLimit}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Vacancy Details Table */}
        {post.vacancyDetails && post.vacancyDetails.length > 0 && (
          <div className="border-2 border-gray-400 overflow-hidden">
            <div className="bg-[#008000] p-2 text-center border-b-2 border-gray-400">
              <h3 className="text-lg font-bold text-white uppercase tracking-wider">Vacancy Details Total</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-center text-sm md:text-base border-collapse">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="py-2 px-3 border border-gray-400 font-extrabold text-gray-800">Post Name</th>
                    <th className="py-2 px-3 border border-gray-400 font-extrabold text-gray-800">Total Posts</th>
                    <th className="py-2 px-3 border border-gray-400 font-extrabold text-gray-800">Eligibility Criteria</th>
                  </tr>
                </thead>
                <tbody>
                  {post.vacancyDetails.map((vacancy: any, index: number) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="py-3 px-3 border border-gray-400 font-bold text-blue-700">{vacancy.postName}</td>
                      <td className="py-3 px-3 border border-gray-400 font-bold text-red-600">{vacancy.totalPosts}</td>
                      <td className="py-3 px-3 border border-gray-400 font-semibold text-gray-700 text-left">{vacancy.eligibilityCriteria}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* FULL CONTENT / SEO ARTICLE SECTION */}
        {post.fullContent && post.fullContent !== '<p><br></p>' && post.fullContent !== '<p></p>' && (
          <div className="border-2 border-gray-400 overflow-hidden p-4 bg-white">
            <div className="overflow-x-auto w-full">
              <div 
                className="prose prose-sm sm:prose-base max-w-none text-gray-800 break-words prose-tables:w-full prose-tables:border prose-tables:border-gray-400 prose-th:border prose-th:border-gray-400 prose-td:border prose-td:border-gray-400 prose-a:text-blue-600 prose-headings:text-[#9E0000]"
                dangerouslySetInnerHTML={{ __html: post.fullContent }} 
              />
            </div>
          </div>
        )}

        {/* IMPORTANT LINKS SECTION (CLASSIC SARKARI STYLE) */}
        {post.importantLinks && post.importantLinks.length > 0 && (
          <div className="border-2 border-gray-400 overflow-hidden mb-8">
            <div className="bg-[#9E0000] p-2 text-center border-b-2 border-gray-400">
              <h3 className="text-xl font-bold text-white uppercase tracking-wider">Some Useful Important Links</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-center text-sm md:text-base border-collapse">
                <tbody>
                  {post.importantLinks.map((link: any, index: number) => (
                    <tr key={index} className="border-b border-gray-400 hover:bg-gray-100 transition-colors">
                      <td className="py-4 px-4 font-bold text-blue-800 border-r border-gray-400 w-1/2 md:w-2/3 text-left md:text-center">
                        {link.linkTitle}
                      </td>
                      <td className="py-4 px-4 font-extrabold text-center">
                        <a
                          href={link.url.startsWith('http') ? link.url : `https://${link.url}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-red-600 underline decoration-2 underline-offset-4"
                        >
                          Click Here
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}