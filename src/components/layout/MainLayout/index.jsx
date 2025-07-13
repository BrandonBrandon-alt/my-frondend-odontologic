// src/components/layout/MainLayout/index.jsx
import React from 'react';
import { Navbar } from '../../';
import { Footer, ScrollToTop, ScrollProgress, ScrollToTopOnRouteChange } from '../../ui';

const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTopOnRouteChange />
      <ScrollProgress />
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default MainLayout;
