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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 relative overflow-hidden">
            <div className="absolute inset-0 bg-cover bg-center opacity-25" style={{ backgroundImage: 'url(/path-to-your-background-image.jpg)' }} />
            <div className="relative bg-white/30 backdrop-blur-md shadow-xl rounded-3xl p-8 max-w-lg w-full border border-white/20 m-4">
                <div className="text-center">
                    <Logo width="80px" className="mx-auto mb-4" />
                    <h2 className="text-3xl font-extrabold text-white">Welcome Back</h2>
                    <p className="mt-2 text-lg text-gray-200">
                        Don&apos;t have an account?&nbsp;
                        <Link to="/signup" className="font-medium text-gray-800 hover:underline">
                            Sign Up
                        </Link>
                    </p>
                </div>
                {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
                <form onSubmit={handleSubmit(login)} className="mt-6 space-y-4">
                    <div>
                        <Input
                            label="Email:"
                            type="email"
                            placeholder="Enter your email"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white/70"
                            {...register("email", { required: "Email is required" })}
                        />
                    </div>
                    <div>
                        <Input
                            label="Password:"
                            type="password"
                            placeholder="Enter your password"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white/70"
                            {...register("password", { required: "Password is required" })}
                        />
                    </div>
                    <Button
                        type="submit"
                        className={`w-full py-3 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition-all ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                        disabled={loading}
                    >
                        {loading ? "Signing in..." : "Sign in"}
                    </Button>
                </form>
                <div className="mt-4">
                    <div className="flex items-center justify-center space-x-2">
                        <div className="h-px bg-white/50 w-1/4" />
                        <span className="text-white mx-2">OR</span>
                        <div className="h-px bg-white/50 w-1/4" />
                    </div>
                    <Button
                        type="button"
                        className="mt-4 flex items-center justify-center w-full py-3 bg-gray-800 text-white font-bold rounded-lg hover:bg-gray-900 transition-all"
                        onClick={loginWithGitHub}
                    >
                        <i className="fab fa-github mr-2"></i> Sign in with GitHub
                    </Button>
                    <Button
                        type="button"
                        className="mt-4 flex items-center justify-center w-full py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-all"
                        onClick={loginWithGoogle}
                    >
                        <i className="fab fa-google mr-2"></i> Sign in with Google
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Login;
