import Link from 'next/link';

export default function ContactUs() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 font-sans">
      <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 p-8 md:p-12 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 space-y-8 text-slate-700 dark:text-slate-300">
        
        <Link href="/" className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider hover:underline">
          ← Back to Homepage
        </Link>
        
        <div className="border-b pb-4 border-slate-100 dark:border-slate-800">
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            📬 Contact Us
          </h1>
          <p className="text-slate-500 text-sm mt-1">Have questions, feedback, or need to report an error? Reach out to us!</p>
        </div>

        {/* CONTACT BOX */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-xl border border-blue-100 dark:border-blue-900/30 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-blue-900 dark:text-blue-300 mb-2">Email Support ✉️</h3>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 mb-4">
                For general queries, advertisement proposals, or correction requests in any job post, email us directly.
              </p>
            </div>
            <a 
              href="mailto:support@rojgarsafar.com" 
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2.5 rounded-lg text-center text-sm transition shadow-md"
            >
              support@rojgarsafar.com
            </a>
          </div>

          <div className="bg-emerald-50 dark:bg-emerald-900/10 p-6 rounded-xl border border-emerald-100 dark:border-emerald-900/30 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-emerald-900 dark:text-emerald-300 mb-2">Official Telegram / Social 📢</h3>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 mb-4">
                Join our Telegram channel for instant job alerts, admit card updates, and answer key PDFs directly on your phone.
              </p>
            </div>
            {/* 🔥 FIX: onClick hata kar normal link laga diya jisse Server Component me crash na ho! */}
            <a 
              href="https://t.me/rojgarsafar" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2.5 rounded-lg text-center text-sm transition shadow-md"
            >
              Join Telegram Channel →
            </a>
          </div>
        </div>

        {/* FREQUENTLY ASKED QUESTIONS */}
        <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Frequently Asked Questions (FAQs)</h2>
          
          <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
            <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm">Q. How fast do you update exam results?</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">We track government portals 24/7 and usually update results and admit cards within minutes of the official release.</p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
            <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm">Q. Can I apply for jobs directly on Rojgar Safar?</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">No, we provide direct links to the official government recruitment portals. You must complete your application and fee payment on the official website only.</p>
          </div>
        </div>

      </div>
    </main>
  );
}