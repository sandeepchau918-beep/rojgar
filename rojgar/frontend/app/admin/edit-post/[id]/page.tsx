'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import "quill/dist/quill.snow.css"; // Editor ka design

// 🔥 NAYA CODE: SSR ko false karke WordPad Import karna
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

export default function EditPost() {
  const router = useRouter();
  const params = useParams();
  const postId = params.id as string;

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
    } else {
      fetchPostData(token);
    }
  }, []);

  type FaqItem = { question: string; answer: string };
  
  // 1. FAQ & Editor ke liye State
  const [faqs, setFaqs] = useState<FaqItem[]>([{ question: "", answer: "" }]);
  const [fullContent, setFullContent] = useState(''); // 🔥 NAYA CODE: Editor ka state

  const addFaq = () => {
    setFaqs([...faqs, { question: "", answer: "" }]);
  };

  const removeFaq = (indexToRemove: number) => {
    const updatedFaqs = faqs.filter((_, index) => index !== indexToRemove);
    setFaqs(updatedFaqs);
  };

  const handleFaqChange = (index: number, field: keyof FaqItem, value: string) => {
    const updatedFaqs = [...faqs];
    updatedFaqs[index] = { ...updatedFaqs[index], [field]: value };
    setFaqs(updatedFaqs);
  };

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'Latest Job',
    shortInformation: '',
    importantDates: {
      applicationBegin: '',
      lastDateForApply: '',
      payExamFeeLastDate: '',
      examDate: '',
      admitCardAvailable: ''
    },
    applicationFee: {
      generalOBC_EWS: 0,
      scST: 0,
      ph: 0,
      paymentModeText: ''
    },
    ageLimit: {
      minimumAge: '',
      maximumAge: '',
      ageAsOn: '',
      extraAgeRelaxationDetails: ''
    },
    vacancyDetails: [{ postName: '', totalPosts: '', eligibilityCriteria: '' }],
    importantLinks: [{ linkTitle: '', url: '' }],
  });

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState('');

  // 1. PURANA POST DATA FETCH KARNA
  const fetchPostData = async (token: string) => {
    try {
      const res = await axios.get(`https://rojgar-mduq.onrender.com/api/posts/admin/${postId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.data.success) {
        const data = res.data.data;

        const formatDateForInput = (dateString: string) => {
          if (!dateString) return '';
          const d = new Date(dateString);
          return !isNaN(d.getTime()) ? d.toISOString().split('T')[0] : dateString;
        };

        if (data.importantDates && !Array.isArray(data.importantDates)) {
          const oldDates = data.importantDates;
          const newDatesArray = [];
          
          if (oldDates.applicationBegin) newDatesArray.push({ label: 'Application Begin', date: formatDateForInput(oldDates.applicationBegin) });
          if (oldDates.lastDateForApply) newDatesArray.push({ label: 'Last Date for Apply Online', date: formatDateForInput(oldDates.lastDateForApply) });
          if (oldDates.payExamFeeLastDate) newDatesArray.push({ label: 'Pay Exam Fee Last Date', date: formatDateForInput(oldDates.payExamFeeLastDate) });
          if (oldDates.examDate) newDatesArray.push({ label: 'Exam Date', date: oldDates.examDate });
          if (oldDates.admitCardAvailable) newDatesArray.push({ label: 'Admit Card Available', date: oldDates.admitCardAvailable });
          if (oldDates.resultDeclared) newDatesArray.push({ label: 'Result Declared Date', date: oldDates.resultDeclared });

          if (newDatesArray.length === 0) {
            newDatesArray.push({ label: 'Application Begin', date: '' });
            newDatesArray.push({ label: 'Last Date for Apply Online', date: '' });
          }

          data.importantDates = newDatesArray;
        }

        if (data.ageLimit) {
          data.ageLimit.ageAsOn = formatDateForInput(data.ageLimit?.ageAsOn);
        }

        // 🔥 NAYA CODE: Purana WordPad data aur FAQs load karna
        if (data.fullContent) setFullContent(data.fullContent);
        if (data.faqs && data.faqs.length > 0) setFaqs(data.faqs);

        setFormData({ ...formData, ...data });
      }
    } catch (error: any) {
      console.error("Error loading post:", error);
      setMessage('❌ Error loading post data. It might have been deleted.');
    } finally {
      setLoading(false);
    }
  };

  const handleBasicChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNestedChange = (section: string, field: string, value: any) => {
    setFormData({
      ...formData,
      [section]: { ...(formData as any)[section], [field]: value }
    });
  };

  const handleArrayChange = (section: string, index: number, field: string, value: any) => {
    const updatedArray = [...(formData[section as keyof typeof formData] as any[])];
    updatedArray[index][field] = value;
    setFormData({ ...formData, [section]: updatedArray });
  };

  const addArrayItem = (section: string, defaultObject: any) => {
    setFormData({ ...formData, [section]: [...(formData[section as keyof typeof formData] as any[]), defaultObject] });
  };

  const removeArrayItem = (section: string, index: number) => {
    const updatedArray = [...(formData[section as keyof typeof formData] as any[])];
    updatedArray.splice(index, 1);
    setFormData({ ...formData, [section]: updatedArray });
  };

  // 4. Form Update Submission
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);
    setMessage('');

    const token = localStorage.getItem('adminToken');

    try {
      setMessage('⏳ Saving Updated Post to Database...');
      let payload = JSON.parse(JSON.stringify(formData));

      // 🔥 NAYA CODE: Editor aur FAQ ka data update hone ke liye bhejna
      payload.fullContent = fullContent;
      payload.faqs = faqs;

      if (payload.importantDates.applicationBegin === '') payload.importantDates.applicationBegin = null;
      if (payload.importantDates.lastDateForApply === '') payload.importantDates.lastDateForApply = null;
      if (payload.importantDates.payExamFeeLastDate === '') payload.importantDates.payExamFeeLastDate = null;
      if (payload.ageLimit.ageAsOn === '') payload.ageLimit.ageAsOn = null;

      if (payload.ageLimit.minimumAge === '') payload.ageLimit.minimumAge = null;
      else payload.ageLimit.minimumAge = Number(payload.ageLimit.minimumAge);

      if (payload.ageLimit.maximumAge === '') payload.ageLimit.maximumAge = null;
      else payload.ageLimit.maximumAge = Number(payload.ageLimit.maximumAge);

      if (payload.applicationFee.generalOBC_EWS === '') payload.applicationFee.generalOBC_EWS = 0;
      if (payload.applicationFee.scST === '') payload.applicationFee.scST = 0;
      if (payload.applicationFee.ph === '') payload.applicationFee.ph = 0;

      payload.vacancyDetails = payload.vacancyDetails.map((item: any) => ({
        ...item,
        totalPosts: item.totalPosts === '' ? 0 : Number(item.totalPosts)
      }));

      const response = await axios.put(`https://rojgar-mduq.onrender.com/api/posts/update/${postId}`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.success) {
        setMessage('✅ Post Successfully Updated!');
        setTimeout(() => {
          router.push('/admin/dashboard');
        }, 1500);
      }
    } catch (error: any) {
      console.error("Update Error:", error);
      const serverErrorMessage = error.response?.data?.error || error.message;
      setMessage(`❌ Error: ${serverErrorMessage}`);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex justify-center items-center font-bold text-xl text-slate-700 dark:text-slate-300">Loading Post Data... ⏳</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 md:p-8 flex justify-center transition-colors duration-300">
      <div className="bg-white dark:bg-slate-900 w-full max-w-5xl p-6 md:p-8 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800">
        
        <div className="flex justify-between items-center mb-8 border-b border-slate-200 dark:border-slate-800 pb-4">
          <h1 className="text-3xl font-extrabold text-slate-800 dark:text-white flex items-center gap-2">
            ✏️ Edit Post
          </h1>
          <Link href="/admin/dashboard" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
            ← Cancel & Go Back
          </Link>
        </div>

        {message && (
          <div className={`mb-6 text-center text-lg font-semibold p-4 rounded-xl ${message.includes('✅') ? 'bg-emerald-100 text-emerald-700' : message.includes('⏳') ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleUpdate} className="space-y-8">
          
          {/* 1. BASIC INFORMATION */}
          <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <h2 className="text-xl font-bold mb-4 text-slate-800 dark:text-white">1. Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Post Title</label>
                <input type="text" name="title" value={formData.title} onChange={handleBasicChange} required className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg p-2.5 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. SSC CGL Recruitment 2026" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">URL Slug</label>
                <input type="text" name="slug" value={formData.slug} onChange={handleBasicChange} required className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg p-2.5 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. ssc-cgl-2026" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Category</label>
                <select name="category" value={formData.category} onChange={handleBasicChange} className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg p-2.5 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="Latest Job">Latest Job</option>
                  <option value="Admit Card">Admit Card</option>
                  <option value="Result">Result</option>
                  <option value="Answer Key">Answer Key</option>
                  <option value="Syllabus">Syllabus</option>
                  <option value="Admission">Admission</option>
                  <option value="Link">Link</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Short Information</label>
                <textarea name="shortInformation" value={formData.shortInformation} onChange={handleBasicChange} required rows={3} className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg p-2.5 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-blue-500" placeholder="Brief details about the post..."></textarea>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* 2. IMPORTANT DATES */}
           <div className="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-xl border border-blue-100 dark:border-blue-900/30">
            <h2 className="text-xl font-bold mb-4 text-blue-800 dark:text-blue-400 flex items-center justify-between">
              <span>📅 2. Important Dates & Event Updates</span>
            </h2>
            
            {(Array.isArray(formData.importantDates) ? formData.importantDates : []).map((item: any, index: number) => (
              <div key={index} className="flex flex-col md:flex-row gap-3 mb-3 items-end bg-white dark:bg-slate-900 p-3.5 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
                
                <div className="w-full md:w-1/2">
                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1 block">
                    Update / Event Name
                  </label>
                  <input type="text" value={item.label || ''} onChange={(e) => handleArrayChange('importantDates', index, 'label', e.target.value)} className="w-full border border-slate-300 dark:border-slate-600 bg-transparent text-slate-800 dark:text-white p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none text-sm font-semibold" required />
                </div>

                <div className="w-full md:w-1/2">
                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1 block">
                    Date / Status
                  </label>
                  <input type="text" value={item.date || ''} onChange={(e) => handleArrayChange('importantDates', index, 'date', e.target.value)} className="w-full border border-slate-300 dark:border-slate-600 bg-transparent text-slate-800 dark:text-white p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none text-sm font-bold text-blue-600 dark:text-blue-400" required />
                </div>

                {index > 0 && (
                  <button type="button" onClick={() => removeArrayItem('importantDates', index)} className="bg-red-500 hover:bg-red-600 text-white p-2 rounded px-3.5 mb-0.5 shadow-sm font-bold transition-all shrink-0">
                    X
                  </button>
                )}
              </div>
            ))}

            <button type="button" onClick={() => addArrayItem('importantDates', { label: '', date: '' })} className="text-sm font-extrabold bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg transition-all shadow-md mt-2 flex items-center gap-2">
              <span>+ Add Another Event / Update</span>
            </button>
          </div>
            
            {/* 3. APPLICATION FEES */}
            <div className="bg-emerald-50 dark:bg-emerald-900/10 p-6 rounded-xl border border-emerald-100 dark:border-emerald-900/30">
              <h2 className="text-xl font-bold mb-4 text-emerald-800 dark:text-emerald-400">3. Application Fees (₹)</h2>
              <div className="space-y-4">
                {['generalOBC_EWS', 'scST', 'ph'].map((field) => (
                  <div key={field}>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 capitalize">{field.replace(/([A-Z])/g, ' $1').trim()}</label>
                    <input type="number" min="0" value={formData.applicationFee[field as keyof typeof formData.applicationFee]} onChange={(e) => handleNestedChange('applicationFee', field, e.target.value)} className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg p-2.5 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500" />
                  </div>
                ))}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Payment Mode Text</label>
                  <input type="text" placeholder="Debit / Credit / Net Banking" value={formData.applicationFee.paymentModeText} onChange={(e) => handleNestedChange('applicationFee', 'paymentModeText', e.target.value)} className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg p-2.5 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500" />
                </div>
              </div>
            </div>
          </div>

          {/* 4. AGE LIMIT */}
          <div className="bg-orange-50 dark:bg-orange-900/10 p-6 rounded-xl border border-orange-100 dark:border-orange-900/30">
            <h2 className="text-xl font-bold mb-4 text-orange-800 dark:text-orange-400">4. Age Limit Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Minimum Age</label>
                <input type="number" value={formData.ageLimit.minimumAge} onChange={(e) => handleNestedChange('ageLimit', 'minimumAge', e.target.value)} className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg p-2.5 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-orange-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Maximum Age</label>
                <input type="number" value={formData.ageLimit.maximumAge} onChange={(e) => handleNestedChange('ageLimit', 'maximumAge', e.target.value)} className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg p-2.5 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-orange-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Age As On (Date)</label>
                <input type="date" value={formData.ageLimit.ageAsOn} onChange={(e) => handleNestedChange('ageLimit', 'ageAsOn', e.target.value)} className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg p-2.5 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-orange-500" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Extra Age Relaxation Details</label>
              <input type="text" placeholder="Age Relaxation Extra as per Recruitment Rules" value={formData.ageLimit.extraAgeRelaxationDetails} onChange={(e) => handleNestedChange('ageLimit', 'extraAgeRelaxationDetails', e.target.value)} className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg p-2.5 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-orange-500" />
            </div>
          </div>

          {/* 5. VACANCY DETAILS */}
          <div className="bg-purple-50 dark:bg-purple-900/10 p-6 rounded-xl border border-purple-100 dark:border-purple-900/30">
            <h2 className="text-xl font-bold mb-4 text-purple-800 dark:text-purple-400">5. Vacancy Details</h2>
            {formData.vacancyDetails.map((item, index) => (
              <div key={index} className="flex flex-col md:flex-row gap-3 mb-4 items-end bg-white dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                <div className="w-full">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Post Name</label>
                  <input type="text" value={item.postName} onChange={(e) => handleArrayChange('vacancyDetails', index, 'postName', e.target.value)} className="w-full border border-slate-300 dark:border-slate-600 bg-transparent text-slate-800 dark:text-white p-2 rounded focus:ring-2 focus:ring-purple-500 outline-none mt-1" />
                </div>
                <div className="w-full md:w-1/4">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Total Posts</label>
                  <input type="number" value={item.totalPosts} onChange={(e) => handleArrayChange('vacancyDetails', index, 'totalPosts', e.target.value)} className="w-full border border-slate-300 dark:border-slate-600 bg-transparent text-slate-800 dark:text-white p-2 rounded focus:ring-2 focus:ring-purple-500 outline-none mt-1" />
                </div>
                <div className="w-full">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Eligibility</label>
                  <input type="text" value={item.eligibilityCriteria} onChange={(e) => handleArrayChange('vacancyDetails', index, 'eligibilityCriteria', e.target.value)} className="w-full border border-slate-300 dark:border-slate-600 bg-transparent text-slate-800 dark:text-white p-2 rounded focus:ring-2 focus:ring-purple-500 outline-none mt-1" />
                </div>
                {index > 0 && (
                  <button type="button" onClick={() => removeArrayItem('vacancyDetails', index)} className="bg-red-500 text-white p-2.5 rounded hover:bg-red-600 px-4 mb-0.5 shadow-sm">X</button>
                )}
              </div>
            ))}
            <button type="button" onClick={() => addArrayItem('vacancyDetails', { postName: '', totalPosts: '', eligibilityCriteria: '' })} className="text-sm font-bold bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-lg transition-colors shadow-md">
              + Add Another Post
            </button>
          </div>

          {/* 6. IMPORTANT LINKS */}
          <div className="bg-rose-50 dark:bg-rose-900/10 p-6 rounded-xl border border-rose-100 dark:border-rose-900/30">
            <h2 className="text-xl font-bold mb-4 text-rose-800 dark:text-rose-400">6. Important Links</h2>
            {formData.importantLinks.map((item, index) => (
              <div key={index} className="flex flex-col md:flex-row gap-3 mb-4 items-end bg-white dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                <div className="w-full md:w-1/3">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Link Title</label>
                  <input type="text" placeholder="e.g. Apply Online" value={item.linkTitle} onChange={(e) => handleArrayChange('importantLinks', index, 'linkTitle', e.target.value)} className="w-full border border-slate-300 dark:border-slate-600 bg-transparent text-slate-800 dark:text-white p-2 rounded focus:ring-2 focus:ring-rose-500 outline-none mt-1" />
                </div>
                <div className="w-full md:w-2/3">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">URL</label>
                  <input type="text" placeholder="https://..." value={item.url} onChange={(e) => handleArrayChange('importantLinks', index, 'url', e.target.value)} className="w-full border border-slate-300 dark:border-slate-600 bg-transparent text-slate-800 dark:text-white p-2 rounded focus:ring-2 focus:ring-rose-500 outline-none mt-1" />
                </div>
                {index > 0 && (
                  <button type="button" onClick={() => removeArrayItem('importantLinks', index)} className="bg-red-500 text-white p-2.5 rounded hover:bg-red-600 px-4 mb-0.5 shadow-sm">X</button>
                )}
              </div>
            ))}
            <button type="button" onClick={() => addArrayItem('importantLinks', { linkTitle: '', url: '' })} className="text-sm font-bold bg-rose-600 hover:bg-rose-700 text-white px-5 py-2.5 rounded-lg transition-colors shadow-md">
              + Add Another Link
            </button>
          </div>

          {/* 🔥 7. DETAILED JOB DESCRIPTION (WordPad) */}
          <div className="mb-6">
            <label className="block text-slate-700 dark:text-slate-300 font-bold mb-2">
              Detailed Job Description & Selection Process (AdSense SEO)
            </label>
            <div className="bg-white">
              <ReactQuill 
                theme="snow" 
                value={fullContent} 
                onChange={setFullContent} 
                className="h-64 mb-12 text-slate-800" 
              />
            </div>
          </div>

          {/* 🔥 8. DYNAMIC FAQ SECTION */}
          <div className="mt-8 p-6 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-slate-800 dark:text-white">
                Frequently Asked Questions (FAQs)
              </h3>
              <button
                type="button"
                onClick={addFaq}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm flex items-center gap-2"
              >
                <span>+ Add New FAQ</span>
              </button>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="relative p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm">
                  <div className="flex justify-between items-start mb-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                      FAQ #{index + 1}
                    </label>
                    {faqs.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeFaq(index)}
                        className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors"
                      >
                        Delete ❌
                      </button>
                    )}
                  </div>
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Enter Question (e.g., What is the age limit?)"
                      value={faq.question}
                      onChange={(e) => handleFaqChange(index, "question", e.target.value)}
                      className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-white placeholder-slate-400"
                    />
                    <textarea
                      placeholder="Enter Answer here..."
                      value={faq.answer}
                      onChange={(e) => handleFaqChange(index, "answer", e.target.value)}
                      rows={2}
                      className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-white placeholder-slate-400"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* UPDATE BUTTON */}
          <button type="submit" disabled={updating} className={`w-full text-white font-extrabold py-4 text-xl rounded-xl transition-all shadow-lg ${updating ? 'bg-slate-400 cursor-not-allowed' : 'bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 transform hover:-translate-y-1'}`}>
            {updating ? 'Saving Updates... ⏳' : '💾 SAVE UPDATES'}
          </button>
        </form>
      </div>
    </div>
  );
}