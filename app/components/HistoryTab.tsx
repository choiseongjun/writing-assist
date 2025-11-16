'use client';

import { useState } from 'react';

export default function HistoryTab() {
  const [selectedGuide, setSelectedGuide] = useState<string | null>(null);

  const guides = [
    {
      id: 'reject',
      title: '거절하기',
      icon: '🙅‍♀️',
      color: 'from-red-400 to-pink-500',
      situations: [
        {
          situation: '친구가 갑자기 부탁할 때',
          bad: '음... 글쎄... 바쁘긴 한데... 어쩌지...',
          badReason: '애매한 태도로 상대를 혼란스럽게 함',
          good: '미안해, 이번엔 어려울 것 같아. 다음에 도와줄게!',
          goodReason: '명확하게 거절하되 대안 제시',
        },
        {
          situation: '직장 동료가 일을 떠넘길 때',
          bad: '네... 알겠습니다... (속으로 짜증)',
          badReason: '거절하지 못하고 억지로 수락',
          good: '지금 제 업무도 마감이 촉박해서 이번엔 어렵겠어요.',
          goodReason: '구체적인 이유와 함께 정중히 거절',
        },
        {
          situation: '약속 제안을 거절할 때',
          bad: '아... 그날은 안 될 것 같은데... 미안...',
          badReason: '죄책감을 과도하게 표현',
          good: '그날은 약속이 있어서 어려워. 다음 주는 어때?',
          goodReason: '대안 날짜 제시로 관심 표현',
        },
      ],
    },
    {
      id: 'request',
      title: '부탁하기',
      icon: '🙏',
      color: 'from-blue-400 to-cyan-500',
      situations: [
        {
          situation: '동료에게 도움 요청할 때',
          bad: '바쁘시면 괜찮은데... 혹시... 시간 되시면...',
          badReason: '과도하게 눈치를 보며 부탁',
          good: '이 부분 도움 받을 수 있을까? 30분 정도 시간 괜찮아?',
          goodReason: '구체적으로 필요한 것과 시간 명시',
        },
        {
          situation: '친구에게 빌릴 것이 있을 때',
          bad: '미안한데... 혹시... 빌려줄 수 있어...?',
          badReason: '불확실한 어투로 부탁',
          good: '이번 주말에 카메라 좀 빌릴 수 있을까? 일요일까지 쓸게!',
          goodReason: '명확한 기간과 약속 제시',
        },
        {
          situation: '상사에게 휴가 요청할 때',
          bad: '괜찮으시면... 혹시 휴가를...',
          badReason: '권리를 당당히 요청하지 못함',
          good: '다음 주 금요일 휴가 사용해도 될까요? 업무는 목요일까지 마무리하겠습니다.',
          goodReason: '계획과 책임을 함께 제시',
        },
      ],
    },
    {
      id: 'apologize',
      title: '사과하기',
      icon: '😔',
      color: 'from-orange-400 to-yellow-500',
      situations: [
        {
          situation: '약속 시간에 늦었을 때',
          bad: '아 정말 죄송해요ㅠㅠ 제가 진짜... 너무 미안해요...',
          badReason: '과도한 사과로 상황을 더 불편하게 함',
          good: '늦어서 미안해! 10분 뒤에 도착할게.',
          goodReason: '간결한 사과와 구체적인 도착 시간',
        },
        {
          situation: '실수로 불편을 끼쳤을 때',
          bad: '제가 잘못했어요... 다 제 탓이에요...',
          badReason: '자기비하와 함께 사과',
          good: '내 실수 때문에 불편했겠다. 앞으로 조심할게.',
          goodReason: '사과와 함께 개선 의지 표현',
        },
        {
          situation: '오해를 풀어야 할 때',
          bad: '그게 아니라... 제 말은... 오해예요...',
          badReason: '변명처럼 들림',
          good: '내 말이 오해를 불러일으켰네. 미안해. 내 의도는 이거였어.',
          goodReason: '책임 인정 후 명확한 설명',
        },
      ],
    },
    {
      id: 'compliment',
      title: '칭찬하기',
      icon: '👏',
      color: 'from-emerald-400 to-teal-500',
      situations: [
        {
          situation: '동료의 발표가 좋았을 때',
          bad: '좋았어요...',
          badReason: '성의 없고 구체적이지 않음',
          good: '발표 정말 명확했어! 특히 데이터 부분이 이해하기 쉬웠어.',
          goodReason: '구체적인 부분을 언급하며 칭찬',
        },
        {
          situation: '친구가 좋은 결과를 냈을 때',
          bad: '아 대단하네...',
          badReason: '무관심하게 들림',
          good: '진짜 축하해! 네가 얼마나 열심히 준비했는지 아니까 더 기쁘다!',
          goodReason: '과정을 인정하며 진심으로 축하',
        },
        {
          situation: '후배가 성장했을 때',
          bad: '잘했네.',
          badReason: '건성으로 들림',
          good: '많이 늘었다! 지난번보다 훨씬 정리가 잘 됐어.',
          goodReason: '변화와 발전을 구체적으로 언급',
        },
      ],
    },
    {
      id: 'boundary',
      title: '선 긋기',
      icon: '⛔',
      color: 'from-purple-400 to-pink-500',
      situations: [
        {
          situation: '사적인 질문을 받았을 때',
          bad: '음... 그건... 좀...',
          badReason: '애매하게 답변해서 계속 물어봄',
          good: '그 부분은 개인적인 거라 얘기하기 어려워.',
          goodReason: '명확하게 경계 설정',
        },
        {
          situation: '업무 외 연락이 잦을 때',
          bad: '네... 알겠습니다... (계속 답장)',
          badReason: '경계가 없어 계속 연락 옴',
          good: '업무 시간 외엔 답장이 늦을 수 있어요. 급한 건 업무 시간에 연락 주세요!',
          goodReason: '정중하게 규칙 제시',
        },
        {
          situation: '지나친 농담에 불편할 때',
          bad: '하하... (억지 웃음)',
          badReason: '불편함을 표현하지 않아 반복됨',
          good: '그런 농담은 좀 불편해. 다음엔 자제해줘.',
          goodReason: '직접적으로 불편함 표현',
        },
      ],
    },
    {
      id: 'gratitude',
      title: '감사 표현하기',
      icon: '💝',
      color: 'from-pink-400 to-rose-500',
      situations: [
        {
          situation: '도움을 받았을 때',
          bad: '아 네... 감사합니다...',
          badReason: '형식적이고 성의 없어 보임',
          good: '정말 큰 도움이 됐어! 덕분에 시간 많이 절약했어.',
          goodReason: '구체적으로 어떤 도움이 됐는지 표현',
        },
        {
          situation: '선물을 받았을 때',
          bad: '아니 이런 거까지... 안 그래도 되는데...',
          badReason: '거절하듯 받아 상대를 당황하게 함',
          good: '와! 정성이 느껴진다. 정말 고마워!',
          goodReason: '기쁜 마음을 솔직하게 표현',
        },
        {
          situation: '조언을 받았을 때',
          bad: '네...',
          badReason: '조언을 가볍게 여기는 것처럼 보임',
          good: '좋은 조언 고마워. 그렇게 해볼게!',
          goodReason: '조언을 받아들인다는 의지 표현',
        },
      ],
    },
  ];

  const histories = [
    {
      id: 1,
      date: '2024년 1월 15일 오후 2:30',
      preview: '그냥 언제든 괜찮아요~ 시간 맞춰볼게요',
      tone: '존중',
      status: 'completed'
    },
    {
      id: 2,
      date: '2024년 1월 14일 오전 10:20',
      preview: '아 그거 제가 할게요!',
      tone: '단호함',
      status: 'completed'
    },
    {
      id: 3,
      date: '2024년 1월 13일 오후 4:45',
      preview: '죄송한데 이거 어떻게 하는 건가요?',
      tone: '전문적',
      status: 'completed'
    },
  ];

  const selectedGuideData = guides.find(g => g.id === selectedGuide);

  if (selectedGuide && selectedGuideData) {
    return (
      <div className="px-5 py-6 pb-24 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 min-h-screen">
        <div className="mb-6">
          <button
            onClick={() => setSelectedGuide(null)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-sm font-semibold">돌아가기</span>
          </button>

          <div className="text-center mb-8">
            <div className="text-6xl mb-3">{selectedGuideData.icon}</div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              {selectedGuideData.title}
            </h2>
            <p className="text-sm text-gray-600">상황별 대화 가이드</p>
          </div>
        </div>

        <div className="space-y-5">
          {selectedGuideData.situations.map((sit, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-6 shadow-xl border-2 border-purple-100">
              <h3 className="text-lg font-bold text-gray-900 mb-5 pb-3 border-b-2 border-gray-100">
                {sit.situation}
              </h3>

              {/* Bad Example */}
              <div className="mb-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                    <svg className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <span className="text-sm font-bold text-red-700 uppercase">Bad</span>
                </div>
                <div className="bg-red-50 rounded-xl p-4 mb-2 border-l-4 border-red-400">
                  <p className="text-sm text-gray-900 font-medium mb-2">"{sit.bad}"</p>
                  <p className="text-xs text-red-700">❌ {sit.badReason}</p>
                </div>
              </div>

              {/* Good Example */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                    <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm font-bold text-emerald-700 uppercase">Good</span>
                </div>
                <div className="bg-emerald-50 rounded-xl p-4 border-l-4 border-emerald-400">
                  <p className="text-sm text-gray-900 font-semibold mb-2">"{sit.good}"</p>
                  <p className="text-xs text-emerald-700">✓ {sit.goodReason}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="px-5 py-6 pb-24 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
          기록
        </h1>
        <p className="text-sm text-gray-600">
          상황별 대화 가이드
        </p>
      </div>

      {/* 상황별 가이드 Grid */}
      <div className="mb-8">
        <h2 className="text-lg font-bold text-gray-900 mb-4">상황별 대화 가이드</h2>
        <div className="grid grid-cols-2 gap-3">
          {guides.map((guide) => (
            <button
              key={guide.id}
              onClick={() => setSelectedGuide(guide.id)}
              className={`bg-gradient-to-br ${guide.color} rounded-2xl p-5 text-white shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02] active:scale-[0.98]`}
            >
              <div className="text-4xl mb-2">{guide.icon}</div>
              <div className="text-sm font-bold">{guide.title}</div>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}
