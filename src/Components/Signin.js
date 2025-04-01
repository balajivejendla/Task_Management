import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../Components/AuthContext';
const Signin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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
  }, []);

  const generateCaptcha = () => {
    const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setCaptcha(result);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (userCaptcha !== captcha) {
      setError('Invalid captcha! Please try again.');
      generateCaptcha();
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

          <div className="captcha-container">
            <div className="captcha-box">
              {captcha.split('').map((char, index) => (
                <span key={index} style={{
                  transform: `rotate(${Math.random() * 20 - 10}deg)`
                }}>
                  {char}
                </span>
              ))}
            </div>
            <button 
              type="button" 
              className="refresh-captcha"
              onClick={generateCaptcha}
            >
              ↻
            </button>
          </div>

          <div className="form-group">
            <label>Enter Captcha</label>
            <input
              type="text"
              value={userCaptcha}
              onChange={(e) => setUserCaptcha(e.target.value)}
              placeholder="Enter the captcha above"
              required
            />
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