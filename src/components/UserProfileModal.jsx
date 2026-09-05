import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, User, Mail, Shield, Key, RefreshCw, Copy, Check, LogOut, CheckCircle2, Lock } from 'lucide-react';

export const UserProfileModal = () => {
  const { user, isProfileModalOpen, setIsProfileModalOpen, updateUserProfile, regenerateApiKey, logout } = useAuth();
  const [copiedKey, setCopiedKey] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [role, setRole] = useState(user?.role || '');
  const [org, setOrg] = useState(user?.organization || '');
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!isProfileModalOpen || !user) return null;

  const handleCopyKey = () => {
    navigator.clipboard.writeText(user.apiKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const handleRegenerateKey = () => {
    if (window.confirm('Regenerate API Key? Any external scanner integration using your old key will be invalidated.')) {
      regenerateApiKey();
    }
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateUserProfile({ name, role, organization: org });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(6, 8, 12, 0.85)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      padding: '1rem'
    }}>
      <div className="glass-panel animate-fade-in" style={{
        width: '100%',
        maxWidth: '540px',
        maxHeight: '90vh',
        overflowY: 'auto',
        borderRadius: 'var(--radius-lg)',
        padding: '1.75rem',
        position: 'relative',
        border: '1px solid var(--border-color-glow)'
      }}>
        {/* Close Button */}
        <button
          onClick={() => setIsProfileModalOpen(false)}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            padding: '0.25rem'
          }}
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
          <img
            src={user.avatar}
            alt={user.name}
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '2px solid var(--accent-ryuk)',
              boxShadow: '0 0 15px rgba(255, 0, 85, 0.4)'
            }}
          />
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#FFF' }}>{user.name}</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{user.role} • <span style={{ color: 'var(--accent-cyan)' }}>{user.organization}</span></p>
          </div>
        </div>

        {saveSuccess && (
          <div style={{
            background: 'rgba(0, 230, 118, 0.15)',
            border: '1px solid rgba(0, 230, 118, 0.3)',
            color: '#00E676',
            padding: '0.6rem 1rem',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.85rem',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <CheckCircle2 size={16} />
            <span>Operator profile preferences updated successfully.</span>
          </div>
        )}

        {/* Form Details */}
        <form onSubmit={handleSaveProfile}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.3rem' }}>
                FULL NAME
              </label>
              <input
                type="text"
                className="input-field"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.3rem' }}>
                ROLE TITLE
              </label>
              <input
                type="text"
                className="input-field"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
            </div>
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.3rem' }}>
              EMAIL ADDRESS (REGISTERED)
            </label>
            <input
              type="text"
              className="input-field"
              value={user.email}
              disabled
              style={{ opacity: 0.7, cursor: 'not-allowed' }}
            />
          </div>

          {/* API Key Management */}
          <div style={{
            background: 'rgba(10, 14, 23, 0.9)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-sm)',
            padding: '1rem',
            marginBottom: '1.5rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-primary)', fontSize: '0.85rem', fontWeight: 600 }}>
                <Key size={16} color="var(--accent-cyan)" />
                <span>REST API KEY (CLI & AUTOMATION)</span>
              </div>
              <button
                type="button"
                onClick={handleRegenerateKey}
                style={{ background: 'none', border: 'none', color: 'var(--accent-ryuk)', fontSize: '0.75rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.2rem' }}
              >
                <RefreshCw size={12} /> Regenerate
              </button>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="text"
                readOnly
                value={user.apiKey}
                className="input-field font-mono"
                style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)' }}
              />
              <button
                type="button"
                onClick={handleCopyKey}
                className="btn-secondary"
                style={{ padding: '0.5rem 0.8rem' }}
              >
                {copiedKey ? <Check size={16} color="#00E676" /> : <Copy size={16} />}
              </button>
            </div>
          </div>

          {/* 2FA & Security Badge */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.8rem 1rem', background: 'rgba(0, 240, 255, 0.05)', border: '1px solid rgba(0, 240, 255, 0.2)', borderRadius: 'var(--radius-sm)', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Shield size={18} color="var(--accent-cyan)" />
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>Two-Factor Authentication (2FA)</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Hardware Token / Authenticator App Enabled</div>
              </div>
            </div>
            <span className="badge badge-low">ACTIVE</span>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button
              type="button"
              onClick={() => {
                setIsProfileModalOpen(false);
                logout();
              }}
              className="btn-danger"
              style={{ fontSize: '0.8rem' }}
            >
              <LogOut size={16} /> LOGOUT SESSION
            </button>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                type="button"
                onClick={() => setIsProfileModalOpen(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary"
              >
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
