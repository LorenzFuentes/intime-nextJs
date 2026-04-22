'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles } from 'lucide-react';
import Input from '../../components/Input';

const Signup: React.FC = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!name || !email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    setError('');
    setIsLoading(true);
    
    // Simulate account creation API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Store user info
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userName', name);
    localStorage.setItem('userEmail', email);
    
    // Redirect to dashboard
    window.location.href = '/screens/dashboard';
  };

  return (
    <div className="login-container">
      {/* Animated background blobs */}
      <div className="bg-blob-1"></div>
      <div className="bg-blob-2"></div>
      <div className="bg-blob-3"></div>
      
      <div className="login-left">
        <div className="login-left-content">
          <div className="logo-badge">
            <Sparkles size={28} />
          </div>
          <h1 className="login-title">InTime</h1>
          <p className="login-description">
            Join <span className="highlight">InTime</span> and start managing your time 
            efficiently. Create an account to access smart scheduling, team collaboration, 
            and powerful analytics.
          </p>
          {/* <div className="feature-list">
            <div className="feature-item">
              <div className="feature-dot"></div>
              <span>Free 14-day trial</span>
            </div>
            <div className="feature-item">
              <div className="feature-dot"></div>
              <span>No credit card required</span>
            </div>
            <div className="feature-item">
              <div className="feature-dot"></div>
              <span>Cancel anytime</span>
            </div>
          </div> */}
        </div>
      </div>
      
      <div className="login-right">
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-header">
            <h2 className="form-title">Create account</h2>
            <p className="form-subtitle">Start your journey with InTime</p>
          </div>
          
          {error && (
            <div className="error-message">
              <span>{error}</span>
            </div>
          )}
          
          <Input
            type="text"
            label="Full name"
            placeholder="Juan Dela Cruz"
            value={name}
            onChange={(e) => setName(e.target.value)}
            name="name"
            required
          />
          
          <Input
            type="email"
            label="Email address"
            placeholder="hello@intime.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            required
          />
          
          <Input
            type="password"
            label="Password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            required
          />
          
          <Input
            type="password"
            label="Confirm password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            name="confirmPassword"
            required
          />
          
          <div className="terms-agreement">
            <label className="checkbox-label">
              <input type="checkbox" required />
              <span>I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a></span>
            </label>
          </div>
          
          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? (
              <>
                <div className="spinner"></div>
                Creating account...
              </>
            ) : (
              'Sign Up'
            )}
          </button>
          
          <p className="signup-prompt">
            Already have an account? <a href="/">Sign in</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;