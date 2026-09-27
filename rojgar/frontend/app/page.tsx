// 'use client';
// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import axios from 'axios';


// export default function Home() {
//   const [posts, setPosts] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState('');
//   const router = useRouter();

//   // 1. FETCH DATA FROM RENDER LIVE SERVER
//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         setLoading(true);
//         // Tumhara Cloud Backend URL
//         const RENDER_API_URL = 'https://rojgar-mduq.onrender.com/api/posts';

//         const res = await axios.get(RENDER_API_URL, {
//           timeout: 60000, // 60s wait time for Render sleep mode
//         });

//         if (res.data.success) {
//           setPosts(res.data.data);
//         }
//       } catch (error: any) {
//         console.error("Error fetching homepage posts:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPosts();
//   }, []);

//   // 2. SMART CATEGORY FILTERS (Spelling/Space mistakes ko ignore karega)
//   const results = posts.filter(p => p.category && p.category.toLowerCase().includes('result')).slice(0, 15);
//   const admitCards = posts.filter(p => p.category && p.category.toLowerCase().includes('admit')).slice(0, 15);
//   const latestJobs = posts.filter(p => p.category && p.category.toLowerCase().includes('job')).slice(0, 15);

//   // SEARCH BAR HANDLER


//   return (
//     <main className="min-h-screen bg-[#f8fafc] dark:bg-slate-950 font-sans pb-20 transition-colors duration-300">

//       {/* HERO & SEARCH SECTION */}
//       <header className="relative bg-slate-950 text-white pt-8 pb-16 text-center border-b-4 border-blue-500 overflow-hidden">
//         <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600 rounded-full mix-blend-screen filter blur-[128px] opacity-40 animate-pulse"></div>


//         <div className="relative z-10">
//           <div className="inline-block mb-3 px-4 py-1.5 rounded-full border border-slate-700 bg-slate-800/50 backdrop-blur-md text-xs font-semibold tracking-widest text-slate-300 uppercase">
//             India's No.1 Fast Job Portal
//           </div>
//           <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight">
//             Rojgar <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Safar</span>
//           </h1>
//           <p className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto font-light mb-8 px-4">
//             Stay ahead with real-time updates on government jobs, admit cards, results, and answer keys.
//           </p>

//           {/* <form onSubmit={handleSearch} className="max-w-2xl mx-auto relative px-4">
//             <input 
//               type="text" 
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               placeholder="Search jobs, admit cards, results..." 
//               className="w-full pl-6 pr-32 py-4 bg-white/10 dark:bg-slate-900/80 backdrop-blur-md border border-white/20 text-white placeholder-slate-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-2xl"
//               required
//             />
//             <button type="submit" className="absolute inset-y-1.5 right-5.5 bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 text-white font-bold px-6 rounded-full transition-all transform hover:scale-105 shadow-md">
//               Search
//             </button>
//           </form> */}
//         </div>
//       </header>

//       {/* QUICK LINKS SECTION */}
//       <div className="max-w-7xl mx-auto mt-8 px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
//         {[
//           { name: 'Answer Keys', color: 'from-orange-400 to-red-500', icon: '🔑', link: '/category/answer-key' },
//           { name: 'Syllabus', color: 'from-blue-400 to-indigo-500', icon: '📚', link: '/category/syllabus' },
//           { name: 'Admissions', color: 'from-emerald-400 to-teal-500', icon: '🎓', link: '/category/admission' },
//           { name: 'Important Links', color: 'from-pink-400 to-rose-500', icon: '⚡', link: '/category/links' }
//         ].map((btn) => (
//           <Link href={btn.link} key={btn.name} className="group relative bg-white dark:bg-slate-900 rounded-2xl shadow-sm hover:shadow-xl border border-slate-100 dark:border-slate-800 p-1 transition-all duration-300 hover:-translate-y-1.5 cursor-pointer">
//             <div className={`absolute inset-0 bg-gradient-to-br ${btn.color} opacity-0 group-hover:opacity-10 dark:group-hover:opacity-20 rounded-2xl transition-opacity duration-300`}></div>
//             <div className="py-4">
//               <div className="text-3xl mb-1 group-hover:scale-110 transition-transform duration-300">{btn.icon}</div>
//               <h3 className="font-bold text-slate-800 dark:text-slate-200 text-sm md:text-base">{btn.name}</h3>
//             </div>
//           </Link>
//         ))}
//       </div>

