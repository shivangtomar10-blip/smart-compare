import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { CompareProvider } from './context/CompareContext.jsx';
import './styles.css';
createRoot(document.getElementById('root')).render(
  <BrowserRouter><AuthProvider><CompareProvider><App /></CompareProvider></AuthProvider></BrowserRouter>);
