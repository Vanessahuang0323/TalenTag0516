import React from 'react';
import { useNavigate } from 'react-router-dom';

const CompanyResultsPage: React.FC = () => {
  const navigate = useNavigate();

  const handleNextStep = () => {
    navigate('/company/talent-matching');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col items-center justify-center p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">AI 分析結果</h1>
        <p className="text-gray-600 text-lg">根據您與 AI 的對話，我們為您準備了以下建議</p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 max-w-2xl w-full mb-10 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">📊 分析報告摘要</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>您目前的人才需求偏向創意與語言溝通能力</li>
          <li>建議關注具備文學背景、專案管理經驗者</li>
          <li>適合招募對 AI 工具具開放態度的人選</li>
        </ul>
      </div>

      <button
        onClick={handleNextStep}
        className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold py-3 px-6 rounded-full shadow-md flex items-center transition duration-300 group"
      >
        <span>開始人才配對</span>
        <svg
          className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default CompanyResultsPage;
