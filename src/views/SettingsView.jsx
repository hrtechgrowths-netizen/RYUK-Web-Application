import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Settings, Sliders, Shield, Key, Bell, Save, CheckCircle2, Cpu } from 'lucide-react';

export const SettingsView = () => {
  const { user, regenerateApiKey } = useAuth();
  const [maxConcurrency, setMaxConcurrency] = useState(50);
  const [defaultDepth, setDefaultDepth] = useState(4);
  const [autoPatch, setAutoPatch] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState('https://hooks.slack.com/services/T00/B00/X00');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveSettings = (e) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="animate-fade-in">
      {/* Title Header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#FFF', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <Settings color="var(--accent-cyan)" size={28} /> SECOPS SYSTEM CONFIGURATION
        </h1>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          Configure scanning bandwidth limits, AI exploit prompt heuristics, and real-time webhook dispatchers.
        </p>
      </div>

      {savedSuccess && (
        <div style={{
          background: 'rgba(0, 230, 118, 0.15)',
          border: '1px solid rgba(0, 230, 118, 0.3)',
          color: '#00E676',
          padding: '0.75rem 1rem',
          borderRadius: 'var(--radius-sm)',
          fontSize: '0.85rem',
          marginBottom: '1.25rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <CheckCircle2 size={16} />
          <span>System scanner configuration preferences updated successfully.</span>
        </div>
      )}

      <form onSubmit={handleSaveSettings}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
          {/* Scanning Engine Bandwidth Settings */}
          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#FFF', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
              <Sliders size={18} color="var(--accent-ryuk)" /> ENGINE BANDWIDTH & LIMITS
            </h3>

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                MAXIMUM ALLOWED CONCURRENCY (THREADS)
              </label>
              <input
                type="number"
                min="1"
                max="100"
                className="input-field"
                value={maxConcurrency}
                onChange={(e) => setMaxConcurrency(Number(e.target.value))}
              />
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.2rem', display: 'block' }}>
                Global ceiling for parallel thread execution across all target scans.
              </span>
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                DEFAULT CRAWL DEPTH
              </label>
              <input
                type="number"
                min="1"
                max="10"
                className="input-field"
                value={defaultDepth}
                onChange={(e) => setDefaultDepth(Number(e.target.value))}
              />
            </div>

            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-primary)', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={autoPatch}
                  onChange={(e) => setAutoPatch(e.target.checked)}
                />
                Auto-generate Remediation Scripts on Critical Findings
              </label>
            </div>
          </div>

          {/* AI Reasoning & Webhooks */}
          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#FFF', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
              <Cpu size={18} color="var(--accent-cyan)" /> AI REASONING & WEBHOOK DISPATCH
            </h3>

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                CRITICAL ALERT SLACK/TEAMS WEBHOOK URL
              </label>
              <input
                type="text"
                className="input-field"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
              />
            </div>

            <div style={{ background: 'rgba(10, 14, 23, 0.7)', border: '1px solid var(--border-color)', padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#FFF', marginBottom: '0.3rem' }}>ACTIVE OPERATOR KEY</div>
              <div style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)', marginBottom: '0.5rem' }}>{user?.apiKey}</div>
              <button
                type="button"
                onClick={regenerateApiKey}
                className="btn-secondary"
                style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem' }}
              >
                Regenerate API Credentials
              </button>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button
            type="submit"
            className="btn-primary"
            style={{ padding: '0.75rem 2rem', fontSize: '0.9rem' }}
          >
            <Save size={18} /> SAVE SYSTEM CONFIGURATION
          </button>
        </div>
      </form>
    </div>
  );
};
