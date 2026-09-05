import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Shield, Lock, Mail, User, Building, Eye, EyeOff, ArrowRight, CheckCircle, AlertCircle, Key } from 'lucide-react';

export const AuthView = () => {
  const { authView, setAuthView, login, register, resetPassword } = useAuth();

  // Form states
  const [email, setEmail] = useState('alex.vance@ryuk-sec.io');
  const [password, setPassword] = useState('RyukPass2026!');
  const [fullName, setFullName] = useState('');
  const [organization, setOrganization] = useState('');
  const [role, setRole] = useState('SecOps Lead');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (!email || !password) {
      setErrorMsg('Please enter email and password credentials');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      login(email, password);
      setIsLoading(false);
    }, 600);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (!email || !password || !fullName) {
      setErrorMsg('Please complete all required registration fields');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      register({ email, password, fullName, organization, role });
      setIsLoading(false);
    }, 600);
  };

  const handleResetSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    if (!email) {
      setErrorMsg('Please specify your registered email address');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      const res = resetPassword(email);
      setSuccessMsg(res.message);
      setIsLoading(false);
    }, 500);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Cyber Glow & Grid Effect */}
      <div style={{
        position: 'absolute',
        top: '-15%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '800px',
        height: '400px',
        background: 'radial-gradient(ellipse at center, rgba(255, 0, 85, 0.15) 0%, rgba(0, 240, 255, 0.05) 50%, transparent 80%)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      <div style={{
        width: '100%',
        maxWidth: '460px',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '64px',
            height: '64px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, rgba(255, 0, 85, 0.2) 0%, rgba(0, 240, 255, 0.1) 100%)',
            border: '1px solid var(--border-color-glow)',
            boxShadow: '0 0 25px rgba(255, 0, 85, 0.3)',
            marginBottom: '1rem'
          }}>
            <Shield size={34} color="#FF0055" />
          </div>
          <h1 style={{
            fontSize: '1.875rem',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            background: 'linear-gradient(135deg, #FFFFFF 0%, #94A3B8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            RYUK <span style={{ color: 'var(--accent-ryuk)', WebkitTextFillColor: 'initial' }}>SECOPS</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
            AI-Powered Threat Assessment & Vulnerability Operations
          </p>
        </div>

        {/* Card Form */}
        <div className="glass-panel animate-fade-in" style={{ padding: '2rem' }}>
          {errorMsg && (
            <div style={{
              background: 'rgba(255, 23, 68, 0.12)',
              border: '1px solid rgba(255, 23, 68, 0.3)',
              color: '#FF4D6D',
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.85rem',
              marginBottom: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <AlertCircle size={16} />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div style={{
              background: 'rgba(0, 230, 118, 0.12)',
              border: '1px solid rgba(0, 230, 118, 0.3)',
              color: '#00E676',
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.85rem',
              marginBottom: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <CheckCircle size={16} />
              <span>{successMsg}</span>
            </div>
          )}

          {/* LOGIN VIEW */}
          {authView === 'login' && (
            <form onSubmit={handleLoginSubmit}>
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                  OPERATOR EMAIL
                </label>
                <div style={{ position: 'relative' }}>
                  <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input
                    type="email"
                    className="input-field"
                    style={{ paddingLeft: '2.5rem' }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="operator@ryuk-sec.io"
                  />
                </div>
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                    SECURITY TOKEN / PASSWORD
                  </label>
                  <button
                    type="button"
                    onClick={() => setAuthView('forgot')}
                    style={{ background: 'none', border: 'none', color: 'var(--accent-cyan)', fontSize: '0.75rem', cursor: 'pointer', fontWeight: 500 }}
                  >
                    Forgot Password?
                  </button>
                </div>
                <div style={{ position: 'relative' }}>
                  <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="input-field"
                    style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="btn-primary"
                disabled={isLoading}
                style={{ width: '100%', justifyContent: 'center', padding: '0.75rem', marginTop: '0.5rem', fontSize: '0.95rem' }}
              >
                {isLoading ? 'AUTHENTICATING SECURE SESSION...' : 'ACCESS DASHBOARD'}
                {!isLoading && <ArrowRight size={18} />}
              </button>

              <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Need an operator account?{' '}
                <button
                  type="button"
                  onClick={() => setAuthView('register')}
                  style={{ background: 'none', border: 'none', color: 'var(--accent-ryuk)', fontWeight: 600, cursor: 'pointer' }}
                >
                  Register Access
                </button>
              </div>
            </form>
          )}

          {/* REGISTER VIEW */}
          {authView === 'register' && (
            <form onSubmit={handleRegisterSubmit}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                  FULL NAME
                </label>
                <div style={{ position: 'relative' }}>
                  <User size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input
                    type="text"
                    className="input-field"
                    style={{ paddingLeft: '2.5rem' }}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Commander Shepard"
                  />
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                  WORK EMAIL ADDRESS
                </label>
                <div style={{ position: 'relative' }}>
                  <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input
                    type="email"
                    className="input-field"
                    style={{ paddingLeft: '2.5rem' }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="operator@company.com"
                  />
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                  ORGANIZATION / TEAM
                </label>
                <div style={{ position: 'relative' }}>
                  <Building size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input
                    type="text"
                    className="input-field"
                    style={{ paddingLeft: '2.5rem' }}
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    placeholder="Cyber Defense Lab"
                  />
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                  ROLE RESPONSIBILITY
                </label>
                <select
                  className="select-field"
                  style={{ width: '100%' }}
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="Lead SecOps Engineer">Lead SecOps Engineer</option>
                  <option value="AppSec Auditor">AppSec Auditor</option>
                  <option value="Penetration Tester">Penetration Tester</option>
                  <option value="CISO / Management">CISO / Security Director</option>
                </select>
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                  PASSWORD
                </label>
                <div style={{ position: 'relative' }}>
                  <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="input-field"
                    style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create strong password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="btn-primary"
                disabled={isLoading}
                style={{ width: '100%', justifyContent: 'center', padding: '0.75rem', marginTop: '0.5rem', fontSize: '0.95rem' }}
              >
                {isLoading ? 'INITIALIZING OPERATOR PROFILES...' : 'CREATE SECURE ACCOUNT'}
              </button>

              <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Already registered?{' '}
                <button
                  type="button"
                  onClick={() => setAuthView('login')}
                  style={{ background: 'none', border: 'none', color: 'var(--accent-cyan)', fontWeight: 600, cursor: 'pointer' }}
                >
                  Return to Login
                </button>
              </div>
            </form>
          )}

          {/* FORGOT PASSWORD VIEW */}
          {authView === 'forgot' && (
            <form onSubmit={handleResetSubmit}>
              <div style={{ marginBottom: '1.25rem' }}>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                  Enter your registered Ryuk operator email address. We will issue a secure 2-Factor auth reset code.
                </p>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                  OPERATOR EMAIL
                </label>
                <div style={{ position: 'relative' }}>
                  <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input
                    type="email"
                    className="input-field"
                    style={{ paddingLeft: '2.5rem' }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="operator@ryuk-sec.io"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn-cyan"
                disabled={isLoading}
                style={{ width: '100%', justifyContent: 'center', padding: '0.75rem', marginTop: '0.5rem', fontSize: '0.95rem' }}
              >
                {isLoading ? 'SENDING VERIFICATION...' : 'DISPATCH RESET INSTRUCTIONS'}
              </button>

              <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.85rem' }}>
                <button
                  type="button"
                  onClick={() => setAuthView('login')}
                  style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', fontWeight: 600, cursor: 'pointer' }}
                >
                  ← Back to Login
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Security Compliance Footer */}
        <div style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
          Encrypted TLS 1.3 | SOC 2 Type II Certified Engine | Ryuk v4.2
        </div>
      </div>
    </div>
  );
};
