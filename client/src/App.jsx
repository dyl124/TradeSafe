// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './login';
import Register from './register';
import CompaniesPage from './companiesPage';
import IndividualsPage from './individuals';
import DiscrepanciesPage from './discrepancies';
import PostingsPage from './postings';
import AdvertisingPage from './advertising';
import HomePage from './home';
import Header from './header';

function App() {
  return (
    <div>
      <Router>
      <Header /> 
      <Routes>
      <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/companies" element={<CompaniesPage />} />
        <Route path="/individuals" element={<IndividualsPage />} />
        <Route path="/discrepancies" element={<DiscrepanciesPage />} />
        <Route path="/postings" element={<PostingsPage />} />
        <Route path="/advertising" element={<AdvertisingPage />} />
      </Routes>
    </Router>
    </div>

  );
}

export default App;
