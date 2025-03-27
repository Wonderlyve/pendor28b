import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import LiveScores from './pages/LiveScores';
import News from './pages/News';
import MyPredictions from './pages/MyPredictions';
import Store from './pages/Store';
import VendorDashboard from './pages/VendorDashboard';
import Invoices from './pages/Invoices';
import BottomNav from './components/BottomNav';
import { PostProvider } from './context/PostContext';

function App() {
  return (
    <PostProvider>
      <Router>
        <div className="min-h-screen bg-sport-pattern pb-16">
          <Navbar />
          <main className="container mx-auto px-4 py-8 mt-16">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/live" element={<LiveScores />} />
              <Route path="/news" element={<News />} />
              <Route path="/mes-pronos" element={<MyPredictions />} />
              <Route path="/store" element={<Store />} />
              <Route path="/vendor" element={<VendorDashboard />} />
              <Route path="/invoices" element={<Invoices />} />
            </Routes>
          </main>
          <BottomNav />
        </div>
      </Router>
    </PostProvider>
  );
}

export default App;