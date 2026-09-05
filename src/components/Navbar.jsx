import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Shield, Bell, Cpu, Search, User, LogOut, ChevronDown, Check, ShieldAlert } from 'lucide-react';

export const Navbar = ({ activeTarget, onQuickScan }) => {
  const { user, setIsProfileModalOpen, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [quickInput, setQuickInput] = useState('');

  const handleQuickSubmit = (e) => {
    e.preventDefault();
    if (quickInput.trim() && onQuickScan) {
      onQuickScan(quickInput.trim());
      setQuickInput('');
    }
  };

  const notifications = [
    { id: 1, type: 'critical', text: 'SQL Injection confirmed on banking API endpoint', time: '2m ago' },
    { id: 2, type: 'critical', text: 'Unauthenticated RCE payload execution verified', time: '8m ago' },
    { id: 3, type: 'info', text: 'Scan completed on auth-portal.acme-corp.com', time: '45m ago' }
  ];

  return (
    <header style={{
      height: '64px',
      background: 'rgba(10, 14, 23, 0.9)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border-color)',
      padding: '0 1.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      {/* Left Branding & Live Status */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, rgba(255, 0, 85, 0.2) 0%, rgba(0, 240, 255, 0.1) 100%)',
            border: '1px solid var(--border-color-glow)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 15px rgba(255, 0, 85, 0.3)'
          }}>
            <Shield size={22} color="#FF0055" />
          </div>
          <div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1 }}>
              RYUK <span style={{ color: 'var(--accent-ryuk)' }}>SECOPS</span>
            </div>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <span className="pulse-dot-green" /> ENGINE ONLINE • V4.2
            </div>
          </div>
        </div>

        {/* AI Engine Status Pill */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.35rem 0.75rem',
          background: 'rgba(0, 240, 255, 0.06)',
          border: '1px solid rgba(0, 240, 255, 0.2)',
          borderRadius: '20px',
          fontSize: '0.75rem',
          color: 'var(--accent-cyan)'
        }}>
          <Cpu size={14} color="var(--accent-cyan)" />
          <span style={{ fontWeight: 600 }}>Ryuk AI Engine:</span> Active
        </div>
      </div>

      {/* Center Search / Quick Target Bar */}
      <form onSubmit={handleQuickSubmit} style={{ flex: 1, maxWidth: '400px', margin: '0 2rem' }}>
        <div style={{ position: 'relative' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            className="input-field"
            style={{
              paddingLeft: '2.4rem',
              paddingRight: '4.5rem',
              height: '38px',
              fontSize: '0.8rem',
              borderRadius: '20px'
            }}
            placeholder="Quick Scan target URL (e.g. https://target-app.com)..."
            value={quickInput}
            onChange={(e) => setQuickInput(e.target.value)}
          />
          <button
            type="submit"
            style={{
              position: 'absolute',
              right: '4px',
              top: '4px',
              bottom: '4px',
              background: 'var(--accent-ryuk)',
              color: '#FFF',
              border: 'none',
              padding: '0 0.75rem',
              borderRadius: '16px',
              fontSize: '0.7rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            SCAN
          </button>
        </div>
      </form>

      {/* Right Controls: Notifications & User Profile Menu */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', position: 'relative' }}>
        {/* Notifications Button & Dropdown */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              position: 'relative'
            }}
          >
            <Bell size={18} />
            <span style={{
              position: 'absolute',
              top: '6px',
              right: '6px',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: 'var(--accent-ryuk)',
              boxShadow: '0 0 8px #FF0055'
            }} />
          </button>

          {showNotifications && (
            <div className="glass-panel animate-fade-in" style={{
              position: 'absolute',
              right: 0,
              top: '48px',
              width: '320px',
              padding: '1rem',
              borderRadius: 'var(--radius-md)',
              zIndex: 200,
              border: '1px solid var(--border-color-glow)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-color)' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>Security Alerts</span>
                <span className="badge badge-critical">3 NEW</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {notifications.map(n => (
                  <div key={n.id} style={{
                    fontSize: '0.78rem',
                    padding: '0.6rem',
                    background: 'rgba(10, 14, 23, 0.6)',
                    borderRadius: 'var(--radius-sm)',
                    borderLeft: `3px solid ${n.type === 'critical' ? 'var(--status-critical)' : 'var(--accent-cyan)'}`
                  }}>
                    <div style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{n.text}</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem', marginTop: '0.2rem' }}>{n.time}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Dropdown Toggle */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--border-color)',
              padding: '0.35rem 0.75rem',
              borderRadius: '20px',
              cursor: 'pointer',
              color: 'var(--text-primary)'
            }}
          >
            <img
              src={user?.avatar}
              alt={user?.name}
              style={{ width: '26px', height: '26px', borderRadius: '50%', objectFit: 'cover' }}
            />
            <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>{user?.name?.split(' ')[0]}</span>
            <ChevronDown size={14} color="var(--text-muted)" />
          </button>

          {showDropdown && (
            <div className="glass-panel animate-fade-in" style={{
              position: 'absolute',
              right: 0,
              top: '48px',
              width: '220px',
              padding: '0.5rem',
              borderRadius: 'var(--radius-md)',
              zIndex: 200
            }}>
              <div style={{ padding: '0.6rem 0.8rem', borderBottom: '1px solid var(--border-color)', marginBottom: '0.4rem' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#FFF' }}>{user?.name}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{user?.role}</div>
              </div>

              <button
                onClick={() => {
                  setShowDropdown(false);
                  setIsProfileModalOpen(true);
                }}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  background: 'none',
                  border: 'none',
                  padding: '0.6rem 0.8rem',
                  fontSize: '0.8rem',
                  color: 'var(--text-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  borderRadius: 'var(--radius-sm)',
                  cursor: 'pointer'
                }}
              >
                <User size={15} color="var(--accent-cyan)" /> User Profile & API Keys
              </button>

              <button
                onClick={() => {
                  setShowDropdown(false);
                  logout();
                }}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  background: 'none',
                  border: 'none',
                  padding: '0.6rem 0.8rem',
                  fontSize: '0.8rem',
                  color: '#FF4D6D',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  borderRadius: 'var(--radius-sm)',
                  cursor: 'pointer'
                }}
              >
                <LogOut size={15} /> Logout Operator
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
