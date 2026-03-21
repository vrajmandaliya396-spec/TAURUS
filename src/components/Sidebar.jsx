import React from 'react';
import { Plus, MessageSquare } from 'lucide-react';

const Sidebar = ({ isOpen, onNewChat }) => {
  const history = [
    'React components architecture',
    'How to learn machine learning',
    'CSS flexbox vs grid',
    'Write a python script for...',
  ];

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button className="new-chat-btn" onClick={onNewChat}>
        <Plus size={20} />
        New chat
      </button>

      <div className="history-list">
        {history.map((title, i) => (
          <div key={i} className="history-item">
            <MessageSquare size={16} />
            <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
