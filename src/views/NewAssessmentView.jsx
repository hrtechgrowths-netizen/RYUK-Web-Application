import React, { useState } from 'react';
import { Globe, Layers, Sliders, Cpu, Zap, Shield, Info, CheckCircle2, Play, AlertCircle } from 'lucide-react';
import { AI_MODELS, SCAN_PROFILES } from '../mockData/securityData';

export const NewAssessmentView = ({ onLaunchAssessment }) => {
  const [targetUrl, setTargetUrl] = useState('https://api.banking-core-v2.internal');
  const [depth, setDepth] = useState(3); 
  const [concurrency, setConcurrency] = useState(20);
  const [aiToggle, setAiToggle] = useState(true);
  const [selectedAiModel, setSelectedAiModel] = useState('ryuk-neural-7b');
  const [selectedProfile, setSelectedProfile] = useState('standard-audit');
  const [errorMsg, setErrorMsg] = useState('');

  const handleProfileSelect = (prof) => {
    setSelectedProfile(prof.id);
    setDepth(prof.depth);
    setConcurrency(prof.concurrency);
    setAiToggle(prof.aiToggle);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (!targetUrl || (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://'))) {
      setErrorMsg('Please enter a valid target URL with http:// or https:// protocol');
      return;
    }
    const modelObj = AI_MODELS.find(m => m.id === selectedAiModel) || AI_MODELS[0];
    onLaunchAssessment({
      url: targetUrl.trim(),
      depth,
      concurrency,
      aiToggle,
      aiModel: modelObj.name,
      profile: selectedProfile
    });
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '900px', margin: '0 auto' }}>
      {/* Title Header */}
      <div style={{ marginBottom: '1.75rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#FFF', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Zap color="var(--accent-ryuk)" size={30} /> LAUNCH NEW SECURITY ASSESSMENT
        </h1>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
          Configure target URL, crawl depth, worker thread concurrency, and AI reasoning models.
        </p>
      </div>

      {errorMsg && (
        <div style={{
          background: 'rgba(255, 23, 68, 0.15)',
          border: '1px solid rgba(255, 23, 68, 0.4)',
          color: '#FF4D6D',
          padding: '0.75rem 1rem',
          borderRadius: 'var(--radius-sm)',
          fontSize: '0.85rem',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <AlertCircle size={18} />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Recommended Depth Alert Banner */}
      <div style={{
        background: 'rgba(0, 240, 255, 0.06)',
        border: '1px solid rgba(0, 240, 255, 0.2)',
        borderRadius: 'var(--radius-md)',
        padding: '1rem 1.25rem',
        marginBottom: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem'
      }}>
        <Info size={22} color="var(--accent-cyan)" style={{ flexShrink: 0 }} />
        <div style={{ fontSize: '0.82rem', color: 'var(--text-primary)', lineHeight: 1.5 }}>
          <strong>Workflow Optimization:</strong> A crawl depth value of <strong>2–3 levels</strong> is recommended for balanced scanning speed and complete vulnerability surface coverage. Higher concurrency allows faster throughput on high-bandwidth enterprise clusters.
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Step 1: Target URL Input */}
        <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#FFF', marginBottom: '0.6rem' }}>
            1. TARGET URL / DOMAIN ENDPOINT
          </label>
          <div style={{ position: 'relative' }}>
            <Globe size={20} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              className="input-field font-mono"
              style={{ paddingLeft: '3rem', fontSize: '1rem', height: '50px' }}
              placeholder="https://api.company-target.com"
              value={targetUrl}
              onChange={(e) => setTargetUrl(e.target.value)}
            />
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.4rem', display: 'block' }}>
            Enter full web application URL, API gateway host, or microservice endpoint.
          </span>
        </div>

        {/* Step 2: Assessment Profile Selection */}
        <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#FFF', marginBottom: '0.85rem' }}>
            2. SCAN PROFILE & PRESETS
          </label>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            {SCAN_PROFILES.map(prof => {
              const isSelected = selectedProfile === prof.id;
              return (
                <div
                  key={prof.id}
                  onClick={() => handleProfileSelect(prof)}
                  style={{
                    padding: '1rem',
                    borderRadius: 'var(--radius-sm)',
                    background: isSelected ? 'rgba(255, 0, 85, 0.12)' : 'rgba(10, 14, 23, 0.6)',
                    border: isSelected ? '1px solid var(--accent-ryuk)' : '1px solid var(--border-color)',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)',
                    position: 'relative'
                  }}
                >
                  {prof.recommended && (
                    <span style={{
                      position: 'absolute',
                      top: '-10px',
                      right: '10px',
                      background: 'var(--accent-cyan)',
                      color: '#06080C',
                      fontSize: '0.65rem',
                      fontWeight: 800,
                      padding: '0.15rem 0.5rem',
                      borderRadius: '10px'
                    }}>
                      RECOMMENDED
                    </span>
                  )}
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: isSelected ? '#FFF' : 'var(--text-primary)', marginBottom: '0.4rem' }}>
                    {prof.name}
                  </h4>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                    {prof.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step 3: Detailed Execution Tuning (Depth, Concurrency, AI Model, AI Toggle) */}
        <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#FFF', marginBottom: '1.25rem' }}>
            3. EXECUTION PARAMETERS & AI REASONING TUNING
          </label>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
            {/* Scan Depth */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Layers size={16} color="var(--accent-cyan)" /> Scan Depth Level:
                </span>
                <span className="font-mono" style={{ color: 'var(--accent-cyan)', fontWeight: 700 }}>
                  {depth} {depth >= 2 && depth <= 3 ? '(Recommended 2-3)' : 'Levels'}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={depth}
                onChange={(e) => setDepth(Number(e.target.value))}
                style={{ width: '100%' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                <span>1 (Surface)</span>
                <span style={{ color: 'var(--accent-cyan)', fontWeight: 600 }}>2-3 (Balanced)</span>
                <span>10 (Exhaustive)</span>
              </div>
            </div>

            {/* Concurrency Slider */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Sliders size={16} color="var(--accent-ryuk)" /> Thread Concurrency:
                </span>
                <span className="font-mono" style={{ color: 'var(--accent-ryuk)', fontWeight: 700 }}>
                  {concurrency} Workers
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="50"
                value={concurrency}
                onChange={(e) => setConcurrency(Number(e.target.value))}
                style={{ width: '100%' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                <span>1 Thread</span>
                <span>20 Workers</span>
                <span>50 Workers</span>
              </div>
            </div>

            {/* AI Model Selector */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                AI EXPLOIT ENGINE CORE
              </label>
              <select
                className="select-field"
                style={{ width: '100%', fontSize: '0.85rem' }}
                value={selectedAiModel}
                onChange={(e) => setSelectedAiModel(e.target.value)}
              >
                {AI_MODELS.map(m => (
                  <option key={m.id} value={m.id}>
                    {m.name} ({m.provider})
                  </option>
                ))}
              </select>
            </div>

            {/* AI Reasoning Toggle Switch */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(10, 14, 23, 0.7)', border: '1px solid var(--border-color)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-sm)' }}>
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#FFF', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Cpu size={16} color="#9D00FF" /> AI Deep Reasoning Toggle
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  Log vector payload decision chains
                </div>
              </div>
              <input
                type="checkbox"
                checked={aiToggle}
                onChange={(e) => setAiToggle(e.target.checked)}
                style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: 'var(--accent-ryuk)' }}
              />
            </div>
          </div>
        </div>

        {/* Action Trigger */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button
            type="submit"
            className="btn-primary"
            style={{ padding: '0.85rem 2.5rem', fontSize: '1rem', boxShadow: '0 0 25px rgba(255, 0, 85, 0.5)' }}
          >
            <Play size={20} fill="#FFF" /> LAUNCH ASSESSMENT NOW
          </button>
        </div>
      </form>
    </div>
  );
};
