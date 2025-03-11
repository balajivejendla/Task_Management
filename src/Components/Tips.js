import React, { useState } from 'react';

export default function Tips() {
  const [isOpen, setIsOpen] = useState(true);

  const tips = [
    'Click ✅ to mark tasks as complete',
    'Use high priority for urgent tasks',
    'Set reminders for important deadlines',
    'Filter tasks by date using the dropdown',
    'Click on a task to see more details',
    'Use search to find specific tasks quickly'
  ];

  return (
    <>
    <br/>
    <br/>
    
    <div className="tips-section mb-4" 
      style={{ 
        backgroundColor: "#FAF3DD", 
        padding: "15px", 
        borderRadius: "8px", 
        border: "2px solid #D4A373",
        maxWidth: "800px",
        margin: "0 auto 20px auto"
      }}>
        
      <div className="d-flex justify-content-between align-items-center">
        <h5 style={{ color: "#4A6656", margin: 0 }}>
          Quick Tips 💡
        </h5>
        <button 
          className="btn btn-sm"
          onClick={() => setIsOpen(!isOpen)}
          style={{
            color: "#4A6656",
            border: "none",
            backgroundColor: "transparent"
          }}
        >
          {isOpen ? '▼' : '▶'}
        </button>
      </div>

      {isOpen && (
        <div className="tips-content mt-3">
          {tips.map((tip, index) => (
            <div 
              key={index} 
              className="tip-item d-flex align-items-center gap-2 mb-2"
            >
              <span style={{ color: "#4A6656" }}>
                • {tip}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
    </>
  );
}