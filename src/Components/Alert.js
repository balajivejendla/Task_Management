import React from 'react';

const TaskAlert = ({ message, type, onClose }) => {
  return (
    <div 
      className="task-alert"
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 1000,
        backgroundColor: type === 'success' ? '#77BFA3' : '#D4A373',
        color: '#FAF3DD',
        padding: '15px 25px',
        borderRadius: '8px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        animation: 'slideIn 0.3s ease-out',
        marginTop:'60px'
      }}
    >
      <span>{message}</span>
      <button
        onClick={onClose}
        style={{
          background: 'none',
          border: 'none',
          color: '#FAF3DD',
          fontSize: '20px',
          cursor: 'pointer',
          padding: '0 5px'
        }}
      >
        ×
      </button>
    </div>
  );
};

export default TaskAlert;