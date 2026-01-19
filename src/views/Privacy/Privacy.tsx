import React from "react";
import { Footer } from "../../components";
import { useNavigate } from "react-router-dom";

const Privacy: React.FC = () => {
	const navigate = useNavigate();

	return (
		<div className="flex flex-col min-h-screen bg-accent-cream">
			<header className="sticky top-0 z-10 bg-white border-b shadow-sm">
				<div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
					<div className="flex items-center justify-between h-16">
						<h1
							className="text-2xl font-semibold uppercase cursor-pointer text-primary"
							onClick={() => navigate("/")}
						>
							THE FINDERY
						</h1>
					</div>
				</div>
			</header>

			<main className="flex-1 px-4 py-8 mx-auto max-w-4xl sm:px-6 lg:px-8">
				<article className="p-8 bg-white rounded-lg shadow-sm prose prose-sm max-w-none">
					<h1 className="text-primary">Privacy Policy</h1>
					<p className="text-gray-600">
						<strong>Last Updated:</strong> January 19, 2026
					</p>

					<h2 className="text-primary">Introduction</h2>
					<p>
						The Findery ("we," "our," or "us") is committed to protecting your
						privacy. This Privacy Policy explains how we collect, use, disclose,
						and safeguard your information when you use our platform to discover
						Australian fashion brands.
					</p>

					<h2 className="text-primary">Information We Collect</h2>

					<h3 className="text-primary">Information You Provide</h3>
					<p>
						<strong>Account Information:</strong>
					</p>
					<ul>
						<li>Email address</li>
						<li>Password (encrypted)</li>
						<li>Profile information you choose to add</li>
					</ul>

					<p>
						<strong>Pinterest Board URLs:</strong> When you use our Pinterest
						board analysis feature, you provide URLs to public Pinterest boards
						to receive brand recommendations
					</p>

					<p>
						<strong>Search Queries:</strong>
					</p>
					<ul>
						<li>Text descriptions of what you're looking for</li>
						<li>Search filters and preferences</li>
					</ul>

					<p>
						<strong>Saved Items and Lists:</strong> Products and brands you save
						for later reference
					</p>

					<h3 className="text-primary">Information Collected Automatically</h3>
					<p>
						<strong>Usage Data:</strong>
					</p>
					<ul>
						<li>Pages visited and features used</li>
						<li>Time spent on the platform</li>
						<li>Click and interaction patterns</li>
					</ul>

					<p>
						<strong>Technical Data:</strong>
					</p>
					<ul>
						<li>Browser type and version</li>
						<li>Device type</li>
						<li>IP address</li>
						<li>Session information</li>
					</ul>

					<h3 className="text-primary">Information from Third Parties</h3>
					<p>
						<strong>Google OAuth:</strong> If you sign in with Google, we
						receive basic profile information including your email address and
						name as permitted by your Google account settings
					</p>

					<p>
						<strong>Pinterest API:</strong> When analyzing Pinterest boards, we
						access publicly available board data including pins, images, and
						descriptions through Pinterest's API
					</p>

					<h2 className="text-primary">How We Use Your Information</h2>
					<p>We use your information to:</p>
					<ul>
						<li>
							<strong>Provide and improve our service:</strong> Deliver brand
							recommendations, search results, and personalized discovery
							features
						</li>
						<li>
							<strong>Authenticate your account:</strong> Manage sign-in and
							maintain secure sessions
						</li>
						<li>
							<strong>AI-powered analysis:</strong> Analyze Pinterest boards and
							search queries using AI services to provide relevant brand
							suggestions
						</li>
						<li>
							<strong>Communication:</strong> Send service-related notifications
							and updates (we do not send marketing emails without your consent)
						</li>
						<li>
							<strong>Platform improvement:</strong> Analyze usage patterns to
							improve features and user experience
						</li>
						<li>
							<strong>Security:</strong> Detect and prevent fraud, abuse, and
							security issues
						</li>
					</ul>

					<h2 className="text-primary">How We Share Your Information</h2>
					<p>
						We do not sell your personal information. We may share your
						information in the following circumstances:
					</p>

					<p>
						<strong>Service Providers:</strong>
					</p>
					<ul>
						<li>
							<strong>Supabase:</strong> Database and authentication services
						</li>
						<li>
							<strong>AI Services (OpenAI or Anthropic):</strong> Process search
							queries and Pinterest board analysis
						</li>
						<li>
							<strong>Pinterest API:</strong> Access public board data you
							provide
						</li>
						<li>
							<strong>Hosting Services:</strong> Platform hosting and deployment
						</li>
					</ul>

					<p>
						<strong>Legal Requirements:</strong>
					</p>
					<ul>
						<li>When required by law or to respond to legal processes</li>
						<li>To protect our rights, safety, or property</li>
						<li>
							In connection with fraud prevention or security investigations
						</li>
					</ul>

					<p>
						<strong>Business Transfers:</strong> In the event of a merger,
						acquisition, or sale of assets, your information may be transferred
						to the acquiring entity
					</p>

					<h2 className="text-primary">Data Storage and Security</h2>
					<p>
						<strong>Where We Store Data:</strong>
					</p>
					<ul>
						<li>User data is stored securely using Supabase (PostgreSQL database)</li>
						<li>
							Data is hosted on servers located in accordance with Supabase's
							infrastructure
						</li>
					</ul>

					<p>
						<strong>Security Measures:</strong>
					</p>
					<ul>
						<li>Passwords are encrypted and never stored in plain text</li>
						<li>Secure HTTPS connections for all data transmission</li>
						<li>Authentication tokens are securely managed</li>
						<li>Regular security updates and monitoring</li>
					</ul>

					<p>
						<strong>Data Retention:</strong>
					</p>
					<ul>
						<li>
							We retain your account information for as long as your account is
							active
						</li>
						<li>You may request account deletion at any time</li>
						<li>
							Some information may be retained as required by law or for
							legitimate business purposes
						</li>
					</ul>

					<h2 className="text-primary">Your Privacy Rights</h2>
					<p>Depending on your location, you may have the following rights:</p>
					<ul>
						<li>
							<strong>Access and Portability:</strong> Request a copy of the
							personal information we hold about you
						</li>
						<li>
							<strong>Correction:</strong> Update or correct inaccurate
							information in your profile
						</li>
						<li>
							<strong>Deletion:</strong> Request deletion of your account and
							associated data
						</li>
						<li>
							<strong>Objection:</strong> Object to certain processing of your
							information
						</li>
						<li>
							<strong>Withdraw Consent:</strong> Withdraw consent for data
							processing where consent is the legal basis
						</li>
					</ul>

					<h2 className="text-primary">Cookies and Tracking</h2>
					<p>We use essential cookies and local storage to:</p>
					<ul>
						<li>Maintain your login session</li>
						<li>Remember your preferences</li>
						<li>Ensure platform functionality</li>
					</ul>
					<p>
						We do not use third-party advertising cookies or tracking for
						marketing purposes.
					</p>

					<h2 className="text-primary">Third-Party Links</h2>
					<p>
						Our platform may contain links to external brand websites and
						Pinterest. We are not responsible for the privacy practices of these
						third parties. We encourage you to read their privacy policies.
					</p>

					<h2 className="text-primary">Children's Privacy</h2>
					<p>
						Our service is not intended for users under 13 years of age. We do
						not knowingly collect information from children under 13. If we
						become aware of such collection, we will delete the information
						immediately.
					</p>

					<h2 className="text-primary">International Users</h2>
					<p>
						If you are accessing our service from outside Australia, please be
						aware that your information may be transferred to and processed in
						Australia or other countries where our service providers operate.
					</p>

					<h2 className="text-primary">Changes to This Privacy Policy</h2>
					<p>We may update this Privacy Policy from time to time. We will notify you of material changes by:</p>
					<ul>
						<li>Posting the new Privacy Policy on this page</li>
						<li>Updating the "Last Updated" date</li>
						<li>
							Sending an email notification for significant changes (if you have
							an account)
						</li>
					</ul>

					<h2 className="text-primary">Australian Privacy Principles</h2>
					<p>
						For Australian users, we comply with the Australian Privacy
						Principles under the Privacy Act 1988 (Cth). This includes your
						rights to access and correct your personal information.
					</p>

					<h2 className="text-primary">AI Data Processing Disclosure</h2>
					<p>
						<strong>Pinterest Board Analysis:</strong>
					</p>
					<ul>
						<li>
							When you submit a Pinterest board URL, we send publicly available
							pin data (images and descriptions) to our AI service provider
							(OpenAI or Anthropic) for analysis
						</li>
						<li>
							This data is processed to generate fashion brand recommendations
						</li>
						<li>
							AI providers process this data according to their own privacy
							policies
						</li>
						<li>
							We recommend not submitting private or sensitive boards
						</li>
					</ul>

					<p>
						<strong>Search Queries:</strong>
					</p>
					<ul>
						<li>Search text is processed by AI to match you with relevant brands</li>
						<li>
							Search data may be anonymized and used to improve recommendation
							accuracy
						</li>
					</ul>

					<h2 className="text-primary">Contact Us</h2>
					<p>
						If you have questions about this Privacy Policy or our privacy
						practices, please contact us.
					</p>

					<h2 className="text-primary">Your Consent</h2>
					<p>
						By using The Findery, you consent to this Privacy Policy and our
						collection and use of information as described herein.
					</p>
				</article>
			</main>

			<Footer />
		</div>
	);
};

export default Privacy;
