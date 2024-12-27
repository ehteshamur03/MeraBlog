import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import authService from './appwrite/auth';
import { login, logout } from './store/authSlice';
import { Footer, Header } from './components';
import { Outlet } from 'react-router-dom';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  return !loading ? (
    <div className='min-h-screen flex flex-col bg-gradient-to-b from-gray-100 to-gray-400'>
      {/* Header */}
      <Header />

      {/* Main Content */}  
      <main className='flex-grow'>
        <div className='container mx-auto p-4'>
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  ) : (
    <div className='flex justify-center items-center min-h-screen bg-gray-200'>
      <div className='text-xl text-gray-600'>Loading...</div>
    </div>
  );
}

export default App;
