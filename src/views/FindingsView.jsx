import React, { useState } from 'react';
import { ShieldAlert, Search, Filter, Terminal, Code2, Copy, Check, Eye, ChevronRight, RefreshCw, X, ArrowUpRight } from 'lucide-react';
import { PatchDiffModal } from '../components/PatchDiffModal';

export const FindingsView = ({ findings, targetUrl }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [severityFilter, setSeverityFilter] = useState('ALL');
  const [selectedVuln, setSelectedVuln] = useState(findings?.[0] || null);
  const [showPatchModal, setShowPatchModal] = useState(false);
  const [copiedPoc, setCopiedPoc] = useState(false);
  const [activeTab, setActiveTab] = useState('evidence'); // 'evidence' | 'request' | 'response' | 'remediation'

  const filtered = (findings || []).filter(v => {
    const matchesSearch = v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          v.cve.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (v.parameter && v.parameter.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesSeverity = severityFilter === 'ALL' || v.severity === severityFilter;
    return matchesSearch && matchesSeverity;
  });

  const handleCopyPoc = (pocText) => {
    navigator.clipboard.writeText(pocText);
    setCopiedPoc(true);
    setTimeout(() => setCopiedPoc(false), 2000);
  };

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#FFF', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <ShieldAlert color="var(--accent-ryuk)" size={28} /> VULNERABILITY FINDINGS & EVIDENCE RESULTS
        </h1>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          Detailed security evidence table: vulnerability category, affected parameter, raw HTTP request/response payloads, and AI remediation recommendations.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="glass-panel" style={{ padding: '1rem', marginBottom: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            className="input-field"
            style={{ paddingLeft: '2.4rem', height: '38px', fontSize: '0.85rem' }}
            placeholder="Filter findings by vulnerability title, parameter, or CVE ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <Filter size={15} color="var(--text-muted)" />
          <select
            className="select-field"
            style={{ fontSize: '0.8rem', height: '38px', padding: '0 0.75rem' }}
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
          >
            <option value="ALL">All Severities</option>
            <option value="CRITICAL">Critical Only</option>
            <option value="HIGH">High Only</option>
            <option value="MEDIUM">Medium Only</option>
          </select>
        </div>
      </div>

      {/* Findings Table or Zero State */}
      {filtered.length === 0 ? (
        <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
          <ShieldAlert size={48} color="var(--text-muted)" style={{ marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#FFF' }}>No Security Vulnerabilities Discovered</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            Run a new security assessment from the New Assessment tab to scan for vulnerabilities.
          </p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.5rem' }}>
          {/* Left Table */}
          <div className="glass-panel" style={{ padding: '1.25rem', overflowX: 'auto' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#FFF', marginBottom: '1rem' }}>
              VULNERABILITY THREAT TABLE ({filtered.length})
            </h3>

            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '0.6rem' }}>SEVERITY</th>
                  <th style={{ padding: '0.6rem' }}>VULNERABILITY CATEGORY</th>
                  <th style={{ padding: '0.6rem' }}>PARAMETER</th>
                  <th style={{ padding: '0.6rem' }}>CVSS</th>
                  <th style={{ padding: '0.6rem' }}>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(v => {
                  const isSelected = selectedVuln?.id === v.id;
                  return (
                    <tr
                      key={v.id}
                      onClick={() => setSelectedVuln(v)}
                      style={{
                        borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
                        background: isSelected ? 'rgba(255, 0, 85, 0.1)' : 'transparent',
                        cursor: 'pointer'
                      }}
                    >
                      <td style={{ padding: '0.75rem' }}>
                        <span className={`badge ${v.severity === 'CRITICAL' ? 'badge-critical' : 'badge-high'}`}>
                          {v.severity}
                        </span>
                      </td>
                      <td style={{ padding: '0.75rem', fontWeight: 600, color: '#FFF' }}>
                        <div>{v.title}</div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{v.cve}</div>
                      </td>
                      <td style={{ padding: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)', fontWeight: 600 }}>
                        {v.parameter || 'N/A'}
                      </td>
                      <td style={{ padding: '0.75rem', fontFamily: 'var(--font-mono)', fontWeight: 800, color: '#FFF' }}>
                        {v.cvss}
                      </td>
                      <td style={{ padding: '0.75rem' }}>
                        <button
                          onClick={() => setSelectedVuln(v)}
                          className="btn-secondary"
                          style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}
                        >
                          <Eye size={13} /> Inspect
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Right Evidence Inspector Drawer */}
          {selectedVuln && (
            <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                  <div>
                    <span className="badge badge-critical" style={{ marginBottom: '0.4rem', display: 'inline-block' }}>
                      {selectedVuln.severity} SEVERITY (CVSS v3.1: {selectedVuln.cvss})
                    </span>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#FFF' }}>{selectedVuln.title}</h3>
                  </div>
                  <button
                    onClick={() => setShowPatchModal(true)}
                    className="btn-primary"
                    style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem' }}
                  >
                    AI FIX SCRIPT
                  </button>
                </div>

                <div style={{ background: 'rgba(10, 14, 23, 0.8)', border: '1px solid var(--border-color)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', marginBottom: '1rem', fontSize: '0.78rem' }}>
                  <div>Category: <strong style={{ color: '#FFF' }}>{selectedVuln.category}</strong></div>
                  <div>Affected Parameter: <strong className="font-mono" style={{ color: 'var(--accent-cyan)' }}>{selectedVuln.parameter}</strong></div>
                  <div>Location URL: <strong className="font-mono" style={{ color: 'var(--text-secondary)' }}>{selectedVuln.target || targetUrl}</strong></div>
                </div>

                {/* Drawer Tab Switcher: Evidence | Request | Response | Remediation */}
                <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)', marginBottom: '1rem', gap: '0.5rem' }}>
                  {['evidence', 'request', 'response', 'remediation'].map(t => (
                    <button
                      key={t}
                      onClick={() => setActiveTab(t)}
                      style={{
                        background: 'none',
                        border: 'none',
                        borderBottom: activeTab === t ? '2px solid var(--accent-ryuk)' : '2px solid transparent',
                        padding: '0.4rem 0.6rem',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        color: activeTab === t ? '#FFF' : 'var(--text-muted)',
                        cursor: 'pointer',
                        textTransform: 'uppercase'
                      }}
                    >
                      {t}
                    </button>
                  ))}
                </div>

                {/* Tab Content */}
                {activeTab === 'evidence' && (
                  <div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.6rem', lineHeight: 1.5 }}>
                      {selectedVuln.description}
                    </div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-cyan)', marginBottom: '0.3rem' }}>PROOF OF CONCEPT (PoC)</div>
                    <pre style={{ background: '#04060A', border: '1px solid var(--border-color-cyan)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', fontSize: '0.75rem', color: '#38BDF8', fontFamily: 'var(--font-mono)', whiteSpace: 'pre-wrap', maxHeight: '140px', overflowY: 'auto' }}>
                      {selectedVuln.poc}
                    </pre>
                  </div>
                )}

                {activeTab === 'request' && (
                  <div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-cyan)', marginBottom: '0.3rem' }}>RAW HTTP REQUEST HEADERS & BODY</div>
                    <pre style={{ background: '#04060A', border: '1px solid var(--border-color)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', fontSize: '0.75rem', color: '#F0F4F8', fontFamily: 'var(--font-mono)', whiteSpace: 'pre-wrap', maxHeight: '180px', overflowY: 'auto' }}>
                      {selectedVuln.requestData || selectedVuln.poc}
                    </pre>
                  </div>
                )}

                {activeTab === 'response' && (
                  <div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#00E676', marginBottom: '0.3rem' }}>SERVER RESPONSE TELEMETRY</div>
                    <pre style={{ background: '#04060A', border: '1px solid var(--border-color)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', fontSize: '0.75rem', color: '#69F0AE', fontFamily: 'var(--font-mono)', whiteSpace: 'pre-wrap', maxHeight: '180px', overflowY: 'auto' }}>
                      {selectedVuln.responseData || 'HTTP/1.1 200 OK\nServer: Nginx\nContent-Type: application/json\n\n{"status":"vulnerable"}'}
                    </pre>
                  </div>
                )}

                {activeTab === 'remediation' && (
                  <div style={{ background: 'rgba(255, 0, 85, 0.05)', border: '1px solid var(--border-color-glow)', padding: '0.85rem', borderRadius: 'var(--radius-sm)' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-ryuk)', marginBottom: '0.3rem' }}>RECOMMENDED REMEDIATION CODE</div>
                    <div style={{ fontSize: '0.8rem', color: '#F0F4F8', lineHeight: 1.5 }}>
                      {selectedVuln.remediation}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {showPatchModal && selectedVuln && (
        <PatchDiffModal
          vuln={selectedVuln}
          onClose={() => setShowPatchModal(false)}
        />
      )}
    </div>
  );
};
