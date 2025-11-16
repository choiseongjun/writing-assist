'use client';

import { useState } from 'react';
import ImageUpload from './components/ImageUpload';
import ToneSelector from './components/ToneSelector';
import AnalysisResults from './components/AnalysisResults';
import BottomNav from './components/BottomNav';
import PracticeTab from './components/PracticeTab';
import HistoryTab from './components/HistoryTab';
import LearnTab from './components/LearnTab';
import MyTab from './components/MyTab';

export type ToneType = 'assertive' | 'respectful' | 'empathy' | 'friendly' | 'professional';
type TabType = 'home' | 'practice' | 'history' | 'learn' | 'my';

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedTone, setSelectedTone] = useState<ToneType>('respectful');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const handleImageUpload = (imageData: string) => {
    setUploadedImage(imageData);
    setAnalysisResult(null);
  };

  const handleAnalyze = async () => {
    if (!uploadedImage) return;

    setIsAnalyzing(true);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageData: uploadedImage,
          tone: selectedTone,
        }),
      });

      if (!response.ok) {
        throw new Error('분석에 실패했습니다.');
      }

      const result = await response.json();
      setAnalysisResult(result);
    } catch (error) {
      console.error('분석 오류:', error);
      alert('분석 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="px-6 py-10 pb-10 bg-gradient-to-b from-emerald-50/30 to-transparent">
            {/* Header */}
            <div className="mb-12">
              <h1 className="text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                대화 분석
              </h1>
              <p className="text-lg text-gray-600">
                스크린샷을 업로드하여 대화를 분석하세요
              </p>
            </div>

            {/* Main Content */}
            <div className="space-y-6">
              <ImageUpload
                onImageUpload={handleImageUpload}
                uploadedImage={uploadedImage}
              />

              <ToneSelector
                selectedTone={selectedTone}
                onToneChange={setSelectedTone}
              />

              <button
                onClick={handleAnalyze}
                disabled={!uploadedImage || isAnalyzing}
                className="w-full py-5 px-8 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-lg font-bold rounded-2xl transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                {isAnalyzing ? (
                  <span className="flex items-center justify-center gap-3">
                    <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    분석 중...
                  </span>
                ) : (
                  '대화 분석하기'
                )}
              </button>

              <AnalysisResults result={analysisResult} />
            </div>
          </div>
        );
      case 'practice':
        return <PracticeTab />;
      case 'history':
        return <HistoryTab />;
      case 'learn':
        return <LearnTab />;
      case 'my':
        return <MyTab />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 flex items-center justify-center">
      <div className="w-full max-w-md bg-white min-h-screen shadow-2xl relative">
        <main>
          {renderContent()}
        </main>

        {/* <BottomNav activeTab={activeTab} onTabChange={setActiveTab} /> */}
      </div>
    </div>
  );
}