//       {/* MAIN 3-COLUMN CONTENT GRID */}
//       <div className="max-w-7xl mx-auto mt-12 px-4">
//         {loading ? (
//           <div className="text-center py-20">
//             <div className="inline-block w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
//             <p className="font-bold text-lg text-slate-600 dark:text-slate-400">Loading Updates from Live Server... ⏳</p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

//             {/* COLUMN 1: RESULTS */}
//             <div className="flex flex-col gap-4 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
//               <div className="flex items-center justify-between pb-3 border-b-2 border-purple-500">
//                 <h2 className="text-xl font-black text-slate-800 dark:text-white flex items-center gap-2">
//                   <span className="text-purple-500">🏆</span> Results
//                 </h2>
//                 <Link href="/category/result" className="text-xs font-bold text-purple-600 bg-purple-50 dark:bg-purple-900/30 px-3.5 py-1.5 rounded-full hover:bg-purple-100 transition-all">
//                   View All →
//                 </Link>
//               </div>
//               <div className="space-y-3">
//                 {results.length > 0 ? results.map((post: any) => (
//                   <Link href={`/post/${post.slug}`} key={post._id} className="group block bg-slate-50 dark:bg-slate-800/50 rounded-xl p-3 border border-transparent hover:border-purple-200 transition-all relative overflow-hidden">
//                     <div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
//                     <h3 className="text-slate-700 dark:text-slate-300 font-semibold text-sm line-clamp-2 pl-1">{post.title}</h3>
//                   </Link>
//                 )) : <div className="p-8 text-center text-sm font-medium text-slate-400 border border-dashed border-slate-200 rounded-xl">No recent results found.</div>}
//               </div>
//             </div>

//             {/* COLUMN 2: ADMIT CARDS */}
//             <div className="flex flex-col gap-4 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
//               <div className="flex items-center justify-between pb-3 border-b-2 border-emerald-500">
//                 <h2 className="text-xl font-black text-slate-800 dark:text-white flex items-center gap-2">
//                   <span className="text-emerald-500">🎫</span> Admit Cards
//                 </h2>
//                 <Link href="/category/admit-card" className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 px-3.5 py-1.5 rounded-full hover:bg-emerald-100 transition-all">
//                   View All →
//                 </Link>
//               </div>
//               <div className="space-y-3">
//                 {admitCards.length > 0 ? admitCards.map((post: any) => (
//                   <Link href={`/post/${post.slug}`} key={post._id} className="group block bg-slate-50 dark:bg-slate-800/50 rounded-xl p-3 border border-transparent hover:border-emerald-200 transition-all relative overflow-hidden">
//                     <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
//                     <h3 className="text-slate-700 dark:text-slate-300 font-semibold text-sm line-clamp-2 pl-1">{post.title}</h3>
//                   </Link>
//                 )) : <div className="p-8 text-center text-sm font-medium text-slate-400 border border-dashed border-slate-200 rounded-xl">No recent admit cards.</div>}
//               </div>
//             </div>

//             {/* COLUMN 3: LATEST JOBS */}
//             <div className="flex flex-col gap-4 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
//               <div className="flex items-center justify-between pb-3 border-b-2 border-blue-500">
//                 <h2 className="text-xl font-black text-slate-800 dark:text-white flex items-center gap-2">
//                   <span className="text-blue-500">💼</span> Latest Jobs
//                 </h2>
//                 <Link href="/category/latest-job" className="text-xs font-bold text-blue-600 bg-blue-50 dark:bg-blue-900/30 px-3.5 py-1.5 rounded-full hover:bg-blue-100 transition-all">
//                   View All →
//                 </Link>
//               </div>
//               <div className="space-y-3">
//                 {latestJobs.length > 0 ? latestJobs.map((post: any, i: number) => (
//                   <Link href={`/post/${post.slug}`} key={post._id} className="group block bg-slate-50 dark:bg-slate-800/50 rounded-xl p-3 border border-transparent hover:border-blue-200 transition-all relative overflow-hidden">
//                     <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
//                     <div className="flex justify-between items-start gap-2 pl-1">
//                       <h3 className="text-slate-700 dark:text-slate-300 font-semibold text-sm line-clamp-2">{post.title}</h3>
//                       {i < 3 && <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 animate-pulse">New</span>}
//                     </div>
//                   </Link>
//                 )) : <div className="p-8 text-center text-sm font-medium text-slate-400 border border-dashed border-slate-200 rounded-xl">No latest jobs found.</div>}
//               </div>
//             </div>

