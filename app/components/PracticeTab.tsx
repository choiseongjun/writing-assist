'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  id: number;
  type: 'user' | 'ai' | 'feedback';
  text: string;
  timestamp: Date;
  feedback?: {
    originalText: string;
    suggestions: Array<{
      text: string;
      reason: string;
      tone: string;
    }>;
    warning?: string;
  };
}

export default function PracticeTab() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'ai',
      text: '안녕하세요! 저는 대화 연습을 도와주는 AI 코치예요 💕\n실제 상황처럼 대화해보세요. 메시지를 보내면 더 나은 표현을 제안해드릴게요!',
      timestamp: new Date(),
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const analyzeTone = (text: string) => {
    // TODO: 실제 AI API 연동
    // 임시 분석 로직
    const hasPassive = text.includes('그냥') || text.includes('~요') || text.includes('괜찮');
    const hasQuestion = text.includes('?');

    return {
      originalText: text,
      suggestions: [
        {
          text: text.replace('그냥 ', '').replace('~요', '습니다'),
          reason: '더 명확하고 자신감 있는 표현이에요',
          tone: '단호함',
        },
        {
          text: `${text} 어떻게 생각하세요?`,
          reason: '상대방의 의견을 존중하면서도 적극적으로 소통해요',
          tone: '존중',
        }
      ],
      warning: hasPassive ? '수동적인 표현이 포함되어 있어요. 더 적극적으로 표현해볼까요?' : undefined,
    };
  };

  const handleSend = () => {
    if (!inputText.trim()) return;

    // 사용자 메시지 추가
    const userMessage: Message = {
      id: Date.now(),
      type: 'user',
      text: inputText,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsAnalyzing(true);

    // AI 분석 시뮬레이션
    setTimeout(() => {
      const feedback = analyzeTone(inputText);

      // 피드백 메시지 추가
      const feedbackMessage: Message = {
        id: Date.now() + 1,
        type: 'feedback',
        text: '메시지를 분석했어요!',
        timestamp: new Date(),
        feedback,
      };

      setMessages(prev => [...prev, feedbackMessage]);

      // AI 응답 추가
      setTimeout(() => {
        const aiMessage: Message = {
          id: Date.now() + 2,
          type: 'ai',
          text: '좋아요! 계속 연습해볼까요? 다른 상황에서는 어떻게 말할지 연습해보세요 😊',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, aiMessage]);
        setIsAnalyzing(false);
      }, 500);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('복사되었어요! 📋');
  };

  return (
    <div className="flex flex-col h-screen pb-16">
      {/* Header */}
      <div className="px-5 py-6 bg-gradient-to-br from-purple-100 via-pink-100 to-rose-100 border-b-2 border-pink-200">
        <div className="text-center">
          <span className="text-5xl mb-3 inline-block">💬</span>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 bg-clip-text text-transparent mb-2">
            대화 연습
          </h1>
          <p className="text-sm text-gray-600">
            AI와 실시간으로 대화하며 말투를 연습해요 ✨
          </p>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-gradient-to-b from-pink-50/20 to-transparent">
        {messages.map((message) => (
          <div key={message.id}>
            {message.type === 'user' && (
              <div className="flex justify-end">
                <div className="max-w-[80%] bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-2xl rounded-tr-sm px-4 py-3 shadow-md">
                  <p className="text-sm font-medium">{message.text}</p>
                  <p className="text-xs text-white/70 mt-1">
                    {message.timestamp.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            )}

            {message.type === 'ai' && (
              <div className="flex justify-start">
                <div className="max-w-[80%]">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl">🤖</span>
                    <span className="text-xs font-bold text-purple-600">AI 코치</span>
                  </div>
                  <div className="bg-white border-2 border-purple-100 rounded-2xl rounded-tl-sm px-4 py-3 shadow-md">
                    <p className="text-sm text-gray-800 whitespace-pre-line">{message.text}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {message.timestamp.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {message.type === 'feedback' && message.feedback && (
              <div className="my-4">
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-4 border-2 border-indigo-200 shadow-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl">✨</span>
                    <h3 className="text-sm font-bold text-gray-800">분석 결과</h3>
                  </div>

                  {/* Original */}
                  <div className="bg-white rounded-xl p-3 mb-3 border border-gray-200">
                    <p className="text-xs text-gray-500 mb-1 font-semibold">원본</p>
                    <p className="text-sm text-gray-800 font-medium">{message.feedback.originalText}</p>
                  </div>

                  {/* Warning */}
                  {message.feedback.warning && (
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded-lg p-3 mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">⚠️</span>
                        <p className="text-xs text-yellow-800 font-medium">{message.feedback.warning}</p>
                      </div>
                    </div>
                  )}

                  {/* Suggestions */}
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-gray-600 mb-2">💡 이렇게 말해보는 건 어때요?</p>
                    {message.feedback.suggestions.map((suggestion, idx) => (
                      <div key={idx} className="bg-white rounded-xl p-3 border-2 border-pink-100 hover:border-pink-300 transition-all">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <p className="text-sm font-bold text-gray-900 flex-1">{suggestion.text}</p>
                          <span className="px-2 py-1 bg-gradient-to-r from-pink-400 to-purple-400 text-white text-xs font-bold rounded-full">
                            {suggestion.tone}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 mb-2">{suggestion.reason}</p>
                        <button
                          onClick={() => copyToClipboard(suggestion.text)}
                          className="w-full py-2 px-3 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-lg text-xs font-bold hover:from-pink-500 hover:to-purple-500 transition-all shadow-sm"
                        >
                          이 표현 복사하기 📋
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        {isAnalyzing && (
          <div className="flex justify-start">
            <div className="bg-white border-2 border-purple-100 rounded-2xl px-4 py-3 shadow-md">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
                <span className="text-xs text-gray-500 font-medium">분석 중...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="px-4 py-3 bg-white border-t-2 border-pink-100 shadow-lg">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="메시지를 입력하세요..."
            className="flex-1 px-4 py-3 border-2 border-pink-200 rounded-2xl focus:outline-none focus:border-pink-400 text-sm"
            disabled={isAnalyzing}
          />
          <button
            onClick={handleSend}
            disabled={!inputText.trim() || isAnalyzing}
            className="px-6 py-3 bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 disabled:from-gray-300 disabled:to-gray-300 text-white font-bold rounded-2xl transition-all shadow-md hover:shadow-lg disabled:cursor-not-allowed"
          >
            전송
          </button>
        </div>
      </div>
    </div>
  );
}
