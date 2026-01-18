import React, { useState } from "react";

import logo from "../../assets/images/FinderyLogo.png";
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

			// Add to Beehiv
			const beehivApiKey = process.env.REACT_APP_BEEHIV_API_KEY;
			const beehivPublicationId = process.env.REACT_APP_BEEHIV_PUBLICATION_ID;

			if (beehivApiKey && beehivPublicationId) {
				try {
					const beehivResponse = await fetch(
						`https://api.beehiiv.com/v2/publications/${beehivPublicationId}/subscriptions`,
						{
							method: "POST",
							headers: {
								"Content-Type": "application/json",
								Authorization: `Bearer ${beehivApiKey}`,
							},
							body: JSON.stringify({
								email: email.toLowerCase().trim(),
								reactivate_existing: true,
								send_welcome_email: true,
								utm_source: "waitlist",
								utm_medium: "website",
							}),
						}
					);

					if (beehivResponse.ok) {
						const beehivData = await beehivResponse.json();
						// Update Supabase with Beehiv subscriber ID
						await supabase
							.from("waitlist")
							.update({
								synced_to_beehiv: true,
								beehiv_subscriber_id: beehivData.data?.id,
							})
							.eq("email", email.toLowerCase().trim());
					}
				} catch (beehivError) {
					console.error("Beehiv sync failed:", beehivError);
					// Continue even if Beehiv fails - email is saved in Supabase
				}
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
			<div className="w-full max-w-md text-center">
				<img
					src={logo}
					alt="The Findery"
					className="w-full max-w-sm mx-auto mb-1"
				/>

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
								className="px-6 py-3 font-bold text-white transition-colors rounded-lg bg-primary hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
