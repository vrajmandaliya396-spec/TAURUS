import React, { useState, useRef, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import MessageBubble from './components/MessageBubble';
import InputArea from './components/InputArea';
import { Menu, Zap } from 'lucide-react';
import './index.css';

const App = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage = { role: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Mock AI response delay
    setTimeout(() => {
      setMessages((prev) => [
        ...prev, 
        { 
          role: 'ai', 
          text: "I am Taurus AI. I'm currently a prototype, but I'm ready to assist you with your queries using this gorgeous new interface." 
        }
      ]);
      setIsTyping(false);
    }, 1500);
  };

  const handleNewChat = () => {
    setMessages([]);
    setInput('');
    setSidebarOpen(false);
  };

  return (
    <div className="app-container">
      <Sidebar isOpen={isSidebarOpen} onNewChat={handleNewChat} />
      
      <main className="main-chat">
        <header className="chat-header">
          <button 
            className="mobile-menu-btn" 
            onClick={() => setSidebarOpen(!isSidebarOpen)}
          >
            <Menu size={24} color="#fff" />
          </button>
          <span>Taurus</span> AI
        </header>

        <div className="messages-container">
          {messages.length === 0 ? (
            <div className="initial-view">
              <h1>Taurus</h1>
              <p>How can I help you today? Type a prompt below to get started.</p>
            </div>
          ) : (
            <>
              {messages.map((msg, index) => (
                <MessageBubble key={index} message={msg} />
              ))}
              {isTyping && (
                <div className="message-wrapper ai">
                  <div className="avatar ai">
                    <Zap size={20} />
                  </div>
                  <div className="message-content">
                    <div className="typing-indicator">
                      <div className="typing-dot"></div>
                      <div className="typing-dot"></div>
                      <div className="typing-dot"></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        <InputArea 
          input={input} 
          setInput={setInput} 
          onSubmit={handleSend} 
          isTyping={isTyping}
        />
      </main>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          style={{
            position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 5
          }}
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default App;