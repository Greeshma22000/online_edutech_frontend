"use client";
import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { apiFetch, setAuthToken } from '../../../lib/api';
import InstructorOverview from '../../../components/instructor/Overview';
import InstructorCourses from '../../../components/instructor/Courses';
import InstructorStudents from '../../../components/instructor/Students';
import InstructorAnalytics from '../../../components/instructor/Analytics';
import InstructorSettings from '../../../components/instructor/Settings';

function InstructorDashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [user, setUser] = useState(null);
  const [active, setActive] = useState('overview');
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch('/auth/profile')
      .then((res) => {
        if (res.user?.role !== 'instructor') {
          router.push('/dashboard');
          return;
        }
        setUser(res.user);
        setLoading(false);
      })
      .catch(() => {
        setAuthToken(null);
        router.replace('/login');
      });
  }, [router]);

  useEffect(() => {
    // Fetch instructor's courses
    if (user?.id) {
      apiFetch('/courses')
        .then((data) => {
          // Filter courses by instructor_id
          const instructorCourses = data.filter(c => c.instructor_id === user.id);
          setCourses(instructorCourses);
        })
        .catch(() => {
          setCourses([]);
        });
    }
  }, [user?.id]);

  // Handle tab from URL - sync with searchParams
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && ['overview', 'courses', 'students', 'analytics', 'settings'].includes(tab)) {
      setActive(tab);
    } else {
      setActive('overview');
    }
  }, [searchParams]);

  if (loading) {
    return (
      <div className="px-6 py-10">
        <div className="text-center py-12">Loading...</div>
      </div>
    );
  }

  // Calculate stats
  const stats = {
    courses: courses.length,
    students: 0, // Would need to fetch from enrollments
    avgRating: '4.8',
    revenue: '0',
    lessons: 0, // Would need to fetch from lessons
  };

  return (
    <>
      <div className="px-6 py-6">
        {active === 'overview' && <InstructorOverview user={user} stats={stats} onNavigate={(key) => {
          setActive(key);
          router.push(`/instructor/dashboard?tab=${key}`);
        }} />}
        {active === 'courses' && <InstructorCourses />}
        {active === 'students' && <InstructorStudents />}
        {active === 'analytics' && <InstructorAnalytics />}
        {active === 'settings' && <InstructorSettings user={user} />}
      </div>
    </>
  );
}

export default function InstructorDashboardPage() {
  return (
    <Suspense fallback={<div className="px-6 py-10"><div className="text-center py-12">Loading...</div></div>}>
      <InstructorDashboardContent />
    </Suspense>
  );
}
