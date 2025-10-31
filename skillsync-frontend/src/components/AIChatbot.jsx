// frontend/src/components/AIChatbot.jsx
import { useState, useEffect, useRef } from 'preact/hooks';
import { MessageSquare, X, Send, Minimize2 } from 'lucide-react';
import aiService from '../services/aiService';

function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: "Hi! I'm SkillSync AI, your career guidance assistant. How can I help you today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Get conversation history (last 10 messages)
      const history = messages.slice(-10).map(msg => ({
        role: msg.type === 'user' ? 'user' : 'assistant',
        content: msg.content
      }));

      const response = await aiService.chat(input, history);

      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: response.response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickActions = [
    "How do I become a Data Analyst?",
    "What skills should I learn?",
    "Suggest a portfolio project",
    "Interview preparation tips"
  ];

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="position-fixed bottom-0 end-0 m-4 btn btn-primary rounded-circle shadow-lg"
        style={{ width: 60, height: 60, zIndex: 1050 }}
        title="Chat with AI"
      >
        <MessageSquare size={24} />
      </button>
    );
  }

  return (
    <div
      className="position-fixed bottom-0 end-0 m-4 bg-white rounded-3 shadow-lg border"
      style={{
        width: 380,
        height: isMinimized ? 60 : 600,
        zIndex: 1050,
        transition: 'height 0.3s ease'
      }}
    >
      {/* Header */}
      <div className="d-flex align-items-center justify-content-between p-3 border-bottom bg-primary text-white rounded-top">
        <div className="d-flex align-items-center gap-2">
          <div className="bg-white rounded-circle p-1">
            <MessageSquare size={20} className="text-primary" />
          </div>
          <div>
            <h6 className="mb-0 fw-bold">SkillSync AI</h6>
            <small style={{ fontSize: '0.75rem', opacity: 0.9 }}>Career Guidance Assistant</small>
          </div>
        </div>
        <div className="d-flex gap-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="btn btn-sm btn-light rounded-circle p-1"
            style={{ width: 28, height: 28 }}
          >
            <Minimize2 size={14} />
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="btn btn-sm btn-light rounded-circle p-1"
            style={{ width: 28, height: 28 }}
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div
            className="p-3 overflow-auto"
            style={{ height: 440, backgroundColor: '#f8f9fa' }}
          >
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`mb-3 d-flex ${msg.type === 'user' ? 'justify-content-end' : 'justify-content-start'}`}
              >
                <div
                  className={`px-3 py-2 rounded-3 ${
                    msg.type === 'user'
                      ? 'bg-primary text-white'
                      : 'bg-white border'
                  }`}
                  style={{ maxWidth: '80%' }}
                >
                  <p className="mb-0 small">{msg.content}</p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="d-flex justify-content-start mb-3">
                <div className="bg-white border px-3 py-2 rounded-3">
                  <div className="d-flex gap-2">
                    <div className="spinner-grow spinner-grow-sm" role="status" style={{ width: 8, height: 8 }}>
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <div className="spinner-grow spinner-grow-sm" role="status" style={{ width: 8, height: 8 }}>
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <div className="spinner-grow spinner-grow-sm" role="status" style={{ width: 8, height: 8 }}>
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {messages.length === 1 && (
              <div className="mt-3">
                <p className="small text-muted mb-2">Quick questions:</p>
                <div className="d-flex flex-column gap-2">
                  {quickActions.map((action, idx) => (
                    <button
                      key={idx}
                      onClick={() => setInput(action)}
                      className="btn btn-sm btn-outline-primary text-start"
                    >
                      {action}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-top bg-white rounded-bottom">
            <div className="d-flex gap-2">
              <input
                type="text"
                value={input}
                onInput={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything..."
                className="form-control"
                disabled={isLoading}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="btn btn-primary"
                style={{ minWidth: 44 }}
              >
                <Send size={18} />
              </button>
            </div>
            <small className="text-muted d-block mt-2" style={{ fontSize: '0.7rem' }}>
              Powered by AI • Responses may vary
            </small>
          </div>
        </>
      )}
    </div>
  );
}

export default AIChatbot;