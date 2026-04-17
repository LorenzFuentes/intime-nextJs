'use client';

import React, { useState, useEffect } from 'react';
import { 
  User, 
  Clock, 
  LogIn, 
  LogOut, 
  Calendar, 
  TrendingUp,
  Settings,
  Bell,
  Menu,
  X,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTimedIn, setIsTimedIn] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [shiftStartTime, setShiftStartTime] = useState<Date | null>(null);
  const [shiftDuration, setShiftDuration] = useState(0);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  // Mock user data
  const user = {
    name: 'Lorenz Sebastian Fuentes',
    email: 'lorenz.fuentes@intime.com',
    role: 'Frontend Developer',
    avatar: 'https://ui-avatars.com/api/?name=Lorenz+Fuentes&background=80c65E&color=fff',
    joinDate: 'January 2024',
    totalHours: '438',
    shiftsCompleted: 63,
  };

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      if (isTimedIn && shiftStartTime) {
        const duration = Math.floor((new Date().getTime() - shiftStartTime.getTime()) / 1000);
        setShiftDuration(duration);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [isTimedIn, shiftStartTime]);

  const showMessage = (message: string, isError: boolean = false) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const handleTimeIn = () => {
    const now = new Date();
    setIsTimedIn(true);
    setShiftStartTime(now);
    showMessage(`✅ Timed in successfully at ${now.toLocaleTimeString()}`);
  };

  const handleTimeOut = () => {
    if (shiftStartTime) {
      const endTime = new Date();
      const durationMs = endTime.getTime() - shiftStartTime.getTime();
      const hours = Math.floor(durationMs / 3600000);
      const minutes = Math.floor((durationMs % 3600000) / 60000);
      
      setIsTimedIn(false);
      setShiftDuration(0);
      showMessage(`⏱️ Timed out after ${hours}h ${minutes}m. Great work!`);
    }
  };

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="dashboard-container">
      {/* Animated Background Blobs */}
      <div className="bg-blob-1"></div>
      <div className="bg-blob-2"></div>
      <div className="bg-blob-3"></div>

      {/* Notification Toast */}
      {showNotification && (
        <div className="notification-toast">
          <div className="notification-content">
            {notificationMessage.includes('✅') ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
            <span>{notificationMessage}</span>
          </div>
        </div>
      )}

      {/* Mobile Menu Button */}
      <button className="mobile-menu-btn" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside className={`dashboard-sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <span>InTime</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <a href="#" className="nav-item active">
            <User size={20} />
            <span>Dashboard</span>
          </a>
          <a href="#" className="nav-item">
            <Calendar size={20} />
            <span>Schedule</span>
          </a>
          {/* <a href="#" className="nav-item">
            <TrendingUp size={20} />
            <span>Reports</span>
          </a> */}
          <a href="#" className="nav-item">
            <Settings size={20} />
            <span>Settings</span>
          </a>
        </nav>

        <div className="sidebar-footer">
          <div className="user-status">
            <div className={`status-dot ${isTimedIn ? 'active' : ''}`}></div>
            {/* <span>{isTimedIn ? 'On Shift' : 'Off Duty'}</span> */}
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isSidebarOpen && <div className="sidebar-overlay" onClick={() => setIsSidebarOpen(false)}></div>}

      {/* Main Content */}
      <main className="dashboard-main">
        {/* Top Bar */}
        <div className="top-bar">
          <div className="welcome-section">
            <h1>{getGreeting()}, {user.name.split(' ')[0]}!</h1>
            <p>Here's what's happening with your shifts today.</p>
          </div>
          <div className="top-bar-actions">
            <button className="icon-btn">
              <Bell size={20} />
            </button>
            <div className="user-avatar">
              <img src={user.avatar} alt={user.name} />
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">
              <Clock size={24} />
            </div>
            <div className="stat-info">
              <h3>Total Hours</h3>
              <p>{user.totalHours}</p>
              <span>Accumulated Hours</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <Calendar size={24} />
            </div>
            <div className="stat-info">
              <h3>Shifts Completed</h3>
              <p>{user.shiftsCompleted}</p>
              <span>All time</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <TrendingUp size={24} />
            </div>
            <div className="stat-info">
              <h3>Current Streak</h3>
              <p>4 days</p>
              <span>🔥 On fire!</span>
            </div>
            </div>
          </div>

        {/* Time Card */}
        {/* <div className="time-card"> */}
          {/* <div className="time-card-header">
            <h2>Shift Management</h2>
            <p>Track your work hours in real-time</p>
          </div>
          
          <div className="current-time-display">
            <div className="time-label">Current Time</div>
            <div className="time-value">
              {currentTime.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit', 
                second: '2-digit' 
              })}
            </div>
            <div className="date-value">
              {currentTime.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
          </div> */}
{/* 
          <div className="shift-status">
            <div className={`shift-indicator ${isTimedIn ? 'timed-in' : 'timed-out'}`}>
              <div className="indicator-circle"></div>
              <span>{isTimedIn ? 'Currently Clocked In' : 'Not Clocked In'}</span>
            </div>
            {isTimedIn && shiftStartTime && (
              <div className="shift-duration">
                <span className="duration-label">Shift Duration</span>
                <span className="duration-value">{formatDuration(shiftDuration)}</span>
              </div>
            )}
          </div>

          <div className="time-actions">
            {!isTimedIn ? (
              <button onClick={handleTimeIn} className="time-btn time-in-btn">
                <LogIn size={20} />
                Time In
              </button>
            ) : (
              <button onClick={handleTimeOut} className="time-btn time-out-btn">
                <LogOut size={20} />
                Time Out
              </button>
            )}
          </div>

          {shiftStartTime && isTimedIn && (
            <div className="shift-info">
              <p>Started at: {shiftStartTime.toLocaleTimeString()}</p>
            </div>
          )} */}
        {/* </div> */}

        {/* Profile Card */}
        {/* <div className="profile-card">
          <div className="profile-header">
            <img src={user.avatar} alt={user.name} className="profile-avatar" />
            <div className="profile-info">
              <h3>{user.name}</h3>
              <p>{user.role}</p>
              <span>Member since {user.joinDate}</span>
            </div>
          </div>
          <div className="profile-details">
            <div className="detail-item">
              <span className="detail-label">Email</span>
              <span className="detail-value">{user.email}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Department</span>
              <span className="detail-value">Engineering</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Shift Type</span>
              <span className="detail-value">Full-time</span>
            </div>
          </div>
        </div> */}
      </main>
    </div>
  );
};

export default Dashboard;