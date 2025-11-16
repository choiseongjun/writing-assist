'use client';

import { ToneType } from '../page';

interface ToneSelectorProps {
  selectedTone: ToneType;
  onToneChange: (tone: ToneType) => void;
}

const tones: Array<{
  value: ToneType;
  label: string;
  description: string;
}> = [
  {
    value: 'assertive',
    label: '단호함',
    description: '명확하고 자신감있게',
  },
  {
    value: 'respectful',
    label: '존중',
    description: '정중하고 배려있게',
  },
  {
    value: 'empathy',
    label: '공감',
    description: '따뜻하고 이해하며',
  },
  {
    value: 'friendly',
    label: '친근함',
    description: '편안하고 친밀하게',
  },
  {
    value: 'professional',
    label: '전문적',
    description: '격식있고 비즈니스적',
  },
];

export default function ToneSelector({ selectedTone, onToneChange }: ToneSelectorProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow">
      <h2 className="text-base font-bold mb-5 text-gray-900 uppercase tracking-wide">
        답변 톤 선택
      </h2>

      <div className="grid grid-cols-2 gap-4">
        {tones.map((tone) => (
          <button
            key={tone.value}
            onClick={() => onToneChange(tone.value)}
            className={`p-5 rounded-xl text-left transition-all border-2 ${
              selectedTone === tone.value
                ? 'bg-emerald-50 border-emerald-600 shadow-md'
                : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm'
            }`}
          >
            <div className={`font-bold text-base mb-2 ${
              selectedTone === tone.value ? 'text-emerald-700' : 'text-gray-900'
            }`}>
              {tone.label}
            </div>
            <div className="text-sm text-gray-500">
              {tone.description}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
