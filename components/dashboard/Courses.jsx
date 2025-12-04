"use client";
import { useRouter } from 'next/navigation';
import ProgressBar from './ProgressBar';

export default function Courses({ courses = [], allCourses = [] }) {
  const router = useRouter();
  
  // Separate enrolled courses (with progress) from all courses
  const enrolledCourses = courses.filter(c => (c.progress || 0) > 0 || c.enrolled);
  const enrolledCourseIds = new Set(enrolledCourses.map(c => c.id || c.title || String(c.id)));
  
  // Recommended courses are courses not enrolled in
  // Use allCourses if available, otherwise use courses that aren't enrolled
  const allAvailableCourses = allCourses.length > 0 ? allCourses : courses;
  
  // Get recommended courses - courses that are NOT in enrolled courses
  const recommendedCourses = allAvailableCourses
    .filter(c => {
      const courseId = c.id || c.title || String(c.id);
      return !enrolledCourseIds.has(courseId);
    })
    .slice(0, 6);
  
  // If no enrolled courses, show all available courses as recommendations
  // If enrolled courses exist, show only non-enrolled courses
  const shouldShowRecommended = allAvailableCourses.length > 0;
  const finalRecommendedCourses = enrolledCourses.length === 0 
    ? allAvailableCourses.slice(0, 6) 
    : recommendedCourses;

  return (
    <section>
      {/* My Enrolled Courses */}
      <div className="mb-12">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">My Courses</h2>
          <p className="text-lg text-gray-600 mt-2">Continue your learning journey</p>
        </div>
        {enrolledCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourses.map((c) => (
              <div key={c.id} className="group relative rounded-2xl bg-white p-6 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col">
                <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-gradient-to-br from-brand-500 to-accent-500 opacity-5 blur-xl" />
                <div className="relative flex-1">
                  <div className="text-3xl mb-3">📖</div>
                  <div className="text-xl font-bold text-gray-900 mb-2">{c.title}</div>
                  <div className="text-sm text-gray-600 mb-4 flex-1 line-clamp-3">{c.description}</div>
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-gray-600">Progress</span>
                      <span className="text-xs font-bold text-gray-900">{c.progress || 0}%</span>
                    </div>
                    <ProgressBar value={c.progress || 0} />
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className={`text-xs font-medium px-3 py-1.5 rounded-full ${c.completed ? 'bg-amber-100 text-amber-500' : 'bg-brand-100 text-brand-700'}`}>{c.completed ? '✓ Completed' : '⏳ In progress'}</span>
                    <button 
                      onClick={() => router.push(`/courses/${c.id}`)}
                      className="inline-flex items-center rounded-lg px-4 py-2 text-sm font-medium text-white shadow-md hover:shadow-lg transition" 
                      style={{ backgroundImage: 'linear-gradient(135deg,#6366f1 0%, #06b6d4 100%)' }}
                    >
                      Continue →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 rounded-2xl border bg-white">
            <div className="text-5xl mb-4">📚</div>
            <p className="text-gray-600 mb-4">You haven't enrolled in any courses yet.</p>
            <button 
              onClick={() => router.push('/courses')}
              className="px-6 py-3 rounded-lg text-white font-medium shadow-md hover:shadow-lg transition"
              style={{ backgroundImage: 'linear-gradient(135deg,#6366f1 0%, #06b6d4 100%)' }}
            >
              Browse Courses →
            </button>
          </div>
        )}
      </div>

      {/* Recommended Courses */}
      {shouldShowRecommended && finalRecommendedCourses.length > 0 && (
        <div className="mt-12">
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Recommended Courses</h2>
            <p className="text-lg text-gray-600 mt-2">Discover new courses to expand your skills</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {finalRecommendedCourses.map((c) => (
              <div key={c.id || c.title} className="group relative rounded-2xl bg-white p-6 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col">
                <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 opacity-5 blur-xl" />
                <div className="relative flex-1">
                  <div className="text-3xl mb-3">⭐</div>
                  <div className="text-xl font-bold text-gray-900 mb-2">{c.title}</div>
                  <div className="text-sm text-gray-600 mb-4 flex-1 line-clamp-3">{c.description}</div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-xs font-medium px-3 py-1.5 rounded-full ${c.is_premium ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                      {c.is_premium ? '💰 Premium' : '🆓 Free'}
                    </span>
                    {c.is_premium && c.price && (
                      <span className="text-sm font-semibold text-gray-900">${c.price}</span>
                    )}
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-xs text-gray-500">New Course</span>
                    <button 
                      onClick={() => router.push(`/courses/${c.id}`)}
                      className="inline-flex items-center rounded-lg px-4 py-2 text-sm font-medium text-white shadow-md hover:shadow-lg transition" 
                      style={{ backgroundImage: 'linear-gradient(135deg,#6366f1 0%, #06b6d4 100%)' }}
                    >
                      View Course →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}