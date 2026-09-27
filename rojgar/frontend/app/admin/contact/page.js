import Link from 'next/link';
//import ThemeToggle from '@/components/ThemeToggle';

export const metadata = {
  title: 'Contact Us | Rojgar Safar',
  description: 'Get in touch with the Rojgar Safar team.',
};

export default function ContactUs() {
  return (
    <main className="min-h-screen bg-[#f8fafc] dark:bg-slate-950 font-sans pb-20 transition-colors duration-300">
      <header className="relative bg-gradient-to-r from-teal-600 to-emerald-800 text-white pt-12 pb-24 shadow-lg">
        {/* <ThemeToggle /> */}
        <div className="text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl font-extrabold tracking-tight mb-2">📞 Contact Us</h1>
          <p className="text-teal-100 font-medium text-lg">We are here to help and answer any question you might have.</p>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 -mt-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Contact Details Card */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 p-8">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">Get In Touch</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="text-3xl">📧</div>
                <div>
                  <h3 className="font-bold text-slate-700 dark:text-slate-300">Email Address</h3>
                  <p className="text-slate-500 dark:text-slate-400 mt-1">support@rojgarsafar.com</p>
                  <p className="text-xs text-slate-400 mt-1">We try to reply within 24 hours.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="text-3xl">📍</div>
                <div>
                  <h3 className="font-bold text-slate-700 dark:text-slate-300">Office Location</h3>
                  <p className="text-slate-500 dark:text-slate-400 mt-1">New Delhi, India - 110001</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="text-3xl">🕒</div>
                <div>
                  <h3 className="font-bold text-slate-700 dark:text-slate-300">Working Hours</h3>
                  <p className="text-slate-500 dark:text-slate-400 mt-1">Monday - Friday: 9:00 AM to 6:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Message Form */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 p-8">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">Send us a Message</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Your Name</label>
                <input type="text" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-2.5 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-teal-500" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
                <input type="email" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-2.5 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-teal-500" placeholder="john@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Message</label>
                <textarea rows="4" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-2.5 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-teal-500" placeholder="How can we help you?"></textarea>
              </div>
              <button type="button" className="w-full bg-black from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-bold py-3 rounded-xl transition-all shadow-md transform hover:-translate-y-0.5">
                Send Message 
              </button>
            </form>
          </div>

        </div>

        <div className="mt-8 text-center">
          <Link href="/" className="inline-block px-6 py-2.5 bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-white font-bold rounded-full hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors">
            ← Back to Homepage
          </Link>
        </div>
      </div>
    </main>
  );
}