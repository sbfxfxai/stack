import React from 'react';

const PageLayout = ({ children }) => {
  return (
    <div className="app-shell">
      <div className="app-card">
        {children}
      </div>
    </div>
  );
};

export default PageLayout;
