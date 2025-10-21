import { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { logVisitToServer } from './utils/apiLogger';
import './App.css';
import './styles/blog.css';
import './styles/templates.css';
import './styles/logViewer.css';
import './styles/seoDashboard.css';

// Lazy load all pages for better INP performance
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Download = lazy(() => import('./pages/Download'));
const Support = lazy(() => import('./pages/Support'));
const Pricing = lazy(() => import('./pages/Pricing'));
const Education = lazy(() => import('./pages/Education'));
const Writer = lazy(() => import('./pages/Writer'));
const Spreadsheet = lazy(() => import('./pages/Spreadsheet'));
const Presentation = lazy(() => import('./pages/Presentation'));
const PDF = lazy(() => import('./pages/PDF'));
const Windows = lazy(() => import('./pages/Windows'));
const Mac = lazy(() => import('./pages/Mac'));
const Android = lazy(() => import('./pages/Android'));
const IOS = lazy(() => import('./pages/iOS'));
const Linux = lazy(() => import('./pages/Linux'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfUse = lazy(() => import('./pages/TermsOfUse'));
const TechSpecs = lazy(() => import('./pages/TechSpecs'));
const Partners = lazy(() => import('./pages/Partners'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const SerpReport = lazy(() => import('./pages/SerpReport'));
const BacklinkReport = lazy(() => import('./pages/BacklinkReport'));
const Templates = lazy(() => import('./pages/Templates'));
const TemplateDetail = lazy(() => import('./pages/TemplateDetail'));
const LogViewer = lazy(() => import('./pages/LogViewer'));
const SEODashboard = lazy(() => import('./pages/SEODashboard'));

// Loading fallback component
const PageLoader = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
  }}>
    <div>正在加载...</div>
  </div>
);

const AppContent = () => {
  const location = useLocation();

  useEffect(() => {
    // This will send a log to our server every time the route changes.
    logVisitToServer();
  }, [location]);

  return (
    <Suspense fallback={<PageLoader />}>
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
    </Suspense>
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
