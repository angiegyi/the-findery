import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

interface HeaderProps {
	activePage: "search" | "discover" | "boards" | "following" | "profile";
}

const Header: React.FC<HeaderProps> = ({ activePage }) => {
	const navigate = useNavigate();
	const { signOut } = useAuth();

	const handleSignOut = async () => {
		await signOut();
		navigate("/login");
	};

	const getNavButtonClass = (page: string) => {
		return page === activePage
			? "font-medium border-b-2 text-primary border-primary"
			: "text-gray-500 hover:text-primary";
	};

	return (
		<header className="sticky top-0 z-10 bg-white border-b shadow-sm">
			<div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16">
					<div className="flex items-center">
						<h1
							className="text-2xl font-semibold uppercase cursor-pointer text-primary"
							onClick={() => navigate("/discover")}
						>
							THE FINDERY
						</h1>
						<nav className="ml-10 space-x-4">
							<button
								type="button"
								onClick={() => navigate("/search")}
								className={getNavButtonClass("search")}
							>
								Search
							</button>
							<button type="button" className={getNavButtonClass("boards")}>Boards</button>
							<button
								type="button"
								onClick={() => navigate("/profile")}
								className={getNavButtonClass("profile")}
							>
								Profile
							</button>
						</nav>
					</div>
					<button
						type="button"
						onClick={handleSignOut}
						className="text-sm font-medium text-primary hover:text-accent-orange"
					>
						Sign Out
					</button>
				</div>
			</div>
		</header>
	);
};

export default Header;
