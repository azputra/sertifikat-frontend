import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import VerifyPage from './pages/VerifyPage';
import VerifyResultPage from './pages/VerifyResultPage';
import useAuthStore from './store/authStore';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user } = useAuthStore();
  
  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }
  
  return children;
};

// Versi baru dari komponen RedirectToSecuone
const RedirectToSecuone = () => {
  const { barcode } = useParams();
  const [redirecting, setRedirecting] = React.useState(false);
  
  React.useEffect(() => {
    const currentHostname = window.location.hostname;
    if (currentHostname.includes('netlify')) {
      setRedirecting(true);
      // Tambahkan delay kecil untuk pastikan state terupdate
      setTimeout(() => {
        window.location.href = `http://www.secuoneindonesia.com/verify/${barcode}`;
      }, 50);
    }
  }, [barcode]);
  
  // Jika sedang redirect, tampilkan loading screen
  if (redirecting) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
      </div>
    );
  }
  
  // Hanya render VerifyResultPage jika tidak sedang redirect
  return <VerifyResultPage />;
};

function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/admin/login" element={<LoginPage />} />
            <Route path="/verify" element={<VerifyPage />} />
            {/* Gunakan komponen redirect yang sudah diperbarui */}
            <Route path="/verify/:barcode" element={<RedirectToSecuone />} />

            <Route path="/admin/dashboard" element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;