import React, { useEffect, useState } from 'react';

type Backlink = {
  id: string;
  url: string;
  domain: string;
  anchor: string;
  type: string;
  quality: string;
  notes: string;
  dateAdded: string;
  status: string;
};

type Manifest = {
  backlinks: Backlink[];
  dailyStats: Record<string, { total: number; byType: Record<string, number>; byQuality: Record<string, number> }>;
};

const BacklinkReport: React.FC = () => {
  const [manifest, setManifest] = useState<Manifest | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');

  const fetchManifest = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/reports/backlinks/backlink_manifest.json');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      setManifest(json);
      const dates = Object.keys(json.dailyStats).sort((a, b) => b.localeCompare(a));
      if (dates.length && !selectedDate) setSelectedDate(dates[0]);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchManifest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <div className="loading">Loading backlinks...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!manifest) return <div className="no-data">No backlink data available.</div>;

  const dates = Object.keys(manifest.dailyStats).sort((a, b) => b.localeCompare(a));
  const todayStats = selectedDate ? manifest.dailyStats[selectedDate] : null;
  const dayBacklinks = selectedDate
    ? manifest.backlinks.filter(b => b.dateAdded === selectedDate)
    : [];

  return (
    <div className="serp-report-container">
      <div className="report-header">
        <h1>Backlink Reports</h1>
        <div className="report-actions">
          <select
            className="report-select"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          >
            {dates.map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
          <button onClick={fetchManifest} className="refresh-btn" disabled={loading}>
            {loading ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>
      </div>

      {todayStats ? (
        <div className="report-meta">
          <p><strong>Date:</strong> {selectedDate}</p>
          <p><strong>New Backlinks:</strong> {todayStats.total}</p>
          <p><strong>By Type:</strong> {Object.entries(todayStats.byType).map(([k,v]) => `${k}:${v}`).join(', ') || '—'}</p>
          <p><strong>By Quality:</strong> {Object.entries(todayStats.byQuality).map(([k,v]) => `${k}:${v}`).join(', ') || '—'}</p>
        </div>
      ) : null}

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Domain</th>
              <th>URL</th>
              <th>Anchor</th>
              <th>Type</th>
              <th>Quality</th>
              <th>Status</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {dayBacklinks.map((b) => (
              <tr key={b.id}>
                <td>{b.domain}</td>
                <td><a href={b.url} target="_blank" rel="noopener noreferrer">{b.url}</a></td>
                <td>{b.anchor || '—'}</td>
                <td>{b.type}</td>
                <td>{b.quality}</td>
                <td>{b.status}</td>
                <td>{b.notes || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="report-footer">
        <p>Add backlinks via CLI: <code>yarn backlink:add --url "..." --domain "..." --type guest --quality high</code></p>
      </div>
    </div>
  );
};

export default BacklinkReport;


