"use client";
import { useState, useEffect } from 'react';
import { apiFetch } from '../../lib/api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts';

export default function InstructorAnalytics() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const profileData = await apiFetch('/auth/profile');
      const userId = profileData.user.id;
      
      const allCourses = await apiFetch('/courses');
      const myCourses = allCourses.filter(c => c.instructor_id === userId);
      setCourses(myCourses);
    } catch (err) {
      // Error fetching analytics data
    } finally {
      setLoading(false);
    }
  };

  // Sample data for charts
  const enrollmentData = [
    { month: 'Jan', students: 12 },
    { month: 'Feb', students: 19 },
    { month: 'Mar', students: 15 },
    { month: 'Apr', students: 25 },
    { month: 'May', students: 30 },
    { month: 'Jun', students: 28 },
  ];

  const coursePerformance = courses.length > 0 ? courses.map(c => ({
    name: c.title.length > 15 ? c.title.substring(0, 15) + '...' : c.title,
    students: Math.floor(Math.random() * 50) + 10,
    revenue: c.is_premium ? Math.floor(Math.random() * 1000) + 100 : 0,
  })) : [
    { name: 'React Course', students: 45, revenue: 1200 },
    { name: 'Node.js Course', students: 32, revenue: 800 },
    { name: 'TypeScript', students: 28, revenue: 0 },
  ];

  const revenueData = [
    { month: 'Jan', revenue: 500 },
    { month: 'Feb', revenue: 800 },
    { month: 'Mar', revenue: 650 },
    { month: 'Apr', revenue: 1200 },
    { month: 'May', revenue: 1500 },
    { month: 'Jun', revenue: 1800 },
  ];


  if (loading) {
    return <div className="text-center py-12">Loading analytics...</div>;
  }

  return (
    <section>
      <div className="mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Analytics</h2>
        <p className="text-lg text-gray-600 mt-2">Track your course performance and student engagement</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="rounded-2xl bg-white p-6 shadow-lg border border-gray-100">
          <div className="text-3xl mb-2">👥</div>
          <div className="text-2xl font-bold text-gray-900">125</div>
          <div className="text-sm text-gray-600">Total Students</div>
        </div>
        <div className="rounded-2xl bg-white p-6 shadow-lg border border-gray-100">
          <div className="text-3xl mb-2">📚</div>
          <div className="text-2xl font-bold text-gray-900">{courses.length}</div>
          <div className="text-sm text-gray-600">Total Courses</div>
        </div>
        <div className="rounded-2xl bg-white p-6 shadow-lg border border-gray-100">
          <div className="text-3xl mb-2">💰</div>
          <div className="text-2xl font-bold text-gray-900">$4,850</div>
          <div className="text-sm text-gray-600">Total Revenue</div>
        </div>
        <div className="rounded-2xl bg-white p-6 shadow-lg border border-gray-100">
          <div className="text-3xl mb-2">⭐</div>
          <div className="text-2xl font-bold text-gray-900">4.8</div>
          <div className="text-sm text-gray-600">Avg Rating</div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Enrollment Over Time */}
        <div className="rounded-2xl bg-white border border-gray-200 p-6 shadow-lg">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Student Enrollment Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={enrollmentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e5e7eb', 
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="students" 
                stroke="#6366f1" 
                strokeWidth={3}
                name="Students"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Course Performance */}
        <div className="rounded-2xl bg-white border border-gray-200 p-6 shadow-lg">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Course Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={coursePerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e5e7eb', 
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }}
              />
              <Legend />
              <Bar dataKey="students" fill="#6366f1" radius={[8, 8, 0, 0]} name="Students" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="rounded-2xl bg-white border border-gray-200 p-6 shadow-lg mb-8">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Revenue Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={revenueData}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff', 
                border: '1px solid #e5e7eb', 
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
              }}
              formatter={(value) => `$${value}`}
            />
            <Area 
              type="monotone" 
              dataKey="revenue" 
              stroke="#06b6d4" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorRevenue)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}