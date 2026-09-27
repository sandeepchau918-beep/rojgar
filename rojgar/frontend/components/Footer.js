import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t-4 border-blue-600 pt-12 pb-8 text-sm font-sans">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-center md:text-left">
        
        {/* COL 1: ABOUT */}
        <div className="md:col-span-1">
          <h2 className="text-xl font-extrabold text-white mb-3 tracking-tight">
            Rojgar <span className="text-blue-500">Safar</span>
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            India's most trusted fast job update portal. We provide real-time updates on government jobs, results, admit cards, and answer keys.
          </p>
        </div>

        {/* COL 2: QUICK LINKS */}
        <div>
          <h3 className="text-white font-bold mb-3 uppercase tracking-wider text-xs">Quick Links</h3>
          <ul className="space-y-2 text-xs font-medium">
            <li><Link href="/" className="hover:text-blue-400 transition">Home</Link></li>
            <li><Link href="/category/latest-job" className="hover:text-blue-400 transition">Latest Jobs</Link></li>
            <li><Link href="/category/result" className="hover:text-blue-400 transition">Results</Link></li>
            <li><Link href="/category/admit-card" className="hover:text-blue-400 transition">Admit Cards</Link></li>
          </ul>
        </div>

        {/* COL 3: GOOGLE REQUIREMENT PAGES (LEGAL) 🔥 */}
        <div>
          <h3 className="text-white font-bold mb-3 uppercase tracking-wider text-xs">Legal & Policy</h3>
          <ul className="space-y-2 text-xs font-medium">
            <li><Link href="/privacy-policy" className="hover:text-blue-400 transition">Privacy Policy</Link></li>
            <li><Link href="/disclaimer" className="hover:text-blue-400 transition">Disclaimer</Link></li>
            <li><Link href="/terms" className="hover:text-blue-400 transition">Terms & Conditions</Link></li>
            <li><Link href="/contact" className="hover:text-blue-400 transition">Contact Us</Link></li>
          </ul>
        </div>

        {/* COL 4: DISCLAIMER ALERT */}
        <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 text-xs text-slate-400 text-left">
          <p className="font-bold text-red-400 mb-1">⚠️ Important Note:</p>
          <p className="leading-relaxed">
            Rojgar Safar is NOT a government website or affiliated with any government organization. Please verify all details from official notifications before applying.
          </p>
        </div>

      </div>

      {/* COPYRIGHT BOTTOM BAR */}
      <div className="max-w-7xl mx-auto px-4 border-t border-slate-900 pt-6 text-center text-xs text-slate-500 flex flex-col sm:flex-row justify-between items-center gap-2">
        <p>© {new Date().getFullYear()} Rojgar Safar. All rights reserved.</p>
        <p>Designed with ❤️ for India's Students</p>
      </div>
    </footer>
  );
}