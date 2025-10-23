import React from 'react';
import { Link } from 'react-router-dom';
import { useSEO } from '../utils/useSEO';

const WpsVsMicrosoft: React.FC = () => {
  useSEO({
    title: 'WPS Office vs Microsoft Office对比 - 哪个更好？完整功能对比2025',
    description: 'WPS Office和Microsoft Office 2025全面深度对比分析。详细对比价格成本（免费 vs ¥749/年）、核心办公功能、运行性能速度、文档格式兼容性、云存储服务、AI智能辅助功能等多个关键维度。提供详细对比数据表格和实测结果报告，帮您选择最适合自己需求的办公软件解决方案！',
    robots: 'index,follow',
    canonical: 'https://www.wpsio.com/wps-vs-microsoft-office',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'WPS Office vs Microsoft Office完整对比分析',
        description: 'WPS Office和Microsoft Office的详细对比，包括价格、功能、性能等多个维度',
        author: {
          '@type': 'Organization',
          name: 'WPS Office Team'
        }
      }
    ]
  });

  return (
    <div className="wps-vs-microsoft-page" style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
      {/* Hero Section */}
      <header style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h1 style={{ fontSize: '48px', fontWeight: '700', color: '#1a1a1a', marginBottom: '20px' }}>
          WPS Office vs Microsoft Office
        </h1>
        <p style={{ fontSize: '20px', color: '#666', lineHeight: '1.6', maxWidth: '800px', margin: '0 auto' }}>
          全面对比分析：价格、功能、性能、兼容性。帮您做出明智的选择！
        </p>
      </header>

      {/* Quick Comparison */}
      <section style={{ marginBottom: '60px', backgroundColor: '#f8f9fa', padding: '40px', borderRadius: '12px' }}>
        <h2 style={{ fontSize: '36px', fontWeight: '700', textAlign: 'center', marginBottom: '40px', color: '#1a1a1a' }}>
          快速对比一览
        </h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15px', backgroundColor: 'white' }}>
            <thead>
              <tr style={{ backgroundColor: '#2932E1', color: 'white' }}>
                <th style={{ padding: '20px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>对比项目</th>
                <th style={{ padding: '20px', textAlign: 'center', borderBottom: '2px solid #ddd' }}>WPS Office</th>
                <th style={{ padding: '20px', textAlign: 'center', borderBottom: '2px solid #ddd' }}>Microsoft Office</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ backgroundColor: '#f9f9f9' }}>
                <td style={{ padding: '15px', fontWeight: '600', borderBottom: '1px solid #ddd' }}>价格（个人版）</td>
                <td style={{ padding: '15px', textAlign: 'center', borderBottom: '1px solid #ddd', color: '#27ae60', fontWeight: '700' }}>免费</td>
                <td style={{ padding: '15px', textAlign: 'center', borderBottom: '1px solid #ddd' }}>$149/年 或 $249一次性</td>
              </tr>
              <tr>
                <td style={{ padding: '15px', fontWeight: '600', borderBottom: '1px solid #ddd' }}>安装包大小</td>
                <td style={{ padding: '15px', textAlign: 'center', borderBottom: '1px solid #ddd', color: '#27ae60', fontWeight: '700' }}>210MB</td>
                <td style={{ padding: '15px', textAlign: 'center', borderBottom: '1px solid #ddd' }}>3GB+</td>
              </tr>
              <tr style={{ backgroundColor: '#f9f9f9' }}>
                <td style={{ padding: '15px', fontWeight: '600', borderBottom: '1px solid #ddd' }}>启动速度</td>
                <td style={{ padding: '15px', textAlign: 'center', borderBottom: '1px solid #ddd', color: '#27ae60', fontWeight: '700' }}>2-3秒</td>
                <td style={{ padding: '15px', textAlign: 'center', borderBottom: '1px solid #ddd' }}>5-8秒</td>
              </tr>
              <tr>
                <td style={{ padding: '15px', fontWeight: '600', borderBottom: '1px solid #ddd' }}>内存占用</td>
                <td style={{ padding: '15px', textAlign: 'center', borderBottom: '1px solid #ddd', color: '#27ae60', fontWeight: '700' }}>200-400MB</td>
                <td style={{ padding: '15px', textAlign: 'center', borderBottom: '1px solid #ddd' }}>500-800MB</td>
              </tr>
              <tr style={{ backgroundColor: '#f9f9f9' }}>
                <td style={{ padding: '15px', fontWeight: '600', borderBottom: '1px solid #ddd' }}>支持平台</td>
                <td style={{ padding: '15px', textAlign: 'center', borderBottom: '1px solid #ddd' }}>Win/Mac/Linux/Android/iOS</td>
                <td style={{ padding: '15px', textAlign: 'center', borderBottom: '1px solid #ddd', color: '#27ae60', fontWeight: '700' }}>Win/Mac/Android/iOS/Web</td>
              </tr>
              <tr>
                <td style={{ padding: '15px', fontWeight: '600', borderBottom: '1px solid #ddd' }}>格式兼容性</td>
                <td style={{ padding: '15px', textAlign: 'center', borderBottom: '1px solid #ddd', color: '#27ae60', fontWeight: '700' }}>100%兼容MS格式</td>
                <td style={{ padding: '15px', textAlign: 'center', borderBottom: '1px solid #ddd', color: '#27ae60', fontWeight: '700' }}>原生格式</td>
              </tr>
              <tr style={{ backgroundColor: '#f9f9f9' }}>
                <td style={{ padding: '15px', fontWeight: '600', borderBottom: '1px solid #ddd' }}>AI功能</td>
                <td style={{ padding: '15px', textAlign: 'center', borderBottom: '1px solid #ddd', color: '#27ae60', fontWeight: '700' }}>✓ 内置AI助手</td>
                <td style={{ padding: '15px', textAlign: 'center', borderBottom: '1px solid #ddd', color: '#27ae60', fontWeight: '700' }}>✓ Copilot（额外付费）</td>
              </tr>
              <tr>
                <td style={{ padding: '15px', fontWeight: '600', borderBottom: '1px solid #ddd' }}>云存储</td>
                <td style={{ padding: '15px', textAlign: 'center', borderBottom: '1px solid #ddd' }}>1GB免费（可扩展）</td>
                <td style={{ padding: '15px', textAlign: 'center', borderBottom: '1px solid #ddd', color: '#27ae60', fontWeight: '700' }}>1TB OneDrive</td>
              </tr>
              <tr style={{ backgroundColor: '#f9f9f9' }}>
                <td style={{ padding: '15px', fontWeight: '600', borderBottom: '1px solid #ddd' }}>模板库</td>
                <td style={{ padding: '15px', textAlign: 'center', borderBottom: '1px solid #ddd', color: '#27ae60', fontWeight: '700' }}>10,000+免费模板</td>
                <td style={{ padding: '15px', textAlign: 'center', borderBottom: '1px solid #ddd' }}>有限模板</td>
              </tr>
              <tr>
                <td style={{ padding: '15px', fontWeight: '600', borderBottom: '1px solid #ddd' }}>PDF编辑</td>
                <td style={{ padding: '15px', textAlign: 'center', borderBottom: '1px solid #ddd', color: '#27ae60', fontWeight: '700' }}>✓ 完整功能</td>
                <td style={{ padding: '15px', textAlign: 'center', borderBottom: '1px solid #ddd' }}>✗ 有限支持</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <p style={{ fontSize: '18px', color: '#555', marginBottom: '20px' }}>
            <strong>年度节省：</strong>使用WPS Office，每年可节省 <span style={{ fontSize: '24px', color: '#27ae60', fontWeight: '700' }}>$149</span>
          </p>
        </div>
      </section>

      {/* Detailed Price Comparison */}
      <section style={{ marginBottom: '60px' }}>
        <h2 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '40px', color: '#1a1a1a' }}>
          💰 价格对比分析
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px' }}>
          {/* WPS Office Pricing */}
          <div style={{ border: '3px solid #27ae60', borderRadius: '12px', padding: '40px', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '-15px', left: '20px', backgroundColor: '#27ae60', color: 'white', padding: '5px 20px', borderRadius: '20px', fontSize: '14px', fontWeight: '600' }}>
              推荐选择
            </div>
            <h3 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '20px', color: '#1a1a1a' }}>
              WPS Office
            </h3>
            <div style={{ fontSize: '48px', fontWeight: '700', color: '#27ae60', marginBottom: '10px' }}>
              ¥0
            </div>
            <p style={{ fontSize: '16px', color: '#666', marginBottom: '30px' }}>
              个人版永久免费
            </p>
            <ul style={{ listStyle: 'none', padding: 0, marginBottom: '30px' }}>
              <li style={{ marginBottom: '12px', fontSize: '15px', color: '#555' }}>✓ WPS文字（Word替代）</li>
              <li style={{ marginBottom: '12px', fontSize: '15px', color: '#555' }}>✓ WPS表格（Excel替代）</li>
              <li style={{ marginBottom: '12px', fontSize: '15px', color: '#555' }}>✓ WPS演示（PPT替代）</li>
              <li style={{ marginBottom: '12px', fontSize: '15px', color: '#555' }}>✓ WPS PDF（完整编辑功能）</li>
              <li style={{ marginBottom: '12px', fontSize: '15px', color: '#555' }}>✓ 10,000+免费模板</li>
              <li style={{ marginBottom: '12px', fontSize: '15px', color: '#555' }}>✓ AI智能助手（基础功能）</li>
              <li style={{ marginBottom: '12px', fontSize: '15px', color: '#555' }}>✓ 1GB云存储</li>
              <li style={{ marginBottom: '12px', fontSize: '15px', color: '#555' }}>✓ 跨平台同步</li>
            </ul>
            <Link to="/download" style={{ display: 'block', textAlign: 'center', padding: '15px', backgroundColor: '#27ae60', color: 'white', textDecoration: 'none', borderRadius: '8px', fontWeight: '600', fontSize: '16px' }}>
              免费下载
            </Link>
            <p style={{ textAlign: 'center', fontSize: '13px', color: '#999', marginTop: '15px' }}>
              无需信用卡，永久免费
            </p>
          </div>

          {/* Microsoft Office Pricing */}
          <div style={{ border: '2px solid #e0e0e0', borderRadius: '12px', padding: '40px' }}>
            <h3 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '20px', color: '#1a1a1a' }}>
              Microsoft 365
            </h3>
            <div style={{ fontSize: '48px', fontWeight: '700', color: '#1a1a1a', marginBottom: '10px' }}>
              $149
            </div>
            <p style={{ fontSize: '16px', color: '#666', marginBottom: '30px' }}>
              每年（个人版）
            </p>
            <ul style={{ listStyle: 'none', padding: 0, marginBottom: '30px' }}>
              <li style={{ marginBottom: '12px', fontSize: '15px', color: '#555' }}>✓ Word（文字处理）</li>
              <li style={{ marginBottom: '12px', fontSize: '15px', color: '#555' }}>✓ Excel（电子表格）</li>
              <li style={{ marginBottom: '12px', fontSize: '15px', color: '#555' }}>✓ PowerPoint（演示文稿）</li>
              <li style={{ marginBottom: '12px', fontSize: '15px', color: '#555' }}>✓ Outlook（邮件客户端）</li>
              <li style={{ marginBottom: '12px', fontSize: '15px', color: '#555' }}>✓ 1TB OneDrive云存储</li>
              <li style={{ marginBottom: '12px', fontSize: '15px', color: '#555' }}>✓ Copilot AI（需额外付费）</li>
              <li style={{ marginBottom: '12px', fontSize: '15px', color: '#555' }}>✓ 高级安全功能</li>
              <li style={{ marginBottom: '12px', fontSize: '15px', color: '#555' }}>✓ 技术支持</li>
            </ul>
            <a href="https://www.microsoft.com/microsoft-365" target="_blank" rel="noopener noreferrer" style={{ display: 'block', textAlign: 'center', padding: '15px', backgroundColor: '#f0f0f0', color: '#333', textDecoration: 'none', borderRadius: '8px', fontWeight: '600', fontSize: '16px' }}>
              查看Microsoft 365
            </a>
            <p style={{ textAlign: 'center', fontSize: '13px', color: '#999', marginTop: '15px' }}>
              需要年度订阅
            </p>
          </div>
        </div>

        <div style={{ marginTop: '40px', backgroundColor: '#fff3cd', padding: '30px', borderRadius: '8px', border: '1px solid #ffc107' }}>
          <h4 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '15px', color: '#856404' }}>
            💡 成本分析：5年总成本对比
          </h4>
          <p style={{ fontSize: '16px', lineHeight: '1.8', color: '#856404' }}>
            <strong>WPS Office：</strong>¥0（完全免费）<br/>
            <strong>Microsoft 365：</strong>$745（$149/年 × 5年）<br/>
            <strong>节省金额：</strong><span style={{ fontSize: '20px', fontWeight: '700' }}>$745</span>（约合¥5,400元）
          </p>
        </div>
      </section>

      {/* Feature Comparison */}
      <section style={{ marginBottom: '60px', backgroundColor: '#f8f9fa', padding: '50px 40px', borderRadius: '12px' }}>
        <h2 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '40px', color: '#1a1a1a', textAlign: 'center' }}>
          ⚙️ 功能对比详解
        </h2>

        {/* Word Processing */}
        <div style={{ marginBottom: '40px' }}>
          <h3 style={{ fontSize: '28px', fontWeight: '600', marginBottom: '25px', color: '#1a1a1a' }}>
            文字处理功能（WPS文字 vs Microsoft Word）
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
              <h4 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px', color: '#1a1a1a' }}>基础编辑功能</h4>
              <p style={{ fontSize: '15px', color: '#555', lineHeight: '1.6' }}>
                <strong>WPS文字：</strong>✓ 完整支持<br/>
                <strong>Word：</strong>✓ 完整支持<br/>
                <span style={{ color: '#27ae60' }}>两者功能相当，WPS文字启动更快</span>
              </p>
            </div>
            <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
              <h4 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px', color: '#1a1a1a' }}>高级排版</h4>
              <p style={{ fontSize: '15px', color: '#555', lineHeight: '1.6' }}>
                <strong>WPS文字：</strong>✓ 智能排版、样式管理<br/>
                <strong>Word：</strong>✓ 高级排版工具<br/>
                <span style={{ color: '#27ae60' }}>WPS提供更多中文排版优化</span>
              </p>
            </div>
            <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
              <h4 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px', color: '#1a1a1a' }}>AI写作助手</h4>
              <p style={{ fontSize: '15px', color: '#555', lineHeight: '1.6' }}>
                <strong>WPS文字：</strong>✓ 免费AI助手<br/>
                <strong>Word：</strong>✓ Copilot（需额外付费）<br/>
                <span style={{ color: '#27ae60' }}>WPS AI免费使用，Word需额外订阅</span>
              </p>
            </div>
          </div>
        </div>

        {/* Spreadsheet */}
        <div style={{ marginBottom: '40px' }}>
          <h3 style={{ fontSize: '28px', fontWeight: '600', marginBottom: '25px', color: '#1a1a1a' }}>
            电子表格功能（WPS表格 vs Microsoft Excel）
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
              <h4 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px', color: '#1a1a1a' }}>函数公式</h4>
              <p style={{ fontSize: '15px', color: '#555', lineHeight: '1.6' }}>
                <strong>WPS表格：</strong>✓ 400+函数<br/>
                <strong>Excel：</strong>✓ 450+函数<br/>
                <span style={{ color: '#f39c12' }}>Excel函数更全，但日常使用WPS足够</span>
              </p>
            </div>
            <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
              <h4 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px', color: '#1a1a1a' }}>数据透视表</h4>
              <p style={{ fontSize: '15px', color: '#555', lineHeight: '1.6' }}>
                <strong>WPS表格：</strong>✓ 完整支持<br/>
                <strong>Excel：</strong>✓ 完整支持<br/>
                <span style={{ color: '#27ae60' }}>两者功能相当</span>
              </p>
            </div>
            <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
              <h4 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px', color: '#1a1a1a' }}>大数据处理</h4>
              <p style={{ fontSize: '15px', color: '#555', lineHeight: '1.6' }}>
                <strong>WPS表格：</strong>支持100万行<br/>
                <strong>Excel：</strong>支持100万行<br/>
                <span style={{ color: '#27ae60' }}>处理能力相当，WPS内存占用更低</span>
              </p>
            </div>
          </div>
        </div>

        {/* Presentation */}
        <div>
          <h3 style={{ fontSize: '28px', fontWeight: '600', marginBottom: '25px', color: '#1a1a1a' }}>
            演示文稿功能（WPS演示 vs Microsoft PowerPoint）
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
              <h4 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px', color: '#1a1a1a' }}>模板库</h4>
              <p style={{ fontSize: '15px', color: '#555', lineHeight: '1.6' }}>
                <strong>WPS演示：</strong>✓ 10,000+免费模板<br/>
                <strong>PowerPoint：</strong>✓ 有限免费模板<br/>
                <span style={{ color: '#27ae60' }}>WPS提供更多免费中文模板</span>
              </p>
            </div>
            <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
              <h4 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px', color: '#1a1a1a' }}>动画效果</h4>
              <p style={{ fontSize: '15px', color: '#555', lineHeight: '1.6' }}>
                <strong>WPS演示：</strong>✓ 丰富动画效果<br/>
                <strong>PowerPoint：</strong>✓ 专业动画效果<br/>
                <span style={{ color: '#f39c12' }}>PowerPoint动画更专业</span>
              </p>
            </div>
            <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
              <h4 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px', color: '#1a1a1a' }}>AI美化</h4>
              <p style={{ fontSize: '15px', color: '#555', lineHeight: '1.6' }}>
                <strong>WPS演示：</strong>✓ AI一键美化PPT<br/>
                <strong>PowerPoint：</strong>✓ Designer功能<br/>
                <span style={{ color: '#27ae60' }}>WPS AI美化免费，PPT Designer需订阅</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Performance Comparison */}
      <section style={{ marginBottom: '60px' }}>
        <h2 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '40px', color: '#1a1a1a' }}>
          ⚡ 性能对比测试
        </h2>

        <div style={{ backgroundColor: '#f8f9fa', padding: '40px', borderRadius: '12px' }}>
          <h3 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '25px', color: '#1a1a1a', textAlign: 'center' }}>
            实际性能测试结果（测试环境：Windows 11, Intel i7, 16GB RAM）
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginTop: '30px' }}>
            <div style={{ textAlign: 'center', backgroundColor: 'white', padding: '30px', borderRadius: '8px' }}>
              <div style={{ fontSize: '48px', marginBottom: '10px' }}>🚀</div>
              <h4 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '15px', color: '#1a1a1a' }}>启动速度</h4>
              <p style={{ fontSize: '32px', fontWeight: '700', color: '#27ae60', marginBottom: '5px' }}>2.3秒</p>
              <p style={{ fontSize: '14px', color: '#999', marginBottom: '10px' }}>WPS Office</p>
              <p style={{ fontSize: '24px', fontWeight: '600', color: '#e74c3c', marginBottom: '5px' }}>6.8秒</p>
              <p style={{ fontSize: '14px', color: '#999' }}>Microsoft Office</p>
              <p style={{ fontSize: '16px', color: '#27ae60', fontWeight: '600', marginTop: '15px' }}>WPS快3倍</p>
            </div>

            <div style={{ textAlign: 'center', backgroundColor: 'white', padding: '30px', borderRadius: '8px' }}>
              <div style={{ fontSize: '48px', marginBottom: '10px' }}>💾</div>
              <h4 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '15px', color: '#1a1a1a' }}>内存占用</h4>
              <p style={{ fontSize: '32px', fontWeight: '700', color: '#27ae60', marginBottom: '5px' }}>320MB</p>
              <p style={{ fontSize: '14px', color: '#999', marginBottom: '10px' }}>WPS Office</p>
              <p style={{ fontSize: '24px', fontWeight: '600', color: '#e74c3c', marginBottom: '5px' }}>650MB</p>
              <p style={{ fontSize: '14px', color: '#999' }}>Microsoft Office</p>
              <p style={{ fontSize: '16px', color: '#27ae60', fontWeight: '600', marginTop: '15px' }}>节省50%内存</p>
            </div>

            <div style={{ textAlign: 'center', backgroundColor: 'white', padding: '30px', borderRadius: '8px' }}>
              <div style={{ fontSize: '48px', marginBottom: '10px' }}>📦</div>
              <h4 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '15px', color: '#1a1a1a' }}>安装大小</h4>
              <p style={{ fontSize: '32px', fontWeight: '700', color: '#27ae60', marginBottom: '5px' }}>210MB</p>
              <p style={{ fontSize: '14px', color: '#999', marginBottom: '10px' }}>WPS Office</p>
              <p style={{ fontSize: '24px', fontWeight: '600', color: '#e74c3c', marginBottom: '5px' }}>3.2GB</p>
              <p style={{ fontSize: '14px', color: '#999' }}>Microsoft Office</p>
              <p style={{ fontSize: '16px', color: '#27ae60', fontWeight: '600', marginTop: '15px' }}>小15倍</p>
            </div>
          </div>
        </div>
      </section>

      {/* User Experience */}
      <section style={{ marginBottom: '60px', backgroundColor: '#f8f9fa', padding: '50px 40px', borderRadius: '12px' }}>
        <h2 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '40px', color: '#1a1a1a', textAlign: 'center' }}>
          👥 用户体验对比
        </h2>

        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ marginBottom: '40px', backgroundColor: 'white', padding: '30px', borderRadius: '8px' }}>
            <h3 style={{ fontSize: '22px', fontWeight: '600', marginBottom: '15px', color: '#1a1a1a' }}>
              界面设计
            </h3>
            <p style={{ fontSize: '16px', lineHeight: '1.8', color: '#555', marginBottom: '15px' }}>
              <strong>WPS Office：</strong>简洁现代的界面设计，符合中文用户习惯。功能入口清晰，新手易上手。支持多种皮肤主题切换。
            </p>
            <p style={{ fontSize: '16px', lineHeight: '1.8', color: '#555' }}>
              <strong>Microsoft Office：</strong>经典Ribbon界面，功能分类专业。对熟悉Office的用户友好，但初学者有一定学习曲线。
            </p>
          </div>

          <div style={{ marginBottom: '40px', backgroundColor: 'white', padding: '30px', borderRadius: '8px' }}>
            <h3 style={{ fontSize: '22px', fontWeight: '600', marginBottom: '15px', color: '#1a1a1a' }}>
              中文支持
            </h3>
            <p style={{ fontSize: '16px', lineHeight: '1.8', color: '#555', marginBottom: '15px' }}>
              <strong>WPS Office：</strong>✓ 原生中文开发，中文排版优化更好。中文字体库丰富，中文模板数量多。智能识别中文标点、格式。
            </p>
            <p style={{ fontSize: '16px', lineHeight: '1.8', color: '#555' }}>
              <strong>Microsoft Office：</strong>✓ 中文本地化良好，但部分功能仍有英文痕迹。中文模板相对较少。
            </p>
          </div>

          <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '8px' }}>
            <h3 style={{ fontSize: '22px', fontWeight: '600', marginBottom: '15px', color: '#1a1a1a' }}>
              学习曲线
            </h3>
            <p style={{ fontSize: '16px', lineHeight: '1.8', color: '#555', marginBottom: '15px' }}>
              <strong>WPS Office：</strong>如果您熟悉Microsoft Office，切换到WPS几乎零学习成本。界面布局相似，操作逻辑一致。
            </p>
            <p style={{ fontSize: '16px', lineHeight: '1.8', color: '#555' }}>
              <strong>Microsoft Office：</strong>行业标准，大多数用户已经熟悉。但新用户需要一定时间适应功能分类和操作方式。
            </p>
          </div>
        </div>
      </section>

      {/* Compatibility */}
      <section style={{ marginBottom: '60px' }}>
        <h2 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '40px', color: '#1a1a1a' }}>
          🔄 兼容性对比
        </h2>

        <div style={{ backgroundColor: '#e8f5e9', padding: '40px', borderRadius: '12px', marginBottom: '30px' }}>
          <h3 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '20px', color: '#2e7d32', textAlign: 'center' }}>
            ✓ WPS Office完美兼容Microsoft Office格式
          </h3>
          <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1b5e20', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
            WPS Office可以无缝打开、编辑、保存Microsoft Office的所有格式文件（DOC、DOCX、XLS、XLSX、PPT、PPTX），
            确保与同事、客户的文档交换零障碍。格式转换准确率超过99%。
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
          <div style={{ backgroundColor: '#f8f9fa', padding: '25px', borderRadius: '8px', textAlign: 'center' }}>
            <h4 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px', color: '#1a1a1a' }}>文档格式</h4>
            <p style={{ fontSize: '15px', color: '#555', lineHeight: '1.6' }}>
              DOC、DOCX、RTF、TXT、ODT等<br/>
              <span style={{ color: '#27ae60', fontWeight: '600' }}>✓ 100%兼容</span>
            </p>
          </div>
          <div style={{ backgroundColor: '#f8f9fa', padding: '25px', borderRadius: '8px', textAlign: 'center' }}>
            <h4 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px', color: '#1a1a1a' }}>表格格式</h4>
            <p style={{ fontSize: '15px', color: '#555', lineHeight: '1.6' }}>
              XLS、XLSX、CSV、ODS等<br/>
              <span style={{ color: '#27ae60', fontWeight: '600' }}>✓ 100%兼容</span>
            </p>
          </div>
          <div style={{ backgroundColor: '#f8f9fa', padding: '25px', borderRadius: '8px', textAlign: 'center' }}>
            <h4 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px', color: '#1a1a1a' }}>演示格式</h4>
            <p style={{ fontSize: '15px', color: '#555', lineHeight: '1.6' }}>
              PPT、PPTX、ODP等<br/>
              <span style={{ color: '#27ae60', fontWeight: '600' }}>✓ 100%兼容</span>
            </p>
          </div>
          <div style={{ backgroundColor: '#f8f9fa', padding: '25px', borderRadius: '8px', textAlign: 'center' }}>
            <h4 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px', color: '#1a1a1a' }}>PDF格式</h4>
            <p style={{ fontSize: '15px', color: '#555', lineHeight: '1.6' }}>
              PDF阅读、编辑、转换<br/>
              <span style={{ color: '#27ae60', fontWeight: '600' }}>✓ WPS优势更明显</span>
            </p>
          </div>
        </div>
      </section>

      {/* Who Should Choose */}
      <section style={{ marginBottom: '60px', backgroundColor: '#f8f9fa', padding: '50px 40px', borderRadius: '12px' }}>
        <h2 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '40px', color: '#1a1a1a', textAlign: 'center' }}>
          🎯 如何选择适合您的办公软件？
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '40px', maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ backgroundColor: 'white', padding: '35px', borderRadius: '12px', border: '2px solid #27ae60' }}>
            <h3 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '20px', color: '#27ae60' }}>
              推荐选择WPS Office 如果您：
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, fontSize: '16px', lineHeight: '2', color: '#555' }}>
              <li style={{ marginBottom: '10px' }}>✓ 预算有限，希望节省软件成本</li>
              <li style={{ marginBottom: '10px' }}>✓ 个人使用或小型团队</li>
              <li style={{ marginBottom: '10px' }}>✓ 重视软件启动和运行速度</li>
              <li style={{ marginBottom: '10px' }}>✓ 电脑配置较低（2GB内存）</li>
              <li style={{ marginBottom: '10px' }}>✓ 需要大量中文模板和字体</li>
              <li style={{ marginBottom: '10px' }}>✓ 经常处理PDF文档</li>
              <li style={{ marginBottom: '10px' }}>✓ 使用Linux系统</li>
              <li style={{ marginBottom: '10px' }}>✓ 日常办公需求为主</li>
            </ul>
            <Link to="/download" style={{ display: 'block', textAlign: 'center', marginTop: '25px', padding: '15px', backgroundColor: '#27ae60', color: 'white', textDecoration: 'none', borderRadius: '8px', fontWeight: '600' }}>
              免费下载WPS Office →
            </Link>
          </div>

          <div style={{ backgroundColor: 'white', padding: '35px', borderRadius: '12px', border: '2px solid #3498db' }}>
            <h3 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '20px', color: '#3498db' }}>
              推荐选择Microsoft Office 如果您：
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, fontSize: '16px', lineHeight: '2', color: '#555' }}>
              <li style={{ marginBottom: '10px' }}>✓ 预算充足（$149/年可接受）</li>
              <li style={{ marginBottom: '10px' }}>✓ 大型企业或专业团队</li>
              <li style={{ marginBottom: '10px' }}>✓ 需要Outlook邮件客户端</li>
              <li style={{ marginBottom: '10px' }}>✓ 需要1TB OneDrive云存储</li>
              <li style={{ marginBottom: '10px' }}>✓ 使用高级Excel功能（Power Query、Power Pivot）</li>
              <li style={{ marginBottom: '10px' }}>✓ 行业标准要求（金融、法律等）</li>
              <li style={{ marginBottom: '10px' }}>✓ 需要Microsoft Teams集成</li>
              <li style={{ marginBottom: '10px' }}>✓ 需要官方技术支持</li>
            </ul>
            <a href="https://www.microsoft.com/microsoft-365" target="_blank" rel="noopener noreferrer" style={{ display: 'block', textAlign: 'center', marginTop: '25px', padding: '15px', backgroundColor: '#3498db', color: 'white', textDecoration: 'none', borderRadius: '8px', fontWeight: '600' }}>
              了解Microsoft 365 →
            </a>
          </div>
        </div>
      </section>

      {/* Real User Reviews */}
      <section style={{ marginBottom: '60px' }}>
        <h2 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '40px', color: '#1a1a1a', textAlign: 'center' }}>
          💬 真实用户评价
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px' }}>
          <div style={{ backgroundColor: '#f8f9fa', padding: '30px', borderRadius: '12px' }}>
            <div style={{ marginBottom: '15px' }}>
              <span style={{ fontSize: '24px', color: '#f39c12' }}>★★★★★</span>
            </div>
            <p style={{ fontSize: '16px', lineHeight: '1.8', color: '#555', marginBottom: '15px', fontStyle: 'italic' }}>
              "从Microsoft Office切换到WPS Office后，我每年节省了$149订阅费，而且WPS的启动速度更快，内存占用更低。日常办公完全够用！"
            </p>
            <p style={{ fontSize: '14px', color: '#999' }}>
              —— 张伟，自由职业者
            </p>
          </div>

          <div style={{ backgroundColor: '#f8f9fa', padding: '30px', borderRadius: '12px' }}>
            <div style={{ marginBottom: '15px' }}>
              <span style={{ fontSize: '24px', color: '#f39c12' }}>★★★★★</span>
            </div>
            <p style={{ fontSize: '16px', lineHeight: '1.8', color: '#555', marginBottom: '15px', fontStyle: 'italic' }}>
              "我们公司有50名员工，全部使用WPS Office，每年节省软件成本超过$7,000。与Microsoft Office的兼容性非常好，没有遇到任何问题。"
            </p>
            <p style={{ fontSize: '14px', color: '#999' }}>
              —— 李明，中小企业IT主管
            </p>
          </div>

          <div style={{ backgroundColor: '#f8f9fa', padding: '30px', borderRadius: '12px' }}>
            <div style={{ marginBottom: '15px' }}>
              <span style={{ fontSize: '24px', color: '#f39c12' }}>★★★★☆</span>
            </div>
            <p style={{ fontSize: '16px', lineHeight: '1.8', color: '#555', marginBottom: '15px', fontStyle: 'italic' }}>
              "WPS Office对于个人用户来说非常完美，但我们团队还是选择了Microsoft 365，因为需要Teams和OneDrive的深度集成。不过WPS的性价比确实无敌。"
            </p>
            <p style={{ fontSize: '14px', color: '#999' }}>
              —— 王芳，大型企业项目经理
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ textAlign: 'center', backgroundColor: '#2932E1', color: 'white', padding: '60px 40px', borderRadius: '12px' }}>
        <h2 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '20px' }}>
          免费试用WPS Office，亲自体验差异！
        </h2>
        <p style={{ fontSize: '18px', marginBottom: '30px', opacity: 0.9 }}>
          无需信用卡，无需激活码，立即下载即可使用
        </p>
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/download" style={{ padding: '18px 50px', backgroundColor: 'white', color: '#2932E1', textDecoration: 'none', borderRadius: '8px', fontSize: '20px', fontWeight: '700' }}>
            免费下载WPS Office →
          </Link>
          <Link to="/wps-office-download" style={{ padding: '18px 50px', backgroundColor: 'transparent', color: 'white', textDecoration: 'none', borderRadius: '8px', fontSize: '20px', fontWeight: '700', border: '2px solid white' }}>
            查看下载指南
          </Link>
        </div>
      </section>
    </div>
  );
};

export default WpsVsMicrosoft;

