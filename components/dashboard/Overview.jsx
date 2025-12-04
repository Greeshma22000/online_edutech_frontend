"use client";
import { useRouter } from 'next/navigation';

export default function Overview({ user, stats, onNavigate }) {
  const router = useRouter();
  const quickActions = [
    { title: 'Browse Courses', desc: 'Explore new courses', icon: '📚', action: () => router.push('/courses') },
    { title: 'My Progress', desc: 'Track your learning', icon: '📈', action: () => onNavigate?.('progress') },
    { title: 'Take Quiz', desc: 'Test your knowledge', icon: '🧠', action: () => onNavigate?.('quizzes') },
    { title: 'Certificates', desc: 'View achievements', icon: '🎓', action: () => onNavigate?.('certificates') },
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
                  Welcome back, <span className="text-brand-600">{user?.user_metadata?.name || user?.email?.split('@')[0]}</span>
                </h2>
              </div>
              <p className="text-base text-gray-600 ml-9">Here's a quick look at your learning journey.</p>
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
        {/* Active Learning Card */}
        <div className="rounded-2xl bg-white shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-yellow-50 to-amber-50 px-6 py-4 border-b border-yellow-100">
            <div className="flex items-center gap-3">
              <div className="text-2xl">📖</div>
              <div className="font-bold text-gray-900">Active Learning</div>
            </div>
          </div>
          <div className="p-6">
            <div className="text-center py-8">
              <div className="text-5xl mb-4">🎯</div>
              <div className="text-lg text-gray-700 mb-2">No active course right now</div>
              <div className="text-sm text-gray-600 mb-6">Ready to start your next learning journey?</div>
              <a href="/courses" className="inline-flex items-center justify-center rounded-xl px-6 py-3 bg-gray-900 text-white font-medium hover:bg-gray-800 transition">
                Browse Courses
              </a>
            </div>
            <div className="mt-6 space-y-3 pt-6 border-t border-gray-100">
              <div className="flex items-center gap-3">
                <div className="text-xl">📚</div>
                <div className="text-sm text-gray-700"><span className="font-semibold">Enrolled:</span> {stats.enrolled || 0} courses</div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-xl">✅</div>
                <div className="text-sm text-gray-700"><span className="font-semibold">Completed:</span> {stats.completed || 0} courses</div>
              </div>
            </div>
            {stats.completed > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="text-xs text-gray-500">Last completed</div>
                <div className="text-sm font-medium text-gray-900 mt-1">TypeScript Deep Dive • 100%</div>
              </div>
            )}
          </div>
        </div>

        {/* Stats Preview Card */}
        <div className="rounded-2xl bg-white shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 px-6 py-4 border-b border-blue-100">
            <div className="flex items-center gap-3">
              <div className="text-2xl">📊</div>
              <div className="font-bold text-gray-900">Learning Stats</div>
            </div>
          </div>
          <div className="p-6">
            {/* Progress Circle Visualization */}
            <div className="relative mb-6">
              <div className="aspect-square max-w-48 mx-auto rounded-full bg-gradient-to-br from-brand-100 to-accent-100 border-4 border-gray-200 grid place-items-center">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">{Math.round((stats.completed || 0) / Math.max(stats.enrolled || 1, 1) * 100)}%</div>
                  <div className="text-xs text-gray-600 mt-1">Completion Rate</div>
                </div>
              </div>
              {/* Progress ring */}
              <div className="absolute inset-0 max-w-48 mx-auto rounded-full border-4 border-transparent border-t-brand-500 border-r-accent-500" style={{ 
                transform: `rotate(${Math.round((stats.completed || 0) / Math.max(stats.enrolled || 1, 1) * 360)}deg)`,
                transition: 'transform 0.5s ease'
              }}></div>
            </div>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center p-4 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200">
                <div className="text-2xl font-bold text-blue-700">{stats.totalScore || 0}%</div>
                <div className="text-xs text-gray-600 mt-1 font-medium">Avg Quiz Score</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200">
                <div className="text-2xl font-bold text-emerald-700">{stats.certificates || 0}</div>
                <div className="text-xs text-gray-600 mt-1 font-medium">Certificates</div>
              </div>
            </div>
            
            {/* Additional Stats */}
            <div className="mt-4 pt-4 border-t border-gray-100 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="text-lg">⏱️</div>
                  <div className="text-sm text-gray-700">Hours Studied</div>
                </div>
                <div className="text-sm font-bold text-gray-900">{Math.round((stats.enrolled || 0) * 2.5)}h</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="text-lg">📝</div>
                  <div className="text-sm text-gray-700">Lessons Completed</div>
                </div>
                <div className="text-sm font-bold text-gray-900">{Math.round((stats.completed || 0) * 3 + (stats.enrolled || 0) * 1.5)}</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="text-lg">🔥</div>
                  <div className="text-sm text-gray-700">Current Streak</div>
                </div>
                <div className="text-sm font-bold text-gray-900">{stats.enrolled > 0 ? '3 days' : '0 days'}</div>
              </div>
            </div>
            
            {/* View Full Stats Button */}
            <button
              onClick={() => onNavigate?.('progress')}
              className="mt-4 w-full px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-accent-500 text-white font-medium hover:from-brand-600 hover:to-accent-600 transition shadow-md hover:shadow-lg"
            >
              View Full Stats →
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

      {/* Promotional Banner */}
      <div className="mt-8 rounded-2xl bg-gradient-to-r from-brand-50 to-accent-50 border border-brand-100 p-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="font-bold text-gray-900 text-lg mb-1">Limited-time offer</div>
            <div className="text-sm text-gray-700">Use code LEARN20 to get 20% off premium courses.</div>
          </div>
          <button 
            onClick={() => alert('Promo code LEARN20 applied! 20% discount will be applied at checkout.')}
            className="px-6 py-2.5 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition"
          >
            Apply now
          </button>
        </div>
      </div>
    </section>
  );
}

