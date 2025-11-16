'use client';

interface Suggestion {
  text: string;
  explanation: string;
  risk: 'low' | 'medium' | 'high';
}

interface SpeechProblem {
  problem: string;
  solution: string;
}

interface AnalysisResult {
  conversationContext?: string;
  conversationMood?: string;
  relationship?: string;
  originalMessage: string;
  suggestions: Suggestion[];
  speechProblems?: SpeechProblem[];
}

interface AnalysisResultsProps {
  result: AnalysisResult | null;
}

export default function AnalysisResults({ result }: AnalysisResultsProps) {
  if (!result) {
    return (
      <div className="bg-white border border-gray-200 rounded-2xl p-12 flex items-center justify-center min-h-[200px] shadow-md">
        <div className="text-center text-gray-400">
          <svg className="mx-auto h-12 w-12 text-gray-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          <p className="text-sm font-medium text-gray-500">분석 결과가 여기에 표시됩니다</p>
          <p className="text-xs mt-1 text-gray-400">이미지를 업로드하고 분석 버튼을 클릭하세요</p>
        </div>
      </div>
    );
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRiskLabel = (risk: string) => {
    switch (risk) {
      case 'low':
        return '안전';
      case 'medium':
        return '주의';
      case 'high':
        return '위험';
      default:
        return '-';
    }
  };

  return (
    <div className="space-y-5">
      {/* 대화 맥락 분석 */}
      {(result.conversationContext || result.conversationMood || result.relationship) && (
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-2xl p-6 shadow-md">
          <h3 className="text-base font-bold text-gray-900 mb-4 uppercase tracking-wide">대화 맥락</h3>

          {result.relationship && (
            <div className="mb-4">
              <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">관계</span>
              <p className="text-sm text-gray-800 font-medium mt-1">{result.relationship}</p>
            </div>
          )}

          {result.conversationMood && (
            <div className="mb-4">
              <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">분위기</span>
              <p className="text-sm text-gray-800 font-medium mt-1">{result.conversationMood}</p>
            </div>
          )}

          {result.conversationContext && (
            <div>
              <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">상황</span>
              <p className="text-sm text-gray-700 leading-relaxed mt-1">{result.conversationContext}</p>
            </div>
          )}
        </div>
      )}

      {/* 원본 메시지 */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-md">
        <h3 className="text-sm font-bold text-gray-600 mb-3 uppercase tracking-wide">원본 메시지</h3>
        <p className="text-base text-gray-900 font-medium leading-relaxed">{result.originalMessage}</p>
      </div>

      {/* 개선된 답변 제안 */}
      <div className="bg-white border-2 border-emerald-200 rounded-2xl p-6 shadow-lg">
        <h3 className="text-base font-bold text-emerald-900 mb-5 uppercase tracking-wide">개선된 답변 제안</h3>

        <div className="space-y-4">
          {result.suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-xl p-5 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <p className="text-base text-gray-900 font-semibold flex-1 leading-relaxed">
                  {suggestion.text}
                </p>
                <span className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wide border ${getRiskColor(suggestion.risk)}`}>
                  {getRiskLabel(suggestion.risk)}
                </span>
              </div>

              <div className="bg-white/80 p-4 rounded-lg border-l-4 border-emerald-500 mb-3">
                <p className="text-sm text-gray-700 leading-relaxed">
                  {suggestion.explanation}
                </p>
              </div>

              <button className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-all text-sm font-semibold shadow-sm hover:shadow-md">
                이 답변 복사하기
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 내 화법 문제점 */}
      {result.speechProblems && result.speechProblems.length > 0 && (
        <div className="bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-200 rounded-2xl p-6 shadow-md">
          <h3 className="text-base font-bold text-orange-900 mb-5 uppercase tracking-wide">내 화법 문제점</h3>

          <div className="space-y-4">
            {result.speechProblems.map((item, index) => (
              <div key={index} className="bg-white rounded-xl p-5 border-l-4 border-red-400">
                <div className="mb-3">
                  <span className="text-xs font-bold text-red-700 uppercase">문제</span>
                  <p className="text-sm text-gray-900 font-semibold mt-1">{item.problem}</p>
                </div>
                <div className="bg-emerald-50 p-3 rounded-lg">
                  <span className="text-xs font-bold text-emerald-700 uppercase">해결</span>
                  <p className="text-sm text-emerald-800 font-medium mt-1">{item.solution}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
