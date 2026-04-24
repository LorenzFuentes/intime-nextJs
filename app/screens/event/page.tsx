'use client';

import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Plus, 
  X, 
  Edit2, 
  Trash2,
  Users,
  Video,
  MapPin,
  Bell,
  Search,
  Menu,
  User,
  TrendingUp,
  Settings,
  LogOut
} from 'lucide-react';

interface Meeting {
  id: string;
  title: string;
  date: string;
  time: string;
  duration: string;
  participants: string[];
  location: string;
  type: 'virtual' | 'in-person';
  description: string;
}

interface Event {
  id: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  attendees: number;
  type: 'conference' | 'workshop' | 'social' | 'other';
  description: string;
}

const Events: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'meetings' | 'events'>('meetings');
  const [showMeetingModal, setShowMeetingModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock user data
  const user = {
    name: 'Lorenz Fuentes',
    email: 'lorenz.fuentes@intime.com',
    avatar: 'https://ui-avatars.com/api/?name=Lorenz+Fuentes&background=80c65E&color=fff',
  };
  
  // Mock meetings data
  const [meetings, setMeetings] = useState<Meeting[]>([
    {
      id: '1',
      title: 'Team Standup',
      date: '2024-01-15',
      time: '10:00 AM',
      duration: '30 min',
      participants: ['Alex', 'Sarah', 'Mike', 'Jessica'],
      location: 'Zoom',
      type: 'virtual',
      description: 'Daily standup to discuss progress and blockers'
    },
    {
      id: '2',
      title: 'Client Presentation',
      date: '2024-01-16',
      time: '2:00 PM',
      duration: '1 hour',
      participants: ['Alex', 'John', 'Client Team'],
      location: 'Conference Room A',
      type: 'in-person',
      description: 'Present Q1 roadmap to client'
    },
    {
      id: '3',
      title: 'Design Review',
      date: '2024-01-17',
      time: '11:30 AM',
      duration: '45 min',
      participants: ['Design Team', 'Product'],
      location: 'Google Meet',
      type: 'virtual',
      description: 'Review new feature designs'
    }
  ]);
  
  // Mock events data
  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      title: 'Company Hackathon',
      date: '2024-01-20',
      startTime: '9:00 AM',
      endTime: '6:00 PM',
      location: 'Main Hall',
      attendees: 150,
      type: 'workshop',
      description: '24-hour hackathon to build innovative solutions'
    },
    {
      id: '2',
      title: 'Tech Conference 2024',
      date: '2024-01-25',
      startTime: '10:00 AM',
      endTime: '5:00 PM',
      location: 'Convention Center',
      attendees: 500,
      type: 'conference',
      description: 'Annual tech conference with industry leaders'
    },
    {
      id: '3',
      title: 'Team Building',
      date: '2024-01-18',
      startTime: '1:00 PM',
      endTime: '5:00 PM',
      location: 'Central Park',
      attendees: 25,
      type: 'social',
      description: 'Outdoor team building activities'
    }
  ]);
  
  const [newMeeting, setNewMeeting] = useState<Partial<Meeting>>({
    title: '',
    date: '',
    time: '',
    duration: '',
    participants: [],
    location: '',
    type: 'virtual',
    description: ''
  });
  
  const [newEvent, setNewEvent] = useState<Partial<Event>>({
    title: '',
    date: '',
    startTime: '',
    endTime: '',
    location: '',
    attendees: 0,
    type: 'other',
    description: ''
  });
  
  const [participantInput, setParticipantInput] = useState('');
  
  const handleAddMeeting = () => {
    if (newMeeting.title && newMeeting.date && newMeeting.time) {
      const meeting: Meeting = {
        id: Date.now().toString(),
        title: newMeeting.title,
        date: newMeeting.date,
        time: newMeeting.time,
        duration: newMeeting.duration || '30 min',
        participants: newMeeting.participants || [],
        location: newMeeting.location || '',
        type: newMeeting.type as 'virtual' | 'in-person',
        description: newMeeting.description || ''
      };
      setMeetings([meeting, ...meetings]);
      setShowMeetingModal(false);
      setNewMeeting({});
      setParticipantInput('');
    }
  };
  
  const handleAddEvent = () => {
    if (newEvent.title && newEvent.date && newEvent.startTime && newEvent.endTime) {
      const event: Event = {
        id: Date.now().toString(),
        title: newEvent.title,
        date: newEvent.date,
        startTime: newEvent.startTime,
        endTime: newEvent.endTime,
        location: newEvent.location || '',
        attendees: newEvent.attendees || 0,
        type: newEvent.type as 'conference' | 'workshop' | 'social' | 'other',
        description: newEvent.description || ''
      };
      setEvents([event, ...events]);
      setShowEventModal(false);
      setNewEvent({});
    }
  };
  
  const deleteMeeting = (id: string) => {
    setMeetings(meetings.filter(m => m.id !== id));
  };
  
  const deleteEvent = (id: string) => {
    setEvents(events.filter(e => e.id !== id));
  };
  
  const addParticipant = () => {
    if (participantInput && !newMeeting.participants?.includes(participantInput)) {
      setNewMeeting({
        ...newMeeting,
        participants: [...(newMeeting.participants || []), participantInput]
      });
      setParticipantInput('');
    }
  };
  
  const removeParticipant = (participant: string) => {
    setNewMeeting({
      ...newMeeting,
      participants: newMeeting.participants?.filter(p => p !== participant)
    });
  };
  
  const filteredMeetings = meetings.filter(meeting =>
    meeting.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    meeting.location.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.location.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const getEventTypeColor = (type: string) => {
    switch(type) {
      case 'conference': return '#1780C7';
      case 'workshop': return '#80c65E';
      case 'social': return '#8b5cf6';
      default: return '#a1a5b0';
    }
  };
  
  const getMeetingTypeIcon = (type: string) => {
    return type === 'virtual' ? <Video size={16} /> : <MapPin size={16} />;
  };

  return (
    <div className="dashboard-container">
      {/* Animated Background Blobs */}
      <div className="bg-blob-1"></div>
      <div className="bg-blob-2"></div>
      <div className="bg-blob-3"></div>

      {/* Mobile Menu Button */}
      <button className="mobile-menu-btn" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
        <Menu size={24} />
      </button>

      {/* Sidebar */}
      <aside className={`dashboard-sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            {/* <Clock size={28} /> */}
            <span>InTime</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <a href="/screens/dashboard" className="nav-item">
            <User size={20} />
            <span>Dashboard</span>
          </a>
          <a href="/screens/event" className="nav-item active">
            <Calendar size={20} />
            <span>Events</span>
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
          <div className="user-info">
            <img src={user.avatar} alt={user.name} className="sidebar-avatar" />
            <div className="user-details">
              <span className="user-name">{user.name}</span>
              <span className="user-email">{user.email}</span>
            </div>
          </div>
          <button className="logout-btn" onClick={() => window.location.href = '/'}>
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isSidebarOpen && <div className="sidebar-overlay" onClick={() => setIsSidebarOpen(false)}></div>}

      {/* Main Content */}
      <main className="dashboard-main">
        {/* Top Bar */}
        <div className="top-bar">
          <div className="welcome-section">
            <h1>Events & Meetings</h1>
            <p>Schedule and manage your meetings and events</p>
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
        
        {/* Tabs */}
        <div className="events-tabs">
          <button
            className={`tab ${activeTab === 'meetings' ? 'active' : ''}`}
            onClick={() => setActiveTab('meetings')}
          >
            <Users size={18} />
            Meetings
          </button>
          <button
            className={`tab ${activeTab === 'events' ? 'active' : ''}`}
            onClick={() => setActiveTab('events')}
          >
            <Calendar size={18} />
            Events
          </button>
          
          <div className="search-bar">
            <Search size={18} />
            <input
              type="text"
              placeholder={`Search ${activeTab}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {activeTab === 'meetings' ? (
            <button className="create-btn" onClick={() => setShowMeetingModal(true)}>
              <Plus size={18} />
              New Meeting
            </button>
          ) : (
            <button className="create-btn" onClick={() => setShowEventModal(true)}>
              <Plus size={18} />
              New Event
            </button>
          )}
        </div>
        
        {/* Meetings List */}
        {activeTab === 'meetings' && (
          <div className="meetings-list">
            {filteredMeetings.length === 0 ? (
              <div className="empty-state">
                <Calendar size={48} />
                <h3>No meetings scheduled</h3>
                <p>Click "New Meeting" to schedule your first meeting</p>
              </div>
            ) : (
              filteredMeetings.map(meeting => (
                <div key={meeting.id} className="meeting-card">
                  <div className="meeting-card-header">
                    <div className="meeting-type-badge">
                      {getMeetingTypeIcon(meeting.type)}
                      <span>{meeting.type === 'virtual' ? 'Virtual' : 'In-Person'}</span>
                    </div>
                    <div className="card-actions">
                      <button className="icon-btn-small delete" onClick={() => deleteMeeting(meeting.id)}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  <h3 className="meeting-title">{meeting.title}</h3>
                  <div className="meeting-details">
                    <div className="detail">
                      <Calendar size={16} />
                      <span>{meeting.date}</span>
                    </div>
                    <div className="detail">
                      <Clock size={16} />
                      <span>{meeting.time} ({meeting.duration})</span>
                    </div>
                    <div className="detail">
                      {meeting.type === 'virtual' ? <Video size={16} /> : <MapPin size={16} />}
                      <span>{meeting.location}</span>
                    </div>
                  </div>
                  <p className="meeting-description">{meeting.description}</p>
                  <div className="participants">
                    <span className="participants-label">Participants:</span>
                    <div className="participants-list">
                      {meeting.participants.map(p => (
                        <span key={p} className="participant-tag">{p}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
        
        {/* Events List */}
        {activeTab === 'events' && (
          <div className="events-list">
            {filteredEvents.length === 0 ? (
              <div className="empty-state">
                <Calendar size={48} />
                <h3>No events scheduled</h3>
                <p>Click "New Event" to create your first event</p>
              </div>
            ) : (
              filteredEvents.map(event => (
                <div key={event.id} className="event-card">
                  <div className="event-card-header">
                    <div className="event-type-badge" style={{ background: getEventTypeColor(event.type) }}>
                      <span>{event.type.toUpperCase()}</span>
                    </div>
                    <div className="card-actions">
                      <button className="icon-btn-small delete" onClick={() => deleteEvent(event.id)}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  <h3 className="event-title">{event.title}</h3>
                  <div className="event-details">
                    <div className="detail">
                      <Calendar size={16} />
                      <span>{event.date}</span>
                    </div>
                    <div className="detail">
                      <Clock size={16} />
                      <span>{event.startTime} - {event.endTime}</span>
                    </div>
                    <div className="detail">
                      <MapPin size={16} />
                      <span>{event.location}</span>
                    </div>
                    <div className="detail">
                      <Users size={16} />
                      <span>{event.attendees} attendees</span>
                    </div>
                  </div>
                  <p className="event-description">{event.description}</p>
                </div>
              ))
            )}
          </div>
        )}
      </main>
      
      {/* New Meeting Modal */}
      {showMeetingModal && (
        <div className="modal-overlay" onClick={() => setShowMeetingModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Schedule New Meeting</h2>
              <button className="close-btn" onClick={() => setShowMeetingModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                placeholder="Meeting title"
                className="modal-input"
                value={newMeeting.title || ''}
                onChange={(e) => setNewMeeting({...newMeeting, title: e.target.value})}
              />
              <div className="modal-row">
                <input
                  type="date"
                  className="modal-input"
                  value={newMeeting.date || ''}
                  onChange={(e) => setNewMeeting({...newMeeting, date: e.target.value})}
                />
                <input
                  type="time"
                  className="modal-input"
                  value={newMeeting.time || ''}
                  onChange={(e) => setNewMeeting({...newMeeting, time: e.target.value})}
                />
                <select
                  className="modal-input"
                  value={newMeeting.duration || '30'}
                  onChange={(e) => setNewMeeting({...newMeeting, duration: e.target.value})}
                >
                  <option value="15 min">15 min</option>
                  <option value="30 min">30 min</option>
                  <option value="45 min">45 min</option>
                  <option value="1 hour">1 hour</option>
                  <option value="2 hours">2 hours</option>
                </select>
              </div>
              <div className="modal-row">
                <input
                  type="text"
                  placeholder="Location (Zoom link or room name)"
                  className="modal-input"
                  value={newMeeting.location || ''}
                  onChange={(e) => setNewMeeting({...newMeeting, location: e.target.value})}
                />
                <select
                  className="modal-input"
                  value={newMeeting.type || 'virtual'}
                  onChange={(e) => setNewMeeting({...newMeeting, type: e.target.value as 'virtual' | 'in-person'})}
                >
                  <option value="virtual">Virtual</option>
                  <option value="in-person">In-Person</option>
                </select>
              </div>
              <div className="participants-section">
                <label>Participants</label>
                <div className="add-participant">
                  <input
                    type="text"
                    placeholder="Enter participant name"
                    value={participantInput}
                    onChange={(e) => setParticipantInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addParticipant()}
                  />
                  <button onClick={addParticipant}>Add</button>
                </div>
                <div className="participants-tags">
                  {newMeeting.participants?.map(p => (
                    <span key={p} className="participant-tag">
                      {p}
                      <button onClick={() => removeParticipant(p)}><X size={12} /></button>
                    </span>
                  ))}
                </div>
              </div>
              <textarea
                placeholder="Meeting description"
                className="modal-textarea"
                value={newMeeting.description || ''}
                onChange={(e) => setNewMeeting({...newMeeting, description: e.target.value})}
              />
            </div>
            <div className="modal-footer">
              <button className="cancel-btn" onClick={() => setShowMeetingModal(false)}>Cancel</button>
              <button className="save-btn" onClick={handleAddMeeting}>Schedule Meeting</button>
            </div>
          </div>
        </div>
      )}
      
      {/* New Event Modal */}
      {showEventModal && (
        <div className="modal-overlay" onClick={() => setShowEventModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Create New Event</h2>
              <button className="close-btn" onClick={() => setShowEventModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                placeholder="Event title"
                className="modal-input"
                value={newEvent.title || ''}
                onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
              />
              <div className="modal-row">
                <input
                  type="date"
                  className="modal-input"
                  value={newEvent.date || ''}
                  onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                />
                <input
                  type="time"
                  className="modal-input"
                  placeholder="Start"
                  value={newEvent.startTime || ''}
                  onChange={(e) => setNewEvent({...newEvent, startTime: e.target.value})}
                />
                <input
                  type="time"
                  className="modal-input"
                  placeholder="End"
                  value={newEvent.endTime || ''}
                  onChange={(e) => setNewEvent({...newEvent, endTime: e.target.value})}
                />
              </div>
              <div className="modal-row">
                <input
                  type="text"
                  placeholder="Location"
                  className="modal-input"
                  value={newEvent.location || ''}
                  onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                />
                <input
                  type="number"
                  placeholder="Expected attendees"
                  className="modal-input"
                  value={newEvent.attendees || ''}
                  onChange={(e) => setNewEvent({...newEvent, attendees: parseInt(e.target.value)})}
                />
                <select
                  className="modal-input"
                  value={newEvent.type || 'other'}
                  onChange={(e) => setNewEvent({...newEvent, type: e.target.value as 'conference' | 'workshop' | 'social' | 'other'})}
                >
                  <option value="conference">Conference</option>
                  <option value="workshop">Workshop</option>
                  <option value="social">Social</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <textarea
                placeholder="Event description"
                className="modal-textarea"
                value={newEvent.description || ''}
                onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
              />
            </div>
            <div className="modal-footer">
              <button className="cancel-btn" onClick={() => setShowEventModal(false)}>Cancel</button>
              <button className="save-btn" onClick={handleAddEvent}>Create Event</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;