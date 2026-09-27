import Link from 'next/link';

export default function Disclaimer() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 font-sans">
      <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 p-8 md:p-12 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 space-y-6 text-slate-700 dark:text-slate-300">
        
        <Link href="/" className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider hover:underline">
          ← Back to Homepage
        </Link>
        
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white border-b pb-4">
          ⚠️ Disclaimer
        </h1>

        <div className="space-y-4 text-sm md:text-base leading-relaxed">
          <p>
            <strong>Rojgar Safar (rojgarsafar.com)</strong> is an independent educational and informative job portal. 
            <span className="text-red-600 dark:text-red-400 font-bold"> We are NOT associated, affiliated, or related to any Government Organization, Department, or Ministry of India or any State Government in any way.</span>
          </p>
          
          <h2 className="text-xl font-bold text-slate-900 dark:text-white pt-2">1. Accuracy of Information</h2>
          <p>
            All information provided on this website is collected from various official government websites, newspapers, and employment news portals. While we strive to ensure 100% accuracy, inadvertent typing errors, human errors, or technical glitches may occur.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-white pt-2">2. Verification Requirement</h2>
          <p>
            We strictly advise all users and job aspirants to verify the recruitment details, eligibility criteria, fee, and important dates from the <strong>Official Notification PDF</strong> and the <strong>Official Website</strong> of the respective recruiting department before submitting any application or paying any fees.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-white pt-2">3. No Liability</h2>
          <p>
            Rojgar Safar, its owners, and authors shall not be held responsible or liable for any financial loss, career loss, or legal dispute arising from the use of information published on this website.
          </p>
        </div>

      </div>
    </main>
  );
}