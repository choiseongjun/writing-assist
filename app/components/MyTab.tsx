'use client';

import { useState } from 'react';

interface SurveyAnswer {
  questionId: number;
  answer: number; // 1-5 점수
}

export default function MyTab() {
  const [showSurvey, setShowSurvey] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<SurveyAnswer[]>([]);
  const [surveyComplete, setSurveyComplete] = useState(false);
  const [result, setResult] = useState<any>(null);

  const questions = [
    { id: 1, text: "거절할 때 죄책감을 느끼고 이유를 길게 설명한다", category: "assertiveness" },
    { id: 2, text: "대화 중 상대방의 반응을 지나치게 신경쓴다", category: "anxiety" },
    { id: 3, text: "내 의견을 말할 때 '제 생각엔...' 같은 완곡한 표현을 자주 쓴다", category: "assertiveness" },
    { id: 4, text: "갈등 상황을 피하기 위해 내 의견을 숨긴다", category: "conflict" },
    { id: 5, text: "메시지를 보낸 후 상대방 답장이 늦으면 불안하다", category: "anxiety" },
    { id: 6, text: "칭찬받으면 '아니에요, 별거 아닌데요'라고 자주 말한다", category: "confidence" },
    { id: 7, text: "대화가 끝난 후 '내가 실수한 건 없나' 반복해서 생각한다", category: "anxiety" },
    { id: 8, text: "부탁할 때 '바쁘시면 괜찮아요'라는 말을 먼저 한다", category: "assertiveness" },
    { id: 9, text: "상대방이 화났을 때 내 잘못이 아니어도 사과한다", category: "conflict" },
    { id: 10, text: "대화 시작 전에 뭐라고 말할지 미리 연습한다", category: "anxiety" },
  ];

  const stats = [
    { label: '분석 횟수', value: '24', emoji: '📊' },
    { label: '학습 완료', value: '3', emoji: '✅' },
    { label: '연속 사용', value: '7일', emoji: '🔥' },
  ];

  const menuItems = [
    { label: '설정', badge: null, emoji: '⚙️' },
    { label: '알림', badge: '3', emoji: '🔔' },
    { label: '도움말', badge: null, emoji: '❓' },
    { label: '문의하기', badge: null, emoji: '💌' },
    { label: '앱 평가하기', badge: null, emoji: '⭐' },
  ];

  const handleAnswer = (score: number) => {
    const newAnswers = [...answers, { questionId: questions[currentQuestion].id, answer: score }];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // 설문 완료 - 결과 계산
      calculateResult(newAnswers);
      setSurveyComplete(true);
    }
  };

  const calculateResult = (allAnswers: SurveyAnswer[]) => {
    const categories = {
      assertiveness: 0,
      anxiety: 0,
      conflict: 0,
      confidence: 0,
    };

    allAnswers.forEach((answer) => {
      const question = questions.find(q => q.id === answer.questionId);
      if (question) {
        categories[question.category as keyof typeof categories] += answer.answer;
      }
    });

    // 가장 높은 점수의 카테고리 찾기
    const maxCategory = Object.entries(categories).reduce((a, b) => a[1] > b[1] ? a : b)[0];

    const results: Record<string, any> = {
      assertiveness: {
        type: "소극적 커뮤니케이터",
        description: "자신의 의견을 명확하게 표현하는데 어려움을 느끼는 타입입니다.",
        strengths: ["타인을 배려하는 마음", "경청을 잘함", "갈등을 피하려고 노력"],
        weaknesses: ["자기 주장이 약함", "거절을 어려워함", "눈치를 많이 봄"],
        tips: ["'No'라고 말하는 연습하기", "내 의견을 먼저 말하기", "완곡한 표현 줄이기"],
      },
      anxiety: {
        type: "불안형 커뮤니케이터",
        description: "대화 전후로 과도하게 걱정하고 상대방 반응에 민감한 타입입니다.",
        strengths: ["섬세하게 배려", "실수를 줄이려고 노력", "신중한 대화"],
        weaknesses: ["과도한 걱정", "자신감 부족", "메시지 해석에 예민"],
        tips: ["완벽주의 내려놓기", "답장 시간에 덜 집착하기", "있는 그대로 해석하기"],
      },
      conflict: {
        type: "회피형 커뮤니케이터",
        description: "갈등 상황을 피하고 평화를 유지하려는 타입입니다.",
        strengths: ["조화를 중시", "평화적 관계 유지", "감정 조절 능력"],
        weaknesses: ["필요한 대립도 회피", "억울함을 참음", "문제 해결 지연"],
        tips: ["건강한 갈등은 필요함을 인식", "내 감정 솔직히 표현", "문제를 미루지 않기"],
      },
      confidence: {
        type: "자신감 부족형",
        description: "자신의 능력과 가치를 낮게 평가하는 타입입니다.",
        strengths: ["겸손함", "배울 자세", "성장 의지"],
        weaknesses: ["칭찬 받기 어려움", "자기 비하", "능력 과소평가"],
        tips: ["칭찬은 '감사합니다'로 받기", "자기 긍정 연습", "성취 기록하기"],
      },
    };

    setResult(results[maxCategory]);
  };

  const resetSurvey = () => {
    setShowSurvey(false);
    setCurrentQuestion(0);
    setAnswers([]);
    setSurveyComplete(false);
    setResult(null);
  };

  if (showSurvey && !surveyComplete) {
    const progress = ((currentQuestion + 1) / questions.length) * 100;

    return (
      <div className="px-5 py-6 pb-24 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 min-h-screen">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                대화 스타일 진단
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                솔직하게 답변해주세요
              </p>
            </div>
            <button
              onClick={resetSurvey}
              className="w-10 h-10 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-all shadow-sm"
            >
              ✕
            </button>
          </div>

          {/* Progress bar */}
          <div className="relative">
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 transition-all duration-500 ease-out rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between items-center mt-2">
              <p className="text-xs font-bold text-purple-600">{currentQuestion + 1} / {questions.length}</p>
              <p className="text-xs font-bold text-gray-500">{Math.round(progress)}%</p>
            </div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-3xl p-8 mb-6 shadow-2xl border-2 border-purple-100 transform transition-all">
          <div className="mb-2">
            <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded-full mb-4">
              질문 {currentQuestion + 1}
            </span>
          </div>
          <p className="text-xl font-bold text-gray-900 mb-8 leading-relaxed">
            {questions[currentQuestion].text}
          </p>

          <div className="space-y-3">
            {[
              { score: 5, label: "매우 그렇다", gradient: "from-red-400 to-pink-500", hoverGradient: "from-red-500 to-pink-600" },
              { score: 4, label: "그렇다", gradient: "from-orange-400 to-red-400", hoverGradient: "from-orange-500 to-red-500" },
              { score: 3, label: "보통이다", gradient: "from-gray-300 to-gray-400", hoverGradient: "from-gray-400 to-gray-500" },
              { score: 2, label: "아니다", gradient: "from-teal-400 to-emerald-400", hoverGradient: "from-teal-500 to-emerald-500" },
              { score: 1, label: "전혀 아니다", gradient: "from-emerald-500 to-teal-500", hoverGradient: "from-emerald-600 to-teal-600" },
            ].map((option) => (
              <button
                key={option.score}
                onClick={() => handleAnswer(option.score)}
                className={`w-full py-5 px-6 rounded-2xl font-bold text-white transition-all transform hover:scale-[1.02] hover:shadow-xl active:scale-[0.98] bg-gradient-to-r ${option.gradient} hover:${option.hoverGradient} shadow-lg`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-lg">{option.label}</span>
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Fun Tip */}
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-4 border-2 border-purple-200">
          <p className="text-xs text-center text-purple-800 font-medium">
            💡 정답은 없어요. 평소 나의 모습을 떠올려보세요!
          </p>
        </div>
      </div>
    );
  }

  if (surveyComplete && result) {
    return (
      <div className="px-5 py-6 pb-24 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 min-h-screen">
        {/* Celebration Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="mb-4">
            <div className="inline-block p-4 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full shadow-xl mb-4">
              <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            진단 완료!
          </h2>
          <p className="text-sm text-gray-600">당신의 대화 스타일은...</p>
        </div>

        {/* Result Card */}
        <div className="bg-white rounded-3xl p-8 mb-5 shadow-2xl border-2 border-purple-100">
          <div className="text-center mb-6 pb-6 border-b-2 border-purple-100">
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-sm font-bold mb-3 shadow-lg">
              YOUR TYPE
            </div>
            <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
              {result.type}
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed px-4">{result.description}</p>
          </div>

          {/* Strengths */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h4 className="text-base font-bold text-gray-900">강점</h4>
            </div>
            <div className="space-y-3">
              {result.strengths.map((strength: string, idx: number) => (
                <div key={idx} className="flex items-start gap-3 bg-gradient-to-r from-emerald-50 to-teal-50 p-4 rounded-xl border border-emerald-200">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-bold">
                    {idx + 1}
                  </span>
                  <p className="text-sm text-gray-800 font-medium pt-0.5">{strength}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Weaknesses */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h4 className="text-base font-bold text-gray-900">약점</h4>
            </div>
            <div className="space-y-3">
              {result.weaknesses.map((weakness: string, idx: number) => (
                <div key={idx} className="flex items-start gap-3 bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-xl border border-orange-200">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs font-bold">
                    !
                  </span>
                  <p className="text-sm text-gray-800 font-medium pt-0.5">{weakness}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h4 className="text-base font-bold text-gray-900">개선 팁</h4>
            </div>
            <div className="space-y-3">
              {result.tips.map((tip: string, idx: number) => (
                <div key={idx} className="flex items-start gap-3 bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-200">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white flex items-center justify-center text-xs font-bold">
                    {idx + 1}
                  </span>
                  <p className="text-sm text-purple-900 font-semibold pt-0.5">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={resetSurvey}
            className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-2xl transition-all shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
          >
            다시 진단하기
          </button>
          <button
            className="w-full py-4 bg-white border-2 border-purple-200 text-purple-700 font-bold rounded-2xl transition-all hover:bg-purple-50 shadow-md"
          >
            결과 공유하기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-5 py-6 pb-24 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
          마이
        </h1>
        <p className="text-sm text-gray-600">
          나의 소통 성장 기록
        </p>
      </div>

      {/* 대화 스타일 진단 CTA */}
      <div className="relative overflow-hidden bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-3xl p-8 mb-6 shadow-2xl">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full -ml-12 -mb-12"></div>

        <div className="relative">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-bold rounded-full">
              NEW
            </span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">대화 스타일 진단</h3>
          <p className="text-sm text-white/90 mb-6 leading-relaxed">
            10문항으로 알아보는 나의 커뮤니케이션 성향
          </p>
          <button
            onClick={() => setShowSurvey(true)}
            className="w-full py-4 bg-white text-purple-600 font-bold rounded-2xl transition-all shadow-xl hover:shadow-2xl transform hover:scale-[1.02] active:scale-[0.98]"
          >
            진단 시작하기
          </button>
        </div>
      </div>

      {/* Profile Section */}
      <div className="bg-gradient-to-br from-pink-100 via-rose-100 to-purple-100 rounded-3xl p-6 mb-5 border-2 border-pink-200 shadow-md">
        <div className="flex items-center gap-4 mb-5">
          <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg">
            🌟
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900 mb-1">사용자님</h2>
            <p className="text-xs text-gray-600 font-medium">소셜 코치와 함께 성장하는 중 ✨</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl p-4 text-center border-2 border-pink-100 shadow-sm">
              <div className="text-3xl mb-2">{stat.emoji}</div>
              <div className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Subscription Banner */}
      <div className="bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 rounded-3xl p-5 mb-5 text-white shadow-lg border-2 border-yellow-300">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-base font-bold mb-1.5 flex items-center gap-2">
              <span>✨</span>
              프리미엄으로 업그레이드
            </p>
            <p className="text-xs opacity-95 font-medium">무제한 분석 + 모든 학습 컨텐츠 이용</p>
          </div>
          <button className="bg-white text-orange-600 px-5 py-3 rounded-2xl text-xs font-bold hover:bg-gray-50 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
            자세히
          </button>
        </div>
      </div>

      {/* Menu Items */}
      <div className="bg-white border-2 border-pink-100 rounded-3xl overflow-hidden shadow-sm">
        {menuItems.map((item, index) => (
          <button
            key={index}
            className={`w-full flex items-center justify-between p-4 hover:bg-pink-50 transition-all ${
              index !== menuItems.length - 1 ? 'border-b border-pink-100' : ''
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{item.emoji}</span>
              <span className="text-sm font-bold text-gray-800">
                {item.label}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {item.badge && (
                <span className="bg-gradient-to-r from-red-400 to-pink-400 text-white text-xs font-bold px-2.5 py-1 rounded-full min-w-[20px] text-center shadow-sm">
                  {item.badge}
                </span>
              )}
              <svg className="w-5 h-5 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>
        ))}
      </div>

      {/* Version Info */}
      <div className="text-center mt-6">
        <p className="text-xs text-gray-400 font-medium">Social Coach v1.0.0 💕</p>
      </div>
    </div>
  );
}
