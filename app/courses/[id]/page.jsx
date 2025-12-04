"use client";
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { apiFetch } from '../../../lib/api';

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      apiFetch(`/courses/${params.id}`).catch(() => null),
      apiFetch(`/lessons/${params.id}`).catch(() => []),
      apiFetch(`/quiz/${params.id}`).catch(() => []),
    ]).then(([courseData, lessonsData, quizzesData]) => {
      setCourse(courseData);
      setLessons(lessonsData || []);
      setQuizzes(Array.isArray(quizzesData) ? quizzesData : []);
      setLoading(false);
    });
  }, [params.id]);

  if (loading) {
    return (
      <div className="px-6 py-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-12">Loading course...</div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="px-6 py-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-12">
            <div className="text-5xl mb-4">❌</div>
            <p className="text-gray-600">Course not found</p>
            <button onClick={() => router.push('/courses')} className="mt-4 px-4 py-2 bg-gray-900 text-white rounded-lg">Back to Courses</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <button onClick={() => router.back()} className="mb-6 text-gray-600 hover:text-gray-900">← Back</button>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{course.title}</h1>
        <p className="text-gray-600 mb-8">{course.description}</p>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">Lessons</h2>
              <div className="space-y-3">
                {lessons.length === 0 ? (
                  <div className="text-center py-8 text-gray-500 rounded-xl border bg-white">No lessons available yet</div>
                ) : (
                  lessons.map((l, idx) => (
                    <div key={l.id} className="rounded-xl border bg-white p-4 shadow-sm">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-gray-900">Lesson {idx + 1}: {l.title}</div>
                          <div className="text-sm text-gray-600 mt-1">{l.description || 'Watch this lesson to continue'}</div>
                        </div>
                        <button className="px-4 py-2 rounded-lg text-sm font-medium text-white" style={{ backgroundImage: 'linear-gradient(135deg,#6366f1 0%, #06b6d4 100%)' }}>Watch</button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
            {quizzes.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Quizzes</h2>
                <div className="rounded-xl border bg-white p-6 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-gray-900 mb-1">Course Quiz</div>
                      <div className="text-sm text-gray-600">{quizzes.length} question{quizzes.length !== 1 ? 's' : ''} available</div>
                    </div>
                    <a href={`/quiz/${params.id}`} className="px-5 py-2.5 rounded-lg text-sm font-medium text-white shadow-md hover:shadow-lg transition" style={{ backgroundImage: 'linear-gradient(135deg,#6366f1 0%, #06b6d4 100%)' }}>Take Quiz →</a>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div>
            <div className="rounded-2xl border bg-white p-6 shadow-sm sticky top-4">
              <h3 className="font-bold text-gray-900 mb-4">Course Info</h3>
              <div className="space-y-3 text-sm mb-6">
                <div><span className="font-medium">Lessons:</span> {lessons.length}</div>
                <div><span className="font-medium">Quizzes:</span> {quizzes.length}</div>
                <div><span className="font-medium">Status:</span> {course.is_premium ? 'Premium' : 'Free'}</div>
                {course.is_premium && <div><span className="font-medium">Price:</span> ${course.price || 0}</div>}
              </div>
              {quizzes.length > 0 && (
                <a href={`/quiz/${params.id}`} className="mb-3 w-full inline-flex items-center justify-center px-4 py-2.5 rounded-lg text-sm font-medium text-white shadow-md hover:shadow-lg transition" style={{ backgroundImage: 'linear-gradient(135deg,#6366f1 0%, #06b6d4 100%)' }}>Take Quiz →</a>
              )}
              <button className="w-full px-4 py-3 rounded-lg text-sm font-medium text-white" style={{ backgroundImage: 'linear-gradient(135deg,#6366f1 0%, #06b6d4 100%)' }}>Enroll Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