//           </div>
//         )}
//         {/* =========================================================
//     🔥 AD-SENSE FIX: SEO & About Section (Lamba Text)
//     ========================================================= */}
// <div className="max-w-5xl mx-auto px-4 my-12">
//   <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 md:p-8">
//     <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">
//       Welcome to Rojgar Safar: Your Trusted Job Portal
//     </h2>
//     <div className="space-y-4 text-slate-600 dark:text-slate-400 leading-relaxed text-sm md:text-base">
//       <p>
//         <strong>Rojgar Safar</strong> is India's premier educational and employment portal dedicated to providing the most accurate and timely updates on government jobs, exam syllabus, admit cards, and results. We understand the hard work and dedication required to crack competitive exams like RRB NTPC, SSC CGL, UP Police, and other state-level exams.
//       </p>
//       <p>
//         Our mission is to simplify your job search. Instead of wandering through multiple confusing websites, candidates can find exact dates, detailed selection processes, category-wise application fees, and direct apply online links—all in one place. Every post is carefully curated with step-by-step guides to ensure you never make a mistake while filling out a government application form.
//       </p>
//       <p>
//         Stay connected with us for the latest Sarkari Result and Sarkari Naukri updates. Your journey (Safar) to a successful career begins here!
//       </p>
//     </div>
//   </div>
// </div>
//       </div>
//     </main>
//   );
// }


// 'use client';
// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import axios from 'axios';

// export default function Home() {
//   const [posts, setPosts] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState('');
//   const router = useRouter();

//   // 1. FETCH DATA FROM RENDER LIVE SERVER
//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         setLoading(true);
//         // Tumhara Cloud Backend URL
//         const RENDER_API_URL = 'https://rojgar-mduq.onrender.com/api/posts';

//         const res = await axios.get(RENDER_API_URL, {
//           timeout: 60000, // 60s wait time for Render sleep mode
//         });

//         if (res.data.success) {
//           setPosts(res.data.data);
//         }
//       } catch (error: any) {
//         console.error("Error fetching homepage posts:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPosts();
//   }, []);

//   // 2. SMART CATEGORY FILTERS
//   const results = posts.filter(p => p.category && p.category.toLowerCase().includes('result')).slice(0, 15);
//   const admitCards = posts.filter(p => p.category && p.category.toLowerCase().includes('admit')).slice(0, 15);
//   const latestJobs = posts.filter(p => p.category && p.category.toLowerCase().includes('job')).slice(0, 15);

//   return (
//     <main className="min-h-screen bg-white font-sans pb-20 text-black">

//       {/* HERO & SEARCH SECTION (CLASSIC SARKARI STYLE) */}
//       <header className="bg-[#9E0000] text-white pt-8 pb-8 text-center border-b-4 border-black">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="inline-block mb-3 px-4 py-1 border-2 border-white text-xs font-bold uppercase tracking-widest">
//             India's No.1 Fast Job Portal
//           </div>
//           <h1 className="text-4xl md:text-6xl font-extrabold mb-2 tracking-wide uppercase">
//             Rojgar Safar
//           </h1>
//           <p className="text-sm md:text-base max-w-2xl mx-auto font-semibold text-gray-200">
//             Stay ahead with real-time updates on government jobs, admit cards, results, and answer keys.
//           </p>
//         </div>
//       </header>

//       {/* QUICK LINKS SECTION (FLAT BOXES) */}
//       <div className="max-w-7xl mx-auto mt-6 px-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
//         {[
//           { name: 'Answer Keys', color: 'text-red-700', link: '/category/answer-key' },
//           { name: 'Syllabus', color: 'text-blue-700', link: '/category/syllabus' },
//           { name: 'Admissions', color: 'text-[#008000]', link: '/category/admission' },
//           { name: 'Important Links', color: 'text-[#9E0000]', link: '/category/links' }
//         ].map((btn) => (
//           <Link href={btn.link} key={btn.name} className="bg-gray-100 border-2 border-gray-400 py-3 font-bold hover:bg-gray-200 transition-colors">
//             <span className={`text-lg md:text-xl uppercase font-extrabold ${btn.color}`}>{btn.name}</span>
//           </Link>
//         ))}
//       </div>

//       {/* MAIN 3-COLUMN CONTENT GRID */}
//       <div className="max-w-7xl mx-auto mt-6 px-4">
//         {loading ? (
//           <div className="text-center py-20">
//             <div className="font-bold text-xl text-red-600 mb-4 animate-pulse">Loading Updates from Live Server... ⏳</div>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

