import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../Components/AuthContext';
const Signin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [captchaType, setCaptchaType] = useState('text'); // 'text', 'math', or 'image'
const [mathCaptcha, setMathCaptcha] = useState({ question: '', answer: '' });
const [imageCaptcha, setImageCaptcha] = useState({
  images: [],
  correctImage: null,
  selectedImage: null
});

  const [captcha, setCaptcha] = useState('');
  const [userCaptcha, setUserCaptcha] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();
  // Generate random captcha on component mount
  useEffect(() => {
    generateCaptcha();
    generateMathCaptcha();
    generateImageCaptcha();
  }, []);

  const generateCaptcha = () => {
    const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setCaptcha(result);
  };
  const generateMathCaptcha = () => {
    const operations = ['+', '-', '*'];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    let num1, num2, answer;
  
    switch (operation) {
      case '+':
        num1 = Math.floor(Math.random() * 10);
        num2 = Math.floor(Math.random() * 10);
        answer = num1 + num2;
        break;
      case '-':
        num1 = Math.floor(Math.random() * 10) + 5;
        num2 = Math.floor(Math.random() * 5);
        answer = num1 - num2;
        break;
      case '*':
        num1 = Math.floor(Math.random() * 5) + 1;
        num2 = Math.floor(Math.random() * 5) + 1;
        answer = num1 * num2;
        break;
      default:
        break;
    }
  
    setMathCaptcha({
      question: `${num1} ${operation} ${num2} = ?`,
      answer: answer.toString()
    });
  };
  const generateImageCaptcha = () => {
    // Generate 4 random images (in a real app, these would be actual images)
    const images = [
      { id: 1, type: 'cat' },
      { id: 2, type: 'dog' },
      { id: 3, type: 'cat' },
      { id: 4, type: 'dog' }
    ];
    
    // Shuffle the images
    const shuffledImages = images.sort(() => Math.random() - 0.5);
    
    // Randomly select a type to match
    const types = ['cat', 'dog'];
    const correctType = types[Math.floor(Math.random() * types.length)];
    
    setImageCaptcha({
      images: shuffledImages,
      correctType,
      selectedImage: null
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const isValid = captchaType === 'text' 
      ? userCaptcha === captcha
      : captchaType === 'math'
      ? userCaptcha === mathCaptcha.answer
      : imageCaptcha.selectedImage?.type === imageCaptcha.correctType;
  
    if (!isValid) {
      setError('Invalid captcha! Please try again.');
      captchaType === 'text' ? generateCaptcha() : captchaType === 'math' ? generateMathCaptcha() : generateImageCaptcha();
      setUserCaptcha('');
      return;
    }

    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoading(false);

    if (formData.email && formData.password) {
      setIsAuthenticated(true);
      alert('Successfully signed in!');
      navigate('/');
    } else {
      setError('Please fill in all fields');
    }
  };

  const handleImageSelect = (image) => {
    setImageCaptcha(prev => ({
      ...prev,
      selectedImage: image
    }));
  };

  return (
    <div className="signin-container" style={{ padding: '40px 0' }}>
      <div className="signin-card" style={{ 
        maxWidth: '500px',
        margin: '0 auto',
        padding: '40px',
        borderRadius: '15px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ 
          textAlign: 'center',
          marginBottom: '30px',
          color: '#4A6656'
        }}>
          Sign In to TaskFlow Pro
        </h2>
        {error && <div className="error-message" style={{
          backgroundColor: '#ffebee',
          color: '#c62828',
          padding: '10px',
          borderRadius: '5px',
          marginBottom: '20px',
          textAlign: 'center'
        }}>{error}</div>}
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
          <div className="form-group" style={{ marginBottom: '20px' }}>
            <label style={{ 
              display: 'block',
              marginBottom: '8px',
              color: '#4A6656',
              fontWeight: '500'
            }}>
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '2px solid #D4A373',
                backgroundColor: '#FAF3DD',
                fontSize: '16px'
              }}
            />
          </div>

          <div className="form-group" style={{ marginBottom: '20px' }}>
            <label style={{ 
              display: 'block',
              marginBottom: '8px',
              color: '#4A6656',
              fontWeight: '500'
            }}>
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '2px solid #D4A373',
                backgroundColor: '#FAF3DD',
                fontSize: '16px'
              }}
            />
          </div>

          <div className="captcha-section" style={{ 
            backgroundColor: '#FAF3DD',
            padding: '20px',
            borderRadius: '10px',
            border: '2px solid #D4A373',
            marginBottom: '20px'
          }}>
            <div className="captcha-type-toggle" style={{ 
              display: 'flex',
              justifyContent: 'center',
              gap: '10px',
              marginBottom: '20px'
            }}>
              <button 
                type="button"
                onClick={() => {
                  setCaptchaType('text');
                  generateCaptcha();
                  setUserCaptcha('');
                }}
                className={`toggle-button ${captchaType === 'text' ? 'active' : ''}`}
                style={{
                  padding: '5px 10px',
                  margin: '0 5px',
                  backgroundColor: captchaType === 'text' ? '#4A6656' : '#FAF3DD',
                  color: captchaType === 'text' ? '#FAF3DD' : '#4A6656',
                  border: '1px solid #4A6656',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Text Captcha
              </button>
              <button 
                type="button"
                onClick={() => {
                  setCaptchaType('math');
                  generateMathCaptcha();
                  setUserCaptcha('');
                }}
                className={`toggle-button ${captchaType === 'math' ? 'active' : ''}`}
                style={{
                  padding: '5px 10px',
                  margin: '0 5px',
                  backgroundColor: captchaType === 'math' ? '#4A6656' : '#FAF3DD',
                  color: captchaType === 'math' ? '#FAF3DD' : '#4A6656',
                  border: '1px solid #4A6656',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Math Captcha
              </button>
              <button 
                type="button"
                onClick={() => {
                  setCaptchaType('image');
                  generateImageCaptcha();
                  setUserCaptcha('');
                }}
                className={`toggle-button ${captchaType === 'image' ? 'active' : ''}`}
                style={{
                  padding: '5px 10px',
                  margin: '0 5px',
                  backgroundColor: captchaType === 'image' ? '#4A6656' : '#FAF3DD',
                  color: captchaType === 'image' ? '#FAF3DD' : '#4A6656',
                  border: '1px solid #4A6656',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Image Captcha
              </button>
            </div>

            <div className="captcha-container" style={{ 
              textAlign: 'center',
              marginBottom: '20px'
            }}>
              {captchaType === 'text' ? (
                <div className="captcha-box">
                  {captcha.split('').map((char, index) => (
                    <span key={index} style={{
                      transform: `rotate(${Math.random() * 20 - 10}deg)`
                    }}>
                      {char}
                    </span>
                  ))}
                </div>
              ) : captchaType === 'math' ? (
                <div className="captcha-box math-captcha">
                  <span style={{ fontSize: '1.2em', fontWeight: 'bold' }}>
                    {mathCaptcha.question}
                  </span>
                </div>
              ) : (
                <div className="image-captcha">
                  <p style={{ marginBottom: '10px', color: '#4A6656' }}>
                    Select all images of {imageCaptcha.correctType}s:
                  </p>
                  <div className="image-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '10px'
                  }}>
                    {imageCaptcha.images.map((image) => (
                      <div
                        key={image.id}
                        onClick={() => handleImageSelect(image)}
                        style={{
                          padding: '10px',
                          border: `2px solid ${
                            imageCaptcha.selectedImage?.id === image.id
                              ? image.type === imageCaptcha.correctType
                                ? '#4A6656'
                                : '#dc3545'
                              : '#D4A373'
                          }`,
                          borderRadius: '8px',
                          cursor: 'pointer',
                          backgroundColor: '#FAF3DD',
                          textAlign: 'center'
                        }}
                      >
                        {image.type === 'cat' ? '🐱' : '🐶'}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <button 
                type="button" 
                className="refresh-captcha"
                onClick={
                  captchaType === 'text' 
                    ? generateCaptcha 
                    : captchaType === 'math'
                    ? generateMathCaptcha
                    : generateImageCaptcha
                }
                style={{
                  marginTop: '10px',
                  padding: '5px 10px',
                  backgroundColor: '#4A6656',
                  color: '#FAF3DD',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                ↻ Refresh
              </button>
            </div>

            {captchaType !== 'image' && (
              <div className="form-group" style={{ marginTop: '15px' }}>
                <label style={{ 
                  display: 'block',
                  marginBottom: '8px',
                  color: '#4A6656',
                  fontWeight: '500'
                }}>
                  {captchaType === 'text' ? 'Enter Captcha Text' : 'Enter Answer'}
                </label>
                <input
                  type="text"
                  value={userCaptcha}
                  onChange={(e) => setUserCaptcha(e.target.value)}
                  placeholder={captchaType === 'text' ? 'Enter the captcha above' : 'Enter your answer'}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '2px solid #D4A373',
                    backgroundColor: '#FAF3DD',
                    fontSize: '16px'
                  }}
                />
              </div>
            )}
          </div>

          <button 
            type="submit" 
            className="signin-button"
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#4A6656',
              color: '#FAF3DD',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '500',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
              transition: 'all 0.3s ease'
            }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signin;