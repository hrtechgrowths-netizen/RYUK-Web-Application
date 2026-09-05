import React, { useState } from 'react';
import { Play, Pause, Square, Globe, Sliders, Cpu, Layers, Zap, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { AI_MODELS } from '../mockData/securityData';

export const ScanControls = ({ onStartScan, onStopScan, onPauseScan, activeScanState }) => {
  const [targetUrl, setTargetUrl] = useState('https://api.banking-core-v2.internal');
  const [depth, setDepth] = useState(4);
  const [concurrency, setConcurrency] = useState(20);
  const [selectedAiModel, setSelectedAiModel] = useState('ryuk-neural-7b');
  const [validationError, setValidationError] = useState('');

  const isScanning = activeScanState?.status === 'scanning';
  const isPaused = activeScanState?.status === 'paused';

  const handleStart = (e) => {
    e.preventDefault();
    setValidationError('');
    if (!targetUrl || (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://'))) {
      setValidationError('Valid target URL with http:// or https:// protocol is required');
      return;
    }
    const modelObj = AI_MODELS.find(m => m.id === selectedAiModel) || AI_MODELS[0];
    onStartScan({
      url: targetUrl,
      depth,
      concurrency,
      aiModel: modelObj.name
    });
  };

  return (
    <div className={`glass-panel ${isScanning ? 'glass-panel-glow' : ''}`} style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
      {/* Top Title & Active Status */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <Zap size={20} color="var(--accent-ryuk)" />
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#FFF' }}>TARGET ASSESSMENT CONTROLLER</h2>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {isScanning && (
            <span className="badge badge-critical pulse-dot" style={{ gap: '0.4rem' }}>
              SCAN IN PROGRESS ({activeScanState?.progress || 0}%)
            </span>
          )}
          {isPaused && (
            <span className="badge badge-medium">SCAN PAUSED</span>
          )}
          {!isScanning && !isPaused && (
            <span className="badge badge-low">READY TO LAUNCH</span>
          )}
        </div>
      </div>

      {validationError && (
        <div style={{
          background: 'rgba(255, 23, 68, 0.15)',
          border: '1px solid rgba(255, 23, 68, 0.4)',
          color: '#FF4D6D',
          padding: '0.5rem 0.85rem',
          borderRadius: 'var(--radius-sm)',
          fontSize: '0.8rem',
          marginBottom: '1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem'
        }}>
          <AlertTriangle size={15} />
          <span>{validationError}</span>
        </div>
      )}

      {/* Target URL Input & Main Buttons */}
      <form onSubmit={handleStart}>
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Globe size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              className="input-field"
              style={{ paddingLeft: '2.6rem', fontSize: '0.95rem', height: '46px', fontFamily: 'var(--font-mono)' }}
              placeholder="Enter target URL (e.g. https://api.target-service.com)..."
              value={targetUrl}
              onChange={(e) => setTargetUrl(e.target.value)}
              disabled={isScanning}
            />
          </div>

          {/* Action Buttons: START / PAUSE / STOP */}
          {!isScanning && !isPaused ? (
            <button
              type="submit"
              className="btn-primary"
              style={{ height: '46px', padding: '0 1.5rem', fontSize: '0.9rem', flexShrink: 0 }}
            >
              <Play size={18} fill="#FFF" /> START ASSESSMENT
            </button>
          ) : (
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                type="button"
                onClick={onPauseScan}
                className="btn-secondary"
                style={{ height: '46px', padding: '0 1.25rem', fontSize: '0.9rem' }}
              >
                {isPaused ? <Play size={18} /> : <Pause size={18} />}
                {isPaused ? 'RESUME' : 'PAUSE'}
              </button>
              <button
                type="button"
                onClick={onStopScan}
                className="btn-danger"
                style={{ height: '46px', padding: '0 1.25rem', fontSize: '0.9rem' }}
              >
                <Square size={16} fill="#FFF" /> STOP SCAN
              </button>
            </div>
          )}
        </div>

        {/* Scan Parameters: Depth, Concurrency, AI Model */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1rem',
          background: 'rgba(10, 14, 23, 0.6)',
          padding: '1rem',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--border-color)'
        }}>
          {/* Depth Slider */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.78rem' }}>
              <span style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <Layers size={14} color="var(--accent-cyan)" /> Crawl Depth Level:
              </span>
              <span className="font-mono" style={{ color: 'var(--accent-cyan)', fontWeight: 700 }}>
                {depth} Levels
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={depth}
              onChange={(e) => setDepth(Number(e.target.value))}
              disabled={isScanning}
              style={{ width: '100%', cursor: isScanning ? 'not-allowed' : 'pointer' }}
            />
          </div>

          {/* Concurrency Slider */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.78rem' }}>
              <span style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <Sliders size={14} color="var(--accent-ryuk)" /> Thread Concurrency:
              </span>
              <span className="font-mono" style={{ color: 'var(--accent-ryuk)', fontWeight: 700 }}>
                {concurrency} Parallel Threads
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="50"
              value={concurrency}
              onChange={(e) => setConcurrency(Number(e.target.value))}
              disabled={isScanning}
              style={{ width: '100%', cursor: isScanning ? 'not-allowed' : 'pointer' }}
            />
          </div>

          {/* AI Model Selector */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.78rem' }}>
              <span style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <Cpu size={14} color="#9D00FF" /> AI Exploit Reasoning Model:
              </span>
            </div>
            <select
              className="select-field"
              style={{ width: '100%', fontSize: '0.8rem', padding: '0.45rem 0.75rem' }}
              value={selectedAiModel}
              onChange={(e) => setSelectedAiModel(e.target.value)}
              disabled={isScanning}
            >
              {AI_MODELS.map(m => (
                <option key={m.id} value={m.id}>
                  {m.name} ({m.provider})
                </option>
              ))}
            </select>
          </div>
        </div>
      </form>

      {/* Progress Bar when Active */}
      {isScanning && (
        <div style={{ marginTop: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
            <span>Scanning Endpoints & Exercising Payloads...</span>
            <span className="font-mono" style={{ color: 'var(--accent-cyan)' }}>{activeScanState.progress}%</span>
          </div>
          <div style={{ width: '100%', height: '8px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{
              width: `${activeScanState.progress}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #FF0055 0%, #00F0FF 100%)',
              boxShadow: '0 0 12px rgba(0, 240, 255, 0.5)',
              transition: 'width 0.4s ease'
            }} />
          </div>
        </div>
      )}
    </div>
  );
};
