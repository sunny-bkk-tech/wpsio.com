import React, { useState, useEffect } from 'react';
import '../styles/seoDashboard.css';

interface SEOCheckResult {
  timestamp: string;
  allPassed: boolean;
  results: {
    uptime: { isUp: boolean; statusCode: number; responseTime: number; passed: boolean };
    h1Tags: { h1Count: number; passed: boolean };
    metaDescription: { exists: boolean; length: number; content: string; passed: boolean };
    schemaMarkup: { exists: boolean; count: number; passed: boolean };
    sitemap: { accessible: boolean; statusCode: number; passed: boolean };
    robotsTxt: { accessible: boolean; hasSitemapReference: boolean; passed: boolean };
  };
  failedChecks: string[];
}

const SEODashboard: React.FC = () => {
  const [isChecking, setIsChecking] = useState(false);
  const [currentResult, setCurrentResult] = useState<SEOCheckResult | null>(null);
  const [historicalResults, setHistoricalResults] = useState<SEOCheckResult[]>([]);
  const [error, setError] = useState<string>('');

  // Load historical results on mount
  useEffect(() => {
    loadHistoricalResults();
  }, []);

  const loadHistoricalResults = async () => {
    try {
      // Try to load recent reports from logs
      const response = await fetch('/api/seo-reports');
      if (response.ok) {
        const data = await response.json();
        setHistoricalResults(data.slice(0, 10)); // Last 10 results
      }
    } catch (err) {
      console.log('No historical data available yet');
    }
  };

  const runSEOCheck = async () => {
    setIsChecking(true);
    setError('');

    try {
      const response = await fetch('/api/run-seo-check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to run SEO check');
      }

      const result = await response.json();
      setCurrentResult(result);
      
      // Add to historical results
      setHistoricalResults(prev => [result, ...prev].slice(0, 10));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setIsChecking(false);
    }
  };

  const getStatusIcon = (passed: boolean) => {
    return passed ? '✅' : '❌';
  };

  const getStatusClass = (passed: boolean) => {
    return passed ? 'status-pass' : 'status-fail';
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const calculatePassRate = () => {
    if (historicalResults.length === 0) return 0;
    const passed = historicalResults.filter(r => r.allPassed).length;
    return Math.round((passed / historicalResults.length) * 100);
  };

  return (
    <div className="seo-dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <h1>🔍 SEO健康检查仪表板</h1>
        <p className="subtitle">实时监控网站SEO状态，确保最佳搜索引擎优化</p>
      </div>

      {/* Action Button */}
      <div className="action-section">
        <button
          className={`run-check-btn ${isChecking ? 'checking' : ''}`}
          onClick={runSEOCheck}
          disabled={isChecking}
        >
          {isChecking ? (
            <>
              <span className="spinner"></span>
              检查中...
            </>
          ) : (
            <>
              <span className="icon">🚀</span>
              立即运行SEO检查
            </>
          )}
        </button>
        
        {error && (
          <div className="error-message">
            <span className="icon">⚠️</span>
            {error}
          </div>
        )}
      </div>

      {/* Statistics Cards */}
      {historicalResults.length > 0 && (
        <div className="stats-cards">
          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-value">{calculatePassRate()}%</div>
            <div className="stat-label">通过率</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🔄</div>
            <div className="stat-value">{historicalResults.length}</div>
            <div className="stat-label">总检查次数</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              {currentResult?.allPassed ? '✅' : '⚠️'}
            </div>
            <div className="stat-value">
              {currentResult?.allPassed ? '正常' : '有问题'}
            </div>
            <div className="stat-label">当前状态</div>
          </div>
        </div>
      )}

      {/* Current Results */}
      {currentResult && (
        <div className="results-section">
          <div className="section-header">
            <h2>
              最新检查结果
              <span className={`overall-status ${currentResult.allPassed ? 'pass' : 'fail'}`}>
                {currentResult.allPassed ? '全部通过 ✅' : '发现问题 ⚠️'}
              </span>
            </h2>
            <p className="timestamp">检查时间: {formatTimestamp(currentResult.timestamp)}</p>
          </div>

          <div className="checks-grid">
            {/* Uptime Check */}
            <div className={`check-card ${getStatusClass(currentResult.results.uptime.passed)}`}>
              <div className="check-header">
                <span className="check-icon">{getStatusIcon(currentResult.results.uptime.passed)}</span>
                <h3>网站可用性</h3>
              </div>
              <div className="check-details">
                <div className="detail-row">
                  <span className="label">状态:</span>
                  <span className="value">
                    {currentResult.results.uptime.isUp ? '在线' : '离线'} 
                    ({currentResult.results.uptime.statusCode})
                  </span>
                </div>
                <div className="detail-row">
                  <span className="label">响应时间:</span>
                  <span className="value">{currentResult.results.uptime.responseTime}ms</span>
                </div>
              </div>
            </div>

            {/* H1 Tags Check */}
            <div className={`check-card ${getStatusClass(currentResult.results.h1Tags.passed)}`}>
              <div className="check-header">
                <span className="check-icon">{getStatusIcon(currentResult.results.h1Tags.passed)}</span>
                <h3>H1标签</h3>
              </div>
              <div className="check-details">
                <div className="detail-row">
                  <span className="label">H1数量:</span>
                  <span className="value">{currentResult.results.h1Tags.h1Count}</span>
                </div>
                <div className="detail-row">
                  <span className="label">要求:</span>
                  <span className="value">应该为1个</span>
                </div>
              </div>
            </div>

            {/* Meta Description Check */}
            <div className={`check-card ${getStatusClass(currentResult.results.metaDescription.passed)}`}>
              <div className="check-header">
                <span className="check-icon">{getStatusIcon(currentResult.results.metaDescription.passed)}</span>
                <h3>Meta描述</h3>
              </div>
              <div className="check-details">
                <div className="detail-row">
                  <span className="label">长度:</span>
                  <span className="value">{currentResult.results.metaDescription.length} 字符</span>
                </div>
                <div className="detail-row">
                  <span className="label">要求:</span>
                  <span className="value">100-160 字符</span>
                </div>
                {currentResult.results.metaDescription.content && (
                  <div className="detail-row full-width">
                    <span className="label">内容:</span>
                    <span className="value small">{currentResult.results.metaDescription.content}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Schema Markup Check */}
            <div className={`check-card ${getStatusClass(currentResult.results.schemaMarkup.passed)}`}>
              <div className="check-header">
                <span className="check-icon">{getStatusIcon(currentResult.results.schemaMarkup.passed)}</span>
                <h3>Schema标记</h3>
              </div>
              <div className="check-details">
                <div className="detail-row">
                  <span className="label">Schema数量:</span>
                  <span className="value">{currentResult.results.schemaMarkup.count}</span>
                </div>
                <div className="detail-row">
                  <span className="label">状态:</span>
                  <span className="value">
                    {currentResult.results.schemaMarkup.exists ? '已实现' : '未找到'}
                  </span>
                </div>
              </div>
            </div>

            {/* Sitemap Check */}
            <div className={`check-card ${getStatusClass(currentResult.results.sitemap.passed)}`}>
              <div className="check-header">
                <span className="check-icon">{getStatusIcon(currentResult.results.sitemap.passed)}</span>
                <h3>网站地图</h3>
              </div>
              <div className="check-details">
                <div className="detail-row">
                  <span className="label">可访问性:</span>
                  <span className="value">
                    {currentResult.results.sitemap.accessible ? '可访问' : '无法访问'}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="label">状态码:</span>
                  <span className="value">{currentResult.results.sitemap.statusCode}</span>
                </div>
              </div>
            </div>

            {/* Robots.txt Check */}
            <div className={`check-card ${getStatusClass(currentResult.results.robotsTxt.passed)}`}>
              <div className="check-header">
                <span className="check-icon">{getStatusIcon(currentResult.results.robotsTxt.passed)}</span>
                <h3>Robots.txt</h3>
              </div>
              <div className="check-details">
                <div className="detail-row">
                  <span className="label">可访问性:</span>
                  <span className="value">
                    {currentResult.results.robotsTxt.accessible ? '可访问' : '无法访问'}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="label">Sitemap引用:</span>
                  <span className="value">
                    {currentResult.results.robotsTxt.hasSitemapReference ? '✓ 已包含' : '✗ 未包含'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Failed Checks Summary */}
          {currentResult.failedChecks.length > 0 && (
            <div className="failed-checks-summary">
              <h3>⚠️ 需要关注的问题</h3>
              <ul>
                {currentResult.failedChecks.map((check, index) => (
                  <li key={index}>{check}</li>
                ))}
              </ul>
              <p className="suggestion">
                建议立即检查并修复上述问题，以确保最佳SEO表现。
              </p>
            </div>
          )}
        </div>
      )}

      {/* Historical Results */}
      {historicalResults.length > 0 && (
        <div className="history-section">
          <h2>📅 历史检查记录</h2>
          <div className="history-table">
            <table>
              <thead>
                <tr>
                  <th>检查时间</th>
                  <th>整体状态</th>
                  <th>通过检查</th>
                  <th>失败检查</th>
                  <th>详情</th>
                </tr>
              </thead>
              <tbody>
                {historicalResults.map((result, index) => (
                  <tr key={index}>
                    <td>{formatTimestamp(result.timestamp)}</td>
                    <td>
                      <span className={`badge ${result.allPassed ? 'success' : 'warning'}`}>
                        {result.allPassed ? '✅ 全部通过' : '⚠️ 有问题'}
                      </span>
                    </td>
                    <td>{6 - result.failedChecks.length} / 6</td>
                    <td>
                      {result.failedChecks.length > 0 ? (
                        <span className="failed-count">{result.failedChecks.join(', ')}</span>
                      ) : (
                        <span className="no-issues">无</span>
                      )}
                    </td>
                    <td>
                      <button
                        className="view-details-btn"
                        onClick={() => setCurrentResult(result)}
                      >
                        查看
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Getting Started Message */}
      {!currentResult && !isChecking && (
        <div className="getting-started">
          <div className="icon">🎯</div>
          <h3>开始您的第一次SEO检查</h3>
          <p>点击上方按钮运行全面的SEO健康检查，检查项目包括：</p>
          <ul>
            <li>✓ 网站可用性和响应时间</li>
            <li>✓ H1标签结构（应该只有1个）</li>
            <li>✓ Meta描述优化（100-160字符）</li>
            <li>✓ Schema结构化数据标记</li>
            <li>✓ 网站地图可访问性</li>
            <li>✓ Robots.txt配置</li>
          </ul>
          <p className="note">
            💡 建议每天运行一次检查，确保网站SEO状态始终良好。
          </p>
        </div>
      )}
    </div>
  );
};

export default SEODashboard;

