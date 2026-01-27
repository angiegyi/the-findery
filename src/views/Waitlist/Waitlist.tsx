import React, { useState } from "react";

import { Footer } from "../../components";
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
		<div className="flex flex-col min-h-screen bg-primary">
			{/* Header */}
			<header className="border-b border-mauve">
				<div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
					<div className="flex items-center justify-between">
						<h1 className="text-2xl font-bold tracking-wider text-white uppercase md:text-3xl">
							THE FINDERY
						</h1>
						<p className="text-sm text-rose">Est. 2026</p>
					</div>
				</div>
			</header>

			{/* Main Content */}
			<div className="flex items-center justify-center flex-1 px-4">
				<div className="w-full max-w-2xl text-center">
					<p className="mb-4 text-sm tracking-widest uppercase text-rose">
						Coming Soon
					</p>

					<h2 className="mb-8 text-5xl font-bold tracking-wider text-white uppercase md:text-6xl lg:text-7xl">
						THE FINDERY
					</h2>

					<p className="mb-12 text-lg text-[#EBCECE] md:text-xl">
						{`Discover Australia's best emerging fashion brands. Join our waitlist to be the first to know when we launch.`}
					</p>

					{/* Email Form */}
					{status === "success" ? (
						<div className="p-6 border border-green-400 rounded-lg bg-green-900/30">
							<svg
								className="w-12 h-12 mx-auto mb-3 text-green-400"
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
							<h3 className="mb-2 text-lg font-semibold text-white">
								{`You're on the list!`}
							</h3>
							<p className="text-rose">{`We'll notify you when we launch.`}</p>
						</div>
					) : (
						<form onSubmit={handleSubmit} className="mb-16 space-y-4">
							<div className="flex flex-col max-w-xl gap-0 mx-auto sm:flex-row">
								<input
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									placeholder="Enter your email address"
									className="flex-1 px-6 py-4 text-center text-white bg-transparent border outline-none placeholder-rose border-rose focus:border-white sm:text-left"
									disabled={status === "loading"}
									required
								/>
								<button
									type="submit"
									disabled={status === "loading"}
									className="px-8 py-4 font-semibold transition-colors text-primary bg-beige hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
								>
									{status === "loading" ? "Joining..." : "Join Waitlist"}
								</button>
							</div>

							{status === "error" && (
								<p className="text-sm text-red-400">{errorMessage}</p>
							)}
						</form>
					)}
				</div>
			</div>

			<Footer />
		</div>
	);
};

export default Waitlist;
