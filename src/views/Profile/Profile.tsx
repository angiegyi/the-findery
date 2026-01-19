import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Footer, Header } from "../../components";

interface SavedList {
	id: string;
	name: string;
	description: string;
	created_at: string;
	items_count: number;
}

const Profile: React.FC = () => {
	const { user } = useAuth();
	const [savedLists, setSavedLists] = useState<SavedList[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (user) {
			fetchSavedLists();
		}
	}, [user]);

	const fetchSavedLists = async () => {
		try {
			// TODO: Replace with actual saved lists query when the table is created
			// const { data, error } = await supabase
			//   .from('saved_lists')
			//   .select('*')
			//   .eq('user_id', user?.id);

			// For now, using mock data
			setSavedLists([]);
		} catch (error) {
			console.error("Error fetching saved lists:", error);
		} finally {
			setLoading(false);
		}
	};

	const getUserName = () => {
		if (user?.user_metadata?.full_name) {
			return user.user_metadata.full_name;
		}
		if (user?.email) {
			return user.email.split("@")[0];
		}
		return "User";
	};

	if (loading) {
		return (
			<div className="flex items-center justify-center min-h-screen bg-accent-cream">
				<div className="w-12 h-12 border-b-2 rounded-full animate-spin border-primary"></div>
			</div>
		);
	}

	return (
		<div className="flex flex-col min-h-screen bg-accent-cream">
			<Header activePage="profile" />

			{/* Main Content */}
			<main className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
				{/* Profile Header */}
				<div className="p-8 mb-8 bg-white rounded-lg shadow-sm">
					<div className="flex items-start space-x-8">
						<div className="flex items-center justify-center flex-shrink-0 w-24 h-24 rounded-full bg-primary">
							<span className="text-4xl font-bold text-white">
								{getUserName().charAt(0).toUpperCase()}
							</span>
						</div>
						<div className="flex-1">
							<h2 className="mb-4 text-3xl font-semibold text-primary">
								{getUserName()}
							</h2>
							<div className="flex gap-8 mb-4">
								<div className="text-center">
									<div className="text-2xl font-bold text-primary">0</div>
									<div className="text-sm text-gray-600">Saved Items</div>
								</div>
								<div className="text-center">
									<div className="text-2xl font-bold text-primary">0</div>
									<div className="text-sm text-gray-600">Lists Created</div>
								</div>
								<div className="text-center">
									<div className="text-2xl font-bold text-primary">0</div>
									<div className="text-sm text-gray-600">Brands Following</div>
								</div>
							</div>
							<p className="text-gray-600">{user?.email}</p>
							<p className="mt-1 text-sm text-gray-500">
								Member since{" "}
								{new Date(user?.created_at || "").toLocaleDateString("en-AU", {
									month: "long",
									year: "numeric",
								})}
							</p>
						</div>
					</div>
				</div>

				{/* Saved Lists */}
				<div className="p-8 bg-white rounded-lg shadow-sm">
					<div className="flex items-center justify-between mb-6">
						<h3 className="text-2xl font-semibold text-primary">
							Your Saved Lists
						</h3>
						<button className="px-4 py-2 text-sm font-medium text-white transition-colors rounded-lg bg-primary hover:bg-accent-orange">
							Create New List
						</button>
					</div>

					{savedLists.length === 0 ? (
						<div className="py-12 text-center">
							<span className="mb-4 text-6xl text-gray-400">📋</span>
							<h4 className="mb-2 text-xl font-medium text-gray-900">
								No saved lists yet
							</h4>
							<p className="mb-6 text-gray-600">
								Start creating lists to save your favorite finds
							</p>
							<button className="px-6 py-3 font-medium text-white transition-colors rounded-lg bg-primary hover:bg-accent-orange">
								Create Your First List
							</button>
						</div>
					) : (
						<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
							{savedLists.map((list) => (
								<div
									key={list.id}
									className="p-6 transition-shadow border border-gray-200 rounded-lg cursor-pointer hover:shadow-md"
								>
									<h4 className="mb-2 text-lg font-semibold text-primary">
										{list.name}
									</h4>
									<p className="mb-4 text-sm text-gray-600">
										{list.description}
									</p>
									<div className="flex items-center justify-between text-sm text-gray-500">
										<span>{list.items_count} items</span>
										<span>
											{new Date(list.created_at).toLocaleDateString("en-AU")}
										</span>
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			</main>
			<Footer />
		</div>
	);
};

export default Profile;
