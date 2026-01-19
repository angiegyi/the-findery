/**
 * Utility functions for Pinterest board analysis
 */

export interface PinterestBoardInfo {
	username: string;
	boardName: string;
	boardSlug: string;
}

/**
 * Extract board information from a Pinterest URL
 * Supports formats:
 * - https://www.pinterest.com/username/board-name/
 * - https://www.pinterest.com.au/username/board-name/
 * - https://pinterest.com/username/board-name/
 */
export const extractPinterestBoardInfo = (
	url: string
): PinterestBoardInfo | null => {
	try {
		const urlObj = new URL(url);

		// Check if it's a Pinterest domain
		if (!urlObj.hostname.includes("pinterest.com")) {
			return null;
		}

		// Extract path parts
		// Format: /username/board-name/
		const pathParts = urlObj.pathname.split("/").filter((part) => part);

		if (pathParts.length < 2) {
			return null;
		}

		const [username, boardSlug] = pathParts;

		return {
			username,
			boardSlug,
			boardName: boardSlug.replace(/-/g, " "),
		};
	} catch (error) {
		console.error("Error parsing Pinterest URL:", error);
		return null;
	}
};

/**
 * Validate if a URL is a valid Pinterest board URL
 */
export const isValidPinterestBoardUrl = (url: string): boolean => {
	return extractPinterestBoardInfo(url) !== null;
};
