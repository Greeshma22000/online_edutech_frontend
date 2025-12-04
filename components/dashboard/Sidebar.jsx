"use client";
import { useRouter } from 'next/navigation';
import { setAuthToken } from '../../lib/api';

export default function Sidebar({ active, onSelect, isOpen, onToggle }) {
  const router = useRouter();
  const items = [
    { key: 'overview', label: 'Overview', icon: '🏠' },
    { key: 'courses', label: 'My Courses', icon: '📚' },
    { key: 'progress', label: 'Progress', icon: '📈' },
    { key: 'quizzes', label: 'Quizzes', icon: '🧠' },
    { key: 'certificates', label: 'Certificates', icon: '🎓' },
    { key: 'notifications', label: 'Notifications', icon: '🔔' },
    { key: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  const handleLogout = () => {
    setAuthToken(null);
    router.push('/login');
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onToggle}
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={`fixed top-0 left-0 z-50 flex flex-col min-h-screen w-64 transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ 
          background: 'linear-gradient(180deg, #0f766e 0%, #0d9488 100%)'
        }}
      >
        <div className="px-5 py-4 border-b border-teal-600/30">
          <div className="flex items-center justify-between">
            <div className="text-xl font-bold text-white">User Dashboard</div>
            <button 
              onClick={onToggle}
              className="text-white hover:bg-teal-600/20 p-2 rounded-lg transition text-xl"
              aria-label="Toggle sidebar"
            >
              ☰
            </button>
          </div>
        </div>
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {items.map((i) => (
            <button
              key={i.key}
              onClick={() => {
                onSelect?.(i.key);
                // Close sidebar on mobile after selection
                if (typeof window !== 'undefined' && window.innerWidth < 768) {
                  onToggle?.();
                }
              }}
              className={`w-full text-left px-4 py-3.5 rounded-lg transition flex items-center gap-3 text-base ${
                active === i.key
                  ? 'bg-orange-500/30 text-white font-semibold'
                  : 'text-teal-100 hover:bg-amber-600/20 text-white/90'
              }`}
            >
              <span className="text-xl">{i.icon}</span>
              <span className="font-medium">{i.label}</span>
            </button>
          ))}
        </nav>
        <div className="px-3 pb-4 border-t border-teal-600/30 pt-3">
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-3.5 rounded-lg transition flex items-center gap-3 text-base text-red-200 hover:bg-red-500/20 hover:text-red-100 font-medium"
          >
            <span className="text-xl">🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}

