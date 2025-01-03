import { useDispatch } from 'react-redux';
import authService from '../../appwrite/auth';
import { logout } from '../../store/authSlice';
import { useState } from 'react';

function LogoutBtn() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const logoutHandler = async () => {
    setLoading(true);
    setError(null);

    try {
      await authService.logout();
      dispatch(logout());
    } catch {
      setError('Failed to log out. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="inline-block relative">
      <button
        className="px-6 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 transition duration-300 transform active:scale-95 disabled:bg-blue-400 disabled:cursor-not-allowed disabled:opacity-50"
        onClick={logoutHandler}
        disabled={loading}
      >
        {loading ? (
          <span className="animate-pulse">Logging out...</span>
        ) : (
          'Logout'
        )}
      </button>
      {error && <p className="mt-2 text-sm text-red-600 transition-all opacity-100">{error}</p>}
    </div>
  );
}

export default LogoutBtn;
