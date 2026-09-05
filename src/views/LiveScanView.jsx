import React, { useState, useEffect, useRef } from 'react';
import { SAMPLE_VULNS_POOL } from '../mockData/securityData';
import { Activity, Clock, Layers, Globe, Cpu, Pause, Play, Square, ShieldAlert, Terminal, CheckCircle2, Server, Code, Radio } from 'lucide-react';
export const LiveScanView = ({ activeScan, onStopScan, onPauseScan, onCompleteScan }) => {
  const [progress, setProgress] = useState(activeScan?.progress || 12);
  const [isPaused, setIsPaused] = useState(activeScan?.status === 'paused');
  const [elapsedSeconds, setElapsedSeconds] = useState(14);
  const [requestsCount, setRequestsCount] = useState(148);
  const [currentStage, setCurrentStage] = useState(1);
  const [discoveredTech, setDiscoveredTech] = useState(['Nginx 1.26.1', 'OpenSSL 3.0']);
  const [discoveredCms, setDiscoveredCms] = useState(['Custom Spring Boot Gateway']);
  const [liveFindings, setLiveFindings] = useState([]);
  const [activityLogs, setActivityLogs] = useState([
    { time: '00:00:02', type: 'INFO', msg: `Initiated Ryuk SecOps Assessment against ${activeScan?.url || 'target'}` },
    { time: '00:00:05', type: 'RECON', msg: 'Stage 1: Resolved DNS records -> 192.168.10.45' },
    { time: '00:00:10', type: 'PORT', msg: 'Discovered open ports: 80, 443, 8080, 22' }
  ]);

  const logEndRef = useRef(null);

  // Timer & Real-time Scan Progression Engine
  useEffect(() => {
    if (isPaused) return;

    const timerInterval = setInterval(() => {
      setElapsedSeconds(prev => prev + 1);
      setRequestsCount(prev => prev + Math.floor(Math.random() * 8) + 4);
    }, 1000);

    const scanProgressInterval = setInterval(() => {
      setProgress(prev => {
        const next = prev + 2;
        if (next >= 100) {
          clearInterval(scanProgressInterval);
          clearInterval(timerInterval);
          setTimeout(() => {
            if (onCompleteScan) onCompleteScan(liveFindings);
          }, 1000);
          return 100;
        }

        // Update Stages based on progress %
        if (next >= 20 && next < 45 && currentStage < 2) {
          setCurrentStage(2);
          setDiscoveredTech(prev => [...new Set([...prev, 'Spring Boot 3.2.4', 'MySQL 8.4'])]);
          setDiscoveredCms(['Custom Microservice Architecture']);
          setActivityLogs(l => [...l, { time: formatTime(elapsedSeconds), type: 'RECON', msg: 'Stage 2: Completed port matrix & tech stack fingerprinting.' }]);
        } else if (next >= 45 && next < 70 && currentStage < 3) {
          setCurrentStage(3);
          setActivityLogs(l => [...l, { time: formatTime(elapsedSeconds), type: 'CRAWLER', msg: `Stage 3: Crawling endpoints at Depth Level ${activeScan?.depth || 3}... Found 42 routes.` }]);
        } else if (next >= 70 && next < 90 && currentStage < 4) {
          setCurrentStage(4);
          setActivityLogs(l => [...l, { time: formatTime(elapsedSeconds), type: 'AI_REASONING', msg: `Stage 4: Ryuk AI Core evaluating injection vectors on POST /v1/auth/login` }]);
          // Trigger dynamic vulnerability discovery
          if (liveFindings.length === 0) {
            setLiveFindings([SAMPLE_VULNS_POOL[0]]);
            setActivityLogs(l => [...l, { time: formatTime(elapsedSeconds), type: 'CRITICAL', msg: 'EXPLOIT VERIFIED: SQL Injection confirmed on parameter "username"' }]);
          }
        } else if (next >= 90 && currentStage < 5) {
          setCurrentStage(5);
          if (liveFindings.length < 2) {
            setLiveFindings(prev => [...prev, SAMPLE_VULNS_POOL[1]]);
            setActivityLogs(l => [...l, { time: formatTime(elapsedSeconds), type: 'CRITICAL', msg: 'EXPLOIT VERIFIED: Unauthenticated RCE deserialization payload executed!' }]);
          }
          setActivityLogs(l => [...l, { time: formatTime(elapsedSeconds), type: 'INFO', msg: 'Stage 5: Compiling audit report & vulnerability posture matrix.' }]);
        }

        return next;
      });
    }, 1100);

    return () => {
      clearInterval(timerInterval);
      clearInterval(scanProgressInterval);
    };
  }, [isPaused, currentStage, elapsedSeconds, liveFindings, activeScan]);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activityLogs]);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `00:${m}:${s}`;
  };

  const stages = [
    { num: 1, label: 'DNS & Subdomain Recon' },
    { num: 2, label: 'Port & Tech Fingerprinting' },
    { num: 3, label: 'Endpoint Crawling (Depth 2-3)' },
    { num: 4, label: 'AI Exploit Reasoning' },
    { num: 5, label: 'Report Compilation' }
  ];

  return (
    <div className="animate-fade-in">
      {/* Title & Live Status */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span className="pulse-dot" style={{ width: '12px', height: '12px' }} />
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#FFF' }}>
              LIVE ASSESSMENT DASHBOARD
            </h1>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)', marginTop: '0.2rem' }}>
            Target Host: {activeScan?.url || 'https://api.banking-core-v2.internal'}
          </p>
        </div>

        {/* Live Controls: PAUSE & ABORT */}
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="btn-secondary"
            style={{ fontSize: '0.85rem' }}
          >
            {isPaused ? <Play size={16} /> : <Pause size={16} />}
            {isPaused ? 'RESUME SCAN' : 'PAUSE SCAN'}
          </button>
          <button
            onClick={onStopScan}
            className="btn-danger"
            style={{ fontSize: '0.85rem' }}
          >
            <Square size={16} fill="#FFF" /> ABORT ASSESSMENT
          </button>
        </div>
      </div>

      {/* Top Telemetry Strip (Duration, Requests, Concurrency, Progress %) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        <div className="glass-panel" style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <Clock size={24} color="var(--accent-cyan)" />
          <div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>ELAPSED DURATION</div>
            <div className="font-mono" style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFF' }}>
              {formatTime(elapsedSeconds)}
            </div>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <Activity size={24} color="var(--accent-ryuk)" />
          <div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>REQUESTS EXECUTED</div>
            <div className="font-mono" style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFF' }}>
              {requestsCount.toLocaleString()} reqs
            </div>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <Layers size={24} color="#00E676" />
          <div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>CRAWL DEPTH & WORKERS</div>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: '#FFF' }}>
              Depth: <strong style={{ color: 'var(--accent-cyan)' }}>{activeScan?.depth || 3}</strong> | {activeScan?.concurrency || 20} Threads
            </div>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <Cpu size={24} color="#9D00FF" />
          <div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>AI REASONING CORE</div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-cyan)' }}>
              {activeScan?.aiModel || 'Ryuk Neural Core v4.2'}
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar & Stage Tracker */}
      <div className="glass-panel" style={{ padding: '1.25rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
          <span style={{ fontWeight: 700, color: '#FFF' }}>
            SCAN STAGE {currentStage} OF 5: <span style={{ color: 'var(--accent-cyan)' }}>{stages[currentStage - 1].label}</span>
          </span>
          <span className="font-mono" style={{ color: 'var(--accent-ryuk)', fontWeight: 800 }}>{progress}% COMPLETE</span>
        </div>

        <div style={{ width: '100%', height: '10px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '5px', overflow: 'hidden', marginBottom: '1rem' }}>
          <div style={{
            width: `${progress}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #FF0055 0%, #00F0FF 100%)',
            boxShadow: '0 0 15px rgba(0, 240, 255, 0.6)',
            transition: 'width 0.4s ease'
          }} />
        </div>

        {/* 5-Stage Stepper */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.5rem', textAlign: 'center' }}>
          {stages.map(st => {
            const isDone = currentStage > st.num || progress === 100;
            const isCurrent = currentStage === st.num && progress < 100;
            return (
              <div key={st.num} style={{
                padding: '0.5rem',
                borderRadius: 'var(--radius-sm)',
                background: isCurrent ? 'rgba(0, 240, 255, 0.12)' : isDone ? 'rgba(0, 230, 118, 0.1)' : 'rgba(10, 14, 23, 0.5)',
                border: isCurrent ? '1px solid var(--accent-cyan)' : isDone ? '1px solid #00E676' : '1px solid var(--border-color)',
                fontSize: '0.72rem',
                color: isCurrent ? '#FFF' : isDone ? '#00E676' : 'var(--text-muted)'
              }}>
                <div style={{ fontWeight: 700 }}>STAGE {st.num}</div>
                <div style={{ fontSize: '0.68rem', marginTop: '0.2rem' }}>{st.label}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Split Grid: Left Discovered Tech & Findings / Right Live AI Activity Stream */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '1.5rem' }}>
        {/* Left Column: Tech Stack Discovered & Realtime Security Findings */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Tech & CMS Fingerprinting Panel */}
          <div className="glass-panel" style={{ padding: '1.25rem' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#FFF', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
              <Server size={18} color="var(--accent-cyan)" /> DISCOVERED TECH STACK & CMS
            </h3>

            <div style={{ marginBottom: '0.85rem' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>DETECTED INFRASTRUCTURE / FRAMEWORKS</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {discoveredTech.map(t => (
                  <span key={t} className="badge badge-active font-mono" style={{ fontSize: '0.72rem' }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>CMS / CORE ARCHITECTURE</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {discoveredCms.map(c => (
                  <span key={c} className="badge badge-low font-mono" style={{ fontSize: '0.72rem' }}>
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Real-time Findings Panel */}
          <div className="glass-panel" style={{ padding: '1.25rem', flex: 1 }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#FFF', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
              <ShieldAlert size={18} color="var(--accent-ryuk)" /> DYNAMIC SECURITY FINDINGS ({liveFindings.length})
            </h3>

            {liveFindings.length === 0 ? (
              <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.82rem' }}>
                Exercising payload vectors... Discovered vulnerabilities will populate here live.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {liveFindings.map(v => (
                  <div key={v.id} style={{
                    padding: '0.85rem',
                    background: 'rgba(255, 0, 85, 0.08)',
                    border: '1px solid var(--border-color-glow)',
                    borderRadius: 'var(--radius-sm)'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                      <span className="badge badge-critical">{v.severity} • {v.cve}</span>
                      <span style={{ fontSize: '0.7rem', color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>CVSS {v.cvss}</span>
                    </div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#FFF' }}>{v.title}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', marginTop: '0.2rem' }}>
                      Parameter: <strong style={{ color: '#FF4D6D' }}>{v.parameter}</strong>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Terminal Activity & AI Decisions Stream */}
        <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#FFF', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
            <Terminal size={18} color="var(--accent-cyan)" /> LIVE ACTIVITY LOG & AI DECISIONS
          </h3>

          <div style={{
            background: '#04060A',
            border: '1px solid var(--border-color-cyan)',
            borderRadius: 'var(--radius-sm)',
            padding: '0.85rem',
            flex: 1,
            minHeight: '340px',
            maxHeight: '440px',
            overflowY: 'auto',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.78rem',
            lineHeight: 1.6
          }}>
            {activityLogs.map((log, idx) => (
              <div key={idx} style={{ marginBottom: '0.4rem', borderBottom: '1px solid rgba(255,255,255,0.03)', paddingBottom: '0.3rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>[{log.time}]</span>{' '}
                <span style={{ color: log.type === 'CRITICAL' ? '#FF1744' : log.type === 'AI_REASONING' ? '#9D00FF' : 'var(--accent-cyan)', fontWeight: 700 }}>
                  [{log.type}]
                </span>{' '}
                <span style={{ color: log.type === 'CRITICAL' ? '#FF4D6D' : '#F0F4F8' }}>{log.msg}</span>
              </div>
            ))}
            <div ref={logEndRef} />
          </div>
        </div>
      </div>
    </div>
  );
};
