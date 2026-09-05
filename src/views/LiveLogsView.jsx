import React, { useState, useEffect, useRef } from 'react';
import { INITIAL_LOGS } from '../mockData/securityData';
import { Terminal, Play, Pause, Trash2, Download, Copy, Check, Filter, Cpu, Radio, Search } from 'lucide-react';

export const LiveLogsView = ({ activeScanState }) => {
  const [logs, setLogs] = useState(INITIAL_LOGS);
  const [isStreaming, setIsStreaming] = useState(true);
  const [autoScroll, setAutoScroll] = useState(true);
  const [logFilter, setLogFilter] = useState('ALL');
  const [searchLog, setSearchLog] = useState('');
  const [copiedLogs, setCopiedLogs] = useState(false);
  const logEndRef = useRef(null);

  // Simulated log streaming when enabled
  useEffect(() => {
    if (!isStreaming) return;

    const modules = ['CRAWLER', 'EXPLOIT', 'MODEL_RYUK', 'RECON', 'DNS', 'HTTP_AGENT'];
    const levels = ['INFO', 'INFO', 'WARN', 'CRITICAL', 'AI_REASONING'];
    const sampleMsgs = [
      'Exercising XSS injection payload vector: <script>alert(1)</script>',
      'Analyzing HTTP response status: 500 Internal Server Error (Stack Trace Leak)',
      'Ryuk Neural Core calculating vector vulnerability score: 8.9',
      'Port 8080 Spring Boot actuator endpoint accessible: /actuator/heapdump',
      'Crawling link depth level 4: /v2/api/internal/users/config',
      'Testing CORS preflight response headers from untrusted origin',
      'SQL Injection time-based delay confirmed: SLEEP(5) executed'
    ];

    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0];
      const randomLevel = levels[Math.floor(Math.random() * levels.length)];
      const randomMod = modules[Math.floor(Math.random() * modules.length)];
      const randomMsg = sampleMsgs[Math.floor(Math.random() * sampleMsgs.length)];

      const newLog = {
        id: Date.now(),
        time: timeStr,
        level: randomLevel,
        module: randomMod,
        msg: randomMsg
      };

      setLogs(prev => [...prev.slice(-300), newLog]); // Keep max 300 logs in memory
    }, 2500);

    return () => clearInterval(interval);
  }, [isStreaming]);

  // Auto-scroll effect
  useEffect(() => {
    if (autoScroll && logEndRef.current) {
      logEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs, autoScroll]);

  const filteredLogs = logs.filter(l => {
    const matchesFilter = logFilter === 'ALL' || l.level === logFilter;
    const matchesSearch = l.msg.toLowerCase().includes(searchLog.toLowerCase()) ||
                          l.module.toLowerCase().includes(searchLog.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleCopyAll = () => {
    const rawText = logs.map(l => `[${l.time}] [${l.level}] [${l.module}] ${l.msg}`).join('\n');
    navigator.clipboard.writeText(rawText);
    setCopiedLogs(true);
    setTimeout(() => setCopiedLogs(false), 2000);
  };

  const handleDownloadLogs = () => {
    const rawText = logs.map(l => `[${l.time}] [${l.level}] [${l.module}] ${l.msg}`).join('\n');
    const blob = new Blob([rawText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ryuk-secops-live-logs-${Date.now()}.log`;
    link.click();
  };

  return (
    <div className="animate-fade-in">
      {/* Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#FFF', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Terminal color="var(--accent-ryuk)" size={28} /> LIVE LOG STREAM & AI CONSOLE
          </h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Real-time WebSocket event log telemetry, AI model reasoning output, and payload responses.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={() => setIsStreaming(!isStreaming)}
            className={isStreaming ? 'btn-secondary' : 'btn-primary'}
            style={{ fontSize: '0.8rem' }}
          >
            {isStreaming ? <Pause size={15} /> : <Play size={15} />}
            {isStreaming ? 'PAUSE FEED' : 'RESUME STREAM'}
          </button>
          <button
            onClick={() => setLogs([])}
            className="btn-secondary"
            style={{ fontSize: '0.8rem' }}
          >
            <Trash2 size={15} /> Clear Console
          </button>
          <button
            onClick={handleDownloadLogs}
            className="btn-cyan"
            style={{ fontSize: '0.8rem' }}
          >
            <Download size={15} /> Export Logs (.log)
          </button>
        </div>
      </div>

      {/* Control Strip & Filters */}
      <div className="glass-panel" style={{ padding: '0.85rem 1.25rem', marginBottom: '1rem', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--accent-cyan)' }}>
            <Radio size={16} className={isStreaming ? 'pulse-dot' : ''} />
            <span>STREAM STATUS: {isStreaming ? 'LIVE CONNECTED' : 'PAUSED'}</span>
          </div>
          <span style={{ color: 'var(--border-color)' }}>|</span>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', cursor: 'pointer', color: 'var(--text-secondary)' }}>
            <input
              type="checkbox"
              checked={autoScroll}
              onChange={(e) => setAutoScroll(e.target.checked)}
            />
            Auto-scroll terminal
          </label>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              className="input-field"
              style={{ width: '180px', paddingLeft: '2rem', height: '32px', fontSize: '0.75rem' }}
              placeholder="Search logs..."
              value={searchLog}
              onChange={(e) => setSearchLog(e.target.value)}
            />
          </div>

          <select
            className="select-field"
            style={{ fontSize: '0.75rem', height: '32px', padding: '0 0.6rem' }}
            value={logFilter}
            onChange={(e) => setLogFilter(e.target.value)}
          >
            <option value="ALL">All Levels</option>
            <option value="INFO">INFO Only</option>
            <option value="WARN">WARN Only</option>
            <option value="CRITICAL">CRITICAL Only</option>
            <option value="AI_REASONING">AI REASONING Only</option>
          </select>

          <button
            onClick={handleCopyAll}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '0.75rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.2rem' }}
          >
            {copiedLogs ? <Check size={14} color="#00E676" /> : <Copy size={14} />} {copiedLogs ? 'Copied' : 'Copy All'}
          </button>
        </div>
      </div>

      {/* Terminal View Container */}
      <div style={{
        background: '#04060A',
        border: '1px solid var(--border-color-glow)',
        borderRadius: 'var(--radius-md)',
        padding: '1.25rem',
        height: '620px',
        overflowY: 'auto',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.82rem',
        boxShadow: 'inset 0 0 20px rgba(0, 0, 0, 0.8)'
      }}>
        <div style={{ color: 'var(--text-muted)', marginBottom: '0.75rem', borderBottom: '1px dashed rgba(255, 255, 255, 0.1)', paddingBottom: '0.5rem', fontSize: '0.75rem' }}>
          === RYUK SECOPS REALTIME WEBSOCKET TERMINAL CONSOLE SESSION #9042 ===
        </div>

        {filteredLogs.map((l) => {
          let levelColor = '#29B6F6';
          if (l.level === 'WARN') levelColor = '#FFB800';
          if (l.level === 'CRITICAL') levelColor = '#FF1744';
          if (l.level === 'AI_REASONING') levelColor = '#9D00FF';

          return (
            <div key={l.id} style={{ display: 'flex', gap: '0.75rem', lineHeight: 1.7, borderBottom: '1px solid rgba(255, 255, 255, 0.02)' }}>
              <span style={{ color: 'var(--text-muted)', opacity: 0.6, flexShrink: 0 }}>[{l.time}]</span>
              <span style={{
                color: levelColor,
                fontWeight: 700,
                width: '100px',
                flexShrink: 0,
                display: 'inline-block'
              }}>
                [{l.level}]
              </span>
              <span style={{ color: 'var(--accent-cyan)', fontWeight: 600, flexShrink: 0, width: '110px' }}>
                [{l.module}]
              </span>
              <span style={{ color: l.level === 'CRITICAL' ? '#FF4D6D' : l.level === 'AI_REASONING' ? '#D8B4FE' : '#F0F4F8', flex: 1, wordBreak: 'break-all' }}>
                {l.msg}
              </span>
            </div>
          );
        })}

        <div ref={logEndRef} />
      </div>
    </div>
  );
};
