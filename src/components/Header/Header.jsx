/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
    const authStatus = useSelector((state) => state.auth.status);
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navItems = [
        { name: "Home", slug: "/", active: true },
        { name: "Login", slug: "/login", active: !authStatus },
        { name: "Signup", slug: "/signup", active: !authStatus },
        { name: "All Posts", slug: "/all-posts", active: authStatus },
        { name: "Add Post", slug: "/add-post", active: authStatus },
    ];

    return (
        <header className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg py-4">
            <Container>
                <nav className="flex items-center justify-between relative">
                    {/* Logo */}
                    <Link to="/">
                        <Logo
                            width="70px"
                            className="transition-transform duration-500 ease-in-out hover:scale-110"
                        />
                    </Link>

                    {/* Hamburger Menu for Mobile */}
                    <button
                        className="block md:hidden text-white focus:outline-none"
                        onClick={() => setIsMenuOpen((prev) => !prev)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
                            />
                        </svg>
                    </button>

                    {/* Navigation Menu */}
                    <ul
                        className={`${
                            isMenuOpen ? "block" : "hidden"
                        } absolute md:relative top-full left-0 md:top-0 md:left-auto md:flex items-center md:space-x-8 bg-gradient-to-r from-blue-700 to-purple-700 md:bg-transparent w-full md:w-auto p-2 md:p-0 shadow-lg md:shadow-none z-20 rounded-xl`}
                    >
                        {navItems
                            .filter((item) => item.active)
                            .map((item) => (
                                <li key={item.name} className="md:my-0">
                                    <button
                                        onClick={() => {
                                            setIsMenuOpen(false);
                                            navigate(item.slug);
                                        }}
                                        className="px-6 py-3 w-full text-left md:w-auto md:text-center text-white font-semibold rounded-lg transition-all duration-300 ease-in-out hover:bg-white hover:text-blue-600"
                                    >
                                        {item.name}
                                    </button>
                                </li>
                            ))}

                        {/* Logout Button */}
                        {authStatus && (
                            <li className="my-2 md:my-0">
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
