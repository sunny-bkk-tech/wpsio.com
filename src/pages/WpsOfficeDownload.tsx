import React from 'react';
import { Link } from 'react-router-dom';
import { useSEO } from '../utils/useSEO';

const WpsOfficeDownload: React.FC = () => {
  useSEO({
    title: 'WPS Office下载 - 免费办公软件下载中心 | Windows/Mac/Linux/Android/iOS全平台',
    description: 'WPS Office官方下载页面。支持Windows 11/10、macOS、Linux、Android、iOS全平台。210MB轻量安装包，完美兼容Microsoft Office。免费下载，永久使用。',
    robots: 'index,follow',
    canonical: 'https://www.wpsio.com/wps-office-download',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'WPS Office',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Windows, macOS, Linux, Android, iOS',
        downloadUrl: 'https://www.wpsio.com/download',
        fileSize: '210MB',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD'
        }
      }
    ]
  });

  return (
    <div className="wps-download-page" style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
      {/* Hero Section */}
      <header style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h1 style={{ fontSize: '48px', fontWeight: '700', color: '#1a1a1a', marginBottom: '20px' }}>
          WPS Office下载 - 免费办公软件
        </h1>
        <p style={{ fontSize: '20px', color: '#666', lineHeight: '1.6', maxWidth: '800px', margin: '0 auto 30px' }}>
          免费下载WPS Office中文版，完美兼容Microsoft Office。支持Windows、Mac、Linux、Android、iOS全平台。轻量快速（仅210MB），功能强大，永久免费使用。
        </p>
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/download" style={{ padding: '16px 40px', backgroundColor: '#2932E1', color: 'white', textDecoration: 'none', borderRadius: '8px', fontSize: '18px', fontWeight: '600' }}>
            立即下载 WPS Office
          </Link>
          <Link to="/wps-vs-microsoft-office" style={{ padding: '16px 40px', backgroundColor: '#fff', color: '#2932E1', textDecoration: 'none', borderRadius: '8px', fontSize: '18px', fontWeight: '600', border: '2px solid #2932E1' }}>
            查看与MS Office对比
          </Link>
        </div>
      </header>

      {/* Quick Stats */}
      <section style={{ backgroundColor: '#f8f9fa', padding: '40px', borderRadius: '12px', marginBottom: '60px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '30px', textAlign: 'center' }}>
          <div>
            <div style={{ fontSize: '36px', fontWeight: '700', color: '#2932E1', marginBottom: '8px' }}>500M+</div>
            <div style={{ fontSize: '16px', color: '#666' }}>全球用户</div>
          </div>
          <div>
            <div style={{ fontSize: '36px', fontWeight: '700', color: '#2932E1', marginBottom: '8px' }}>210MB</div>
            <div style={{ fontSize: '16px', color: '#666' }}>安装包大小</div>
          </div>
          <div>
            <div style={{ fontSize: '36px', fontWeight: '700', color: '#2932E1', marginBottom: '8px' }}>100%</div>
            <div style={{ fontSize: '16px', color: '#666' }}>完全免费</div>
          </div>
          <div>
            <div style={{ fontSize: '36px', fontWeight: '700', color: '#2932E1', marginBottom: '8px' }}>5</div>
            <div style={{ fontSize: '16px', color: '#666' }}>支持平台数</div>
          </div>
        </div>
      </section>

      {/* Platform Download Options */}
      <section style={{ marginBottom: '60px' }}>
        <h2 style={{ fontSize: '36px', fontWeight: '700', textAlign: 'center', marginBottom: '40px', color: '#1a1a1a' }}>
          选择您的平台下载WPS Office
        </h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          {/* Windows */}
          <div style={{ border: '1px solid #e0e0e0', borderRadius: '12px', padding: '30px', transition: 'box-shadow 0.3s' }}>
            <h3 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '15px', color: '#1a1a1a' }}>
              🖥️ Windows版
            </h3>
            <p style={{ color: '#666', marginBottom: '20px', lineHeight: '1.6' }}>
              支持Windows 11、Windows 10、Windows 8、Windows 7
            </p>
            <ul style={{ listStyle: 'none', padding: 0, marginBottom: '20px', color: '#555' }}>
              <li style={{ marginBottom: '8px' }}>✓ 系统要求：Windows 7及以上</li>
              <li style={{ marginBottom: '8px' }}>✓ 内存要求：2GB RAM（推荐4GB）</li>
              <li style={{ marginBottom: '8px' }}>✓ 磁盘空间：500MB可用空间</li>
              <li style={{ marginBottom: '8px' }}>✓ 安装包大小：210MB</li>
            </ul>
            <Link to="/windows" style={{ display: 'inline-block', padding: '12px 30px', backgroundColor: '#2932E1', color: 'white', textDecoration: 'none', borderRadius: '6px', fontWeight: '600' }}>
              下载Windows版
            </Link>
          </div>

          {/* macOS */}
          <div style={{ border: '1px solid #e0e0e0', borderRadius: '12px', padding: '30px', transition: 'box-shadow 0.3s' }}>
            <h3 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '15px', color: '#1a1a1a' }}>
              🍎 macOS版
            </h3>
            <p style={{ color: '#666', marginBottom: '20px', lineHeight: '1.6' }}>
              支持macOS Sonoma、Ventura、Monterey、Big Sur
            </p>
            <ul style={{ listStyle: 'none', padding: 0, marginBottom: '20px', color: '#555' }}>
              <li style={{ marginBottom: '8px' }}>✓ 系统要求：macOS 11.0及以上</li>
              <li style={{ marginBottom: '8px' }}>✓ 支持Apple Silicon（M1/M2/M3芯片）</li>
              <li style={{ marginBottom: '8px' }}>✓ 支持Intel处理器Mac</li>
              <li style={{ marginBottom: '8px' }}>✓ 磁盘空间：500MB可用空间</li>
            </ul>
            <Link to="/mac" style={{ display: 'inline-block', padding: '12px 30px', backgroundColor: '#2932E1', color: 'white', textDecoration: 'none', borderRadius: '6px', fontWeight: '600' }}>
              下载macOS版
            </Link>
          </div>

          {/* Linux */}
          <div style={{ border: '1px solid #e0e0e0', borderRadius: '12px', padding: '30px', transition: 'box-shadow 0.3s' }}>
            <h3 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '15px', color: '#1a1a1a' }}>
              🐧 Linux版
            </h3>
            <p style={{ color: '#666', marginBottom: '20px', lineHeight: '1.6' }}>
              支持Ubuntu、Debian、Fedora等主流发行版
            </p>
            <ul style={{ listStyle: 'none', padding: 0, marginBottom: '20px', color: '#555' }}>
              <li style={{ marginBottom: '8px' }}>✓ Ubuntu 18.04及以上</li>
              <li style={{ marginBottom: '8px' }}>✓ Debian 10及以上</li>
              <li style={{ marginBottom: '8px' }}>✓ Fedora 32及以上</li>
              <li style={{ marginBottom: '8px' }}>✓ 提供.deb和.rpm安装包</li>
            </ul>
            <Link to="/linux" style={{ display: 'inline-block', padding: '12px 30px', backgroundColor: '#2932E1', color: 'white', textDecoration: 'none', borderRadius: '6px', fontWeight: '600' }}>
              下载Linux版
            </Link>
          </div>

          {/* Android */}
          <div style={{ border: '1px solid #e0e0e0', borderRadius: '12px', padding: '30px', transition: 'box-shadow 0.3s' }}>
            <h3 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '15px', color: '#1a1a1a' }}>
              📱 Android版
            </h3>
            <p style={{ color: '#666', marginBottom: '20px', lineHeight: '1.6' }}>
              支持Android 5.0及以上系统的手机和平板
            </p>
            <ul style={{ listStyle: 'none', padding: 0, marginBottom: '20px', color: '#555' }}>
              <li style={{ marginBottom: '8px' }}>✓ Android 5.0及以上系统</li>
              <li style={{ marginBottom: '8px' }}>✓ 支持手机和平板设备</li>
              <li style={{ marginBottom: '8px' }}>✓ 应用大小：约120MB</li>
              <li style={{ marginBottom: '8px' }}>✓ Google Play和华为应用市场</li>
            </ul>
            <Link to="/android" style={{ display: 'inline-block', padding: '12px 30px', backgroundColor: '#2932E1', color: 'white', textDecoration: 'none', borderRadius: '6px', fontWeight: '600' }}>
              下载Android版
            </Link>
          </div>

          {/* iOS */}
          <div style={{ border: '1px solid #e0e0e0', borderRadius: '12px', padding: '30px', transition: 'box-shadow 0.3s' }}>
            <h3 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '15px', color: '#1a1a1a' }}>
              📱 iOS版
            </h3>
            <p style={{ color: '#666', marginBottom: '20px', lineHeight: '1.6' }}>
              支持iPhone和iPad，iOS 12.0及以上系统
            </p>
            <ul style={{ listStyle: 'none', padding: 0, marginBottom: '20px', color: '#555' }}>
              <li style={{ marginBottom: '8px' }}>✓ iOS 12.0及以上系统</li>
              <li style={{ marginBottom: '8px' }}>✓ 支持iPhone和iPad</li>
              <li style={{ marginBottom: '8px' }}>✓ 应用大小：约150MB</li>
              <li style={{ marginBottom: '8px' }}>✓ App Store免费下载</li>
            </ul>
            <Link to="/ios" style={{ display: 'inline-block', padding: '12px 30px', backgroundColor: '#2932E1', color: 'white', textDecoration: 'none', borderRadius: '6px', fontWeight: '600' }}>
              下载iOS版
            </Link>
          </div>
        </div>
      </section>

      {/* Installation Guide */}
      <section style={{ marginBottom: '60px', backgroundColor: '#f8f9fa', padding: '50px 40px', borderRadius: '12px' }}>
        <h2 style={{ fontSize: '36px', fontWeight: '700', textAlign: 'center', marginBottom: '40px', color: '#1a1a1a' }}>
          WPS Office安装教程
        </h2>

        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h3 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '20px', color: '#1a1a1a' }}>
            Windows系统安装步骤
          </h3>
          <ol style={{ fontSize: '16px', lineHeight: '2', color: '#555', paddingLeft: '20px', marginBottom: '40px' }}>
            <li><strong>下载安装包：</strong>点击上方"下载Windows版"按钮，下载WPS Office安装程序（约210MB）</li>
            <li><strong>运行安装程序：</strong>双击下载的.exe文件，如果出现安全提示，点击"运行"</li>
            <li><strong>选择安装路径：</strong>建议使用默认路径，或选择您希望的安装位置（需500MB可用空间）</li>
            <li><strong>等待安装完成：</strong>安装过程约需2-3分钟，请耐心等待</li>
            <li><strong>启动WPS Office：</strong>安装完成后，双击桌面图标启动WPS Office</li>
            <li><strong>登录或注册：</strong>可选择登录WPS账号以享受云同步功能，或选择"稍后登录"直接使用</li>
          </ol>

          <h3 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '20px', color: '#1a1a1a' }}>
            macOS系统安装步骤
          </h3>
          <ol style={{ fontSize: '16px', lineHeight: '2', color: '#555', paddingLeft: '20px', marginBottom: '40px' }}>
            <li><strong>下载DMG文件：</strong>点击"下载macOS版"按钮，下载WPS Office for Mac安装包</li>
            <li><strong>打开DMG文件：</strong>双击下载的.dmg文件，等待磁盘映像挂载</li>
            <li><strong>拖拽安装：</strong>将WPS Office图标拖拽到Applications文件夹中</li>
            <li><strong>首次启动：</strong>打开Applications文件夹，找到WPS Office并双击启动</li>
            <li><strong>允许运行：</strong>如遇"无法验证开发者"提示，前往"系统偏好设置" → "安全性与隐私"，点击"仍要打开"</li>
            <li><strong>完成设置：</strong>按照向导完成初始设置，即可开始使用</li>
          </ol>

          <h3 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '20px', color: '#1a1a1a' }}>
            Linux系统安装步骤
          </h3>
          <ol style={{ fontSize: '16px', lineHeight: '2', color: '#555', paddingLeft: '20px' }}>
            <li><strong>下载安装包：</strong>根据您的发行版选择.deb（Debian/Ubuntu）或.rpm（Fedora/CentOS）</li>
            <li><strong>打开终端：</strong>按Ctrl+Alt+T打开终端窗口</li>
            <li><strong>安装命令（Ubuntu/Debian）：</strong>
              <code style={{ display: 'block', backgroundColor: '#1a1a1a', color: '#00ff00', padding: '15px', borderRadius: '6px', marginTop: '10px', fontFamily: 'monospace' }}>
                sudo dpkg -i wps-office_*.deb<br/>
                sudo apt-get install -f
              </code>
            </li>
            <li><strong>安装命令（Fedora/CentOS）：</strong>
              <code style={{ display: 'block', backgroundColor: '#1a1a1a', color: '#00ff00', padding: '15px', borderRadius: '6px', marginTop: '10px', fontFamily: 'monospace' }}>
                sudo rpm -i wps-office-*.rpm
              </code>
            </li>
            <li><strong>启动WPS：</strong>在应用程序菜单中找到WPS Office，或在终端输入<code>wps</code>启动</li>
          </ol>
        </div>
      </section>

      {/* FAQ Section */}
      <section style={{ marginBottom: '60px' }}>
        <h2 style={{ fontSize: '36px', fontWeight: '700', textAlign: 'center', marginBottom: '40px', color: '#1a1a1a' }}>
          WPS Office下载常见问题
        </h2>

        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ marginBottom: '30px', borderBottom: '1px solid #e0e0e0', paddingBottom: '20px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px', color: '#1a1a1a' }}>
              WPS Office下载需要付费吗？
            </h3>
            <p style={{ fontSize: '16px', lineHeight: '1.8', color: '#555' }}>
              <strong>完全免费！</strong>WPS Office个人版完全免费，无需支付任何费用。下载、安装、使用均免费，没有试用期限制。您可以永久免费使用WPS文字、WPS表格、WPS演示、WPS PDF等所有核心功能。
            </p>
          </div>

          <div style={{ marginBottom: '30px', borderBottom: '1px solid #e0e0e0', paddingBottom: '20px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px', color: '#1a1a1a' }}>
              WPS Office下载速度慢怎么办？
            </h3>
            <p style={{ fontSize: '16px', lineHeight: '1.8', color: '#555' }}>
              我们提供了多个下载镜像服务器。如果下载速度慢，建议：1) 更换网络环境（如切换到Wi-Fi）；2) 使用下载工具（如迅雷、IDM）；3) 选择其他时间段下载；4) 联系客服获取备用下载链接。
            </p>
          </div>

          <div style={{ marginBottom: '30px', borderBottom: '1px solid #e0e0e0', paddingBottom: '20px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px', color: '#1a1a1a' }}>
              WPS Office下载安装后需要激活吗？
            </h3>
            <p style={{ fontSize: '16px', lineHeight: '1.8', color: '#555' }}>
              <strong>无需激活！</strong>WPS Office个人版下载安装后可直接使用，无需输入激活码或序列号。如果您希望使用云同步、在线模板等功能，可以选择注册并登录WPS账号，但这不是必需的。
            </p>
          </div>

          <div style={{ marginBottom: '30px', borderBottom: '1px solid #e0e0e0', paddingBottom: '20px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px', color: '#1a1a1a' }}>
              WPS Office下载的文件安全吗？
            </h3>
            <p style={{ fontSize: '16px', lineHeight: '1.8', color: '#555' }}>
              绝对安全！我们提供的所有安装包都经过数字签名认证，确保文件完整性和安全性。安装包已通过主流杀毒软件检测（如卡巴斯基、诺顿、360安全卫士等），不含任何病毒、木马或恶意插件。请务必从官方网站下载，避免使用第三方下载站。
            </p>
          </div>

          <div style={{ marginBottom: '30px', borderBottom: '1px solid #e0e0e0', paddingBottom: '20px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px', color: '#1a1a1a' }}>
              WPS Office能在离线环境使用吗？
            </h3>
            <p style={{ fontSize: '16px', lineHeight: '1.8', color: '#555' }}>
              可以！WPS Office支持完全离线使用。下载安装后，所有文档编辑功能（WPS文字、WPS表格、WPS演示、WPS PDF）都可以在没有网络连接的情况下正常使用。只有云同步、在线模板、在线字体等功能需要网络连接。
            </p>
          </div>

          <div style={{ marginBottom: '30px', borderBottom: '1px solid #e0e0e0', paddingBottom: '20px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px', color: '#1a1a1a' }}>
              如何卸载WPS Office？
            </h3>
            <p style={{ fontSize: '16px', lineHeight: '1.8', color: '#555' }}>
              <strong>Windows：</strong>打开"控制面板" → "程序和功能"，找到WPS Office，点击"卸载"。<br/>
              <strong>macOS：</strong>打开Applications文件夹，将WPS Office拖到废纸篓，或使用专业卸载工具。<br/>
              <strong>Linux：</strong>使用命令<code>sudo apt-get remove wps-office</code>（Ubuntu/Debian）或<code>sudo rpm -e wps-office</code>（Fedora/CentOS）。
            </p>
          </div>

          <div style={{ marginBottom: '30px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px', color: '#1a1a1a' }}>
              WPS Office更新频率如何？如何更新？
            </h3>
            <p style={{ fontSize: '16px', lineHeight: '1.8', color: '#555' }}>
              WPS Office每月发布稳定版更新，每周发布测试版更新。软件会自动检测更新并提示您下载安装。您也可以手动检查更新：点击菜单栏"帮助" → "检查更新"。建议保持软件为最新版本，以获得最佳性能和安全性。
            </p>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section style={{ marginBottom: '60px', backgroundColor: '#f8f9fa', padding: '50px 40px', borderRadius: '12px' }}>
        <h2 style={{ fontSize: '36px', fontWeight: '700', textAlign: 'center', marginBottom: '40px', color: '#1a1a1a' }}>
          为什么选择WPS Office下载？
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px', maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '15px' }}>💰</div>
            <h3 style={{ fontSize: '22px', fontWeight: '600', marginBottom: '12px', color: '#1a1a1a' }}>完全免费</h3>
            <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#555' }}>
              个人版永久免费使用，无需支付$149/年的Microsoft Office订阅费用，节省大量成本。
            </p>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '15px' }}>⚡</div>
            <h3 style={{ fontSize: '22px', fontWeight: '600', marginBottom: '12px', color: '#1a1a1a' }}>轻量快速</h3>
            <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#555' }}>
              安装包仅210MB（Microsoft Office需3GB+），启动速度快3倍，运行流畅不卡顿。
            </p>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '15px' }}>🔄</div>
            <h3 style={{ fontSize: '22px', fontWeight: '600', marginBottom: '12px', color: '#1a1a1a' }}>完美兼容</h3>
            <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#555' }}>
              100%兼容Microsoft Office所有格式（DOC/DOCX/XLS/XLSX/PPT/PPTX），无缝切换。
            </p>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '15px' }}>🤖</div>
            <h3 style={{ fontSize: '22px', fontWeight: '600', marginBottom: '12px', color: '#1a1a1a' }}>AI智能助手</h3>
            <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#555' }}>
              内置AI写作助手、智能排版、数据分析建议，大幅提升办公效率，节省时间。
            </p>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '15px' }}>☁️</div>
            <h3 style={{ fontSize: '22px', fontWeight: '600', marginBottom: '12px', color: '#1a1a1a' }}>云文档同步</h3>
            <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#555' }}>
              多设备自动同步，电脑、手机、平板无缝衔接，随时随地办公，数据安全有保障。
            </p>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '15px' }}>🌍</div>
            <h3 style={{ fontSize: '22px', fontWeight: '600', marginBottom: '12px', color: '#1a1a1a' }}>全平台支持</h3>
            <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#555' }}>
              支持Windows、Mac、Linux、Android、iOS五大平台，一次下载，全设备可用。
            </p>
          </div>
        </div>
      </section>

      {/* System Requirements */}
      <section style={{ marginBottom: '60px' }}>
        <h2 style={{ fontSize: '36px', fontWeight: '700', textAlign: 'center', marginBottom: '40px', color: '#1a1a1a' }}>
          WPS Office系统要求
        </h2>

        <div style={{ maxWidth: '900px', margin: '0 auto', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15px' }}>
            <thead>
              <tr style={{ backgroundColor: '#2932E1', color: 'white' }}>
                <th style={{ padding: '15px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>平台</th>
                <th style={{ padding: '15px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>操作系统</th>
                <th style={{ padding: '15px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>内存</th>
                <th style={{ padding: '15px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>磁盘空间</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ backgroundColor: '#f9f9f9' }}>
                <td style={{ padding: '15px', borderBottom: '1px solid #ddd' }}>Windows</td>
                <td style={{ padding: '15px', borderBottom: '1px solid #ddd' }}>Windows 7/8/10/11</td>
                <td style={{ padding: '15px', borderBottom: '1px solid #ddd' }}>2GB（推荐4GB）</td>
                <td style={{ padding: '15px', borderBottom: '1px solid #ddd' }}>500MB</td>
              </tr>
              <tr>
                <td style={{ padding: '15px', borderBottom: '1px solid #ddd' }}>macOS</td>
                <td style={{ padding: '15px', borderBottom: '1px solid #ddd' }}>macOS 11.0及以上</td>
                <td style={{ padding: '15px', borderBottom: '1px solid #ddd' }}>2GB（推荐4GB）</td>
                <td style={{ padding: '15px', borderBottom: '1px solid #ddd' }}>500MB</td>
              </tr>
              <tr style={{ backgroundColor: '#f9f9f9' }}>
                <td style={{ padding: '15px', borderBottom: '1px solid #ddd' }}>Linux</td>
                <td style={{ padding: '15px', borderBottom: '1px solid #ddd' }}>Ubuntu 18.04+/Debian 10+/Fedora 32+</td>
                <td style={{ padding: '15px', borderBottom: '1px solid #ddd' }}>2GB（推荐4GB）</td>
                <td style={{ padding: '15px', borderBottom: '1px solid #ddd' }}>500MB</td>
              </tr>
              <tr>
                <td style={{ padding: '15px', borderBottom: '1px solid #ddd' }}>Android</td>
                <td style={{ padding: '15px', borderBottom: '1px solid #ddd' }}>Android 5.0及以上</td>
                <td style={{ padding: '15px', borderBottom: '1px solid #ddd' }}>1GB</td>
                <td style={{ padding: '15px', borderBottom: '1px solid #ddd' }}>200MB</td>
              </tr>
              <tr style={{ backgroundColor: '#f9f9f9' }}>
                <td style={{ padding: '15px', borderBottom: '1px solid #ddd' }}>iOS</td>
                <td style={{ padding: '15px', borderBottom: '1px solid #ddd' }}>iOS 12.0及以上</td>
                <td style={{ padding: '15px', borderBottom: '1px solid #ddd' }}>1GB</td>
                <td style={{ padding: '15px', borderBottom: '1px solid #ddd' }}>250MB</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ textAlign: 'center', backgroundColor: '#2932E1', color: 'white', padding: '60px 40px', borderRadius: '12px' }}>
        <h2 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '20px' }}>
          立即下载WPS Office，开启高效办公之旅！
        </h2>
        <p style={{ fontSize: '18px', marginBottom: '30px', opacity: 0.9 }}>
          500万+全球用户的选择，完全免费，永久使用
        </p>
        <Link to="/download" style={{ display: 'inline-block', padding: '18px 50px', backgroundColor: 'white', color: '#2932E1', textDecoration: 'none', borderRadius: '8px', fontSize: '20px', fontWeight: '700' }}>
          免费下载WPS Office →
        </Link>
      </section>
    </div>
  );
};

export default WpsOfficeDownload;

