"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { apiFetch } from '../../lib/api';

export default function InstructorCourses() {
  const router = useRouter();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    thumbnail_url: '',
    is_premium: false,
    price: 0,
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const data = await apiFetch('/auth/profile');
      const userId = data.user.id;
      
      const allCourses = await apiFetch('/courses');
      const myCourses = allCourses.filter(c => c.instructor_id === userId);
      setCourses(myCourses);
    } catch (err) {
      // Error fetching courses
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCourse) {
        // Update course
        await apiFetch(`/courses/${editingCourse.id}`, {
          method: 'PATCH',
          body: JSON.stringify(formData),
        });
      } else {
        // Create course
        await apiFetch('/courses', {
          method: 'POST',
          body: JSON.stringify(formData),
        });
      }
      setShowForm(false);
      setEditingCourse(null);
      setFormData({ title: '', description: '', thumbnail_url: '', is_premium: false, price: 0 });
      fetchCourses();
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  const handleEdit = (course) => {
    setEditingCourse(course);
    setFormData({
      title: course.title || '',
      description: course.description || '',
      thumbnail_url: course.thumbnail_url || '',
      is_premium: course.is_premium || false,
      price: course.price || 0,
    });
    setShowForm(true);
  };

  const handleDelete = async (courseId) => {
    if (!confirm('Are you sure you want to delete this course? This action cannot be undone.')) return;
    try {
      // Use apiFetch which now handles 204 responses
      await apiFetch(`/courses/${courseId}`, {
        method: 'DELETE',
      });
      
      // Success - refresh courses list
      fetchCourses();
      alert('Course deleted successfully!');
    } catch (err) {
      alert('Error deleting course: ' + (err.message || 'Unknown error'));
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading courses...</div>;
  }

  return (
    <section>
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">My Courses</h2>
            <p className="text-lg text-gray-600 mt-2">Manage your courses</p>
          </div>
          <button
            onClick={() => {
              setEditingCourse(null);
              setFormData({ title: '', description: '', thumbnail_url: '', is_premium: false, price: 0 });
              setShowForm(true);
            }}
            className="px-6 py-3 rounded-xl text-white font-medium shadow-md hover:shadow-lg transition"
            style={{ backgroundImage: 'linear-gradient(135deg, #f25c54 0%, #f7b267 100%)' }}
          >
            + Create Course
          </button>
        </div>
      </div>

      {/* Create/Edit Form */}
      {showForm && (
        <div className="mb-8 rounded-2xl bg-white border border-gray-200 p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4">{editingCourse ? 'Edit Course' : 'Create New Course'}</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Course Title</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
                placeholder="Enter course title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
                rows="4"
                placeholder="Enter course description"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Thumbnail URL</label>
              <input
                type="url"
                value={formData.thumbnail_url}
                onChange={(e) => setFormData({ ...formData, thumbnail_url: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.is_premium}
                  onChange={(e) => setFormData({ ...formData, is_premium: e.target.checked })}
                  className="w-4 h-4"
                />
                <span className="text-sm font-medium">Premium Course</span>
              </label>
              {formData.is_premium && (
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-2">Price ($)</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              )}
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                className="px-6 py-2 rounded-lg text-white font-medium"
                style={{ backgroundImage: 'linear-gradient(135deg, #f25c54 0%, #f7b267 100%)' }}
              >
                {editingCourse ? 'Update Course' : 'Create Course'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingCourse(null);
                }}
                className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Courses List */}
      {courses.length === 0 ? (
        <div className="text-center py-12 rounded-2xl border bg-white">
          <div className="text-5xl mb-4">📚</div>
          <p className="text-gray-600 mb-4">You haven't created any courses yet.</p>
          <button
            onClick={() => setShowForm(true)}
            className="px-6 py-3 rounded-lg text-white font-medium"
            style={{ backgroundImage: 'linear-gradient(135deg, #f25c54 0%, #f7b267 100%)' }}
          >
            Create Your First Course
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div key={course.id} className="rounded-2xl bg-white p-6 shadow-lg hover:shadow-xl transition border border-gray-100">
              {course.thumbnail_url && (
                <img src={course.thumbnail_url} alt={course.title} className="w-full h-48 object-cover rounded-xl mb-4" />
              )}
              <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
              <p className="text-sm text-gray-600 mb-4 line-clamp-3">{course.description}</p>
              <div className="flex items-center justify-between mb-4">
                <span className={`text-xs px-3 py-1 rounded-full ${course.is_premium ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                  {course.is_premium ? '💰 Premium' : '🆓 Free'}
                </span>
                {course.is_premium && <span className="text-sm font-semibold">${course.price}</span>}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(course)}
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 text-sm font-medium"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(course.id)}
                  className="flex-1 px-4 py-2 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 text-sm font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
