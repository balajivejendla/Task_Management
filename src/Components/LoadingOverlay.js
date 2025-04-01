import React from 'react';


const LoadingOverlay = ({ type }) => {
  console.log('Loading type:', type); // Add this for debugging

  const getLoadingConfig = () => {
    switch(type) {
      case 'features':
        return {
          gif: process.env.PUBLIC_URL + '/loadingbar.gif',
          text: 'Loading Features...'
        };
      case 'contact':
        return {
          gif: process.env.PUBLIC_URL + '/loadingbar.gif',
          text: 'Loading Contact...'
        };
      case 'tips':
        return {
          gif: process.env.PUBLIC_URL + '/dot.gif',
          text: 'Loading Tips...'
        };
        case 'signin':
            return {
              gif: process.env.PUBLIC_URL + '/loading.gif',
              text: 'Loading Sign In...'
            };
    }
  };

  const config = getLoadingConfig();

  return (
    <div className="loading-overlay">
      <div className="loading-spinner">
        <div className="gif-container">
          <img 
            key={type} // Add key to force re-render
            src={config.gif}
            alt={config.text}
            className="loading-gif"
          />
        </div>
        <p className="loading-text">{config.text}</p>
      </div>
    </div>
  );
};

export default LoadingOverlay;