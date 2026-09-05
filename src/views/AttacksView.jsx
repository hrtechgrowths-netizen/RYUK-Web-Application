import React, { useState } from 'react';
import { VULNERABILITIES } from '../mockData/securityData';
import { PatchDiffModal } from '../components/PatchDiffModal';
import { ExploitSandbox } from '../components/ExploitSandbox';
import { ShieldAlert, Search, Filter, Terminal, Code2, Copy, Check, ExternalLink, ChevronRight, CheckCircle, RefreshCw } from 'lucide-react';

export const AttacksView = () => {
  const [vulnerabilities, setVulnerabilities] = useState(VULNERABILITIES);
  const [selectedVuln, setSelectedVuln] = useState(VULNERABILITIES[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [severityFilter, setSeverityFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [copiedPoc, setCopiedPoc] = useState(false);
  const [showPatchModal, setShowPatchModal] = useState(false);

  const filteredVulns = vulnerabilities.filter(v => {
    const matchesSearch = v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          v.cve.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          v.target.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSeverity = severityFilter === 'ALL' || v.severity === severityFilter;
    const matchesStatus = statusFilter === 'ALL' || v.status === statusFilter;
    return matchesSearch && matchesSeverity && matchesStatus;
  });

  const handleCopyPoc = (pocText) => {
    navigator.clipboard.writeText(pocText);
    setCopiedPoc(true);
    setTimeout(() => setCopiedPoc(false), 2000);
  };

  const handleToggleStatus = (id) => {
    setVulnerabilities(prev => prev.map(v => {
      if (v.id === id) {
        const nextStatus = v.status === 'OPEN' ? 'IN_REVIEW' : v.status === 'IN_REVIEW' ? 'RESOLVED' : 'OPEN';
        const updated = { ...v, status: nextStatus };
        if (selectedVuln?.id === id) setSelectedVuln(updated);
        return updated;
      }
      return v;
    }));
  };

  return (
    <div className="animate-fade-in">
      {/* Title */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#FFF', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <ShieldAlert color="var(--accent-ryuk)" size={28} /> ATTACKS & VULNERABILITY INTELLIGENCE
        </h1>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          Detailed exploit classification, HTTP Proof-of-Concepts, CVSS scores, and AI remediation engine.
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
            placeholder="Search by vulnerability, CVE ID, or target URL..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          {/* Severity Select */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
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
              <option value="LOW">Low Only</option>
            </select>
          </div>

          {/* Status Select */}
          <select
            className="select-field"
            style={{ fontSize: '0.8rem', height: '38px', padding: '0 0.75rem' }}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="ALL">All Statuses</option>
            <option value="OPEN">Open Issues</option>
            <option value="IN_REVIEW">In Review</option>
            <option value="RESOLVED">Resolved</option>
          </select>
        </div>
      </div>

      {/* Main Split Grid: Left List & Right Detail Pane */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.5rem' }}>
        {/* Left List */}
        <div className="glass-panel" style={{ padding: '1rem', height: '700px', overflowY: 'auto' }}>
          <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
            DISCOVERED THREAT VECTORS ({filteredVulns.length})
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {filteredVulns.map(v => {
              const isSelected = selectedVuln?.id === v.id;
              return (
                <div
                  key={v.id}
                  onClick={() => setSelectedVuln(v)}
                  style={{
                    padding: '1rem',
                    borderRadius: 'var(--radius-sm)',
                    background: isSelected ? 'rgba(255, 0, 85, 0.1)' : 'rgba(10, 14, 23, 0.6)',
                    border: isSelected ? '1px solid var(--accent-ryuk)' : '1px solid var(--border-color)',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.4rem' }}>
                    <span className={`badge ${v.severity === 'CRITICAL' ? 'badge-critical' : v.severity === 'HIGH' ? 'badge-high' : 'badge-medium'}`}>
                      {v.severity} • CVSS {v.cvss}
                    </span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                      {v.cve}
                    </span>
                  </div>

                  <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#FFF', marginBottom: '0.3rem' }}>
                    {v.title}
                  </h4>

                  <div style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', marginBottom: '0.6rem', wordBreak: 'break-all' }}>
                    {v.target}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    <span>Category: {v.category}</span>
                    <span style={{
                      color: v.status === 'OPEN' ? '#FF4D6D' : v.status === 'IN_REVIEW' ? '#FFC425' : '#00E676',
                      fontWeight: 700
                    }}>
                      STATUS: {v.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Detail Pane */}
        {selectedVuln ? (
          <div className="glass-panel" style={{ padding: '1.5rem', height: '700px', overflowY: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div>
                  <span className={`badge ${selectedVuln.severity === 'CRITICAL' ? 'badge-critical' : 'badge-high'}`} style={{ marginBottom: '0.5rem', display: 'inline-block' }}>
                    {selectedVuln.severity} SEVERITY (CVSS v3.1: {selectedVuln.cvss})
                  </span>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#FFF' }}>{selectedVuln.title}</h3>
                </div>
                <button
                  onClick={() => handleToggleStatus(selectedVuln.id)}
                  className="btn-secondary"
                  style={{ fontSize: '0.75rem', padding: '0.4rem 0.75rem' }}
                >
                  <RefreshCw size={13} /> Update Status ({selectedVuln.status})
                </button>
              </div>

              {/* Target & CVE Details */}
              <div style={{ background: 'rgba(10, 14, 23, 0.8)', border: '1px solid var(--border-color)', padding: '0.85rem', borderRadius: 'var(--radius-sm)', marginBottom: '1rem', fontSize: '0.8rem' }}>
                <div style={{ color: 'var(--text-muted)', marginBottom: '0.2rem' }}>TARGET URL ENDPOINT</div>
                <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)', fontWeight: 600, wordBreak: 'break-all' }}>
                  {selectedVuln.target}
                </div>
                <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid rgba(255, 255, 255, 0.05)', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  <span>CVE ID: <strong>{selectedVuln.cve}</strong></span>
                  <span>Detected: <strong>{selectedVuln.detectedAt}</strong></span>
                </div>
              </div>

              {/* Description */}
              <div style={{ marginBottom: '1.25rem' }}>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#FFF', marginBottom: '0.4rem' }}>VULNERABILITY SUMMARY</h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {selectedVuln.description}
                </p>
              </div>

              {/* Proof of Concept Code Box */}
              <div style={{ marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Terminal size={15} /> PROOF OF CONCEPT (PoC) PAYLOAD
                  </h4>
                  <button
                    onClick={() => handleCopyPoc(selectedVuln.poc)}
                    style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '0.75rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.2rem' }}
                  >
                    {copiedPoc ? <Check size={14} color="#00E676" /> : <Copy size={14} />} {copiedPoc ? 'Copied' : 'Copy Payload'}
                  </button>
                </div>
                <pre style={{
                  background: 'rgba(6, 8, 12, 0.95)',
                  border: '1px solid var(--border-color-cyan)',
                  padding: '0.85rem',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.78rem',
                  color: '#38BDF8',
                  fontFamily: 'var(--font-mono)',
                  whiteSpace: 'pre-wrap',
                  overflowX: 'auto',
                  maxHeight: '160px'
                }}>
                  {selectedVuln.poc}
                </pre>
              </div>

              {/* AI Remediation */}
              <div style={{ background: 'rgba(255, 0, 85, 0.05)', border: '1px solid var(--border-color-glow)', padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-ryuk)', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem' }}>
                  <Code2 size={16} /> RYUK AI REMEDIATION REASONING
                </h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-primary)', lineHeight: 1.5 }}>
                  {selectedVuln.remediation}
                </p>
              </div>
            </div>

            {/* Bottom Actions */}
            <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '0.75rem' }}>
              <button
                onClick={() => setShowPatchModal(true)}
                className="btn-primary"
                style={{ flex: 1, justifyContent: 'center', fontSize: '0.8rem' }}
              >
                GENERATE AI PATCH SCRIPT
              </button>
              <button
                onClick={() => alert(`Re-testing payload execution against ${selectedVuln.target}...`)}
                className="btn-cyan"
                style={{ fontSize: '0.8rem' }}
              >
                RE-TEST PAYLOAD
              </button>
            </div>
          </div>
        ) : (
          <div className="glass-panel" style={{ padding: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
            Select a vulnerability from the list to view Proof of Concept and AI Remediation.
          </div>
        )}
      </div>

      {/* Interactive Exploit Sandbox Component */}
      <ExploitSandbox />

      {showPatchModal && (
        <PatchDiffModal
          vuln={selectedVuln}
          onClose={() => setShowPatchModal(false)}
        />
      )}
    </div>
  );
};
