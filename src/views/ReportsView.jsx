import React, { useState } from 'react';
import { MOCK_REPORTS } from '../mockData/securityData';
import { ReportViewerModal } from '../components/ReportViewerModal';
import { FileText, Download, Printer, Plus, CheckCircle, FileCode, Database, Shield, Eye, X } from 'lucide-react';

export const ReportsView = () => {
  const [reports, setReports] = useState(MOCK_REPORTS);
  const [selectedReport, setSelectedReport] = useState(null);
  const [showGeneratorModal, setShowGeneratorModal] = useState(false);
  const [reportTitle, setReportTitle] = useState('');
  const [targetUrl, setTargetUrl] = useState('https://api.banking-core-v2.internal');
  const [includePoc, setIncludePoc] = useState(true);

  const handleGenerateReport = (e) => {
    e.preventDefault();
    const newRep = {
      id: `REP-2026-00${reports.length + 1}`,
      target: targetUrl,
      title: reportTitle || `Security Audit - ${targetUrl.replace('https://', '')}`,
      date: new Date().toISOString().split('T')[0],
      criticals: 2,
      highs: 3,
      score: 42,
      status: 'Ready',
      format: ['PDF', 'JSON', 'CSV']
    };
    setReports([newRep, ...reports]);
    setShowGeneratorModal(false);
    setReportTitle('');
  };

  const handleDownloadFile = (rep, format) => {
    let content = '';
    let mimeType = 'text/plain';

    if (format === 'JSON') {
      content = JSON.stringify(rep, null, 2);
      mimeType = 'application/json';
    } else if (format === 'CSV') {
      content = `ReportID,Title,Target,Date,Criticals,Highs,Score\n"${rep.id}","${rep.title}","${rep.target}","${rep.date}",${rep.criticals},${rep.highs},${rep.score}`;
      mimeType = 'text/csv';
    } else {
      window.print();
      return;
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${rep.id.toLowerCase()}-audit-report.${format.toLowerCase()}`;
    link.click();
  };

  return (
    <div className="animate-fade-in">
      {/* Title Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#FFF', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <FileText color="var(--accent-cyan)" size={28} /> REPORT & EXPORT ARCHIVE CENTER
          </h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Compliance audit generation, OWASP vulnerability reporting, and PDF/JSON data export.
          </p>
        </div>

        <button
          onClick={() => setShowGeneratorModal(true)}
          className="btn-primary"
          style={{ fontSize: '0.85rem' }}
        >
          <Plus size={16} /> GENERATE NEW AUDIT REPORT
        </button>
      </div>

      {/* Reports Table */}
      <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#FFF', marginBottom: '1rem' }}>
          GENERATED SECURITY REPORTS ({reports.length})
        </h3>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '0.75rem' }}>REPORT ID</th>
                <th style={{ padding: '0.75rem' }}>AUDIT TITLE</th>
                <th style={{ padding: '0.75rem' }}>TARGET HOST</th>
                <th style={{ padding: '0.75rem' }}>DATE</th>
                <th style={{ padding: '0.75rem' }}>CRITICALS</th>
                <th style={{ padding: '0.75rem' }}>RISK SCORE</th>
                <th style={{ padding: '0.75rem' }}>EXPORTS</th>
              </tr>
            </thead>
            <tbody>
              {reports.map(rep => (
                <tr key={rep.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}>
                  <td style={{ padding: '0.85rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--accent-cyan)' }}>
                    {rep.id}
                  </td>
                  <td style={{ padding: '0.85rem', fontWeight: 600, color: '#FFF' }}>
                    {rep.title}
                  </td>
                  <td style={{ padding: '0.85rem', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                    {rep.target}
                  </td>
                  <td style={{ padding: '0.85rem', color: 'var(--text-muted)' }}>
                    {rep.date}
                  </td>
                  <td style={{ padding: '0.85rem' }}>
                    <span className="badge badge-critical">{rep.criticals} Critical</span>
                  </td>
                  <td style={{ padding: '0.85rem' }}>
                    <span style={{ fontWeight: 800, color: rep.score < 50 ? 'var(--status-critical)' : 'var(--status-low)' }}>
                      {rep.score} / 100
                    </span>
                  </td>
                  <td style={{ padding: '0.85rem' }}>
                    <div style={{ display: 'flex', gap: '0.4rem' }}>
                      <button
                        onClick={() => setSelectedReport(rep)}
                        className="btn-secondary"
                        style={{ padding: '0.3rem 0.5rem', fontSize: '0.75rem' }}
                        title="View Executive Summary"
                      >
                        <Eye size={13} /> View
                      </button>
                      <button
                        onClick={() => handleDownloadFile(rep, 'PDF')}
                        className="btn-secondary"
                        style={{ padding: '0.3rem 0.5rem', fontSize: '0.75rem' }}
                      >
                        <Printer size={13} /> PDF
                      </button>
                      <button
                        onClick={() => handleDownloadFile(rep, 'JSON')}
                        className="btn-secondary"
                        style={{ padding: '0.3rem 0.5rem', fontSize: '0.75rem' }}
                      >
                        <FileCode size={13} /> JSON
                      </button>
                      <button
                        onClick={() => handleDownloadFile(rep, 'CSV')}
                        className="btn-secondary"
                        style={{ padding: '0.3rem 0.5rem', fontSize: '0.75rem' }}
                      >
                        <Database size={13} /> CSV
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Generator Modal */}
      {showGeneratorModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(6, 8, 12, 0.85)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '1rem' }}>
          <div className="glass-panel animate-fade-in" style={{ width: '100%', maxWidth: '500px', padding: '1.75rem', borderRadius: 'var(--radius-lg)', position: 'relative' }}>
            <button
              onClick={() => setShowGeneratorModal(false)}
              style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
            >
              <X size={20} />
            </button>

            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#FFF', marginBottom: '1rem' }}>
              Generate Custom Security Report
            </h2>

            <form onSubmit={handleGenerateReport}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                  REPORT TITLE
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="e.g. Q3 Banking Portal Pentest Report"
                  value={reportTitle}
                  onChange={(e) => setReportTitle(e.target.value)}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                  TARGET ENDPOINT URL
                </label>
                <input
                  type="text"
                  className="input-field"
                  value={targetUrl}
                  onChange={(e) => setTargetUrl(e.target.value)}
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-primary)', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={includePoc}
                    onChange={(e) => setIncludePoc(e.target.checked)}
                  />
                  Include Full HTTP Proof of Concept (PoC) Payloads & AI Code Remediation
                </label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button
                  type="button"
                  onClick={() => setShowGeneratorModal(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                >
                  COMPILE REPORT
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Report Summary HTML Modal Preview */}
      {selectedReport && (
        <ReportViewerModal
          report={selectedReport}
          onClose={() => setSelectedReport(null)}
        />
      )}
    </div>
  );
};
