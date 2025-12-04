"use client";
import { useState, useEffect } from 'react';
import { apiFetch } from '../../lib/api';

export default function InstructorStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('all');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch instructor's courses
      const profileData = await apiFetch('/auth/profile');
      const userId = profileData.user.id;
      
      const allCourses = await apiFetch('/courses');
      const myCourses = allCourses.filter(c => c.instructor_id === userId);
      setCourses(myCourses);

      // Fetch all progress records for instructor's courses
      const courseIds = myCourses.map(c => c.id);
      const allProgress = [];
      
      for (const courseId of courseIds) {
        try {
          // Get all progress for this course (we'll need to create an endpoint for this)
          // For now, we'll simulate with dummy data
        } catch (err) {
          // Error fetching progress - using dummy data
        }
      }

      // Simulate student data (in real app, you'd fetch from enrollments/progress table)
      const dummyStudents = [
        { id: 's1', name: 'John Doe', email: 'john@example.com', course: 'Complete React Development Course', progress: 75, enrolledDate: '2024-01-15' },
        { id: 's2', name: 'Jane Smith', email: 'jane@example.com', course: 'Node.js & Express.js Masterclass', progress: 45, enrolledDate: '2024-01-20' },
        { id: 's3', name: 'Bob Johnson', email: 'bob@example.com', course: 'Complete React Development Course', progress: 100, enrolledDate: '2024-01-10' },
      ];

      setStudents(dummyStudents);
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredStudents = selectedCourse === 'all' 
    ? students 
    : students.filter(s => s.course === selectedCourse);

  if (loading) {
    return <div className="text-center py-12">Loading students...</div>;
  }

  return (
    <section>
      <div className="mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">My Students</h2>
        <p className="text-lg text-gray-600 mt-2">View students enrolled in your courses</p>
      </div>

      {/* Filter by Course */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Filter by Course</label>
        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
        >
          <option value="all">All Courses</option>
          {courses.map(course => (
            <option key={course.id} value={course.title}>{course.title}</option>
          ))}
        </select>
      </div>

      {/* Students List */}
      {filteredStudents.length === 0 ? (
        <div className="text-center py-12 rounded-2xl border bg-white">
          <div className="text-5xl mb-4">👥</div>
          <p className="text-gray-600">No students enrolled yet.</p>
        </div>
      ) : (
        <div className="rounded-2xl bg-white border border-gray-200 overflow-hidden shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Enrolled</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center text-white font-bold">
                          {student.name.charAt(0)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{student.name}</div>
                          <div className="text-sm text-gray-500">{student.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{student.course}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                          <div
                            className="h-2 rounded-full"
                            style={{
                              width: `${student.progress}%`,
                              backgroundImage: 'linear-gradient(135deg,#6366f1 0%, #06b6d4 100%)'
                            }}
                          />
                        </div>
                        <span className="text-sm text-gray-600">{student.progress}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {student.enrolledDate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Stats Summary */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-2xl bg-white p-6 shadow-lg border border-gray-100">
          <div className="text-3xl mb-2">👥</div>
          <div className="text-2xl font-bold text-gray-900">{filteredStudents.length}</div>
          <div className="text-sm text-gray-600">Total Students</div>
        </div>
        <div className="rounded-2xl bg-white p-6 shadow-lg border border-gray-100">
          <div className="text-3xl mb-2">📚</div>
          <div className="text-2xl font-bold text-gray-900">{courses.length}</div>
          <div className="text-sm text-gray-600">Total Courses</div>
        </div>
        <div className="rounded-2xl bg-white p-6 shadow-lg border border-gray-100">
          <div className="text-3xl mb-2">📈</div>
          <div className="text-2xl font-bold text-gray-900">
            {filteredStudents.length > 0 
              ? Math.round(filteredStudents.reduce((sum, s) => sum + s.progress, 0) / filteredStudents.length)
              : 0}%
          </div>
          <div className="text-sm text-gray-600">Avg Progress</div>
        </div>
      </div>
    </section>
  );
}
