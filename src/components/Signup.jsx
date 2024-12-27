/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import authService from '../appwrite/auth';
import { login } from '../store/authSlice';
import { Button, Input, Logo } from './index.js';

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
        } catch (error) {
            setError(error.message || "An error occurred during signup.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="mx-auto w-full max-w-lg bg-white rounded-xl p-10 border border-gray-300 shadow-md">
                <div className="mb-6 flex justify-center">
                    <Logo width="100px" />
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create an account</h2>
                <p className="mt-2 text-center text-base text-gray-600">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>

                {/* Display error message if any */}
                {error && <p className="text-red-600 mt-4 text-center">{error}</p>}

                <form onSubmit={handleSubmit(create)} className="space-y-6 mt-8">
                    <Input
                        label="Full Name"
                        placeholder="Enter your full name"
                        {...register("name", {
                            required: "Full Name is required",
                        })}
                        error={errors.name}
                    />
                    <Input
                        label="Email"
                        placeholder="Enter your email"
                        type="email"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                                message: "Email address must be valid",
                            }
                        })}
                        error={errors.email}
                    />
                    <Input
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 6,
                                message: "Password must be at least 6 characters",
                            }
                        })}
                        error={errors.password}
                    />

                    <Button type="submit" className="w-full">
                        Create Account
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default Signup;
