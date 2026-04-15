'use client';

import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import Input from '../components/Input';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Login attempt:', { email, password });
    setIsLoading(false);
  };

  return (
    <div className="login-container">
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
            Manage users, admins, events, and more with <span className="highlight">InTime</span>, 
            the ultimate time management solution.
          </p>
          <div className="feature-list">
            <div className="feature-item">
              <div className="feature-dot"></div>
              <span>Event Scheduling</span>
            </div>
            <div className="feature-item">
              <div className="feature-dot"></div>
              <span>User Management</span>
            </div>
            <div className="feature-item">
              <div className="feature-dot"></div>
              <span>Analytics Dashboard</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="login-right">
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-header">
            <h2 className="form-title">Welcome back</h2>
            <p className="form-subtitle">Sign in to your account</p>
          </div>
          
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
          
          <div className="form-options">
            <label className="checkbox-label">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
            <a href="#" className="forgot-link">Forgot password?</a>
          </div>
          
          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? <div className="spinner"></div> : 'Sign In'}
          </button>
          
          <p className="signup-prompt">
            Don't have an account? <a href="#">Create account</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;