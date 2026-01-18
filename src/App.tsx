import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserLogin, Discover, Waitlist } from './views';
import { SupabaseTest } from './components';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Waitlist />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/test" element={<SupabaseTest />} />
      </Routes>
    </Router>
  );
}

export default App;