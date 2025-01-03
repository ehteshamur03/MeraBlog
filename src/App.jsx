import React, { useState, useEffect, Suspense } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async'; // Combine imports
import './App.css';
import authService from './appwrite/auth';
import { login, logout } from './store/authSlice';
import Header from './components/Header/Header.jsx'; // Ensure correct import paths
const Footer = React.lazy(() => import('./components/Footer/Footer.jsx')); // Lazy-load Footer

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        <div className="text-xl text-gray-600 ml-4">Loading...</div>
      </div>
    );
  }

  return (
    <HelmetProvider>
      <Helmet>
        <title>MeraBlog</title>
      </Helmet>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-100 to-gray-400">
        {/* Header */}
        <Header className="sticky top-0 z-50" />

        {/* Main Content */}
        <main className="flex-grow">
          <div className="container mx-auto">
            <Outlet />
          </div>
        </main>

        {/* Footer */}
        <Suspense
          fallback={
            <div className="flex justify-center items-center py-4 text-gray-600">
              Loading Footer...
            </div>
          }
        >
          <Footer className="mt-auto" />
        </Suspense>
      </div>
    </HelmetProvider>
  );
}

export default App;
