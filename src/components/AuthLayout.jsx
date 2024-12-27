import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

function AuthLayout({ authentication, children }) {
    // Access user data from Redux
    const userData = useSelector((state) => state.auth.userData);

    // Debugging: Log the authentication state and user data
    console.log("AuthLayout :: authentication:", authentication);
    console.log("AuthLayout :: userData:", userData);

    // Handle authentication redirection
    if (authentication) {
        if (!userData) {
            // Optional: Display a fallback loading state while checking auth
            console.log("AuthLayout :: User not authenticated, redirecting to login...");
            return <Navigate to="/login" />;
        }
    }

    // Render children if user is authenticated or no authentication is required
    return <div>{children}</div>;
}

AuthLayout.propTypes = {
    authentication: PropTypes.bool.isRequired, // Whether authentication is required
    children: PropTypes.node.isRequired,     // Child components to render
};

export default AuthLayout;
