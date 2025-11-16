'use client';

import { useRef, useState } from 'react';

interface ImageUploadProps {
  onImageUpload: (imageData: string) => void;
  uploadedImage: string | null;
}

export default function ImageUpload({ onImageUpload, uploadedImage }: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 업로드 가능합니다.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      onImageUpload(result);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      processFile(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = () => {
    onImageUpload('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow">
      <h2 className="text-base font-bold mb-5 text-gray-900 uppercase tracking-wide">
        스크린샷 업로드
      </h2>

      {!uploadedImage ? (
        <div
          onClick={handleClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-3 border-dashed rounded-xl p-16 text-center cursor-pointer transition-all ${
            isDragging
              ? 'border-emerald-500 bg-emerald-50 shadow-inner'
              : 'border-gray-300 hover:border-emerald-400 bg-gray-50 hover:shadow-md'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <div className="space-y-4">
            <svg className="mx-auto h-16 w-16 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
              <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className="text-gray-600">
              <p className="text-base font-semibold">클릭하거나 파일을 드래그하세요</p>
              <p className="text-sm text-gray-500 mt-2">PNG, JPG 형식</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="relative rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
            <img
              src={uploadedImage}
              alt="Uploaded conversation"
              className="w-full h-auto max-h-96 object-contain"
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleClick}
              className="flex-1 py-3 px-5 bg-white text-gray-700 text-base font-semibold rounded-xl border-2 border-gray-300 hover:bg-gray-50 hover:shadow-md transition-all"
            >
              다른 이미지 선택
            </button>
            <button
              onClick={handleRemove}
              className="py-3 px-5 bg-white text-red-600 text-base font-semibold rounded-xl border-2 border-red-300 hover:bg-red-50 hover:shadow-md transition-all"
            >
              삭제
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
