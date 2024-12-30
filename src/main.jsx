import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Include global styles
import { Provider } from 'react-redux';
import store from './store/store.js';
import { RouterProvider, createHashRouter } from 'react-router-dom';

// Pages and Components
import App from './App.jsx';
import Home from './pages/Home.jsx';
import { AuthLayout, Login, Signup } from './components/index.js';
import AddPost from './pages/AddPost';
import EditPost from './pages/EditPost';
import Post from './pages/Post';
import AllPosts from './pages/AllPosts';

// Define Routes with Router
const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        ),
      },
      {
        path: "/all-posts",
        element: (
          <AuthLayout authentication>
            <AllPosts />
          </AuthLayout>
        ),
      },
      {
        path: "/add-post",
        element: (
          <AuthLayout authentication>
            <AddPost />
          </AuthLayout>
        ),
      },
      {
        path: "/edit-post/:slug",
        element: (
          <AuthLayout authentication>
            <EditPost />
          </AuthLayout>
        ),
      },
      {
        path: "/post/:slug",
        element: <Post />,
      },
    ],
  },
]);

// Render the application
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start">
        <RouterProvider router={router} />
      </div>
    </Provider>
  </React.StrictMode>
);
