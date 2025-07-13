// src/components/layout/MainLayout/index.jsx
import React from 'react';
import { Navbar } from '../../';
import { Footer, ScrollToTop } from '../../ui';

const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
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
