"use client";
import { useEffect, useState, Suspense } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Sidebar from '../dashboard/Sidebar';
import { apiFetch, setAuthToken, getAuthToken } from '../../lib/api';

function AppLayoutContent({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [user, setUser] = useState(null);
  const [active, setActive] = useState('overview');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true); // Open by default on desktop

  // Pages that should NOT have sidebar
  const noSidebarPages = ['/login', '/register', '/'];

  useEffect(() => {
    const token = getAuthToken();
    if (token) {
      apiFetch('/auth/profile')
        .then((res) => {
          setUser(res.user);
          // If user is instructor and on user routes, redirect to instructor dashboard
          if (res.user?.role === 'instructor' && !pathname?.startsWith('/instructor')) {
            window.location.href = '/instructor/dashboard';
            return;
          }
          setIsAuthenticated(true);
        })
        .catch(() => {
          setAuthToken(null);
          setIsAuthenticated(false);
        });
    } else {
      setIsAuthenticated(false);
    }
  }, [pathname]);

  useEffect(() => {
    // Map routes to sidebar active state
    if (pathname === '/dashboard' || pathname.startsWith('/dashboard')) {
      // Check for tab parameter in URL
      const tab = searchParams.get('tab');
      if (tab && ['overview', 'courses', 'progress', 'quizzes', 'certificates', 'notifications', 'settings'].includes(tab)) {
        setActive(tab);
      } else {
        setActive('overview');
      }
    } else if (pathname === '/courses' || pathname.startsWith('/courses')) {
      setActive('courses');
    } else if (pathname.startsWith('/quiz')) {
      setActive('quizzes');
    }
  }, [pathname, searchParams]);

  const showSidebar = isAuthenticated && !noSidebarPages.includes(pathname);

  if (noSidebarPages.includes(pathname)) {
    return <>{children}</>;
  }

  return (
    <main className="min-h-screen flex">
      {showSidebar && (
        <Sidebar 
          active={active} 
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
          onSelect={(key) => {
            setActive(key);
            if (key === 'overview') router.push('/dashboard');
            else if (key === 'courses') router.push('/courses');
            else if (key === 'progress') router.push('/dashboard?tab=progress');
            else if (key === 'quizzes') router.push('/dashboard?tab=quizzes');
            else if (key === 'certificates') router.push('/dashboard?tab=certificates');
            else if (key === 'notifications') router.push('/dashboard?tab=notifications');
            else if (key === 'settings') router.push('/dashboard?tab=settings');
          }} 
        />
      )}
      <div className={`flex-1 bg-gray-50 transition-all duration-300 ${showSidebar && sidebarOpen ? 'md:ml-64' : ''} ${!showSidebar ? 'max-w-6xl mx-auto w-full' : ''}`}>
        {/* Floating button to open sidebar when closed */}
        {showSidebar && !sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(true)}
            className="fixed top-4 left-4 z-40 p-3 bg-teal-600 text-white rounded-lg shadow-lg hover:bg-teal-700 transition"
            aria-label="Open sidebar"
          >
            <span className="text-xl">☰</span>
          </button>
        )}
        {children}
      </div>
    </main>
  );
}

export default function AppLayout({ children }) {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <AppLayoutContent>{children}</AppLayoutContent>
    </Suspense>
  );
}
