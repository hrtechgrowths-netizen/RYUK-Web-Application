import React from 'react';
import { X, Printer, Download, Shield, FileText, CheckCircle2, AlertOctagon } from 'lucide-react';

export const ReportViewerModal = ({ report, onClose }) => {
  if (!report) return null;

  const handlePrintHTML = () => {
    window.print();
  };

  const handleDownloadJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(report, null, 2));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", `${report.id.toLowerCase()}-audit.json`);
    dlAnchorElem.click();
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(6, 8, 12, 0.9)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '1rem' }}>
      <div className="glass-panel animate-fade-in" style={{ width: '100%', maxWidth: '820px', maxHeight: '90vh', overflowY: 'auto', padding: '2rem', borderRadius: 'var(--radius-lg)', position: 'relative', background: '#0A0E17' }}>
        <button
          onClick={onClose}
          style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
        >
          <X size={20} />
        </button>

        {/* HTML Report Document Layout */}
        <div style={{ borderBottom: '2px solid var(--accent-ryuk)', paddingBottom: '1rem', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-ryuk)', fontWeight: 800, fontSize: '0.85rem' }}>
              <Shield size={18} /> RYUK SECOPS COMPLIANCE AUDIT
            </div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#FFF', marginTop: '0.25rem' }}>{report.title}</h1>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
              Report Reference ID: <strong>{report.id}</strong> | Generated: <strong>{report.date}</strong>
            </div>
          </div>
          <span className="badge badge-critical" style={{ fontSize: '0.75rem' }}>
            POSTURE SCORE: {report.score}/100
          </span>
        </div>

        {/* Target Details Table */}
        <div style={{ background: 'rgba(17, 23, 38, 0.8)', border: '1px solid var(--border-color)', padding: '1rem', borderRadius: 'var(--radius-sm)', marginBottom: '1.5rem' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>AUDITED TARGET HOST</div>
          <div className="font-mono" style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--accent-cyan)' }}>{report.target}</div>
          <div style={{ display: 'flex', gap: '2rem', marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(255, 255, 255, 0.05)', fontSize: '0.8rem' }}>
            <span>Critical Findings: <strong style={{ color: 'var(--status-critical)' }}>{report.criticals}</strong></span>
            <span>High Severity: <strong style={{ color: 'var(--status-high)' }}>{report.highs}</strong></span>
            <span>Compliance Status: <strong style={{ color: '#FF4D6D' }}>ACTION REQUIRED</strong></span>
          </div>
        </div>

        {/* Executive Summary Section */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#FFF', marginBottom: '0.4rem' }}>1. EXECUTIVE SUMMARY</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Automated AI security scanning was executed against target <code>{report.target}</code> using Ryuk SecOps Engine. The audit discovered critical vulnerability vectors requiring immediate remediation prior to production deployment.
          </p>
        </div>

        {/* Discovered Vulnerability Matrix */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#FFF', marginBottom: '0.6rem' }}>2. DISCOVERED THREAT VECTORS</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <div style={{ padding: '0.75rem', background: 'rgba(255, 23, 68, 0.1)', borderLeft: '4px solid var(--status-critical)', borderRadius: 'var(--radius-sm)', fontSize: '0.8rem' }}>
              <div style={{ fontWeight: 700, color: '#FFF' }}>CVE-2026-19203: SQL Injection in Login Endpoint</div>
              <div style={{ color: 'var(--text-secondary)', marginTop: '0.2rem' }}>Parameter: <code>username</code> | Severity: CRITICAL (CVSS 9.8)</div>
            </div>
            <div style={{ padding: '0.75rem', background: 'rgba(255, 23, 68, 0.1)', borderLeft: '4px solid var(--status-critical)', borderRadius: 'var(--radius-sm)', fontSize: '0.8rem' }}>
              <div style={{ fontWeight: 700, color: '#FFF' }}>CVE-2026-14402: Unauthenticated RCE Deserialization</div>
              <div style={{ color: 'var(--text-secondary)', marginTop: '0.2rem' }}>Parameter: <code>X-Payload-Object</code> | Severity: CRITICAL (CVSS 9.9)</div>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
          <button onClick={handleDownloadJSON} className="btn-secondary">
            <Download size={16} /> DOWNLOAD JSON REPORT
          </button>
          <button onClick={handlePrintHTML} className="btn-primary">
            <Printer size={16} /> PRINT / EXPORT HTML REPORT
          </button>
        </div>
      </div>
    </div>
  );
};