//             {/* COLUMN 1: RESULTS (MAROON) */}
//             <div className="border-2 border-gray-400 bg-white flex flex-col">
//               <div className="bg-[#9E0000] p-2 text-center border-b-2 border-gray-400">
//                 <h2 className="text-lg font-bold text-white uppercase tracking-wider">
//                   Results
//                 </h2>
//               </div>
//               <div className="flex-1 flex flex-col">
//                 {results.length > 0 ? results.map((post: any) => (
//                   <Link href={`/post/${post.slug}`} key={post._id} className="block p-3 border-b border-gray-300 hover:bg-gray-100 transition-colors text-blue-700 hover:text-red-600 font-bold text-sm md:text-base">
//                     <span className="line-clamp-2 leading-snug">» {post.title}</span>
//                   </Link>
//                 )) : <div className="p-4 text-center text-sm font-bold text-gray-500">No recent results found.</div>}
//               </div>
//               <Link href="/category/result" className="p-2 text-center bg-gray-200 border-t-2 border-gray-400 text-[#9E0000] font-extrabold hover:bg-gray-300 uppercase text-sm">
//                 View More Results
//               </Link>
//             </div>

//             {/* COLUMN 2: ADMIT CARDS (GREEN) */}
//             <div className="border-2 border-gray-400 bg-white flex flex-col">
//               <div className="bg-[#008000] p-2 text-center border-b-2 border-gray-400">
//                 <h2 className="text-lg font-bold text-white uppercase tracking-wider">
//                   Admit Cards
//                 </h2>
//               </div>
//               <div className="flex-1 flex flex-col">
//                 {admitCards.length > 0 ? admitCards.map((post: any) => (
//                   <Link href={`/post/${post.slug}`} key={post._id} className="block p-3 border-b border-gray-300 hover:bg-gray-100 transition-colors text-blue-700 hover:text-red-600 font-bold text-sm md:text-base">
//                     <span className="line-clamp-2 leading-snug">» {post.title}</span>
//                   </Link>
//                 )) : <div className="p-4 text-center text-sm font-bold text-gray-500">No recent admit cards.</div>}
//               </div>
//               <Link href="/category/admit-card" className="p-2 text-center bg-gray-200 border-t-2 border-gray-400 text-[#008000] font-extrabold hover:bg-gray-300 uppercase text-sm">
//                 View More Admit Cards
//               </Link>
//             </div>

//             {/* COLUMN 3: LATEST JOBS (BLUE) */}
//             <div className="border-2 border-gray-400 bg-white flex flex-col">
//               <div className="bg-[#0000FF] p-2 text-center border-b-2 border-gray-400">
//                 <h2 className="text-lg font-bold text-white uppercase tracking-wider">
//                   Latest Jobs
//                 </h2>
//               </div>
//               <div className="flex-1 flex flex-col">
//                 {latestJobs.length > 0 ? latestJobs.map((post: any, i: number) => (
//                   <Link href={`/post/${post.slug}`} key={post._id} className="block p-3 border-b border-gray-300 hover:bg-gray-100 transition-colors text-blue-700 hover:text-red-600 font-bold text-sm md:text-base relative pr-12">
//                     <span className="line-clamp-2 leading-snug">» {post.title}</span>
//                     {i < 3 && <span className="absolute right-2 top-3 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 animate-pulse">New</span>}
//                   </Link>
//                 )) : <div className="p-4 text-center text-sm font-bold text-gray-500">No latest jobs found.</div>}
//               </div>
//               <Link href="/category/latest-job" className="p-2 text-center bg-gray-200 border-t-2 border-gray-400 text-[#0000FF] font-extrabold hover:bg-gray-300 uppercase text-sm">
//                 View More Latest Jobs
//               </Link>
//             </div>

//           </div>
//         )}

