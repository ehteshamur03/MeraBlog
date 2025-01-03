/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import authService from "../appwrite/auth";
import { login } from "../store/authSlice";
import { Button, Input, Logo } from "./index.js";

function Signup() {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const create = async (data) => {
        setError(""); // Reset error state before trying to create account
        try {
            const userData = await authService.createAccount(data);
            if (userData) {
                const loggedInUser = await authService.getCurrentUser();
                if (loggedInUser) {
                    dispatch(login(loggedInUser));
                    navigate("/");
                }
            }
        } catch (err) {
            console.error("Signup Error:", err);
            setError(err.message || "An error occurred during signup.");
        }
    };

    const loginWithGitHub = async () => {
        setError("");
        try {
            await authService.loginWithGitHub();
        } catch (err) {
            console.error("GitHub OAuth Login Error:", err);
            setError("Failed to initiate GitHub login. Please try again.");
        }
    };

    const loginWithGoogle = async () => {
        setError("");
        try {
            await authService.loginWithGoogle();
        } catch (err) {
            console.error("Google OAuth Login Error:", err);
            setError("Failed to initiate Google login. Please try again.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 relative overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: 'url(/path-to-your-background-image.jpg)' }} />

            {/* Signup Card */}
            <div className="relative bg-white/30 backdrop-blur-md shadow-xl rounded-3xl p-8 max-w-lg w-full border border-white/20 m-4">
                <div className="text-center">
                    <Logo width="80px" className="mx-auto mb-4" />
                    <h2 className="text-3xl font-extrabold text-white">Create Your Account</h2>
                    <p className="mt-2 text-lg text-gray-200">
                        Already have an account?{" "}
                        <Link to="/login" className="font-medium text-gray-800 hover:underline">
                            Sign In
                        </Link>
                    </p>
                </div>

                {/* Error Message */}
                {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

                {/* Signup Form */}
                <form onSubmit={handleSubmit(create)} className="space-y-6 mt-8">
                    <Input
                        label="Full Name"
                        placeholder="Enter your full name"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/70"
                        {...register("name", { required: "Full Name is required" })}
                        error={errors.name}
                    />
                    <Input
                        label="Email"
                        placeholder="Enter your email"
                        type="email"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/70"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                                message: "Email address must be valid",
                            },
                        })}
                        error={errors.email}
                    />
                    <Input
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/70"
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 6,
                                message: "Password must be at least 6 characters",
                            },
                        })}
                        error={errors.password}
                    />
                    <Button
                        type="submit"
                        className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all"
                    >
                        Create Account
                    </Button>
                </form>

                {/* Divider */}
                <div className="mt-6 flex items-center justify-center">
                    <div className="h-px bg-white/50 w-1/4" />
                    <span className="text-white mx-3 text-sm">OR</span>
                    <div className="h-px bg-white/50 w-1/4" />
                </div>

                {/* OAuth Buttons */}
                <Button
                    type="button"
                    className="mt-6 w-full flex items-center justify-center py-3 bg-gray-800 text-white font-bold rounded-lg hover:bg-gray-900 transition-all"
                    aria-label="Sign Up with GitHub"
                    onClick={loginWithGitHub}
                >
                    <i className="fab fa-github mr-2"></i> Sign Up with GitHub
                </Button>
                <Button
                    type="button"
                    className="mt-4 w-full flex items-center justify-center py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-all"
                    aria-label="Sign Up with Google"
                    onClick={loginWithGoogle}
                >
                    <i className="fab fa-google mr-2"></i> Sign Up with Google
                </Button>
            </div>
        </div>
    );
}


export default Signup;