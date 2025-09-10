import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-links">
            <a href="/privacy-policy">隱私政策</a>
            <a href="/terms-of-use">使用條款</a>
            <a href="/contact">聯絡我們</a>
          </div>
          <div className="footer-copyright">
            <p>&copy; 2024 WPS Office. 版權所有。</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
