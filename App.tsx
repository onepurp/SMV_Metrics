import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Calculator } from './components/Calculator';
import { Comparison } from './components/Comparison';
import { History } from './components/History';
import { Info } from './components/Info';

function App() {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Calculator />} />
          <Route path="/compare" element={<Comparison />} />
          <Route path="/history" element={<History />} />
          <Route path="/info" element={<Info />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
}

export default App;
