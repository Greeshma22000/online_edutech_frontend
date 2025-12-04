"use client";
import Overview from '../../components/dashboard/Overview';
import Courses from '../../components/dashboard/Courses';
import Progress from '../../components/dashboard/Progress';
import Quizzes from '../../components/dashboard/Quizzes';
import Certificates from '../../components/dashboard/Certificates';
import Notifications from '../../components/dashboard/Notifications';
import Settings from '../../components/dashboard/Settings';
import SearchBar from '../../components/dashboard/SearchBar';
import { useEffect, useState, Suspense } from 'react';
import { apiFetch, setAuthToken } from '../../lib/api';
import { useRouter, useSearchParams } from 'next/navigation';

function DashboardContent() {
  const [user, setUser] = useState(null);
  const [active, setActive] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    apiFetch('/auth/profile')
      .then((res) => {
        // If user is instructor, redirect to instructor dashboard
        if (res.user?.role === 'instructor') {
          window.location.href = '/instructor/dashboard';
          return;
        }
        setUser(res.user);
      })
      .catch(() => {
        setAuthToken(null);
        router.replace('/login');
      });
  }, [router]);

  const [courses, setCourses] = useState([]);
  const [userCourses, setUserCourses] = useState([]);

  useEffect(() => {
    // Fetch all courses
    apiFetch('/courses')
      .then((data) => {
        setCourses(data);
        // Fetch user progress for each course
        if (user?.id) {
          Promise.all(
            data.map(c =>
              apiFetch(`/progress/${user.id}/${c.id}`)
                .then(progress => ({ ...c, progress: progress.completed_percent || 0, completed: (progress.completed_percent || 0) >= 100 }))
                .catch(() => ({ ...c, progress: 0, completed: false }))
            )
          ).then(setUserCourses);
        } else {
          // If no user, still set courses for progress display
          setUserCourses(data.map((c, idx) => ({
            ...c,
            progress: idx === 0 ? 45 : idx === 1 ? 80 : idx === 2 ? 100 : idx === 3 ? 60 : 30,
            completed: (idx === 0 ? 45 : idx === 1 ? 80 : idx === 2 ? 100 : idx === 3 ? 60 : 30) >= 100
          })));
        }
      })
      .catch(() => {
        // On error, set empty array
        setCourses([]);
        setUserCourses([]);
      });
  }, [user?.id]);

  const dummyCourses = userCourses.length > 0 ? userCourses : [
    { id: 'c1', title: 'React Basics', description: 'Start your React journey', progress: 45, completed: false },
    { id: 'c2', title: 'Node.js APIs', description: 'Build robust backends', progress: 80, completed: false },
    { id: 'c3', title: 'TypeScript Deep Dive', description: 'Type safety for scale', progress: 100, completed: true },
  ];
  // Generate progress data from courses - ensure all courses have progress
  const dummyProgress = userCourses.length > 0
    ? userCourses.map(c => ({ course: c.title || c.name || 'Untitled Course', progress: c.progress || 0 }))
    : courses.length > 0
    ? courses.slice(0, 5).map((c, idx) => ({
        course: c.title || c.name || `Course ${idx + 1}`,
        progress: idx === 0 ? 45 : idx === 1 ? 80 : idx === 2 ? 100 : idx === 3 ? 60 : 30
      }))
    : [
        { course: 'React Basics', progress: 45 },
        { course: 'Node.js APIs', progress: 80 },
        { course: 'TypeScript Deep Dive', progress: 100 },
        { course: 'CSS Advanced', progress: 60 },
        { course: 'PostgreSQL', progress: 30 },
      ];
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    if (user?.id && courses.length > 0) {
      // Fetch quizzes for all courses
      Promise.all(
        courses.map(c =>
          apiFetch(`/quiz/${c.id}`)
            .then(quizData => ({ courseId: c.id, courseTitle: c.title, quizzes: Array.isArray(quizData) ? quizData : [] }))
            .catch(() => ({ courseId: c.id, courseTitle: c.title, quizzes: [] }))
        )
      ).then(quizResults => {
        const allQuizzes = quizResults
          .filter(qr => qr.quizzes.length > 0)
          .map(qr => ({
            id: qr.courseId,
            title: `${qr.courseTitle} Quiz`,
            courseId: qr.courseId,
            score: 0, // Would need quiz_attempts table to track scores
            attempts: 0,
            feedback: 'Take the quiz to see your score',
            allowRetake: true,
          }));
        setQuizzes(allQuizzes);
      });
    }
  }, [user?.id, courses]);

  // Use real quizzes if available, otherwise create dummy quizzes with course IDs
  const dummyQuizzes = quizzes.length > 0 ? quizzes : (courses.length > 0 ? [
    { id: courses[0].id, courseId: courses[0].id, title: `${courses[0].title} Quiz`, score: 85, attempts: 1, feedback: 'Great job! Keep up the excellent work!', allowRetake: true },
    ...(courses.length > 1 ? [{ id: courses[1].id, courseId: courses[1].id, title: `${courses[1].title} Quiz`, score: 72, attempts: 2, feedback: 'Review async patterns and promises', allowRetake: true }] : []),
    ...(courses.length > 2 ? [{ id: courses[2].id, courseId: courses[2].id, title: `${courses[2].title} Quiz`, score: 90, attempts: 1, feedback: 'Excellent understanding!', allowRetake: true }] : []),
    ...(courses.length > 3 ? [{ id: courses[3].id, courseId: courses[3].id, title: `${courses[3].title} Quiz`, score: 65, attempts: 3, feedback: 'Practice more on fundamentals', allowRetake: true }] : []),
    ...(courses.length > 4 ? [{ id: courses[4].id, courseId: courses[4].id, title: `${courses[4].title} Quiz`, score: 88, attempts: 1, feedback: 'Well done!', allowRetake: true }] : []),
  ] : [
    // Fallback demo quizzes if no courses
    { id: 'q1', courseId: 'c1', title: 'React Basics Quiz', score: 85, attempts: 1, feedback: 'Great job! Keep up the excellent work!', allowRetake: true },
    { id: 'q2', courseId: 'c2', title: 'Node.js Quiz', score: 72, attempts: 2, feedback: 'Review async patterns and promises', allowRetake: true },
    { id: 'q3', courseId: 'c3', title: 'TypeScript Quiz', score: 90, attempts: 1, feedback: 'Excellent understanding!', allowRetake: true },
    { id: 'q4', courseId: 'c4', title: 'CSS Advanced Quiz', score: 65, attempts: 3, feedback: 'Practice more on fundamentals', allowRetake: true },
    { id: 'q5', courseId: 'c5', title: 'PostgreSQL Quiz', score: 88, attempts: 1, feedback: 'Well done!', allowRetake: true },
  ]);
  const dummyCertificates = [
    { id: 'cert1', title: 'TypeScript Mastery', url: '#' },
  ];
  const dummyNotifications = [
    { id: 'n1', date: Date.now(), title: 'New course available', message: 'Advanced React Patterns just dropped!' },
  ];
  const stats = { enrolled: dummyCourses.length, completed: dummyCourses.filter(c => c.completed).length, certificates: dummyCertificates.length, totalScore: Math.round(dummyQuizzes.reduce((a,b)=>a+b.score,0)/dummyQuizzes.length) };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setActive('courses');
  };

  const handleSaveProfile = async (data) => {
    try {
      await apiFetch('/auth/profile', {
        method: 'PATCH',
        body: JSON.stringify(data),
      });
      alert('Profile updated successfully!');
    } catch (err) {
      alert('Failed to update profile: ' + err.message);
    }
  };

  const handleChangePassword = async (data) => {
    try {
      await apiFetch('/auth/password', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      alert('Password updated successfully!');
    } catch (err) {
      alert('Failed to update password: ' + err.message);
    }
  };

  // For courses tab, show all user courses (enrolled + with progress)
  const coursesForDisplay = userCourses.length > 0 ? userCourses : dummyCourses;
  
  const filteredCourses = searchQuery
    ? coursesForDisplay.filter(c => 
        (c.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (c.description || '').toLowerCase().includes(searchQuery.toLowerCase())
      )
    : coursesForDisplay;

  // Handle tab from URL - sync with searchParams
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && ['overview', 'courses', 'progress', 'quizzes', 'certificates', 'notifications', 'settings'].includes(tab)) {
      setActive(tab);
    } else {
      setActive('overview');
    }
  }, [searchParams]);

  return (
    <>
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className="px-6 py-6">
        {active === 'overview' && <Overview user={user} stats={stats} onNavigate={setActive} />}
        {active === 'courses' && <Courses courses={filteredCourses} allCourses={courses} />}
        {active === 'progress' && <Progress data={dummyProgress} />}
        {active === 'quizzes' && <Quizzes quizzes={dummyQuizzes} />}
        {active === 'certificates' && <Certificates items={dummyCertificates} user={user} />}
        {active === 'notifications' && <Notifications items={dummyNotifications} />}
        {active === 'settings' && <Settings user={user} onSaveProfile={handleSaveProfile} onChangePassword={handleChangePassword} />}
      </div>
    </>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="px-6 py-10"><div className="text-center py-12">Loading...</div></div>}>
      <DashboardContent />
    </Suspense>
  );
}