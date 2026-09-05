import React from 'react';
import { LayoutDashboard, PlusCircle, Activity, ShieldAlert, Server, Terminal, FileText, Settings, Radio } from 'lucide-react';

export const Sidebar = ({ currentTab, setCurrentTab, activeScansCount = 0 }) => {
  const navItems = [
    { id: 'dashboard', label: 'Main Dashboard', icon: LayoutDashboard },
    { id: 'new-assessment', label: 'New Assessment', icon: PlusCircle, highlight: true },
    { id: 'live-scan', label: 'Live Scan Interface', icon: Activity, pulse: activeScansCount > 0 },
    { id: 'findings', label: 'Findings & Results', icon: ShieldAlert },
    { id: 'server-scan', label: 'Server Recon & Ports', icon: Server },
    { id: 'live-logs', label: 'Live Log Terminal', icon: Terminal },
    { id: 'reports', label: 'Reports & Export', icon: FileText },
    { id: 'settings', label: 'Settings & Profile', icon: Settings }
  ];

  return (
    <aside style={{
      width: '240px',
      background: 'rgba(10, 14, 23, 0.75)',
      backdropFilter: 'blur(12px)',
      borderRight: '1px solid var(--border-color)',
      padding: '1.25rem 0.75rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: 'calc(100vh - 64px)',
      position: 'sticky',
      top: '64px'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
        <div style={{
          padding: '0.5rem 0.75rem',
          fontSize: '0.68rem',
          fontWeight: 700,
          color: 'var(--text-muted)',
          letterSpacing: '0.08em'
        }}>
          DELIVERABLES WORKFLOW
        </div>

        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentTab(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.7rem 0.85rem',
                borderRadius: 'var(--radius-sm)',
                background: isActive
                  ? 'linear-gradient(90deg, rgba(255, 0, 85, 0.15) 0%, rgba(255, 0, 85, 0.02) 100%)'
                  : item.highlight
                  ? 'rgba(0, 240, 255, 0.06)'
                  : 'transparent',
                borderLeft: isActive ? '3px solid var(--accent-ryuk)' : '3px solid transparent',
                color: isActive ? '#FFF' : item.highlight ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                fontSize: '0.85rem',
                fontWeight: isActive || item.highlight ? 600 : 500,
                border: item.highlight ? '1px solid rgba(0, 240, 255, 0.2)' : 'none',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Icon size={18} color={isActive ? 'var(--accent-ryuk)' : item.highlight ? 'var(--accent-cyan)' : 'var(--text-muted)'} />
                <span>{item.label}</span>
              </div>

              {item.pulse && (
                <span className="pulse-dot" style={{ width: '6px', height: '6px' }} />
              )}
            </button>
          );
        })}
      </div>

      {/* Active Scan Status Widget */}
      <div style={{
        padding: '0.85rem',
        background: 'rgba(17, 23, 38, 0.9)',
        border: '1px solid var(--border-color-glow)',
        borderRadius: 'var(--radius-md)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
          <Radio size={16} color="var(--accent-ryuk)" className={activeScansCount > 0 ? 'pulse-dot' : ''} />
          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            ASSESSMENT MONITOR
          </span>
        </div>
        <div style={{ fontSize: '1.1rem', fontWeight: 800, color: activeScansCount > 0 ? 'var(--accent-cyan)' : 'var(--text-muted)' }}>
          {activeScansCount > 0 ? `${activeScansCount} Session Active` : 'Engine Ready (0 Running)'}
        </div>
      </div>
    </aside>
  );
};
