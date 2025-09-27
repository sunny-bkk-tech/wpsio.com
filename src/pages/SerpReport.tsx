import React, { useEffect, useState } from 'react';
import '../styles/serpReport.css'; // Import the new CSS file

const SerpReport: React.FC = () => {
  const [reportData, setReportData] = useState<string[][]>([]);
  const [reports, setReports] = useState<{ file: string; generatedAt: string; json?: string }[]>([]);
  const [selectedFile, setSelectedFile] = useState<string>('manual_serp_links.csv');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReport = async (file?: string) => {
    try {
      setLoading(true);
      setError(null);
      const target = file || selectedFile;
      const response = await fetch(`/reports/serp/${target}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const text = await response.text();
      // Guard: if server returned HTML (e.g., file missing), show a helpful error
      if (/<!DOCTYPE|<html|<body/i.test(text)) {
        throw new Error('Report file not found in production. Ensure reports/ is deployed (copied to dist).');
      }
      const parsedData = text.split('\n').map(row => row.split(','));
      setReportData(parsedData);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  const fetchManifest = async () => {
    try {
      const res = await fetch('/reports/serp/manifest.json');
      if (!res.ok) return; // Manifest may not exist yet
      const json = await res.json();
      if (Array.isArray(json.reports)) {
        setReports(json.reports);
        // Default to latest stamped file if available
        if (json.reports.length > 0) {
          setSelectedFile(json.reports[0].file);
        }
      }
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    fetchManifest().then(() => fetchReport());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchReport(selectedFile);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFile]);

  if (loading) {
    return <div className="loading">Loading report...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (reportData.length === 0) {
    return <div className="no-data">No report data available.</div>;
  }


  const renderTableHeader = () => {
    // Assuming the first non-timestamp row is the header
    const headerRowIndex = reportData[0][0] === 'Report Generated:' ? 1 : 0;
    return (
      <thead>
        <tr>
          {reportData[headerRowIndex].map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
    );
  };

  const renderTableBody = () => {
    const dataStartIndex = reportData[0][0] === 'Report Generated:' ? 2 : 1;
    return (
      <tbody>
        {reportData.slice(dataStartIndex).map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex}>
                {cell.startsWith('http') ? (
                  <a href={cell} target="_blank" rel="noopener noreferrer">{cell}</a>
                ) : (
                  cell
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  };

  return (
    <div className="serp-report-container">
      <div className="report-header">
        <h1>Daily SERP Report</h1>
        <div className="report-actions">
          <select
            className="report-select"
            value={selectedFile}
            onChange={(e) => setSelectedFile(e.target.value)}
          >
            <option value="manual_serp_links.csv">Latest (pointer)</option>
            {reports.map((r) => (
              <option key={r.file} value={r.file}>
                {new Date(r.generatedAt).toLocaleString()} - {r.file}
              </option>
            ))}
          </select>
          <button onClick={() => fetchReport(selectedFile)} className="refresh-btn" disabled={loading}>
            {loading ? 'Refreshing...' : 'Refresh Report'}
          </button>
        </div>
      </div>
      
      {reportData[0] && reportData[0][0] === 'Report Generated:' && (
        <div className="report-meta">
          <p><strong>Report Generated:</strong> {reportData[0][1]}</p>
          <p><strong>Total Keywords:</strong> {reportData.length - 2} keywords tracked</p>
        </div>
      )}
      
      <div className="table-container">
        <table>
          {renderTableHeader()}
          {renderTableBody()}
        </table>
      </div>

      {/* JSON results link if available */}
      {reports.length > 0 && (
        (() => {
          const current = reports.find(r => r.file === selectedFile);
          if (!current || !current.json) return null;
          return (
            <div className="json-link">
              <a href={`/reports/serp/${current.json}`} target="_blank" rel="noopener noreferrer">
                View JSON results for this run
              </a>
            </div>
          );
        })()
      )}

      <div className="report-footer">
        <p>Use the links above to manually check rankings for each keyword on Google and Bing.</p>
        <p>Generate fresh reports using: <code>yarn serp:manual</code></p>
      </div>
    </div>
  );
};

export default SerpReport;
