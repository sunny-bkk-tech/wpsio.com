import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';

// Define the shape of a single log entry
interface LogEntry {
  level: number;
  time: number;
  ip: string;
  country: string;
  event: string;
  path: string;
  referrer: string;
  userAgent: string;
  fingerprint: string;
  msg: string;
}

const LogViewer: React.FC = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  const fetchLogs = async (showLoading = true) => {
    try {
      if (showLoading) setLoading(true);
      const response = await fetch('/api/logs');
      if (!response.ok) {
        throw new Error(`Failed to fetch logs: ${response.statusText}`);
      }
      const data: LogEntry[] = await response.json();
      setLogs(data);
      setLastUpdate(new Date());
      setError(null);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchLogs();
  }, []);

  // Auto-refresh every 5 seconds
  useEffect(() => {
    if (!autoRefresh) return;
    
    const interval = setInterval(() => {
      fetchLogs(false); // Refresh silently without showing loading state
    }, 15000); // 15 seconds

    return () => clearInterval(interval);
  }, [autoRefresh]);

  if (loading) return <div className="loading-container">Loading logs...</div>;
  if (error) return <div className="error-container">Error: {error}</div>;

  return (
    <Layout>
      <div className="log-viewer-container">
        <div className="log-viewer-header">
          <h1>Visitor Logs</h1>
          <div className="log-controls">
            <div className="log-stats">
              <span className="log-count">Total: {logs.length} visits</span>
              <span className="last-update">Last update: {lastUpdate.toLocaleTimeString()}</span>
            </div>
            <div className="log-buttons">
              <label className="auto-refresh-toggle">
                <input 
                  type="checkbox" 
                  checked={autoRefresh} 
                  onChange={(e) => setAutoRefresh(e.target.checked)} 
                />
                <span>Auto-refresh (5s)</span>
              </label>
              <button className="refresh-button" onClick={() => fetchLogs()} disabled={loading}>
                {loading ? 'Refreshing...' : 'Refresh Now'}
              </button>
            </div>
          </div>
        </div>
        <div className="logs-table-wrapper">
          <table className="logs-table">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Path</th>
                <th>IP Address</th>
                <th>Country</th>
                <th>City</th>
                <th>Referrer</th>
                <th>User Agent</th>
              </tr>
            </thead>
            <tbody>
              {logs.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '20px' }}>
                    No visitor logs yet. Logs will appear here in real-time.
                  </td>
                </tr>
              ) : (
                logs.map((log, index) => (
                  <tr key={`${log.time}-${index}`} className={index === 0 ? 'new-log' : ''}>
                    <td className="time-cell">{new Date(log.time).toLocaleString()}</td>
                    <td className="path-cell" title={log.path}>{log.path}</td>
                    <td className="ip-cell">{log.ip}</td>
                    <td className="country-cell">
                      {log.country ? (
                        <span className={`country-badge country-${log.country.toLowerCase()}`}>
                          {log.country}
                        </span>
                      ) : 'Unknown'}
                    </td>
                    <td className="city-cell">{(log as any).city || '-'}</td>
                    <td className="referrer-cell" title={log.referrer}>{log.referrer || 'Direct'}</td>
                    <td className="ua-cell" title={log.userAgent}>{log.userAgent}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default LogViewer;
