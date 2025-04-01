import React, { useState } from 'react';

const Signin = () => {
  const [loading, setLoading] = useState(false);
  const [selectedLoader, setSelectedLoader] = useState('progress');

  const handleDemo = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 3000);
  };

  const LoadingIndicator = ({ type }) => {
    switch(type) {
      case 'progress':
        return (
          <div className="linear-progress">
            <div className="linear-progress-bar"></div>
          </div>
        );
      
      case 'circular':
        return (
          <div className="circular-progress">
            <svg viewBox="0 0 50 50">
              <circle cx="25" cy="25" r="20"></circle>
            </svg>
          </div>
        );
      
      case 'skeleton':
        return (
          <div className="skeleton-loader">
            <div className="skeleton-line"></div>
            <div className="skeleton-line"></div>
          </div>
        );
      
      case 'wave':
        return (
          <div className="wave-loader">
            <div></div><div></div><div></div><div></div><div></div>
          </div>
        );
      
      case 'gradient':
        return (
          <div className="gradient-progress">
            <div className="gradient-bar"></div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="loading-demo-container">
        <br/>
        <br/>
      <h2>Loading Indicators Demo</h2>
      
      <div className="loader-selector">
        <select 
          value={selectedLoader} 
          onChange={(e) => setSelectedLoader(e.target.value)}
          style={{
            padding: '8px',
            marginBottom: '20px',
            borderRadius: '4px',
            border: '2px solid #D4A373'
          }}
        >
          <option value="progress">Linear Progress</option>
          <option value="circular">Circular Progress</option>
          <option value="skeleton">Skeleton Loading</option>
          <option value="wave">Wave Loading</option>
          <option value="gradient">Gradient Progress</option>
        </select>
      </div>

      <div className="loader-display">
        {loading && <LoadingIndicator type={selectedLoader} />}
      </div>

      <button 
        onClick={handleDemo}
        disabled={loading}
        style={{
          backgroundColor: '#77BFA3',
          color: '#FAF3DD',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        {loading ? 'Loading...' : 'Test Loading Animation'}
      </button>
    </div>
  );
};

export default Signin;