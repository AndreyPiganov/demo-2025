import './styles.css';
import { StrictMode } from 'react';
import { Routes, Route, HashRouter } from 'react-router';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AddOrEditFamilyMember from './AddOrEditFamilyMember';

ReactDOM.createRoot(document.getElementById('root')).render(
  <HashRouter>
    <StrictMode>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path="/add-member" element={<AddOrEditFamilyMember />} />
        <Route path="/edit-member/:id" element={<AddOrEditFamilyMember />} />
      </Routes>
    </StrictMode>
  </HashRouter>
);