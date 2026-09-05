import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AuthView } from './views/AuthView';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { UserProfileModal } from './components/UserProfileModal';
import { DashboardView } from './views/DashboardView';
import { NewAssessmentView } from './views/NewAssessmentView';
import { LiveScanView } from './views/LiveScanView';
import { FindingsView } from './views/FindingsView';
import { ServerScanView } from './views/ServerScanView';
import { LiveLogsView } from './views/LiveLogsView';
import { ReportsView } from './views/ReportsView';
import { SettingsView } from './views/SettingsView';
import { INITIAL_STATS, RECENT_TARGETS, VULNERABILITIES, MOCK_REPORTS } from './mockData/securityData';

const MainContent = () => {
  const { authView } = useAuth();
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [stats, setStats] = useState(INITIAL_STATS);
  const [recentTargets, setRecentTargets] = useState(RECENT_TARGETS);
  const [findings, setFindings] = useState(VULNERABILITIES);
  const [reports, setReports] = useState(MOCK_REPORTS);

  const [activeScan, setActiveScan] = useState({
    id: 'scan-live-904',
    url: 'https://api.banking-core-v2.internal',
    depth: 3,
    concurrency: 20,
    aiToggle: true,
    aiModel: 'Ryuk Neural Core v4.2',
    status: 'scanning',
    progress: 68
  });

  // Triggered from New Assessment Page
  const handleLaunchAssessment = (config) => {
    const scanObj = {
      id: `scan-${Date.now()}`,
      url: config.url,
      depth: config.depth,
      concurrency: config.concurrency,
      aiToggle: config.aiToggle,
      aiModel: config.aiModel,
      status: 'scanning',
      progress: 5
    };

    setActiveScan(scanObj);
    setStats(prev => ({
      ...prev,
      totalAssessments: prev.totalAssessments + 1,
      activeScans: prev.activeScans + 1
    }));

    const newTarget = {
      id: scanObj.id,
      url: config.url,
      status: 'scanning',
      aiModel: config.aiModel,
      startTime: new Date().toISOString().replace('T', ' ').substring(0, 19),
      findings: { critical: 1, high: 2 }
    };
    setRecentTargets(prev => [newTarget, ...prev]);

    // Transition immediately to Live Scan Interface
    setCurrentTab('live-scan');
  };

  const handleStopScan = () => {
    if (activeScan) {
      setActiveScan(null);
      setStats(prev => ({ ...prev, activeScans: Math.max(0, prev.activeScans - 1) }));
    }
  };

  const handleCompleteScan = (newFindings) => {
    setActiveScan(null);
    setStats(prev => ({
      ...prev,
      activeScans: Math.max(0, prev.activeScans - 1),
      completedScans: prev.completedScans + 1,
      totalFindings: prev.totalFindings + newFindings.length,
      criticalFindings: prev.criticalFindings + newFindings.filter(f => f.severity === 'CRITICAL').length
    }));

    if (newFindings && newFindings.length > 0) {
      setFindings(prev => [...newFindings, ...prev]);
    }

    const newReport = {
      id: `REP-2026-${Math.floor(100 + Math.random() * 900)}`,
      target: recentTargets[0]?.url || 'https://api.banking-core-v2.internal',
      title: `Security Audit Report - ${recentTargets[0]?.url || 'Core API'}`,
      date: new Date().toISOString().split('T')[0],
      criticals: newFindings?.filter(f => f.severity === 'CRITICAL').length || 2,
      highs: newFindings?.filter(f => f.severity === 'HIGH').length || 1,
      score: 38,
      status: 'Ready',
      format: ['PDF', 'JSON', 'CSV']
    };
    setReports(prev => [newReport, ...prev]);
  };

  if (authView !== 'authenticated') {
    return <AuthView />;
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar
        activeTarget={activeScan?.url}
        onQuickScan={(url) => handleLaunchAssessment({ url, depth: 3, concurrency: 20, aiToggle: true, aiModel: 'Ryuk Neural Core v4.2' })}
      />

      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          activeScansCount={stats.activeScans}
        />

        <main style={{ flex: 1, padding: '1.75rem 2rem', overflowY: 'auto' }}>
          {currentTab === 'dashboard' && (
            <DashboardView
              stats={stats}
              recentTargets={recentTargets}
              recentReports={reports}
              onNavigateTab={setCurrentTab}
            />
          )}

          {currentTab === 'new-assessment' && (
            <NewAssessmentView onLaunchAssessment={handleLaunchAssessment} />
          )}

          {currentTab === 'live-scan' && (
            <LiveScanView
              activeScan={activeScan}
              onStopScan={handleStopScan}
              onCompleteScan={handleCompleteScan}
            />
          )}

          {currentTab === 'findings' && (
            <FindingsView
              findings={findings}
              targetUrl={recentTargets[0]?.url}
            />
          )}

          {currentTab === 'server-scan' && <ServerScanView />}
          {currentTab === 'live-logs' && <LiveLogsView activeScanState={activeScan} />}
          {currentTab === 'reports' && <ReportsView />}
          {currentTab === 'settings' && <SettingsView />}
        </main>
      </div>

      <UserProfileModal />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <MainContent />
    </AuthProvider>
  );
}
