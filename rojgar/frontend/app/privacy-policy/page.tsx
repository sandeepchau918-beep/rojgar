import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 font-sans">
      <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 p-8 md:p-12 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 space-y-6 text-slate-700 dark:text-slate-300">
        
        <Link href="/" className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider hover:underline">
          ← Back to Homepage
        </Link>
        
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white border-b pb-4">
          🔒 Privacy Policy
        </h1>

        <div className="space-y-4 text-sm md:text-base leading-relaxed">
          <p>
            At <strong>Rojgar Safar</strong>, accessible from our website, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Rojgar Safar and how we use it.
          </p>
          
          <h2 className="text-xl font-bold text-slate-900 dark:text-white pt-2">1. Information We Collect</h2>
          <p>
            We do not collect any personal information (like Aadhar card, bank details, or passwords) from our users. When you visit our website, we may collect basic non-personal information such as browser type, operating system, IP address, and pages visited, strictly to improve user experience and website speed.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-white pt-2">2. Google DoubleClick DART Cookie & AdSense</h2>
          <p>
            Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to our website and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL – <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline">https://policies.google.com/technologies/ads</a>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-white pt-2">3. External Links</h2>
          <p>
            Our website contains links to external official government websites for online applications, admit cards, and results. Once you click on these third-party links, you will leave our website. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-white pt-2">4. Consent</h2>
          <p>
            By using our website, you hereby consent to our Privacy Policy and agree to its Terms and Conditions.
          </p>

          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500">
            Last Updated: {new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
          </div>
        </div>

      </div>
    </main>
  );
}