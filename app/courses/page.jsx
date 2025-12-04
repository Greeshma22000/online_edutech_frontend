"use client";
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { apiFetch } from '../../lib/api';

function CoursesContent() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const query = searchParams.get('search') || '';
    setSearchQuery(query);
    apiFetch('/courses')
      .then((data) => {
        setCourses(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [searchParams]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/courses?search=${encodeURIComponent(searchQuery)}`);
    } else {
      router.push('/courses');
    }
  };

  const filteredCourses = searchQuery
    ? courses.filter(c =>
        c.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.description?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : courses;

  return (
    <div className="px-6 py-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">All Courses</h1>
        <p className="text-gray-600 mb-6">Explore our collection of courses</p>
        <form onSubmit={handleSearch} className="mb-8">
          <div className="relative max-w-2xl">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search courses by title or description..."
              className="w-full px-4 py-3 pl-12 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent bg-white shadow-sm"
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</div>
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 rounded-lg text-sm font-medium text-white hover:opacity-90 transition"
              style={{ backgroundImage: 'linear-gradient(135deg, #f25c54 0%, #f7b267 100%)' }}
            >
              Search
            </button>
          </div>
        </form>
        {loading ? (
          <div className="text-center py-12">Loading courses...</div>
        ) : filteredCourses.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">📚</div>
            <p className="text-gray-600">No courses found{searchQuery && ` for "${searchQuery}"`}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((c) => (
              <div key={c.id} className="rounded-2xl border bg-white p-5 shadow-sm hover:shadow-lg transition">
                <div className="text-3xl mb-3">📖</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{c.title}</h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">{c.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-xs px-2 py-1 rounded-full ${c.is_premium ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                    {c.is_premium ? '💰 Premium' : '🆓 Free'}
                  </span>
                  {c.is_premium && <span className="text-sm font-semibold text-gray-900">${c.price}</span>}
                </div>
                <a href={`/courses/${c.id}`} className="inline-flex items-center rounded-lg px-4 py-2 text-sm font-medium text-white w-full justify-center" style={{ backgroundImage: 'linear-gradient(135deg,#6366f1 0%, #06b6d4 100%)' }}>View Course →</a>
              </div>
            ))}
          </div>
        )}
    </div>
  );
}

export default function CoursesPage() {
  return (
    <Suspense fallback={<div className="px-6 py-10"><div className="text-center py-12">Loading...</div></div>}>
      <CoursesContent />
    </Suspense>
  );
}
