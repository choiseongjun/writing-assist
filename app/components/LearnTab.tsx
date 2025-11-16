'use client';

export default function LearnTab() {
  const lessons = [
    {
      id: 1,
      title: '수동적 표현 개선하기',
      description: '그냥, ~요 등의 과도한 사용을 줄이는 방법을 배워요',
      progress: 60,
      emoji: '💪',
      difficulty: '초급',
      color: 'from-green-400 to-emerald-400',
    },
    {
      id: 2,
      title: '거절을 잘 하는 법',
      description: '상대방을 존중하면서도 명확하게 거절하는 스킬',
      progress: 30,
      emoji: '🙅‍♀️',
      difficulty: '중급',
      color: 'from-yellow-400 to-orange-400',
    },
    {
      id: 3,
      title: '감정 표현하기',
      description: '자신의 감정을 솔직하고 건강하게 전달하는 방법',
      progress: 0,
      emoji: '💖',
      difficulty: '초급',
      color: 'from-pink-400 to-rose-400',
    },
    {
      id: 4,
      title: '비즈니스 커뮤니케이션',
      description: '전문적이고 격식있는 대화 스킬을 익혀요',
      progress: 0,
      emoji: '👔',
      difficulty: '고급',
      color: 'from-purple-400 to-indigo-400',
    },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case '초급':
        return 'bg-gradient-to-r from-green-400 to-emerald-400 text-white';
      case '중급':
        return 'bg-gradient-to-r from-yellow-400 to-orange-400 text-white';
      case '고급':
        return 'bg-gradient-to-r from-red-400 to-pink-400 text-white';
      default:
        return 'bg-gray-200 text-gray-700';
    }
  };

  return (
    <div className="px-5 py-6 pb-24 bg-gradient-to-b from-blue-50/30 to-transparent">
      <div className="text-center mb-6">
        <span className="text-5xl mb-3 inline-block">📚</span>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent mb-2">
          학습
        </h1>
        <p className="text-sm text-gray-600">
          커뮤니케이션 스킬을 차근차근 배워봐요 ✨
        </p>
      </div>

      {/* Progress Summary */}
      <div className="bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 rounded-3xl p-6 mb-5 border-2 border-pink-200 shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
            <span>📊</span>
            전체 학습 진행도
          </h3>
        </div>
        <div className="flex items-end gap-4">
          <div className="text-5xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            23%
          </div>
          <div className="text-sm text-gray-700 pb-2 font-medium">완료했어요!</div>
        </div>
      </div>

      {/* Lessons */}
      <div className="space-y-3">
        {lessons.map((lesson) => (
          <div
            key={lesson.id}
            className="bg-white rounded-3xl p-5 hover:shadow-lg transition-all cursor-pointer border-2 border-purple-100 hover:border-purple-300"
          >
            <div className="flex items-start gap-3 mb-4">
              <span className="text-4xl">{lesson.emoji}</span>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-sm font-bold text-gray-900">
                    {lesson.title}
                  </h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm ${getDifficultyColor(lesson.difficulty)}`}>
                    {lesson.difficulty}
                  </span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {lesson.description}
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${lesson.color} rounded-full transition-all shadow-sm`}
                  style={{ width: `${lesson.progress}%` }}
                />
              </div>
              <span className="text-xs text-gray-600 font-bold min-w-[3ch]">
                {lesson.progress}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
