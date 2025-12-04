"use client";
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { apiFetch } from '../../../lib/api';

export default function QuizPage() {
  const params = useParams();
  const router = useRouter();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch(`/quiz/${params.id}`)
      .then((data) => {
        // Ensure options is an array (might be JSON string)
        const formattedQuiz = Array.isArray(data) ? data.map(q => ({
          ...q,
          options: typeof q.options === 'string' ? JSON.parse(q.options) : (q.options || [])
        })) : [];
        
        // If no quiz data, use demo quiz questions
        if (formattedQuiz.length === 0) {
          const demoQuiz = [
            {
              id: 'demo-1',
              question: 'What is React?',
              options: [
                'A JavaScript library for building user interfaces',
                'A database management system',
                'A CSS framework',
                'A server-side language'
              ],
              correct_index: 0
            },
            {
              id: 'demo-2',
              question: 'What is JSX?',
              options: [
                'A syntax extension for JavaScript',
                'A new programming language',
                'A database query language',
                'A testing framework'
              ],
              correct_index: 0
            },
            {
              id: 'demo-3',
              question: 'What is a React Hook?',
              options: [
                'A function that lets you use state and lifecycle features',
                'A component type',
                'A routing mechanism',
                'A styling approach'
              ],
              correct_index: 0
            },
            {
              id: 'demo-4',
              question: 'Which hook is used for side effects?',
              options: [
                'useEffect',
                'useState',
                'useContext',
                'useReducer'
              ],
              correct_index: 0
            },
            {
              id: 'demo-5',
              question: 'What is the virtual DOM?',
              options: [
                'A JavaScript representation of the DOM',
                'A real DOM element',
                'A CSS concept',
                'A database structure'
              ],
              correct_index: 0
            }
          ];
          setQuiz(demoQuiz);
        } else {
          setQuiz(formattedQuiz);
        }
        setLoading(false);
      })
      .catch(() => {
        // On error, use demo quiz questions
        const demoQuiz = [
          {
            id: 'demo-1',
            question: 'What is React?',
            options: [
              'A JavaScript library for building user interfaces',
              'A database management system',
              'A CSS framework',
              'A server-side language'
            ],
            correct_index: 0
          },
          {
            id: 'demo-2',
            question: 'What is JSX?',
            options: [
              'A syntax extension for JavaScript',
              'A new programming language',
              'A database query language',
              'A testing framework'
            ],
            correct_index: 0
          },
          {
            id: 'demo-3',
            question: 'What is a React Hook?',
            options: [
              'A function that lets you use state and lifecycle features',
              'A component type',
              'A routing mechanism',
              'A styling approach'
            ],
            correct_index: 0
          },
          {
            id: 'demo-4',
            question: 'Which hook is used for side effects?',
            options: [
              'useEffect',
              'useState',
              'useContext',
              'useReducer'
            ],
            correct_index: 0
          },
          {
            id: 'demo-5',
            question: 'What is the virtual DOM?',
            options: [
              'A JavaScript representation of the DOM',
              'A real DOM element',
              'A CSS concept',
              'A database structure'
            ],
            correct_index: 0
          }
        ];
        setQuiz(demoQuiz);
        setLoading(false);
      });
  }, [params.id]);

  const handleSubmit = async () => {
    const answersArray = Object.entries(answers).map(([id, selected]) => ({ id, selected_index: selected }));
    
    // Check if this is a demo quiz (has demo- prefix in IDs)
    const isDemoQuiz = quiz && quiz.length > 0 && quiz[0].id?.startsWith('demo-');
    
    if (isDemoQuiz) {
      // Calculate score locally for demo quiz
      let correct = 0;
      quiz.forEach((q) => {
        if (answers[q.id] === q.correct_index) {
          correct += 1;
        }
      });
      const scorePercent = Math.round((correct / quiz.length) * 100);
      const result = {
        score: scorePercent,
        total: quiz.length,
        correct: correct,
        courseId: params.id
      };
      setScore(result);
      setSubmitted(true);
    } else {
      // Submit to backend for real quizzes
      try {
        const result = await apiFetch('/quiz/submit', {
          method: 'POST',
          body: JSON.stringify({ courseId: params.id, answers: answersArray }),
        });
        setScore(result);
        setSubmitted(true);
        
        // Update progress after quiz completion
        if (result.score >= 70) {
          try {
            await apiFetch('/progress/update', {
              method: 'POST',
              body: JSON.stringify({ courseId: params.id, completedPercent: Math.min(100, (result.score / 100) * 20 + 80) }),
            });
          } catch (err) {
            // Failed to update progress (non-critical)
          }
        }
      } catch (err) {
        alert('Failed to submit quiz: ' + err.message);
      }
    }
  };

  if (loading) {
    return (
      <div className="px-6 py-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-12">Loading quiz...</div>
        </div>
      </div>
    );
  }

  if (!quiz || !Array.isArray(quiz) || quiz.length === 0) {
    return (
      <>
        <div className="px-6 py-10">
          <div className="max-w-4xl mx-auto">
            <button onClick={() => router.back()} className="mb-6 text-gray-600 hover:text-gray-900">← Back</button>
            <div className="text-center py-12 rounded-2xl border bg-white shadow-sm">
              <div className="text-5xl mb-4">🧠</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">No Quiz Available</h2>
              <p className="text-gray-600 mb-6">This course doesn't have a quiz yet. Check back later or try another course.</p>
              <div className="flex items-center justify-center gap-4">
                <button onClick={() => router.push('/courses')} className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition">Browse Courses</button>
                <button onClick={() => router.push('/dashboard')} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition">Go to Dashboard</button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="px-6 py-10">
      <div className="max-w-4xl mx-auto">
        <button onClick={() => router.back()} className="mb-6 text-gray-600 hover:text-gray-900">← Back</button>
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Quiz</h1>
        {submitted && score ? (
          <div className="rounded-2xl border bg-white p-8 shadow-lg text-center">
            <div className="text-5xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
            <div className="text-4xl font-bold text-brand-600 mb-2">{score.score}%</div>
            <p className="text-gray-600 mb-6">You got {score.correct} out of {score.total} questions correct</p>
            <button onClick={() => router.push('/dashboard')} className="px-6 py-3 rounded-lg text-white font-medium" style={{ backgroundImage: 'linear-gradient(135deg,#6366f1 0%, #06b6d4 100%)' }}>Back to Dashboard</button>
          </div>
        ) : (
          <div className="space-y-6">
            {quiz.map((q, idx) => (
              <div key={q.id} className="rounded-2xl border bg-white p-6 shadow-sm">
                <div className="font-bold text-gray-900 mb-4">Question {idx + 1}: {q.question}</div>
                <div className="space-y-2">
                  {q.options?.map((opt, optIdx) => (
                    <label key={optIdx} className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name={`question-${q.id}`}
                        value={optIdx}
                        checked={answers[q.id] === optIdx}
                        onChange={() => setAnswers({ ...answers, [q.id]: optIdx })}
                        className="w-4 h-4"
                      />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
            <button
              onClick={handleSubmit}
              disabled={Object.keys(answers).length !== quiz.length}
              className="w-full px-6 py-3 rounded-lg text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundImage: 'linear-gradient(135deg,#6366f1 0%, #06b6d4 100%)' }}
            >
              Submit Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
}