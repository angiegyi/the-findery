import React, { useState } from "react";

import { supabase } from "../../lib/supabase";

const Waitlist: React.FC = () => {
	const [email, setEmail] = useState("");
	const [status, setStatus] = useState<
		"idle" | "loading" | "success" | "error"
	>("idle");
	const [errorMessage, setErrorMessage] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setStatus("loading");
		setErrorMessage("");

		// Validate email
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			setStatus("error");
			setErrorMessage("Please enter a valid email address");
			return;
		}

		try {
			// Add to Supabase
			const { error: supabaseError } = await supabase
				.from("waitlist")
				.insert([{ email: email.toLowerCase().trim() }]);

			if (supabaseError) {
				if (supabaseError.code === "23505") {
					setStatus("error");
					setErrorMessage("This email is already on the waitlist");
					return;
				}
				throw supabaseError;
			}

			// Add to Beehiv via serverless function
			try {
				const beehivResponse = await fetch("/api/subscribe", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						email: email.toLowerCase().trim(),
					}),
				});

				if (beehivResponse.ok) {
					const beehivData = await beehivResponse.json();
					// Update Supabase with Beehiv subscriber ID
					await supabase
						.from("waitlist")
						.update({
							synced_to_beehiv: true,
							beehiv_subscriber_id: beehivData.subscriberId,
						})
						.eq("email", email.toLowerCase().trim());
				} else {
					console.error("Beehiv sync failed:", await beehivResponse.json());
				}
			} catch (beehivError) {
				console.error("Beehiv sync failed:", beehivError);
				// Continue even if Beehiv fails - email is saved in Supabase
			}

			setStatus("success");
			setEmail("");
		} catch (error) {
			console.error("Error adding to waitlist:", error);
			setStatus("error");
			setErrorMessage("Something went wrong. Please try again.");
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen px-4 polkadot-background bg-accent-cream">
			<div className="w-full max-w-2xl text-center">
				<h1 className="mb-6 text-5xl font-bold uppercase text-primary md:text-6xl lg:text-7xl">
					THE FINDERY
				</h1>

				<p className="mb-8 text-xl font-bold text-amber-700 md:text-2xl">
					Coming Soon
				</p>

				{/* Description */}
				<p className="mb-8 font-medium text-primary">
					Discover Australia's best emerging fashion brands. Join our waitlist
					to be the first to know when we launch.
				</p>

				{/* Email Form */}
				{status === "success" ? (
					<div className="p-6 border border-green-200 rounded-lg bg-green-50">
						<svg
							className="w-12 h-12 mx-auto mb-3 text-green-500"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
						<h3 className="mb-2 text-lg font-semibold text-green-900">
							You're on the list!
						</h3>
						<p className="text-green-700">We'll notify you when we launch.</p>
					</div>
				) : (
					<form onSubmit={handleSubmit} className="space-y-4">
						<div className="flex flex-col gap-3 sm:flex-row">
							<input
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder="Enter your email"
								className="flex-1 px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
								disabled={status === "loading"}
								required
							/>
							<button
								type="submit"
								disabled={status === "loading"}
								className="px-6 py-3 font-bold text-white transition-colors rounded-lg bg-primary hover:bg-accent-orange focus:ring-2 focus:bg-accent-orange focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
							>
								{status === "loading" ? "Joining..." : "Join Waitlist"}
							</button>
						</div>

						{status === "error" && (
							<p className="text-sm text-left text-red-600">{errorMessage}</p>
						)}
					</form>
				)}
			</div>
		</div>
	);
};

export default Waitlist;
