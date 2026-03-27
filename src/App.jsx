import React, { useState, useRef, useEffect } from 'react';
import MessageBubble from './components/MessageBubble';
import InputArea from './components/InputArea';
import './index.css';

const App = () => {
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

  const handleSend = async () => {
    const userMessage = { role: 'user', text: input };

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer YOUR_API_KEY"
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: "You are Taurus AI, a futuristic assistant." },
            { role: "user", content: input }
          ]
        })
      });

      const data = await response.json();

      const aiReply = data.choices[0].message.content;

      setMessages((prev) => [
        ...prev,
        { role: "ai", text: aiReply }
      ]);

    } catch (error) {
      console.error("Error:", error);
    }

  }



  return (
    <div className="app-container">
      {/* Background Starfield */}
      <div className="starfield"></div>

      {/* Main App Content */}
      <main className="main-chat">
        <header className="chat-header">
          TAURUS <span>// AI SYS</span>
        </header>

        {/* Central AI Core Ring System - transitions to top/background when messages exist */}
        <div className={`core-container ${messages.length > 0 ? 'shifting-up' : ''}`}>
          <div className={`ai-core ${isTyping ? 'typing' : ''}`}>
            <div className="ring ring-1"></div>
            <div className="ring ring-2"></div>
            <div className="ring ring-3"></div>
            <div className="core-center"></div>
          </div>
        </div>

        <div className="messages-container">
          {messages.length === 0 ? (
            <div className="initial-view">
              <h1>TAURUS</h1>
              <p>System initialized. Awaiting commands...</p>
            </div>
          ) : (
            <>
              {messages.map((msg, index) => (
                <MessageBubble key={index} message={msg} />
              ))}
              {isTyping && (
                <div className="message-wrapper ai">
                  <div className="avatar ai">
                    <span style={{ fontFamily: 'Orbitron', fontWeight: 700, fontSize: '10px' }}>AI</span>
                  </div>
                  <div className="message-content" style={{ padding: '0.75rem 1.5rem', background: 'transparent', border: 'none', boxShadow: 'none' }}>
                    <div className="waveform">
                      <div className="wave-bar"></div>
                      <div className="wave-bar"></div>
                      <div className="wave-bar"></div>
                      <div className="wave-bar"></div>
                      <div className="wave-bar"></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} style={{ height: 40 }} />
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
    </div>
  );
};

export default App;
