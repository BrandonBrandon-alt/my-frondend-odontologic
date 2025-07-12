// src/components/layout/MainLayout/index.jsx
import React from 'react';
import { Navbar } from '../../';
import { Footer } from '../../ui';

const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
