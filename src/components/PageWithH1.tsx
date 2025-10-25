import React from 'react';
import HTMLViewer from './HTMLViewer';

interface PageWithH1Props {
  h1Text: string;
  htmlPath: string;
  title: string;
  showH1?: boolean; // Whether to visually show the H1 or hide it for screen readers only
}

/**
 * Wrapper component that adds an H1 tag to pages using HTMLViewer
 * Ensures SEO compliance while maintaining visual design
 */
const PageWithH1: React.FC<PageWithH1Props> = ({ 
  h1Text, 
  htmlPath, 
  title,
  showH1 = false // Default: hide H1 visually but keep it for SEO/accessibility
}) => {
  return (
    <div>
      <h1 style={showH1 ? {} : { 
        position: 'absolute', 
        left: '-10000px',
        width: '1px',
        height: '1px',
        overflow: 'hidden'
      }}>
        {h1Text}
      </h1>
      <HTMLViewer 
        htmlPath={htmlPath}
        title={title}
      />
    </div>
  );
};

export default PageWithH1;

