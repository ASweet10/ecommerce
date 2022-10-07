import React from 'react';
import Head from 'next/head';

import Navbar from './Navbar';
import Footer from './Footer';

//Get access to Component in app.js through "children" prop here
const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Head>
        <title>ECommerce Site</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <main className="main-container">
        {children}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Layout