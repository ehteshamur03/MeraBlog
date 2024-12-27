import { useDispatch } from 'react-redux';
import authService from '../../appwrite/auth';
import { logout } from '../../store/authSlice';
import { useState } from 'react';

function LogoutBtn() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false); // State to manage loading
  const [error, setError] = useState(null); // State to handle errors

  // Logout handler function
  const logoutHandler = async () => {
    setLoading(true);
    setError(null);

    try {
      await authService.logout(); // Call logout from auth service
      dispatch(logout()); // Dispatch the logout action
    } catch {
      setError('Failed to log out. Please try again.'); // Handle errors
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="inline-block">
      <button
        className="px-6 py-2 text-white bg-blue-500 rounded-full hover:bg-blue-600 duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={logoutHandler}
        disabled={loading} // Disable button when loading
      >
        {loading ? 'Logging out...' : 'Logout'} {/* Show loading text */}
      </button>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>} {/* Display error message */}
    </div>
  );
}

export default LogoutBtn;
