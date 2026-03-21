import React, { useRef, useEffect } from 'react';
import { Paperclip, Mic, Send } from 'lucide-react';

const InputArea = ({ input, setInput, onSubmit, isTyping }) => {
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
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
        <div className="input-actions">
          <button className="icon-btn"><Paperclip size={20} /></button>
        </div>
        
        <textarea
          ref={textareaRef}
          className="chat-input"
          placeholder="Message Taurus..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
        />
        
        <div className="input-actions" style={{ marginLeft: 'auto' }}>
          {input.trim() ? (
            <button 
              className="send-btn" 
              onClick={onSubmit}
              disabled={isTyping}
            >
              <Send size={18} />
            </button>
          ) : (
            <button className="icon-btn"><Mic size={20} /></button>
          )}
        </div>
      </div>
    </div>
  );
};

export default InputArea;
