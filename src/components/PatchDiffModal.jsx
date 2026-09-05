import React, { useState } from 'react';
import { X, Code2, Check, Copy, Download, ShieldCheck } from 'lucide-react';

export const PatchDiffModal = ({ vuln, onClose }) => {
  const [copiedPatch, setCopiedPatch] = useState(false);

  if (!vuln) return null;

  const vulnerableSnippet = `// VULNERABLE FUNCTION: ${vuln.cve || 'AuthHandler'}
app.post('/v1/auth/login', async (req, res) => {
  const { username, password } = req.body;
  
  // CRITICAL FLAW: Unescaped string concatenation allows SQL Injection
  const query = "SELECT * FROM users WHERE username = '" + username + "' AND password = '" + password + "'";
  const result = await db.rawQuery(query);
  
  if (result.length > 0) {
    return res.json({ token: generateJwt(result[0]) });
  }
  return res.status(401).json({ error: "Invalid credentials" });
});`;

  const fixedSnippet = `// REFACTORED AI SECURE FUNCTION: ${vuln.cve || 'AuthHandler'}
app.post('/v1/auth/login', async (req, res) => {
  const { username, password } = req.body;

  // SECURE PATCH: Parameterized SQL Query with prepared bindings & bcrypt hash check
  const [user] = await db.query(
    'SELECT id, username, password_hash, role FROM users WHERE username = ?',
    [username]
  );

  if (user && await bcrypt.compare(password, user.password_hash)) {
    return res.json({ token: generateJwt(user) });
  }
  return res.status(401).json({ error: "Invalid credentials" });
});`;

  const fullPatch = `--- a/src/controllers/authController.js
+++ b/src/controllers/authController.js
@@ -10,6 +10,6 @@
-  const query = "SELECT * FROM users WHERE username = '" + username + "' AND password = '" + password + "'";
-  const result = await db.rawQuery(query);
+  const [user] = await db.query(
+    'SELECT id, username, password_hash, role FROM users WHERE username = ?',
+    [username]
+  );`;

  const handleCopyPatch = () => {
    navigator.clipboard.writeText(fullPatch);
    setCopiedPatch(true);
    setTimeout(() => setCopiedPatch(false), 2000);
  };

  const handleDownloadPatch = () => {
    const blob = new Blob([fullPatch], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${vuln.cve || 'remediation'}-patch.diff`;
    link.click();
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(6, 8, 12, 0.85)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '1rem' }}>
      <div className="glass-panel animate-fade-in" style={{ width: '100%', maxWidth: '850px', maxHeight: '90vh', overflowY: 'auto', padding: '1.75rem', borderRadius: 'var(--radius-lg)', position: 'relative' }}>
        <button
          onClick={onClose}
          style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
        >
          <X size={20} />
        </button>

        <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.85rem', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-ryuk)', fontSize: '0.8rem', fontWeight: 700 }}>
            <Code2 size={16} /> RYUK AI REFACTORED CODE PATCH
          </div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFF' }}>
            Remediation Patch for {vuln.title}
          </h2>
        </div>

        {/* Code Diff Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
          {/* Vulnerable Code */}
          <div>
            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#FF4D6D', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              • VULNERABLE ORIGINAL CODE
            </div>
            <pre style={{
              background: 'rgba(255, 23, 68, 0.08)',
              border: '1px solid rgba(255, 23, 68, 0.3)',
              padding: '0.85rem',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.75rem',
              color: '#FF6B8B',
              fontFamily: 'var(--font-mono)',
              whiteSpace: 'pre-wrap',
              height: '240px',
              overflowY: 'auto'
            }}>
              {vulnerableSnippet}
            </pre>
          </div>

          {/* AI Fixed Code */}
          <div>
            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#00E676', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              • AI REFACTORED SECURE CODE
            </div>
            <pre style={{
              background: 'rgba(0, 230, 118, 0.08)',
              border: '1px solid rgba(0, 230, 118, 0.3)',
              padding: '0.85rem',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.75rem',
              color: '#69F0AE',
              fontFamily: 'var(--font-mono)',
              whiteSpace: 'pre-wrap',
              height: '240px',
              overflowY: 'auto'
            }}>
              {fixedSnippet}
            </pre>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Git unified diff ready to apply to repository
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              onClick={handleCopyPatch}
              className="btn-secondary"
            >
              {copiedPatch ? <Check size={16} color="#00E676" /> : <Copy size={16} />}
              {copiedPatch ? 'Copied Patch' : 'Copy Unified Diff'}
            </button>
            <button
              onClick={handleDownloadPatch}
              className="btn-primary"
            >
              <Download size={16} /> DOWNLOAD .DIFF PATCH FILE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