//         {/* =========================================================
//             🔥 AD-SENSE FIX: SEO & About Section (Classic Flat Design)
//             ========================================================= */}
//         <div className="mt-8 mb-12 border-2 border-gray-400 bg-gray-50 p-6 md:p-8">
//           <h2 className="text-xl md:text-2xl font-bold text-[#9E0000] mb-4 underline decoration-2 underline-offset-4 text-center md:text-left">
//             Welcome to Rojgar Safar: Your Trusted Job Portal
//           </h2>
//           <div className="space-y-4 text-gray-800 font-semibold leading-relaxed text-sm md:text-base text-justify">
//             <p>
//               <strong>Rojgar Safar</strong> is India's premier educational and employment portal dedicated to providing the most accurate and timely updates on government jobs, exam syllabus, admit cards, and results. We understand the hard work and dedication required to crack competitive exams like RRB NTPC, SSC CGL, UP Police, and other state-level exams.
//             </p>
//             <p>
//               Our mission is to simplify your job search. Instead of wandering through multiple confusing websites, candidates can find exact dates, detailed selection processes, category-wise application fees, and direct apply online links—all in one place. Every post is carefully curated with step-by-step guides to ensure you never make a mistake while filling out a government application form.
//             </p>
//             <p className="text-center md:text-left font-extrabold text-[#0000FF] pt-2">
//               Stay connected with us for the latest Sarkari Result and Sarkari Naukri updates. Your journey (Safar) to a successful career begins here!
//             </p>
//           </div>
//         </div>
        
//       </div>
//     </main>
//   );
// }





import Link from 'next/link';

// 🔥 NEXT.JS MAGIC: SERVER SIDE FETCH WITH CACHING (ISR)
async function getPosts() {
  try {
    // 'revalidate: 60' ka matlab hai Next.js har 60 seconds me background me naya data layega,
    // par user ko hamesha turant (0 second me) cached page dikhayega.
    const res = await fetch('https://rojgar-mduq.onrender.com/api/posts', {
      next: { revalidate: 60 } 
    });
    
    if (!res.ok) return [];
    
    const json = await res.json();
    return json.success ? json.data : [];
  } catch (error) {
    console.error("Error fetching homepage posts:", error);
    return [];
  }
}

