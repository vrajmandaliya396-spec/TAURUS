import React, { useRef, useEffect } from 'react';
import { Send, Terminal } from 'lucide-react';

const InputArea = ({ input, setInput, onSubmit, isTyping }) => {
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [input]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (input.trim() && !isTyping) {
        onSubmit();
      }
    }
  };

  return (
    <div className="input-container-wrapper">
      <div className="input-container">
        <div className="input-actions" style={{ marginRight: '0.5rem' }}>
          <button className="icon-btn">
            <Terminal size={20} />
          </button>
        </div>
        
        <textarea
          ref={textareaRef}
          className="chat-input"
          placeholder="Accessing neural net..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
        />
        
        <div className="input-actions" style={{ marginLeft: 'auto' }}>
          <button 
            className="send-btn" 
            onClick={onSubmit}
            disabled={isTyping || !input.trim()}
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputArea;
