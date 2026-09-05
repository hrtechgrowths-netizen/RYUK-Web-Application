import React from 'react';
import { StatCard } from '../components/StatCard';
import { ShieldCheck, Activity, CheckCircle, AlertOctagon, Flame, ArrowUpRight, Play, Download, Plus, Shield } from 'lucide-react';

export const DashboardView = ({
  stats,
  recentTargets,
  recentReports,
  onNavigateTab
}) => {
  const isZeroState = stats.totalAssessments === 0;

  return (
    <div className="animate-fade-in">
      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#FFF', letterSpacing: '-0.02em' }}>
            OPERATIONS DASHBOARD
          </h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Real-time Threat Monitoring, Assessment Overview & Vulnerability Posture
          </p>
        </div>

        <button
          onClick={() => onNavigateTab('new-assessment')}
          className="btn-primary"
          style={{ fontSize: '0.85rem' }}
        >
          <Plus size={16} /> START NEW ASSESSMENT
        </button>
      </div>

      {/* Metric Cards Row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
        gap: '1rem',
        marginBottom: '1.5rem'
      }}>
        <StatCard
          title="Total Assessments"
          value={stats.totalAssessments}
          icon={ShieldCheck}
          color="var(--accent-cyan)"
          subtitle={isZeroState ? "0 Scans Initiated" : `${stats.totalAssessments} Sites Audited`}
        />
        <StatCard
          title="Active Scans"
          value={stats.activeScans}
          icon={Activity}
          color="var(--accent-ryuk)"
          subtitle={stats.activeScans > 0 ? "Scan Session Active" : "No Scan Running"}
          badgeText={stats.activeScans > 0 ? "LIVE" : "IDLE"}
        />
        <StatCard
          title="Completed Scans"
          value={stats.completedScans}
          icon={CheckCircle}
          color="#00E676"
          subtitle={isZeroState ? "0 Finished" : `${stats.completedScans} Completed`}
        />
        <StatCard
          title="Total Findings"
          value={stats.totalFindings}
          icon={AlertOctagon}
          color="#FFB800"
          subtitle="Discovered Vulnerabilities"
        />
        <StatCard
          title="Critical Findings"
          value={stats.criticalFindings}
          icon={Flame}
          color="var(--status-critical)"
          subtitle="Action Required"
        />
      </div>

      {/* Zero State Call to Action Banner if 0 assessments completed */}
      {isZeroState && (
        <div className="glass-panel" style={{ padding: '3rem 2rem', textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '16px',
            background: 'rgba(255, 0, 85, 0.15)',
            border: '1px solid var(--border-color-glow)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1rem'
          }}>
            <Shield size={32} color="var(--accent-ryuk)" />
          </div>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#FFF' }}>
            Welcome to Ryuk Security Operations
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', maxWidth: '520px', margin: '0.4rem auto 1.5rem', lineHeight: 1.6 }}>
            No security assessments have been launched yet. Start your first target URL assessment to analyze vulnerabilities, crawl depth (2-3 levels), open ports, and live AI reasoning logs.
          </p>
          <button
            onClick={() => onNavigateTab('new-assessment')}
            className="btn-primary"
            style={{ padding: '0.75rem 2rem', fontSize: '0.95rem' }}
          >
            <Play size={18} fill="#FFF" /> LAUNCH FIRST ASSESSMENT NOW
          </button>
        </div>
      )}

      {/* Populated Recent Targets Table */}
      {!isZeroState && (
        <div className="glass-panel" style={{ padding: '1.25rem', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#FFF' }}>RECENT TARGET ASSESSMENTS</h3>
            <button
              onClick={() => onNavigateTab('findings')}
              style={{ background: 'none', border: 'none', color: 'var(--accent-cyan)', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.2rem' }}
            >
              View Findings <ArrowUpRight size={14} />
            </button>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '0.6rem' }}>TARGET URL</th>
                  <th style={{ padding: '0.6rem' }}>STATUS</th>
                  <th style={{ padding: '0.6rem' }}>AI ENGINE</th>
                  <th style={{ padding: '0.6rem' }}>FINDINGS</th>
                  <th style={{ padding: '0.6rem' }}>STARTED AT</th>
                </tr>
              </thead>
              <tbody>
                {recentTargets.map(tgt => (
                  <tr key={tgt.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}>
                    <td style={{ padding: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-primary)', fontWeight: 500 }}>
                      {tgt.url}
                    </td>
                    <td style={{ padding: '0.75rem' }}>
                      <span className={`badge ${tgt.status === 'scanning' ? 'badge-active pulse-dot' : 'badge-low'}`}>
                        {tgt.status.toUpperCase()}
                      </span>
                    </td>
                    <td style={{ padding: '0.75rem', color: 'var(--text-secondary)' }}>
                      {tgt.aiModel}
                    </td>
                    <td style={{ padding: '0.75rem' }}>
                      <span className="badge badge-critical">{tgt.findings?.critical || 0} Critical</span>
                    </td>
                    <td style={{ padding: '0.75rem', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                      {tgt.startTime}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
