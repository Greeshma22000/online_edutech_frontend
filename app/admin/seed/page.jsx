"use client";
import { useState } from 'react';
import { apiFetch } from '../../../lib/api';
import Header from '../../../components/landing/Header';
import Footer from '../../../components/landing/Footer';

export default function SeedPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSeed = async () => {
    setLoading(true);
    setResult(null);
    try {
      const data = await apiFetch('/seed/demo-data', { method: 'POST' });
      setResult({ success: true, message: `Successfully seeded ${data.courses} courses, ${data.lessons || 0} lessons, and ${data.quizzes || 0} quizzes!` });
    } catch (err) {
      setResult({ success: false, message: 'Failed to seed data: ' + err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-4">Seed Demo Data</h1>
        <p className="text-gray-600 mb-6">Click the button below to add demo courses and quizzes to your database.</p>
        <button
          onClick={handleSeed}
          disabled={loading}
          className="px-6 py-3 rounded-lg text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ backgroundImage: 'linear-gradient(135deg,#6366f1 0%, #06b6d4 100%)' }}
        >
          {loading ? 'Seeding...' : 'Seed Demo Data'}
        </button>
        {result && (
          <div className={`mt-6 p-4 rounded-lg ${result.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
            {result.message}
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}
