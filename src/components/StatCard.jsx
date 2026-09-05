import React from 'react';

export const StatCard = ({ title, value, icon: Icon, trend, color = 'var(--accent-ryuk)', subtitle, badgeText }) => {
  return (
    <div className="glass-panel" style={{
      padding: '1.25rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Top Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
        <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          {title}
        </span>
        <div style={{
          width: '36px',
          height: '36px',
          borderRadius: '8px',
          background: `rgba(${color === 'var(--accent-ryuk)' ? '255, 0, 85' : color === 'var(--accent-cyan)' ? '0, 240, 255' : '255, 23, 68'}, 0.12)`,
          border: `1px solid ${color}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: `0 0 12px ${color}33`
        }}>
          <Icon size={18} color={color} />
        </div>
      </div>

      {/* Main Metric & Trend */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem' }}>
        <span style={{ fontSize: '2rem', fontWeight: 800, color: '#FFF', letterSpacing: '-0.03em', lineHeight: 1 }}>
          {value}
        </span>
        {trend && (
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: trend.startsWith('+') ? '#00E676' : '#FF4D6D' }}>
            {trend}
          </span>
        )}
      </div>

      {/* Subtitle / Badge */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.75rem', paddingTop: '0.5rem', borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
          {subtitle || 'Updated live'}
        </span>
        {badgeText && (
          <span style={{
            fontSize: '0.65rem',
            fontWeight: 700,
            padding: '0.15rem 0.4rem',
            borderRadius: '4px',
            background: `${color}22`,
            color: color,
            border: `1px solid ${color}44`
          }}>
            {badgeText}
          </span>
        )}
      </div>
    </div>
  );
};
