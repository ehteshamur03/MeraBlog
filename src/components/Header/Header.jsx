/* eslint-disable no-unused-vars */
import React from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ];

  return (
    <header className="bg-white shadow-xl rounded-lg py-4">
      <Container>
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/">
            <Logo width="70px" className="transition-transform duration-500 ease-in-out hover:scale-110" />
          </Link>

          {/* Navigation Menu */}
          <ul className="flex items-center space-x-8">
            {navItems
              .filter((item) => item.active)
              .map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="px-6 py-2 text-gray-800 font-semibold rounded-lg transition-all duration-300 ease-in-out hover:bg-blue-600 hover:text-white hover:scale-105 focus:ring-2 focus:ring-blue-500"
                  >
                    {item.name}
                  </button>
                </li>
              ))}

            {/* Logout Button */}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
