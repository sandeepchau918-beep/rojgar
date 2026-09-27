'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const [posts, setPosts] = useState([]);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
    } else {
      setIsAuthorized(true);
      fetchPosts();
    }
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('https://rojgar-mduq.onrender.com/api/posts');
      if (response.data.success) setPosts(response.data.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/admin/login');
  };

  const handleDelete = async (id: string, title: string) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete "${title}"?`);
    if (!confirmDelete) return;
    try {
      const token = localStorage.getItem('adminToken');
      const res = await axios.delete(`https://rojgar-mduq.onrender.com/api/posts/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success) {
        setPosts(posts.filter((p: any) => p._id !== id));
      }
    } catch (error) {
      alert('Failed to delete post.');
    }
  };

  if (!isAuthorized) return <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white font-bold text-xl">Checking Security... 🔒</div>;

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded-2xl shadow mb-8 gap-4">
          <h1 className="text-3xl font-extrabold text-slate-800">Admin Dashboard</h1>
          <div className="flex gap-4">
            <Link href="/" className="px-5 py-2.5 bg-slate-200 font-medium rounded-xl hover:bg-slate-300 transition">View Site</Link>
            <Link href="/admin/add-post" className="px-5 py-2.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition">+ Create Post</Link>
            <button onClick={handleLogout} className="px-5 py-2.5 bg-red-600 text-white font-medium rounded-xl hover:bg-red-700 transition">Logout 🚪</button>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-slate-100 text-slate-600 text-sm border-b border-slate-200">
                  <th className="p-4 font-bold">Post Title</th>
                  <th className="p-4 font-bold">Category</th>
                  <th className="p-4 font-bold">Publish Date</th>
                  <th className="p-4 font-bold text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.length > 0 ? posts.map((post: any) => (
                  <tr key={post._id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-semibold text-slate-800 max-w-xs truncate" title={post.title}>
                      {post.title}
                    </td>
                    <td className="p-4">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">
                        {post.category}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-slate-500 font-medium">
                      {/* 🔥 DATE FORMATTING HERE */}
                      {new Date(post.createdAt).toLocaleDateString('en-IN', {
                        day: '2-digit', month: 'short', year: 'numeric'
                      })}
                    </td>
                    <td className="p-4 text-center space-x-2">
                      {/* 🔥 EDIT BUTTON ADDED */}
                      <Link href={`/admin/edit-post/${post._id}`} className="inline-block p-2 text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition" title="Edit Post">
                        ✏️ Edit
                      </Link>
                      <button onClick={() => handleDelete(post._id, post.title)} className="inline-block p-2 text-red-500 bg-red-50 hover:bg-red-100 rounded-lg transition" title="Delete Post">
                        🗑️ Delete
                      </button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-slate-400">No posts available. Create your first post!</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}