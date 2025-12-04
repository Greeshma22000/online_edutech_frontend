"use client";
import { useState } from 'react';

export default function Settings({ user, onSaveProfile, onChangePassword }) {
  const [name, setName] = useState(user?.user_metadata?.name || '');
  const [password, setPassword] = useState('');

  return (
    <section>
      <div className="mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Settings</h2>
        <p className="text-lg text-gray-600 mt-2">Manage your account preferences</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <form className="relative rounded-2xl bg-white p-6 shadow-lg border border-gray-100 overflow-hidden" onSubmit={(e) => { e.preventDefault(); onSaveProfile?.({ name }); }}>
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 opacity-5 blur-2xl" />
          <div className="relative">
            <div className="text-3xl mb-4">👤</div>
            <h3 className="text-xl font-bold text-gray-900 mb-6">Profile Information</h3>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input className="w-full border border-gray-200 rounded-xl p-3.5 focus:outline-none focus:ring-2 focus:ring-brand-500 mb-6" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" />
            <button className="w-full inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-medium text-white shadow-md hover:shadow-lg transition" style={{ backgroundImage: 'linear-gradient(135deg, #f25c54 0%, #f7b267 100%)' }}>Save Changes</button>
          </div>
        </form>

        <form className="relative rounded-2xl bg-white p-6 shadow-lg border border-gray-100 overflow-hidden" onSubmit={(e) => { e.preventDefault(); onChangePassword?.({ password }); setPassword(''); }}>
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 opacity-5 blur-2xl" />
          <div className="relative">
            <div className="text-3xl mb-4">🔒</div>
            <h3 className="text-xl font-bold text-gray-900 mb-6">Change Password</h3>
            <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
            <input className="w-full border border-gray-200 rounded-xl p-3.5 focus:outline-none focus:ring-2 focus:ring-brand-500 mb-6" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter new password" />
            <button className="w-full inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-medium text-white shadow-md hover:shadow-lg transition" style={{ backgroundImage: 'linear-gradient(135deg, #f25c54 0%, #f7b267 100%)' }}>Update Password</button>
          </div>
        </form>
      </div>
    </section>
  );
}