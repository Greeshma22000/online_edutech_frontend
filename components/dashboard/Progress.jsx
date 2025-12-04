"use client";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';

export default function Progress({ data = [] }) {
  // Generate progress over time data (last 7 days)
  const progressOverTime = [
    { day: 'Mon', progress: 20 },
    { day: 'Tue', progress: 35 },
    { day: 'Wed', progress: 45 },
    { day: 'Thu', progress: 55 },
    { day: 'Fri', progress: 65 },
    { day: 'Sat', progress: 75 },
    { day: 'Sun', progress: data.length > 0 ? Math.round(data.reduce((sum, d) => sum + d.progress, 0) / data.length) : 80 },
  ];

  // Generate hours and quizzes data
  const hoursAndQuizzes = [
    { week: 'Week 1', hours: 8, quizzes: 2 },
    { week: 'Week 2', hours: 12, quizzes: 3 },
    { week: 'Week 3', hours: 15, quizzes: 4 },
    { week: 'Week 4', hours: 18, quizzes: 5 },
    { week: 'Week 5', hours: 20, quizzes: 6 },
  ];


  return (
    <section>
      <div className="mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Progress Tracker</h2>
        <p className="text-lg text-gray-600 mt-2">Visualize your learning journey</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Progress Over Time Chart */}
        <div className="relative rounded-2xl bg-white border border-gray-200 p-6 shadow-lg">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Progress Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={progressOverTime}>
              <defs>
                <linearGradient id="colorProgress" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="day" stroke="#6b7280" />
              <YAxis stroke="#6b7280" domain={[0, 100]} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e5e7eb', 
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }}
                formatter={(value) => `${value}%`}
              />
              <Area 
                type="monotone" 
                dataKey="progress" 
                stroke="#6366f1" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorProgress)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Hours & Quizzes Chart */}
        <div className="relative rounded-2xl bg-white border border-gray-200 p-6 shadow-lg">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Hours Watched & Quizzes Taken</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={hoursAndQuizzes}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="week" stroke="#6b7280" />
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
              <Bar dataKey="hours" fill="#6366f1" radius={[8, 8, 0, 0]} name="Hours Watched" />
              <Bar dataKey="quizzes" fill="#06b6d4" radius={[8, 8, 0, 0]} name="Quizzes Taken" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Per-Course Progress Cards */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">Detailed Course Progress</h3>
        <p className="text-sm text-gray-600 mb-4">View detailed progress information for each course</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {data.length > 0 ? data.map((d, idx) => {
            // Calculate additional stats for each course
            const lessonsCompleted = Math.round((d.progress || 0) / 10); // Estimate based on progress
            const totalLessons = 10; // Estimated total lessons
            const quizzesCompleted = Math.round((d.progress || 0) / 20); // Estimate based on progress
            const timeSpent = Math.round((d.progress || 0) * 0.5); // Estimate hours based on progress
            
            return (
              <div key={d.course || `course-${idx}`} className="group rounded-2xl bg-white p-6 shadow-md hover:shadow-lg transition border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-lg text-gray-900">{d.course || `Course ${idx + 1}`}</h4>
                  <span className={`text-xl font-bold ${
                    (d.progress || 0) === 100 ? 'text-emerald-600' : 
                    (d.progress || 0) >= 70 ? 'text-brand-600' : 
                    (d.progress || 0) >= 40 ? 'text-yellow-600' : 
                    'text-red-600'
                  }`}>{d.progress || 0}%</span>
                </div>
                
                {/* Progress Bar */}
                <div className="w-full h-3 rounded-full bg-gray-100 overflow-hidden mb-4">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${
                      (d.progress || 0) === 100 ? 'bg-gradient-to-r from-emerald-500 to-emerald-600' : 
                      (d.progress || 0) >= 70 ? 'bg-gradient-to-r from-brand-500 to-accent-500' : 
                      (d.progress || 0) >= 40 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' : 
                      'bg-gradient-to-r from-red-500 to-pink-500'
                    }`}
                    style={{ width: `${d.progress || 0}%` }} 
                  />
                </div>

                {/* Additional Stats */}
                <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-gray-100">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Lessons</div>
                    <div className="text-sm font-semibold text-gray-900">{lessonsCompleted}/{totalLessons}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Quizzes</div>
                    <div className="text-sm font-semibold text-gray-900">{quizzesCompleted} completed</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Time Spent</div>
                    <div className="text-sm font-semibold text-gray-900">{timeSpent} hours</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Status</div>
                    <div className={`text-sm font-semibold ${
                      (d.progress || 0) === 100 ? 'text-emerald-600' : 
                      (d.progress || 0) >= 70 ? 'text-brand-600' : 
                      (d.progress || 0) >= 40 ? 'text-yellow-600' : 
                      'text-red-600'
                    }`}>
                      {(() => {
                        const progress = d.progress || 0;
                        if (progress === 100) return 'Completed';
                        if (progress >= 70) return 'In Progress';
                        if (progress >= 40) return 'Started';
                        return 'Not Started';
                      })()}
                    </div>
                  </div>
                </div>
              </div>
            );
          }) : (
            <div className="col-span-full text-center py-12 rounded-2xl border bg-white">
              <div className="text-5xl mb-4">📈</div>
              <p className="text-gray-600">No progress data available yet. Start learning to track your progress!</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}