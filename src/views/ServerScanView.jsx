import React, { useState } from 'react';
import { SERVER_SCAN_DATA } from '../mockData/securityData';
import { TopologyGraph } from '../components/TopologyGraph';
import { Server, Globe, ShieldCheck, Cpu, HardDrive, RefreshCw, Radio, Lock, Activity, CheckCircle2 } from 'lucide-react';

export const ServerScanView = () => {
  const [data, setData] = useState(SERVER_SCAN_DATA);
  const [isScanningPorts, setIsScanningPorts] = useState(false);

  const handleTriggerPortScan = () => {
    setIsScanningPorts(true);
    setTimeout(() => {
      setIsScanningPorts(false);
    }, 2000);
  };

  return (
    <div className="animate-fade-in">
      {/* Title Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#FFF', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Server color="var(--accent-cyan)" size={28} /> SERVER SCAN & RECONNAISSANCE
          </h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Network port discovery, OS fingerprinting, subdomain discovery, and SSL/TLS cryptography validation.
          </p>
        </div>

        <button
          onClick={handleTriggerPortScan}
          disabled={isScanningPorts}
          className="btn-cyan"
          style={{ fontSize: '0.85rem' }}
        >
          <RefreshCw size={16} className={isScanningPorts ? 'pulse-dot' : ''} />
          {isScanningPorts ? 'EXECUTING NMAP SCAN...' : 'RE-SCAN NETWORK HOST'}
        </button>
      </div>

      {/* Host Overview Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        <div className="glass-panel" style={{ padding: '1.25rem' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.4rem' }}>PRIMARY TARGET DOMAIN</div>
          <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>
            {data.target}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.4rem' }}>
            Host IPv4: <span className="font-mono" style={{ color: '#FFF' }}>{data.ip}</span>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '1.25rem' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.4rem' }}>OS FINGERPRINT</div>
          <div style={{ fontSize: '1rem', fontWeight: 700, color: '#FFF' }}>
            {data.os}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.4rem' }}>
            Kernel: Linux 6.8.0-generic x86_64
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '1.25rem' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.4rem' }}>SSL AUDIT GRADE</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ fontSize: '1.75rem', fontWeight: 800, color: '#00E676' }}>{data.sslInfo.grade}</span>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#FFF', fontWeight: 600 }}>{data.sslInfo.issuer}</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Valid until {data.sslInfo.validUntil}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Network Topology Visualizer Component */}
      <TopologyGraph />

      {/* Grid: Open Ports Matrix & Subdomain Discovery */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.5rem' }}>
        {/* Open Ports Matrix */}
        <div className="glass-panel" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#FFF', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Radio size={18} color="var(--accent-ryuk)" /> OPEN PORTS MATRIX ({data.ports.length})
            </h3>
            <span className="badge badge-active font-mono">PORT RANGE 1 - 65535</span>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '0.6rem' }}>PORT</th>
                  <th style={{ padding: '0.6rem' }}>SERVICE</th>
                  <th style={{ padding: '0.6rem' }}>STATE</th>
                  <th style={{ padding: '0.6rem' }}>BANNER VERSION</th>
                </tr>
              </thead>
              <tbody>
                {data.ports.map(p => (
                  <tr key={p.port} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}>
                    <td style={{ padding: '0.75rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--accent-cyan)' }}>
                      {p.port}
                    </td>
                    <td style={{ padding: '0.75rem', fontWeight: 600, color: '#FFF' }}>
                      {p.service}
                    </td>
                    <td style={{ padding: '0.75rem' }}>
                      <span className={`badge ${p.state === 'OPEN' ? 'badge-low' : 'badge-medium'}`}>
                        {p.state}
                      </span>
                    </td>
                    <td style={{ padding: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', fontSize: '0.78rem' }}>
                      {p.version}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Subdomain Enumeration List */}
        <div className="glass-panel" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#FFF', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Globe size={18} color="var(--accent-cyan)" /> SUBDOMAIN DISCOVERY ({data.subdomains.length})
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {data.subdomains.map(sub => (
              <div key={sub.name} style={{
                background: 'rgba(10, 14, 23, 0.7)',
                border: '1px solid var(--border-color)',
                padding: '0.85rem',
                borderRadius: 'var(--radius-sm)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, fontFamily: 'var(--font-mono)', color: '#FFF' }}>
                    {sub.name}
                  </span>
                  <span className={`badge ${sub.status === 200 ? 'badge-low' : 'badge-high'}`}>
                    HTTP {sub.status}
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  <span>IP: <strong className="font-mono" style={{ color: 'var(--accent-cyan)' }}>{sub.ip}</strong></span>
                  <div style={{ display: 'flex', gap: '0.3rem' }}>
                    {sub.tech.map(t => (
                      <span key={t} style={{ background: 'rgba(255, 255, 255, 0.08)', padding: '0.1rem 0.35rem', borderRadius: '3px', fontSize: '0.68rem', color: 'var(--text-secondary)' }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