export default async function Home() {
  // Bina loading state ke direct data fetch
  const posts = await getPosts();

  // SMART CATEGORY FILTERS
  const results = posts.filter((p: any) => p.category && p.category.toLowerCase().includes('result')).slice(0, 15);
  const admitCards = posts.filter((p: any) => p.category && p.category.toLowerCase().includes('admit')).slice(0, 15);
  const latestJobs = posts.filter((p: any) => p.category && p.category.toLowerCase().includes('job')).slice(0, 15);

  return (
    <main className="min-h-screen bg-white font-sans pb-20 text-black">

      {/* HERO SECTION (CLASSIC SARKARI STYLE) */}
      <header className="bg-[#9E0000] text-white pt-8 pb-8 text-center border-b-4 border-black">
        <div className="max-w-7xl mx-auto px-4">
          <div className="inline-block mb-3 px-4 py-1 border-2 border-white text-xs font-bold uppercase tracking-widest">
            India's No.1 Fast Job Portal
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-2 tracking-wide uppercase">
            Rojgar Safar
          </h1>
          <p className="text-sm md:text-base max-w-2xl mx-auto font-semibold text-gray-200">
            Stay ahead with real-time updates on government jobs, admit cards, results, and answer keys.
          </p>
        </div>
      </header>

      {/* QUICK LINKS SECTION (FLAT BOXES) */}
      <div className="max-w-7xl mx-auto mt-6 px-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        {[
          { name: 'Answer Keys', color: 'text-red-700', link: '/category/answer-key' },
          { name: 'Syllabus', color: 'text-blue-700', link: '/category/syllabus' },
          { name: 'Admissions', color: 'text-[#008000]', link: '/category/admission' },
          { name: 'PSU Jobs', color: 'text-[#9E0000]', link: '/category/link' }
        ].map((btn) => (
          <Link href={btn.link} key={btn.name} className="bg-gray-100 border-2 border-gray-400 py-3 font-bold hover:bg-gray-200 transition-colors">
            <span className={`text-lg md:text-xl uppercase font-extrabold ${btn.color}`}>{btn.name}</span>
          </Link>
        ))}
      </div>

      {/* MAIN 3-COLUMN CONTENT GRID */}
      <div className="max-w-7xl mx-auto mt-6 px-4">
        
        {/* Yahan se Loading state hata di gayi hai kyunki server render instantly hoga */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* COLUMN 1: RESULTS (MAROON) */}
          <div className="border-2 border-gray-400 bg-white flex flex-col">
            <div className="bg-[#9E0000] p-2 text-center border-b-2 border-gray-400">
              <h2 className="text-lg font-bold text-white uppercase tracking-wider">
                Results
              </h2>
            </div>
            <div className="flex-1 flex flex-col">
              {results.length > 0 ? results.map((post: any) => (
                <Link href={`/post/${post.slug}`} key={post._id} className="block p-3 border-b border-gray-300 hover:bg-gray-100 transition-colors text-blue-700 hover:text-red-600 font-bold text-sm md:text-base">
                  <span className="line-clamp-2 leading-snug">» {post.title}</span>
                </Link>
              )) : <div className="p-4 text-center text-sm font-bold text-gray-500">No recent results found.</div>}
            </div>
            <Link href="/category/result" className="p-2 text-center bg-gray-200 border-t-2 border-gray-400 text-[#9E0000] font-extrabold hover:bg-gray-300 uppercase text-sm">
              View More Results
            </Link>
          </div>

          {/* COLUMN 2: ADMIT CARDS (GREEN) */}
          <div className="border-2 border-gray-400 bg-white flex flex-col">
            <div className="bg-[#008000] p-2 text-center border-b-2 border-gray-400">
              <h2 className="text-lg font-bold text-white uppercase tracking-wider">
                Admit Cards
              </h2>
            </div>
            <div className="flex-1 flex flex-col">
              {admitCards.length > 0 ? admitCards.map((post: any) => (
                <Link href={`/post/${post.slug}`} key={post._id} className="block p-3 border-b border-gray-300 hover:bg-gray-100 transition-colors text-blue-700 hover:text-red-600 font-bold text-sm md:text-base">
                  <span className="line-clamp-2 leading-snug">» {post.title}</span>
                </Link>
              )) : <div className="p-4 text-center text-sm font-bold text-gray-500">No recent admit cards.</div>}
            </div>
            <Link href="/category/admit-card" className="p-2 text-center bg-gray-200 border-t-2 border-gray-400 text-[#008000] font-extrabold hover:bg-gray-300 uppercase text-sm">
              View More Admit Cards
            </Link>
          </div>

          {/* COLUMN 3: LATEST JOBS (BLUE) */}
          <div className="border-2 border-gray-400 bg-white flex flex-col">
            <div className="bg-[#0000FF] p-2 text-center border-b-2 border-gray-400">
              <h2 className="text-lg font-bold text-white uppercase tracking-wider">
                Latest Jobs
              </h2>
            </div>
            <div className="flex-1 flex flex-col">
              {latestJobs.length > 0 ? latestJobs.map((post: any, i: number) => (
                <Link href={`/post/${post.slug}`} key={post._id} className="block p-3 border-b border-gray-300 hover:bg-gray-100 transition-colors text-blue-700 hover:text-red-600 font-bold text-sm md:text-base relative pr-12">
                  <span className="line-clamp-2 leading-snug">» {post.title}</span>
                  {i < 3 && <span className="absolute right-2 top-3 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 animate-pulse">New</span>}
                </Link>
              )) : <div className="p-4 text-center text-sm font-bold text-gray-500">No latest jobs found.</div>}
            </div>
            <Link href="/category/latest-job" className="p-2 text-center bg-gray-200 border-t-2 border-gray-400 text-[#0000FF] font-extrabold hover:bg-gray-300 uppercase text-sm">
              View More Latest Jobs
            </Link>
          </div>

        </div>

        {/* SEO & About Section */}
        <div className="mt-8 mb-12 border-2 border-gray-400 bg-gray-50 p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-bold text-[#9E0000] mb-4 underline decoration-2 underline-offset-4 text-center md:text-left">
            Welcome to Rojgar Safar: Your Trusted Job Portal
          </h2>
          <div className="space-y-4 text-gray-800 font-semibold leading-relaxed text-sm md:text-base text-justify">
            <p>
              <strong>Rojgar Safar</strong> is India's premier educational and employment portal dedicated to providing the most accurate and timely updates on government jobs, exam syllabus, admit cards, and results. We understand the hard work and dedication required to crack competitive exams like RRB NTPC, SSC CGL, UP Police, and other state-level exams.
            </p>
            <p>
              Our mission is to simplify your job search. Instead of wandering through multiple confusing websites, candidates can find exact dates, detailed selection processes, category-wise application fees, and direct apply online links—all in one place. Every post is carefully curated with step-by-step guides to ensure you never make a mistake while filling out a government application form.
            </p>
            <p className="text-center md:text-left font-extrabold text-[#0000FF] pt-2">
              Stay connected with us for the latest Sarkari Result and Sarkari Naukri updates. Your journey (Safar) to a successful career begins here!
            </p>
          </div>
        </div>
        
      </div>
    </main>
  );
}