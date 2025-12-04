"use client";
import { useEffect, useState, Suspense } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import InstructorSidebar from '../instructor/Sidebar';
import { apiFetch, setAuthToken, getAuthToken } from '../../lib/api';

function InstructorLayoutContent({ children }) {
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
          // Check if user is instructor
          if (res.user?.role !== 'instructor') {
            // Redirect to student dashboard if not instructor
            window.location.href = '/dashboard';
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
  }, [router]);

  useEffect(() => {
    // Map routes to sidebar active state
    if (pathname === '/instructor/dashboard' || pathname.startsWith('/instructor/dashboard')) {
      // Check for tab parameter in URL
      const tab = searchParams.get('tab');
      if (tab && ['overview', 'courses', 'students', 'analytics', 'settings'].includes(tab)) {
        setActive(tab);
      } else {
        setActive('overview');
      }
    } else if (pathname === '/instructor/courses' || pathname.startsWith('/instructor/courses')) {
      setActive('courses');
    } else if (pathname.startsWith('/instructor/students')) {
      setActive('students');
    } else if (pathname.startsWith('/instructor/analytics')) {
      setActive('analytics');
    }
  }, [pathname, searchParams]);

  const showSidebar = isAuthenticated && !noSidebarPages.includes(pathname);

  if (noSidebarPages.includes(pathname)) {
    return <>{children}</>;
  }

  return (
    <main className="min-h-screen flex">
      {showSidebar && (
        <InstructorSidebar 
          active={active} 
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
          onSelect={(key) => {
            setActive(key);
            if (key === 'overview') router.push('/instructor/dashboard');
            else if (key === 'courses') router.push('/instructor/dashboard?tab=courses');
            else if (key === 'students') router.push('/instructor/dashboard?tab=students');
            else if (key === 'analytics') router.push('/instructor/dashboard?tab=analytics');
            else if (key === 'settings') router.push('/instructor/dashboard?tab=settings');
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

export default function InstructorLayout({ children }) {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <InstructorLayoutContent>{children}</InstructorLayoutContent>
    </Suspense>
  );
}