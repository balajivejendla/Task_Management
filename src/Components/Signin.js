import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../Components/AuthContext';
const Signin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [captchaType, setCaptchaType] = useState('text'); // 'text' or 'math'
const [mathCaptcha, setMathCaptcha] = useState({ question: '', answer: '' });

  const [captcha, setCaptcha] = useState('');
  const [userCaptcha, setUserCaptcha] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();
  // Generate random captcha on component mount
  useEffect(() => {
    generateCaptcha();
  }, []);
  useEffect(() => {
    generateCaptcha();
    generateMathCaptcha();
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
      : userCaptcha === mathCaptcha.answer;
  
    if (!isValid) {
      setError('Invalid captcha! Please try again.');
      captchaType === 'text' ? generateCaptcha() : generateMathCaptcha();
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

  return (
    
    <div className="signin-container">
      <div className="signin-card">
        <br/>
        <br/>
        <h2>Sign In to TaskFlow Pro</h2>
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="captcha-section">
  <div className="captcha-type-toggle">
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
  </div>

  <div className="captcha-container">
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
    ) : (
      <div className="captcha-box math-captcha">
        <span style={{ fontSize: '1.2em', fontWeight: 'bold' }}>
          {mathCaptcha.question}
        </span>
      </div>
    )}
    <button 
      type="button" 
      className="refresh-captcha"
      onClick={captchaType === 'text' ? generateCaptcha : generateMathCaptcha}
    >
      ↻
    </button>
  </div>

  <div className="form-group">
    <label>
      {captchaType === 'text' ? 'Enter Captcha Text' : 'Enter Answer'}
    </label>
    <input
      type="text"
      value={userCaptcha}
      onChange={(e) => setUserCaptcha(e.target.value)}
      placeholder={captchaType === 'text' ? 'Enter the captcha above' : 'Enter your answer'}
      required
    />
  </div>
</div>



          <button 
            type="submit" 
            className="signin-button"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signin;