'use client';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('https://rojgar-mduq.onrender.com/api/auth/login', { username, password });
      if (res.data.success) {
        localStorage.setItem('adminToken', res.data.token);
        router.push('/admin/dashboard');
      }
    } catch (err) {
      setError('Invalid Username or Password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-2xl w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-slate-800">Admin Login</h2>
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1 text-slate-700">Username</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full border p-2 rounded" required />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-1 text-slate-700">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border p-2 rounded" required />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700">Login</button>
      </form>
    </div>
  );
}