import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Footer } from "../../components";
import { supabase } from "../../lib/supabase";

interface LoginFormData {
	email: string;
	password: string;
}

const UserLogin: React.FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormData>();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate();

	const onSignIn = async (data: LoginFormData) => {
		setLoading(true);
		setError(null);

		try {
			const { data: authData, error } = await supabase.auth.signInWithPassword({
				email: data.email,
				password: data.password,
			});

			if (error) throw error;

			// Only navigate if we have a valid session
			if (authData?.session) {
				navigate("/profile");
			}
		} catch (err: any) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	const onSignUp = async (data: LoginFormData) => {
		setLoading(true);
		setError(null);

		try {
			const { data: authData, error } = await supabase.auth.signUp({
				email: data.email,
				password: data.password,
				options: {
					emailRedirectTo: `${window.location.origin}/profile`,
				},
			});

			if (error) throw error;

			// Check if email confirmation is required
			if (authData?.user && !authData.session) {
				setError("Please check your email to confirm your account before signing in.");
				setLoading(false);
				return;
			}

			// If session exists, user is signed in (confirmation disabled)
			if (authData?.session) {
				navigate("/profile");
			}
		} catch (err: any) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	const handleGoogleSignIn = async () => {
		setLoading(true);
		setError(null);

		try {
			const { error } = await supabase.auth.signInWithOAuth({
				provider: "google",
				options: {
					redirectTo: `${window.location.origin}/profile`,
				},
			});

			if (error) throw error;
		} catch (err: any) {
			setError(err.message);
			setLoading(false);
		}
	};

	return (
		<div className="flex flex-col min-h-screen px-4 bg-accent-cream sm:px-6 lg:px-8">
			<div className="flex items-center justify-center flex-1">
				<div className="w-full max-w-md p-8 space-y-8 bg-white shadow-xl rounded-2xl">
				<div className="text-center">
					<h1 className="text-4xl font-semibold uppercase text-primary">
						THE FINDERY
					</h1>
					<p className="mt-2 text-sm font-medium text-primary">
						Discover Australia's best emerging fashion brands
					</p>
				</div>

				{error && (
					<div className="px-4 py-3 text-sm text-red-800 border border-red-200 rounded-lg bg-red-50">
						{error}
					</div>
				)}

				<form className="mt-8 space-y-6" onSubmit={handleSubmit(onSignIn)}>
					<div className="space-y-4">
						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium text-gray-700"
							>
								Email
							</label>
							<input
								id="email"
								type="email"
								{...register("email", {
									required: "Email is required",
									pattern: {
										value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
										message: "Invalid email address",
									},
								})}
								className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
								placeholder="you@example.com"
							/>
							{errors.email && (
								<p className="mt-1 text-sm text-red-600">
									{errors.email.message}
								</p>
							)}
						</div>

						<div>
							<label
								htmlFor="password"
								className="block text-sm font-medium text-gray-700"
							>
								Password
							</label>
							<input
								id="password"
								type="password"
								{...register("password", {
									required: "Password is required",
									minLength: {
										value: 6,
										message: "Password must be at least 6 characters",
									},
								})}
								className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
								placeholder="••••••••"
							/>
							{errors.password && (
								<p className="mt-1 text-sm text-red-600">
									{errors.password.message}
								</p>
							)}
						</div>
					</div>

					<div className="flex flex-col space-y-3">
						<button
							type="submit"
							disabled={loading}
							className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white border border-transparent rounded-lg shadow-sm bg-primary hover:bg-accent-orange focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{loading ? "Signing in..." : "Sign In"}
						</button>

						<button
							type="button"
							onClick={handleSubmit(onSignUp)}
							disabled={loading}
							className="flex justify-center w-full px-4 py-2 text-sm font-medium bg-white border rounded-lg shadow-sm border-primary text-primary hover:bg-accent-cream focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
						>
							Create Account
						</button>
					</div>

					<div className="relative">
						<div className="absolute inset-0 flex items-center">
							<div className="w-full border-t border-gray-300" />
						</div>
						<div className="relative flex justify-center text-sm">
							<span className="px-2 text-gray-500 bg-white">
								Or continue with
							</span>
						</div>
					</div>

					<button
						type="button"
						onClick={handleGoogleSignIn}
						disabled={loading}
						className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-accent-cream focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
					>
						<svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
							<path
								fill="#4285F4"
								d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
							/>
							<path
								fill="#34A853"
								d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
							/>
							<path
								fill="#FBBC05"
								d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
							/>
							<path
								fill="#EA4335"
								d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
							/>
						</svg>
						Sign in with Google
					</button>
				</form>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default UserLogin;
