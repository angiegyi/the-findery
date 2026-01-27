import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
	return (
		<footer className="mt-auto bg-[#6F0000] border-t border-[#C27F7F]">
			<div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
				<div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
					<p className="text-sm text-[#D4B5B5]">
						© {new Date().getFullYear()} The Findery. All rights reserved.
					</p>
					<div className="flex gap-8">
						<Link
							to="/privacy"
							className="text-sm text-[#D4B5B5] transition-colors hover:text-white"
						>
							Privacy
						</Link>
						<Link
							to="/terms"
							className="text-sm text-[#D4B5B5] transition-colors hover:text-white"
						>
							Terms
						</Link>
						<button className="text-sm text-[#D4B5B5] transition-colors hover:text-white">
							Contact
						</button>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
