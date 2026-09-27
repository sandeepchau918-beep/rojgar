import Link from 'next/link';

export default function TermsAndConditions() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 font-sans">
      <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 p-8 md:p-12 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 space-y-6 text-slate-700 dark:text-slate-300">
        
        <Link href="/" className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider hover:underline">
          ← Back to Homepage
        </Link>
        
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white border-b pb-4">
          📜 Terms & Conditions
        </h1>

        <div className="space-y-4 text-sm md:text-base leading-relaxed">
          <p>
            Welcome to <strong>Rojgar Safar</strong>! By accessing this website, we assume you accept these terms and conditions. Do not continue to use Rojgar Safar if you do not agree to take all of the terms and conditions stated on this page.
          </p>
          
          <h2 className="text-xl font-bold text-slate-900 dark:text-white pt-2">1. Educational Use Only</h2>
          <p>
            The content provided on this website is for educational and informational purposes only. Our goal is to help job aspirants get timely updates about competitive exams, admit cards, and results.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-white pt-2">2. No Guarantee of Job</h2>
          <p>
            Rojgar Safar is a news and information publishing portal. We do not provide jobs, nor do we conduct any recruitment examinations. Selection in any government job depends strictly on the merit and recruitment rules of the respective government body.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-white pt-2">3. Changes to Terms</h2>
          <p>
            We reserve the right to amend or update these terms and conditions at any time without any prior notice. Your continued use of the portal implies your acceptance of any such changes.
          </p>
        </div>

      </div>
    </main>
  );
}