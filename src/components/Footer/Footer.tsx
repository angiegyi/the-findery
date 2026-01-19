import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
	return (
		<footer className="mt-auto border-t bg-white">
			<div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
				<div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
					<p className="text-sm text-gray-600">
						© {new Date().getFullYear()} The Findery. All rights reserved.
					</p>
					<div className="flex gap-6">
						<Link
							to="/privacy"
							className="text-sm text-gray-600 hover:text-primary transition-colors"
						>
							Privacy Policy
						</Link>
						<Link
							to="/terms"
							className="text-sm text-gray-600 hover:text-primary transition-colors"
						>
							Terms of Service
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
