import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OPENROUTER_API_KEY = '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';

const CompanyChatPage: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([]);
  const [hasResponse, setHasResponse] = useState(false);
  const navigate = useNavigate();
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');

    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: newMessages.map(msg => ({ role: msg.role, content: msg.content })),
        }),
      });

      const data = await response.json();
      if (data.choices && data.choices.length > 0) {
        const assistantMessage = data.choices[0].message.content;
        setMessages([...newMessages, { role: 'assistant', content: assistantMessage }]);
        setHasResponse(true);
      } else {
        setMessages([...newMessages, { role: 'assistant', content: '抱歉，沒有收到回應。' }]);
      }
    } catch (error) {
      console.error('GPT API錯誤:', error);
      setMessages([...newMessages, { role: 'assistant', content: '伺服器錯誤，請稍後再試。' }]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleStartMatching = () => {
    navigate('/company/results');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-100 to-gray-200">
      <header className="bg-white shadow-md p-4 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Talen Tag AI 聊天室</h1>
      </header>

      <main className="flex-1 overflow-auto px-4 py-6 max-w-3xl w-full mx-auto">
        <div className="flex flex-col gap-3">
          {messages.length === 0 && (
            <p className="text-gray-500 text-center mt-20">請輸入訊息開始對話</p>
          )}
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`p-3 max-w-[75%] rounded-xl shadow-md ${
                msg.role === 'user'
                  ? 'bg-blue-100 text-blue-900 self-end rounded-br-none'
                  : 'bg-white text-gray-800 self-start rounded-bl-none'
              }`}
            >
              {msg.content}
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
      </main>

      <div className="bg-white p-4 shadow-inner">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="輸入訊息..."
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition"
          >
            發送
          </button>
        </div>
      </div>

      {hasResponse && (
        <div className="p-4 bg-transparent text-center">
          <button
            onClick={handleStartMatching}
            className="bg-green-500 text-white font-semibold py-2 px-6 rounded-full shadow-md hover:bg-green-600 transition"
          >
            開始人才配對
          </button>
        </div>
      )}
    </div>
  );
};

export default CompanyChatPage;
