import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';

// Define the shape of a single log entry
interface LogEntry {
  level: number;
  time: number;
  ip: string;
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

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/logs');
      if (!response.ok) {
        throw new Error(`Failed to fetch logs: ${response.statusText}`);
      }
      const data: LogEntry[] = await response.json();
      setLogs(data);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  if (loading) return <div className="loading-container">Loading logs...</div>;
  if (error) return <div className="error-container">Error: {error}</div>;

  return (
    <Layout>
      <div className="log-viewer-container">
        <div className="log-viewer-header">
          <h1>Visitor Logs</h1>
          <button className="refresh-button" onClick={fetchLogs} disabled={loading}>
            Refresh
          </button>
        </div>
        <div className="logs-table-wrapper">
          <table className="logs-table">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Path</th>
                <th>IP Address</th>
                <th>Referrer</th>
                <th>User Agent</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, index) => (
                <tr key={`${log.time}-${index}`}>
                  <td className="time-cell">{new Date(log.time).toLocaleString()}</td>
                  <td className="path-cell" title={log.path}>{log.path}</td>
                  <td className="ip-cell">{log.ip}</td>
                  <td className="referrer-cell" title={log.referrer}>{log.referrer || 'Direct'}</td>
                  <td className="ua-cell" title={log.userAgent}>{log.userAgent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default LogViewer;
