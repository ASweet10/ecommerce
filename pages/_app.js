import React from 'react';
import '../styles/globals.css';
import { StateContext } from '../context/StateContext';
import { Toaster } from 'react-hot-toast';

import Login from '../lib/login';
import Register from '../lib/register';
import Reset from '../lib/reset';
import Dashboard from '../lib/dashboard';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Layout } from '../components';

function MyApp({ Component, pageProps }) {
  return(
    <StateContext>
      <Layout>
        <Router>
          <Routes>
            <Route exact path="/" element={ <Login /> } />
            <Route exact path="/register" element={ <Register /> } />
            <Route exact path="/reset" element={ <Reset /> } />
            <Route exact path="/dashboard" element={ <Dashboard /> } />
          </Routes>
        </Router>
        <Toaster />
        <Component {...pageProps} />
      </Layout>
    </StateContext>

  )
}

export default MyApp
