import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Download from './pages/Download';
import Support from './pages/Support';
import Pricing from './pages/Pricing';
import Education from './pages/Education';
import Writer from './pages/Writer';
import Spreadsheet from './pages/Spreadsheet';
import Presentation from './pages/Presentation';
import PDF from './pages/PDF';
import Windows from './pages/Windows';
import Mac from './pages/Mac';
import Android from './pages/Android';
import IOS from './pages/iOS';
import Linux from './pages/Linux';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfUse from './pages/TermsOfUse';
import TechSpecs from './pages/TechSpecs';
import Partners from './pages/Partners';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import SerpReport from './pages/SerpReport';
import BacklinkReport from './pages/BacklinkReport';
import Templates from './pages/Templates';
import TemplateDetail from './pages/TemplateDetail';
import LogViewer from './pages/LogViewer';
import SEODashboard from './pages/SEODashboard';
import { logVisitToServer } from './utils/apiLogger';
import './App.css';
import './styles/blog.css';
import './styles/templates.css';
import './styles/logViewer.css';
import './styles/seoDashboard.css';

const AppContent = () => {
  const location = useLocation();

  useEffect(() => {
    // This will send a log to our server every time the route changes.
    logVisitToServer();
  }, [location]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/download" element={<Download />} />
      <Route path="/support" element={<Support />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/education" element={<Education />} />

      {/* Office Apps */}
      <Route path="/writer" element={<Writer />} />
      <Route path="/spreadsheet" element={<Spreadsheet />} />
      <Route path="/presentation" element={<Presentation />} />
      <Route path="/pdf" element={<PDF />} />

      {/* Platform Pages */}
      <Route path="/windows" element={<Windows />} />
      <Route path="/mac" element={<Mac />} />
      <Route path="/android" element={<Android />} />
      <Route path="/ios" element={<IOS />} />
      <Route path="/linux" element={<Linux />} />

      {/* Legal & Other Pages */}
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-of-use" element={<TermsOfUse />} />
      <Route path="/tech-specs" element={<TechSpecs />} />
      <Route path="/partners" element={<Partners />} />

      {/* Blog */}
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:id" element={<BlogPost />} />
      
      {/* Templates */}
      <Route path="/templates" element={<Templates />} />
      <Route path="/templates/:id" element={<TemplateDetail />} />
      
      {/* Reports */}
      <Route path="/serp-report" element={<SerpReport />} />
      <Route path="/backlink-report" element={<BacklinkReport />} />
      <Route path="/logs" element={<LogViewer />} />
      <Route path="/seo-dashboard" element={<SEODashboard />} />
      
      {/* Redirect deprecated/non-existent routes to home */}
      <Route path="/wpsdocs" element={<Navigate to="/" replace />} />
      <Route path="/wpsdocs/*" element={<Navigate to="/" replace />} />
      
      {/* Catch-all: redirect any other unknown routes to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
