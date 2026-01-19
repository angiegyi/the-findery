import React from "react";
import { Footer } from "../../components";
import { useNavigate } from "react-router-dom";

const Terms: React.FC = () => {
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
					<h1 className="text-primary">Terms of Service</h1>
					<p className="text-gray-600">
						<strong>Last Updated:</strong> January 19, 2026
					</p>

					<h2 className="text-primary">Agreement to Terms</h2>
					<p>
						By accessing or using The Findery ("Service," "we," "our," or "us"),
						you agree to be bound by these Terms of Service ("Terms"). If you do
						not agree to these Terms, please do not use our Service.
					</p>

					<h2 className="text-primary">Description of Service</h2>
					<p>
						The Findery is a platform that helps users discover Australian
						emerging fashion brands through:
					</p>
					<ul>
						<li>AI-powered search and recommendations</li>
						<li>Pinterest board analysis</li>
						<li>Curated brand discovery</li>
						<li>Personal saved lists and collections</li>
					</ul>

					<h2 className="text-primary">Eligibility</h2>
					<p>
						You must be at least 13 years old to use this Service. By using The
						Findery, you represent and warrant that you meet this age
						requirement.
					</p>

					<h2 className="text-primary">User Accounts</h2>

					<h3 className="text-primary">Account Creation</h3>
					<ul>
						<li>
							You may create an account using email/password or Google OAuth
						</li>
						<li>You must provide accurate and complete information</li>
						<li>
							You are responsible for maintaining the security of your account
							credentials
						</li>
						<li>You must not share your account with others</li>
						<li>
							You must notify us immediately of any unauthorized access
						</li>
					</ul>

					<h3 className="text-primary">Account Termination</h3>
					<ul>
						<li>
							You may delete your account at any time through your profile
							settings
						</li>
						<li>
							We reserve the right to suspend or terminate accounts that violate
							these Terms
						</li>
						<li>
							Upon termination, your right to use the Service will immediately
							cease
						</li>
					</ul>

					<h2 className="text-primary">Acceptable Use</h2>

					<h3 className="text-primary">You Agree To:</h3>
					<ul>
						<li>Use the Service only for lawful purposes</li>
						<li>
							Respect intellectual property rights of brands and other users
						</li>
						<li>Provide accurate information when using our features</li>
						<li>
							Use Pinterest board URLs that you have permission to analyze
						</li>
						<li>Comply with all applicable laws and regulations</li>
					</ul>

					<h3 className="text-primary">You Agree NOT To:</h3>
					<ul>
						<li>Violate any laws or regulations</li>
						<li>Impersonate others or provide false information</li>
						<li>Attempt to gain unauthorized access to our systems</li>
						<li>Use the Service to spam, harass, or abuse others</li>
						<li>Scrape, copy, or duplicate our content or database</li>
						<li>Use automated systems (bots, scrapers) without permission</li>
						<li>Interfere with or disrupt the Service</li>
						<li>Reverse engineer or attempt to extract source code</li>
						<li>Use the Service for commercial purposes without authorization</li>
						<li>
							Submit private or sensitive Pinterest boards without authorization
						</li>
					</ul>

					<h2 className="text-primary">Intellectual Property</h2>

					<h3 className="text-primary">Our Content</h3>
					<ul>
						<li>
							The Findery name, logo, design, and original content are owned by
							us
						</li>
						<li>You may not use our branding without written permission</li>
						<li>All rights not expressly granted are reserved</li>
					</ul>

					<h3 className="text-primary">User Content</h3>
					<ul>
						<li>
							You retain ownership of content you submit (search queries, lists,
							etc.)
						</li>
						<li>
							By using the Service, you grant us a license to use your content to
							provide and improve the Service
						</li>
						<li>
							You represent that you have the right to submit any content you
							provide
						</li>
					</ul>

					<h3 className="text-primary">Third-Party Content</h3>
					<ul>
						<li>
							Brand names, logos, and product information belong to their
							respective owners
						</li>
						<li>
							Pinterest content remains the property of Pinterest and its users
						</li>
						<li>
							We do not claim ownership of third-party content displayed on our
							platform
						</li>
					</ul>

					<h2 className="text-primary">Pinterest Integration</h2>

					<h3 className="text-primary">Pinterest Board Analysis</h3>
					<ul>
						<li>
							You must only submit Pinterest board URLs that are public or that
							you have permission to analyze
						</li>
						<li>
							We access Pinterest data through their official API in accordance
							with Pinterest's Terms of Service
						</li>
						<li>
							We are not responsible for changes to Pinterest's API or policies
						</li>
						<li>
							Pinterest board analysis is provided "as is" and may not always be
							available
						</li>
					</ul>

					<h3 className="text-primary">Pinterest Terms</h3>
					<p>
						By using our Pinterest integration features, you also agree to comply
						with{" "}
						<a
							href="https://policy.pinterest.com/terms-of-service"
							target="_blank"
							rel="noopener noreferrer"
							className="text-primary hover:text-accent-orange"
						>
							Pinterest's Terms of Service
						</a>
						.
					</p>

					<h2 className="text-primary">AI-Powered Features</h2>

					<h3 className="text-primary">AI Recommendations</h3>
					<ul>
						<li>
							Our Service uses AI (OpenAI and/or Anthropic) to analyze searches
							and provide recommendations
						</li>
						<li>
							AI-generated recommendations are suggestions only and may not
							always be accurate
						</li>
						<li>
							We do not guarantee the quality, accuracy, or suitability of AI
							recommendations
						</li>
						<li>
							Brand suggestions are based on available data and may not include
							all relevant brands
						</li>
					</ul>

					<h3 className="text-primary">Data Processing</h3>
					<ul>
						<li>
							Search queries and Pinterest data may be processed by third-party
							AI services
						</li>
						<li>
							AI providers process data according to their own terms and privacy
							policies
						</li>
						<li>
							By using AI features, you acknowledge this third-party processing
						</li>
					</ul>

					<h2 className="text-primary">Third-Party Links and Services</h2>
					<ul>
						<li>Our Service may contain links to external brand websites</li>
						<li>
							We are not responsible for the content or practices of third-party
							sites
						</li>
						<li>
							Your use of third-party services is governed by their terms and
							policies
						</li>
						<li>We do not endorse or guarantee any third-party brands or products</li>
					</ul>

					<h2 className="text-primary">Disclaimers</h2>

					<h3 className="text-primary">Service "As Is"</h3>
					<p>
						THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES
						OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:
					</p>
					<ul>
						<li>
							Warranties of merchantability or fitness for a particular purpose
						</li>
						<li>Accuracy, reliability, or completeness of content</li>
						<li>Uninterrupted or error-free service</li>
						<li>Security of the platform</li>
					</ul>

					<h3 className="text-primary">Brand Information</h3>
					<ul>
						<li>Brand information is provided for discovery purposes only</li>
						<li>
							We do not verify all brand claims (sustainability, ethics, etc.)
						</li>
						<li>
							We are not responsible for brand practices, product quality, or
							customer service
						</li>
						<li>Price and availability information may not be current</li>
					</ul>

					<h3 className="text-primary">No Professional Advice</h3>
					<ul>
						<li>
							The Service does not provide professional fashion, financial, or
							legal advice
						</li>
						<li>Recommendations are for informational purposes only</li>
						<li>
							You should conduct your own research before making purchases
						</li>
					</ul>

					<h2 className="text-primary">Limitation of Liability</h2>
					<p>TO THE MAXIMUM EXTENT PERMITTED BY LAW:</p>
					<ul>
						<li>
							We are not liable for any indirect, incidental, special, or
							consequential damages
						</li>
						<li>
							We are not liable for lost profits, data, or business opportunities
						</li>
						<li>
							Our total liability shall not exceed the amount you paid to use the
							Service (if any)
						</li>
						<li>
							Some jurisdictions do not allow these limitations, so they may not
							apply to you
						</li>
					</ul>

					<h3 className="text-primary">Specific Limitations</h3>
					<p>We are not liable for:</p>
					<ul>
						<li>Purchases made from third-party brands</li>
						<li>Issues with products or services from featured brands</li>
						<li>Accuracy of AI-generated recommendations</li>
						<li>Loss of saved lists or account data</li>
						<li>Service interruptions or technical issues</li>
						<li>
							Third-party service failures (Pinterest API, AI services, etc.)
						</li>
					</ul>

					<h2 className="text-primary">Indemnification</h2>
					<p>
						You agree to indemnify and hold harmless The Findery, its officers,
						directors, employees, and agents from any claims, damages, losses,
						liabilities, and expenses (including legal fees) arising from:
					</p>
					<ul>
						<li>Your use of the Service</li>
						<li>Your violation of these Terms</li>
						<li>Your violation of any rights of another party</li>
						<li>Content you submit or share</li>
					</ul>

					<h2 className="text-primary">Modifications to Service</h2>
					<ul>
						<li>
							We reserve the right to modify, suspend, or discontinue the Service
							at any time
						</li>
						<li>We may add or remove features without notice</li>
						<li>
							We are not liable for any modifications or discontinuation of the
							Service
						</li>
					</ul>

					<h2 className="text-primary">Changes to Terms</h2>
					<ul>
						<li>We may update these Terms from time to time</li>
						<li>
							Changes will be posted on this page with an updated "Last Updated"
							date
						</li>
						<li>
							Material changes will be communicated via email (if you have an
							account)
						</li>
						<li>
							Continued use of the Service after changes constitutes acceptance
						</li>
					</ul>

					<h2 className="text-primary">Privacy</h2>
					<p>
						Your use of the Service is also governed by our{" "}
						<a
							href="/privacy"
							className="text-primary hover:text-accent-orange"
						>
							Privacy Policy
						</a>
						. Please review it to understand how we collect and use your
						information.
					</p>

					<h2 className="text-primary">Australian Consumer Law</h2>
					<p>
						For Australian users, nothing in these Terms excludes, restricts, or
						modifies any consumer guarantee, right, or remedy conferred by the
						Australian Consumer Law or any other applicable law that cannot be
						excluded, restricted, or modified by agreement.
					</p>

					<h2 className="text-primary">Governing Law</h2>
					<p>
						These Terms are governed by the laws of Australia. Any disputes shall
						be subject to the exclusive jurisdiction of the courts of Australia.
					</p>

					<h2 className="text-primary">Dispute Resolution</h2>

					<h3 className="text-primary">Informal Resolution</h3>
					<p>
						Before filing a claim, please contact us at hello@thefindery.shop to
						attempt to resolve the dispute informally.
					</p>

					<h3 className="text-primary">Arbitration</h3>
					<p>
						If informal resolution fails, disputes may be resolved through
						binding arbitration in accordance with Australian arbitration rules,
						except where prohibited by law.
					</p>

					<h2 className="text-primary">Severability</h2>
					<p>
						If any provision of these Terms is found to be unenforceable, the
						remaining provisions will continue in full force and effect.
					</p>

					<h2 className="text-primary">Entire Agreement</h2>
					<p>
						These Terms, together with our Privacy Policy, constitute the entire
						agreement between you and The Findery regarding the Service.
					</p>

					<h2 className="text-primary">Contact Information</h2>
					<p>For questions about these Terms, please contact us at:</p>
					<p>
						<strong>Email:</strong> hello@thefindery.shop
					</p>

					<h2 className="text-primary">Acknowledgment</h2>
					<p>
						By using The Findery, you acknowledge that you have read, understood,
						and agree to be bound by these Terms of Service.
					</p>
				</article>
			</main>

			<Footer />
		</div>
	);
};

export default Terms;
