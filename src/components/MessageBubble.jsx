import React from 'react';

const MessageBubble = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`message-wrapper ${isUser ? 'user' : 'ai'}`}>
      <div className={`avatar ${isUser ? 'user' : 'ai'}`}>
        {isUser ? (
          <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>US</span>
        ) : (
          <span style={{ fontFamily: 'Orbitron', fontWeight: 700, fontSize: '0.8rem', color: 'var(--accent-cyan)' }}>AI</span>
        )}
      </div>
      <div className="message-content">
        {message.text}
      </div>
    </div>
  );
};

export default MessageBubble;
