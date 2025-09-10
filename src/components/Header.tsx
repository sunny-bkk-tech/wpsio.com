import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);


  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        closeMobileMenu();
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMobileMenuOpen) {
        closeMobileMenu();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, [isMobileMenuOpen]);

  return (
    <header className="header dark">
      {/* Desktop Navigation */}
      <section className="pc">
        <div className="left">
          <Link to="/" className="logo-wrapper">
            <span className="logo">WPS</span>
          </Link>
        </div>
        <div className="center">
          <div className="menu-contianer dark">
            <div className="menu-list">
              <Link to="/about" className="menu">
                <span className="menu-name">關於我們</span>
              </Link>
              <Link to="/download" className="menu">
                <span className="menu-name">下載</span>
              </Link>
              <Link to="/pricing" className="menu">
                <span className="menu-name">定價</span>
              </Link>
              <Link to="/education" className="menu">
                <span className="menu-name">資源</span>
              </Link>
              <Link to="/support" className="menu">
                <span className="menu-name">支援</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="right">
          <div className="lang" style={{ display: 'none' }}>
            {/* Language selector */}
          </div>
          <div className="download-btn-wrapper">
            <Link to="/download" className="download-btn btn header-small">
              <strong className="text btn-font-title">下載</strong>
            </Link>
          </div>
          <div className="sign-in font-desc">
            <div className="text">登入</div>
          </div>
        </div>
      </section>

      {/* Mobile Navigation */}
      <section className="mobile" data-react-component="mobile-nav">
        <div className="mobile-header">
          <Link to="/" className="logo-wrapper" onClick={closeMobileMenu}>
            <span className="logo">WPS</span>
          </Link>
          <button 
            className="mobile-menu-toggle"
            data-react-component="mobile-toggle"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleMobileMenu();
            }}
            aria-label="Toggle mobile menu"
            type="button"
          >
            <span className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </div>
        
        {/* Mobile Menu Backdrop */}
        {isMobileMenuOpen && (
          <div className="mobile-menu-backdrop" onClick={closeMobileMenu}></div>
        )}
        
        <div ref={mobileMenuRef} className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`} data-react-component="mobile-menu">
          <div className="mobile-menu-content">
            <Link to="/about" className="mobile-menu-item" onClick={closeMobileMenu}>
              <span>關於我們</span>
            </Link>
            <Link to="/download" className="mobile-menu-item" onClick={closeMobileMenu}>
              <span>下載</span>
            </Link>
            <Link to="/pricing" className="mobile-menu-item" onClick={closeMobileMenu}>
              <span>定價</span>
            </Link>
            <Link to="/education" className="mobile-menu-item" onClick={closeMobileMenu}>
              <span>資源</span>
            </Link>
            <Link to="/support" className="mobile-menu-item" onClick={closeMobileMenu}>
              <span>支援</span>
            </Link>
            
            <div className="mobile-menu-actions">
              <Link to="/download" className="mobile-download-btn" onClick={closeMobileMenu}>
                <strong>下載</strong>
              </Link>
              <div className="mobile-sign-in">
                <span>登入</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </header>
  );
};

export default Header;
