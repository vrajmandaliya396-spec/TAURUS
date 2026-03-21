import React from 'react';
import { Bot, User } from 'lucide-react';

const MessageBubble = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`message-wrapper ${isUser ? 'user' : 'ai'}`}>
      <div className={`avatar ${isUser ? 'user' : 'ai'}`}>
        {isUser ? <User size={20} /> : <Bot size={20} />}
      </div>
      <div className="message-content">
        {message.text}
      </div>
    </div>
  );
};

export default MessageBubble;
