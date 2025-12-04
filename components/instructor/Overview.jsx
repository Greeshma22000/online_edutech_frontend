"use client";
import { useRouter } from 'next/navigation';

export default function InstructorOverview({ user, stats, onNavigate }) {
  const router = useRouter();
  const quickActions = [
    { title: 'Create Course', desc: 'Add a new course', icon: '➕', action: () => onNavigate?.('courses') },
    { title: 'My Courses', desc: 'Manage your courses', icon: '📚', action: () => onNavigate?.('courses') },
    { title: 'View Students', desc: 'See enrolled students', icon: '👥', action: () => onNavigate?.('students') },
    { title: 'Analytics', desc: 'View performance', icon: '📊', action: () => onNavigate?.('analytics') },
  ];
  
  return (
    <section className="space-y-8">
      {/* Header */}
      <div className="relative rounded-2xl bg-gradient-to-r from-white via-gray-50 to-white border border-gray-200 shadow-sm p-6 md:p-8 overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-gradient-to-br from-brand-500/5 to-accent-500/5 blur-3xl" />
        <div className="relative">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="text-2xl">👋</div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                  Welcome back, <span className="text-brand-600">{user?.name || user?.email?.split('@')[0]}</span>
                </h2>
              </div>
              <p className="text-base text-gray-600 ml-9">Here's a quick look at your instructor dashboard.</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100">
                <div className="text-sm font-medium text-gray-700">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section - Two Large Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Teaching Card */}
        <div className="rounded-2xl bg-white shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-yellow-50 to-amber-50 px-6 py-4 border-b border-yellow-100">
            <div className="flex items-center gap-3">
              <div className="text-2xl">📖</div>
              <div className="font-bold text-gray-900">Active Teaching</div>
            </div>
          </div>
          <div className="p-6">
            <div className="text-center py-8">
              <div className="text-5xl mb-4">🎯</div>
              <div className="text-lg text-gray-700 mb-2">You have {stats?.courses || 0} courses</div>
              <div className="text-sm text-gray-600 mb-6">Ready to create your next course?</div>
              <button 
                onClick={() => onNavigate?.('courses')}
                className="inline-flex items-center justify-center rounded-xl px-6 py-3 bg-gray-900 text-white font-medium hover:bg-gray-800 transition"
              >
                Create Course
              </button>
            </div>
            <div className="mt-6 space-y-3 pt-6 border-t border-gray-100">
              <div className="flex items-center gap-3">
                <div className="text-xl">📚</div>
                <div className="text-sm text-gray-700"><span className="font-semibold">Total Courses:</span> {stats?.courses || 0}</div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-xl">👥</div>
                <div className="text-sm text-gray-700"><span className="font-semibold">Total Students:</span> {stats?.students || 0}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Preview Card */}
        <div className="rounded-2xl bg-white shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 px-6 py-4 border-b border-blue-100">
            <div className="flex items-center gap-3">
              <div className="text-2xl">📊</div>
              <div className="font-bold text-gray-900">Teaching Stats</div>
            </div>
          </div>
          <div className="p-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center p-4 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200">
                <div className="text-2xl font-bold text-blue-700">{stats?.courses || 0}</div>
                <div className="text-xs text-gray-600 mt-1 font-medium">Total Courses</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200">
                <div className="text-2xl font-bold text-emerald-700">{stats?.students || 0}</div>
                <div className="text-xs text-gray-600 mt-1 font-medium">Total Students</div>
              </div>
            </div>
            
            {/* Additional Stats */}
            <div className="mt-4 pt-4 border-t border-gray-100 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="text-lg">📈</div>
                  <div className="text-sm text-gray-700">Avg Rating</div>
                </div>
                <div className="text-sm font-bold text-gray-900">{stats?.avgRating || '4.8'}/5.0</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="text-lg">💰</div>
                  <div className="text-sm text-gray-700">Total Revenue</div>
                </div>
                <div className="text-sm font-bold text-gray-900">${stats?.revenue || '0'}</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="text-lg">📝</div>
                  <div className="text-sm text-gray-700">Lessons Created</div>
                </div>
                <div className="text-sm font-bold text-gray-900">{stats?.lessons || 0}</div>
              </div>
            </div>
            
            {/* View Full Stats Button */}
            <button
              onClick={() => onNavigate?.('analytics')}
              className="mt-4 w-full px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-accent-500 text-white font-medium hover:from-brand-600 hover:to-accent-600 transition shadow-md hover:shadow-lg"
            >
              View Full Analytics →
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions Section */}
      <div className="mt-12">
        <div className="flex items-center gap-2 mb-6">
          <div className="text-2xl">⚡</div>
          <h3 className="text-2xl font-bold text-gray-900">Quick Actions</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <button
              key={action.title}
              onClick={action.action}
              className="group rounded-2xl bg-white p-5 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 text-left w-full"
            >
              <div className="text-3xl mb-3">{action.icon}</div>
              <div className="font-bold text-gray-900 mb-1">{action.title}</div>
              <div className="text-sm text-gray-600">{action.desc}</div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}