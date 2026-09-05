import React, { useState } from 'react';
import { Globe, Server, ShieldAlert, Cpu, Layers, Info } from 'lucide-react';

export const TopologyGraph = () => {
  const [selectedNode, setSelectedNode] = useState(null);

  const nodes = [
    { id: 'target', label: 'api.banking-core', type: 'target', x: 300, y: 180, color: 'var(--accent-cyan)', info: 'Target Core Gateway (192.168.10.45)' },
    // Subdomains
    { id: 'sub1', label: 'admin.banking', type: 'subdomain', x: 120, y: 80, color: '#38BDF8', info: 'Forbidden Admin Panel (403 Forbidden)' },
    { id: 'sub2', label: 'staging.banking', type: 'subdomain', x: 120, y: 280, color: '#38BDF8', info: 'Staging Environment (PHP 8.3)' },
    { id: 'sub3', label: 'metrics.banking', type: 'subdomain', x: 480, y: 80, color: '#38BDF8', info: 'Prometheus & Grafana (200 OK)' },
    // Ports
    { id: 'port80', label: 'Port 80 (HTTP)', type: 'port', x: 220, y: 120, color: '#00E676', info: 'Nginx 1.26.1 Web Server' },
    { id: 'port443', label: 'Port 443 (HTTPS)', type: 'port', x: 380, y: 120, color: '#00E676', info: 'OpenSSL 3.0.13 TLS 1.3' },
    { id: 'port8080', label: 'Port 8080 (Spring)', type: 'port', x: 220, y: 250, color: '#FFB800', info: 'Spring Boot 3.2.4 API Engine' },
    { id: 'port22', label: 'Port 22 (SSH)', type: 'port', x: 380, y: 250, color: '#00E676', info: 'OpenSSH 9.6p1' },
    // Threats
    { id: 'vuln1', label: 'CRITICAL: SQLi', type: 'threat', x: 480, y: 280, color: '#FF1744', info: 'CVE-2026-19203: POST /v1/auth/login Auth Bypass' },
    { id: 'vuln2', label: 'CRITICAL: RCE', type: 'threat', x: 300, y: 320, color: '#FF1744', info: 'CVE-2026-14402: Unsafe Deserialization in /upload' }
  ];

  const links = [
    { from: 'target', to: 'sub1' },
    { from: 'target', to: 'sub2' },
    { from: 'target', to: 'sub3' },
    { from: 'target', to: 'port80' },
    { from: 'target', to: 'port443' },
    { from: 'target', to: 'port8080' },
    { from: 'target', to: 'port22' },
    { from: 'port8080', to: 'vuln1', threat: true },
    { from: 'target', to: 'vuln2', threat: true }
  ];

  return (
    <div className="glass-panel" style={{ padding: '1.25rem', marginBottom: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#FFF', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Layers size={18} color="var(--accent-cyan)" /> ATTACK SURFACE TOPOLOGY & NETWORK NODES
          </h3>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            Interactive node visualizer. Click any node to inspect service bindings and threat vectors.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.72rem' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--accent-cyan)' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-cyan)' }} /> Core Target
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#00E676' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#00E676' }} /> Open Ports
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#FF1744' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#FF1744' }} /> Threat Vectors
          </span>
        </div>
      </div>

      {/* SVG Canvas Container */}
      <div style={{ position: 'relative', width: '100%', height: '360px', background: 'rgba(6, 8, 12, 0.9)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
        <svg style={{ width: '100%', height: '100%' }}>
          <defs>
            <filter id="glow-red" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="glow-cyan" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Links */}
          {links.map((link, idx) => {
            const source = nodes.find(n => n.id === link.from);
            const target = nodes.find(n => n.id === link.to);
            if (!source || !target) return null;
            return (
              <line
                key={idx}
                x1={source.x}
                y1={source.y}
                x2={target.x}
                y2={target.y}
                stroke={link.threat ? 'rgba(255, 23, 68, 0.6)' : 'rgba(0, 240, 255, 0.25)'}
                strokeWidth={link.threat ? 2.5 : 1.5}
                strokeDasharray={link.threat ? '4,4' : 'none'}
              />
            );
          })}

          {/* Nodes */}
          {nodes.map((node) => {
            const isSelected = selectedNode?.id === node.id;
            return (
              <g
                key={node.id}
                transform={`translate(${node.x}, ${node.y})`}
                onClick={() => setSelectedNode(node)}
                style={{ cursor: 'pointer' }}
              >
                <circle
                  r={node.type === 'target' ? 22 : node.type === 'threat' ? 16 : 14}
                  fill={node.color}
                  fillOpacity={0.25}
                  stroke={node.color}
                  strokeWidth={isSelected ? 3 : 2}
                  filter={node.type === 'threat' ? 'url(#glow-red)' : 'url(#glow-cyan)'}
                />
                <circle
                  r={node.type === 'target' ? 8 : 5}
                  fill={node.color}
                />
                <text
                  y={node.type === 'target' ? 36 : 28}
                  textAnchor="middle"
                  fill={isSelected ? '#FFF' : 'var(--text-secondary)'}
                  fontSize={11}
                  fontWeight={isSelected ? 700 : 500}
                  fontFamily="var(--font-mono)"
                >
                  {node.label}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Selected Node Details Card Overlay */}
        {selectedNode && (
          <div className="glass-panel animate-fade-in" style={{
            position: 'absolute',
            bottom: '12px',
            right: '12px',
            maxWidth: '300px',
            padding: '0.85rem',
            borderRadius: 'var(--radius-sm)',
            border: `1px solid ${selectedNode.color}`,
            background: 'rgba(10, 14, 23, 0.95)'
          }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: selectedNode.color, marginBottom: '0.2rem' }}>
              NODE DETAILED TELEMETRY
            </div>
            <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#FFF' }}>{selectedNode.label}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.3rem' }}>
              {selectedNode.info}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
