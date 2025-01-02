import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // Email/password login function
    const login = async (data) => {
        setError("");
        setLoading(true);
        try {
            const session = await authService.login(data);
            if (session) {
                const userData = await authService.getCurrentUser();
                if (userData) dispatch(authLogin(userData));
                navigate("/");
            }
        } catch (err) {
            console.error("Email/Password Login Error:", err);
            setError(err?.message || "Login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // GitHub OAuth login function
    const loginWithGitHub = async () => {
        setError("");
        try {
            await authService.loginWithGitHub(); // Simply call the method defined in authService
        } catch (err) {
            console.error("GitHub OAuth Login Error:", err);
            setError("Failed to initiate GitHub login. Please try again.");
        }
    };
    const loginWithGoogle = async () => {
        setError("");
        try {
            await authService.loginWithGoogle(); // Simply call the method defined in authService
        } catch (err) {
            console.error("GitHub OAuth Login Error:", err);
            setError("Failed to initiate GitHub login. Please try again.");
        }
    };

    return (
        <div className="flex items-center justify-center w-full">
            <div
                className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
            >
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">
                    Sign in to your account
                </h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have an account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                <form onSubmit={handleSubmit(login)} className="mt-8">
                    <div className="space-y-5">
                        <Input
                            label="Email:"
                            placeholder="Enter your email"
                            type="email"
                            aria-label="Email"
                            {...register("email", {
                                required: "Email is required",
                                validate: {
                                    matchPattern: (value) =>
                                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
                                            value
                                        ) || "Email address must be valid",
                                },
                            })}
                        />
                        <Input
                            label="Password:"
                            type="password"
                            placeholder="Enter your password"
                            aria-label="Password"
                            {...register("password", {
                                required: "Password is required",
                            })}
                        />
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? "Signing in..." : "Sign in"}
                        </Button>
                    </div>
                </form>
                <div className="mt-6 flex justify-center">
                    <Button
                        type="button"
                        className="w-full bg-gray-800 text-white"
                        aria-label="Sign in with GitHub"
                        onClick={loginWithGitHub}
                    >
                        Sign in with GitHub
                    </Button>
                </div>
                <div className="mt-6 flex justify-center">
                    <Button
                        type="button"
                        className="w-full bg-rose-700 text-white"
                        aria-label="Sign in with GitHub"
                        onClick={loginWithGoogle}
                    >
                        Sign in with Google
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Login;
