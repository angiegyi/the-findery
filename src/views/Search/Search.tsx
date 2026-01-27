import React, { useState } from "react";
import { Footer, Header } from "../../components";
import {
	extractPinterestBoardInfo,
	isValidPinterestBoardUrl,
} from "../../utils/pinterest";

type SearchMode = "pinterest" | "ai";

interface SearchFilters {
	priceRange: { min: number; max: number };
	categories: string[];
	sustainability: boolean;
	newArrivals: boolean;
}

interface SearchResult {
	id: string;
	name: string;
	description: string;
	confidence: number;
	matchReason: string;
}

const Search: React.FC = () => {
	const [searchMode, setSearchMode] = useState<SearchMode>("pinterest");
	const [pinterestUrl, setPinterestUrl] = useState("");
	const [aiSearchQuery, setAiSearchQuery] = useState("");
	const [filters, setFilters] = useState<SearchFilters>({
		priceRange: { min: 0, max: 500 },
		categories: [],
		sustainability: false,
		newArrivals: false,
	});
	const [isSearching, setIsSearching] = useState(false);
	const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
	const [error, setError] = useState<string | null>(null);

	const handlePinterestSearch = async () => {
		setIsSearching(true);
		setError(null);
		setSearchResults([]);

		try {
			// 1. Validate and extract board info from URL
			if (!isValidPinterestBoardUrl(pinterestUrl)) {
				setError(
					"Invalid Pinterest URL. Please enter a valid Pinterest board URL (e.g., https://www.pinterest.com/username/board-name/)"
				);
				setIsSearching(false);
				return;
			}

			const boardInfo = extractPinterestBoardInfo(pinterestUrl);
			if (!boardInfo) {
				setError("Could not extract board information from URL");
				setIsSearching(false);
				return;
			}

			// 2. Call Vercel serverless function to analyze board
			const response = await fetch("/api/analyze-pinterest-board", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					username: boardInfo.username,
					boardSlug: boardInfo.boardSlug,
				}),
			});

			if (!response.ok) {
				throw new Error(`API error: ${response.statusText}`);
			}

			const data = await response.json();

			if (!data.success) {
				throw new Error(data.error || "Failed to analyze Pinterest board");
			}

			// 3. Display suggested brands
			setSearchResults(data.suggestedBrands || []);
		} catch (error: unknown) {
			console.error("Pinterest search error:", error);
			setError(
				(error as Error).message ||
					"An error occurred while analyzing the Pinterest board. Please try again."
			);
		} finally {
			setIsSearching(false);
		}
	};

	const handleAiSearch = async () => {
		setIsSearching(true);
		try {
			// TODO: Implement AI search
			// 1. Send query + filters to AI endpoint
			// 2. AI generates search results based on query
			// 3. Filter by Australian brands
			// Placeholder for now
			await new Promise((resolve) => setTimeout(resolve, 2000));
			setSearchResults([]);
		} catch (error: unknown) {
			console.error("AI search error:", error);
		} finally {
			setIsSearching(false);
		}
	};

	const toggleCategory = (category: string) => {
		setFilters((prev) => ({
			...prev,
			categories: prev.categories.includes(category)
				? prev.categories.filter((c) => c !== category)
				: [...prev.categories, category],
		}));
	};

	const availableCategories = [
		"Clothing",
		"Accessories",
		"Shoes",
		"Jewelry",
		"Bags",
		"Home & Living",
	];

	return (
		<div className="flex flex-col min-h-screen bg-accent-cream">
			<Header activePage="search" />

			<main className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
				<div className="mb-8">
					<h1 className="mb-2 text-4xl font-semibold text-primary">
						Smart Search
					</h1>
					<p className="font-medium text-primary">
						Discover Australian brands through Pinterest boards or AI-powered
						search
					</p>
				</div>

				{/* Search Mode Toggle */}
				<div className="flex p-1 mb-8 bg-white rounded-lg shadow-sm w-fit">
					<button type="button"
						onClick={() => setSearchMode("pinterest")}
						className={`px-6 py-2 text-sm font-medium rounded-md transition-colors ${
							searchMode === "pinterest"
								? "bg-primary text-white"
								: "text-gray-600 hover:text-primary"
						}`}
					>
						Pinterest Board
					</button>
					<button type="button"
						onClick={() => setSearchMode("ai")}
						className={`px-6 py-2 text-sm font-medium rounded-md transition-colors ${
							searchMode === "ai"
								? "bg-primary text-white"
								: "text-gray-600 hover:text-primary"
						}`}
					>
						AI Search
					</button>
				</div>

				<div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
					{/* Search Input Section */}
					<div className="lg:col-span-2">
						{/* Error Message */}
						{error && (
							<div className="p-4 mb-6 text-sm border border-red-200 rounded-lg bg-red-50 text-red-800">
								{error}
							</div>
						)}

						<div className="p-6 bg-white rounded-lg shadow-sm">
							{searchMode === "pinterest" ? (
								<div>
									<h2 className="mb-4 text-2xl font-semibold text-primary">
										Search by Pinterest Board
									</h2>
									<p className="mb-6 text-sm text-gray-600">
										Paste a Pinterest board URL and we'll suggest Australian
										brands with similar styles
									</p>
									<div className="space-y-4">
										<div>
											<label className="block mb-2 text-sm font-medium text-gray-700">
												Pinterest Board URL
											</label>
											<input
												type="url"
												value={pinterestUrl}
												onChange={(e) => setPinterestUrl(e.target.value)}
												placeholder="https://www.pinterest.com.au/username/board-name/"
												className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
											/>
										</div>
										<button type="button"
											onClick={handlePinterestSearch}
											disabled={!pinterestUrl || isSearching}
											className="w-full px-6 py-3 font-medium text-white transition-colors rounded-lg bg-primary hover:bg-accent-orange disabled:opacity-50 disabled:cursor-not-allowed"
										>
											{isSearching ? "Analyzing Board..." : "Find Similar Brands"}
										</button>
									</div>
								</div>
							) : (
								<div>
									<h2 className="mb-4 text-2xl font-semibold text-primary">
										AI-Powered Search
									</h2>
									<p className="mb-6 text-sm text-gray-600">
										Describe what you're looking for and let AI find the perfect
										Australian brands
									</p>
									<div className="space-y-4">
										<div>
											<label className="block mb-2 text-sm font-medium text-gray-700">
												What are you looking for?
											</label>
											<textarea
												value={aiSearchQuery}
												onChange={(e) => setAiSearchQuery(e.target.value)}
												placeholder="E.g., 'Sustainable linen dresses for summer' or 'Minimalist jewelry with organic shapes'"
												rows={4}
												className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
											/>
										</div>
										<button type="button"
											onClick={handleAiSearch}
											disabled={!aiSearchQuery || isSearching}
											className="w-full px-6 py-3 font-medium text-white transition-colors rounded-lg bg-primary hover:bg-accent-orange disabled:opacity-50 disabled:cursor-not-allowed"
										>
											{isSearching ? "Searching..." : "Search with AI"}
										</button>
									</div>
								</div>
							)}
						</div>

						{/* Search Results */}
						{searchResults.length > 0 && (
							<div className="p-6 mt-8 bg-white rounded-lg shadow-sm">
								<h3 className="mb-4 text-xl font-semibold text-primary">
									Suggested Australian Brands
								</h3>
								<div className="space-y-4">
									{searchResults.map((result) => (
										<div
											key={result.id}
											className="p-6 transition-shadow border border-gray-200 rounded-lg hover:shadow-md"
										>
											<div className="flex items-start justify-between mb-3">
												<h4 className="text-lg font-semibold text-primary">
													{result.name}
												</h4>
												<span className="px-3 py-1 text-xs font-medium rounded-full bg-accent-cream text-primary">
													{result.confidence}% match
												</span>
											</div>
											<p className="mb-3 text-sm text-gray-700">
												{result.description}
											</p>
											<div className="p-3 rounded-lg bg-accent-cream">
												<p className="text-sm font-medium text-primary">
													Why it matches:
												</p>
												<p className="text-sm text-gray-700">
													{result.matchReason}
												</p>
											</div>
										</div>
									))}
								</div>
							</div>
						)}

						{isSearching && (
							<div className="p-12 mt-8 text-center bg-white rounded-lg shadow-sm">
								<div className="inline-block w-12 h-12 mb-4 border-b-2 rounded-full animate-spin border-primary" />
								<p className="text-gray-600">
									{searchMode === "pinterest"
										? "Analyzing your Pinterest board..."
										: "Finding the perfect brands for you..."}
								</p>
							</div>
						)}
					</div>

					{/* Filters Section */}
					<div className="lg:col-span-1">
						<div className="p-6 bg-white rounded-lg shadow-sm">
							<h3 className="mb-4 text-xl font-semibold text-primary">
								Filters
							</h3>

							{/* Price Range */}
							<div className="mb-6">
								<label className="block mb-3 text-sm font-medium text-gray-700">
									Price Range
								</label>
								<div className="space-y-2">
									<input
										type="range"
										min="0"
										max="1000"
										step="10"
										value={filters.priceRange.max}
										onChange={(e) =>
											setFilters((prev) => ({
												...prev,
												priceRange: {
													...prev.priceRange,
													max: parseInt(e.target.value),
												},
											}))
										}
										className="w-full"
									/>
									<div className="flex justify-between text-sm text-gray-600">
										<span>${filters.priceRange.min}</span>
										<span>${filters.priceRange.max}</span>
									</div>
								</div>
							</div>

							{/* Categories */}
							<div className="mb-6">
								<label className="block mb-3 text-sm font-medium text-gray-700">
									Categories
								</label>
								<div className="space-y-2">
									{availableCategories.map((category) => (
										<label
											key={category}
											className="flex items-center cursor-pointer"
										>
											<input
												type="checkbox"
												checked={filters.categories.includes(category)}
												onChange={() => toggleCategory(category)}
												className="w-4 h-4 border-gray-300 rounded text-primary focus:ring-primary"
											/>
											<span className="ml-2 text-sm text-gray-700">
												{category}
											</span>
										</label>
									))}
								</div>
							</div>

							{/* Additional Filters */}
							<div className="space-y-3">
								<label className="flex items-center cursor-pointer">
									<input
										type="checkbox"
										checked={filters.sustainability}
										onChange={(e) =>
											setFilters((prev) => ({
												...prev,
												sustainability: e.target.checked,
											}))
										}
										className="w-4 h-4 border-gray-300 rounded text-primary focus:ring-primary"
									/>
									<span className="ml-2 text-sm text-gray-700">
										Sustainable & Ethical
									</span>
								</label>
								<label className="flex items-center cursor-pointer">
									<input
										type="checkbox"
										checked={filters.newArrivals}
										onChange={(e) =>
											setFilters((prev) => ({
												...prev,
												newArrivals: e.target.checked,
											}))
										}
										className="w-4 h-4 border-gray-300 rounded text-primary focus:ring-primary"
									/>
									<span className="ml-2 text-sm text-gray-700">
										New Arrivals
									</span>
								</label>
							</div>
						</div>
					</div>
				</div>
			</main>
			<Footer />
		</div>
	);
};

export default Search;
