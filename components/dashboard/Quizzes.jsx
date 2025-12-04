"use client";
import { useRouter } from 'next/navigation';

export default function Quizzes({ quizzes = [] }) {
  const router = useRouter();
  
  const getScoreColor = (score) => {
    if (score >= 80) return 'text-emerald-600 bg-emerald-50';
    if (score >= 60) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const handleQuizClick = (quiz) => {
    // Use courseId if available, otherwise use id
    const quizId = quiz.courseId || quiz.id;
    if (quizId) {
      router.push(`/quiz/${quizId}`);
    }
  };

  return (
    <section>
      <div className="mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Quizzes & Assessments</h2>
        <p className="text-lg text-gray-600 mt-2">Track your quiz performance</p>
      </div>
      <div className="space-y-4">
        {quizzes.length === 0 ? (
          <div className="text-center py-12 rounded-2xl border bg-white">
            <div className="text-5xl mb-4">🧠</div>
            <p className="text-gray-600">No quizzes available yet. Enroll in a course to take quizzes!</p>
          </div>
        ) : (
          quizzes.map((q) => (
          <div key={q.id} className="group rounded-2xl bg-white p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
              <div className="text-4xl">🧠</div>
              <div className="flex-1">
                <div className="text-xl font-bold text-gray-900 mb-2">{q.title}</div>
                <div className="flex items-center gap-4 flex-wrap">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${getScoreColor(q.score)}`}>
                    Score: {q.score}%
                  </span>
                  <span className="text-sm text-gray-600">Attempts: {q.attempts}</span>
                  {q.feedback && <span className="text-sm text-gray-600">• {q.feedback}</span>}
                </div>
              </div>
            </div>
            <div>
              {q.allowRetake !== false && (
                <button 
                  onClick={() => handleQuizClick(q)}
                  className="inline-flex items-center rounded-lg px-5 py-2.5 text-sm font-medium text-white shadow-md hover:shadow-lg transition" 
                  style={{ backgroundImage: 'linear-gradient(135deg,#6366f1 0%, #06b6d4 100%)' }}
                >
                  {q.score > 0 ? 'Retake →' : 'Take Quiz →'}
                </button>
              )}
            </div>
          </div>
          ))
        )}
      </div>
    </section>
  );
}

