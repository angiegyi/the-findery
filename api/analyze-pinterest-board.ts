import type { VercelRequest, VercelResponse } from "@vercel/node";

interface PinterestPin {
	id: string;
	title: string;
	description: string;
	image_url: string;
	link: string;
}

interface AnalysisResult {
	success: boolean;
	pins?: PinterestPin[];
	suggestedBrands?: Array<{
		id: string;
		name: string;
		description: string;
		matchReason: string;
		confidence: number;
	}>;
	error?: string;
}

/**
 * Vercel serverless function to analyze Pinterest boards
 * This function:
 * 1. Fetches Pinterest board data using Pinterest API
 * 2. Analyzes pin images/descriptions with AI
 * 3. Matches with Australian brands in the database
 */
export default async function handler(
	req: VercelRequest,
	res: VercelResponse
): Promise<void> {
	// Enable CORS
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type");

	// Handle preflight request
	if (req.method === "OPTIONS") {
		res.status(200).end();
		return;
	}

	// Only allow POST requests
	if (req.method !== "POST") {
		res.status(405).json({ error: "Method not allowed" });
		return;
	}

	try {
		const { username, boardSlug } = req.body;

		if (!username || !boardSlug) {
			res.status(400).json({
				success: false,
				error: "Missing username or boardSlug",
			});
			return;
		}

		// ============================================
		// STEP 1: Fetch Pinterest Board Data
		// ============================================
		const pinterestAccessToken = process.env.PINTEREST_ACCESS_TOKEN;

		if (!pinterestAccessToken) {
			// For development: Return mock data
			console.log(
				"Pinterest API not configured. Using mock data for development."
			);
			const mockResult = await handleMockData(username, boardSlug);
			res.status(200).json(mockResult);
			return;
		}

		// Fetch board pins using Pinterest API v5
		const boardResponse = await fetch(
			`https://api.pinterest.com/v5/boards/${username}/${boardSlug}/pins`,
			{
				headers: {
					Authorization: `Bearer ${pinterestAccessToken}`,
					"Content-Type": "application/json",
				},
			}
		);

		if (!boardResponse.ok) {
			throw new Error(`Pinterest API error: ${boardResponse.statusText}`);
		}

		const boardData = await boardResponse.json();

		// Extract relevant pin information
		const pins: PinterestPin[] = boardData.items.map((pin: any) => ({
			id: pin.id,
			title: pin.title || "",
			description: pin.description || "",
			image_url: pin.media?.images?.original?.url || "",
			link: pin.link || "",
		}));

		// ============================================
		// STEP 2: Analyze Pins with AI
		// ============================================
		const suggestedBrands = await analyzePinsWithAI(pins);

		const result: AnalysisResult = {
			success: true,
			pins: pins.slice(0, 10), // Return first 10 pins for reference
			suggestedBrands,
		};

		res.status(200).json(result);
	} catch (error: any) {
		console.error("Error analyzing Pinterest board:", error);
		res.status(500).json({
			success: false,
			error: error.message || "Internal server error",
		});
	}
}

/**
 * Analyze pins using AI to match with Australian brands
 */
async function analyzePinsWithAI(pins: PinterestPin[]) {
	const openaiApiKey = process.env.OPENAI_API_KEY;
	const anthropicApiKey = process.env.ANTHROPIC_API_KEY;

	// Prepare pin descriptions for AI analysis
	const pinDescriptions = pins
		.slice(0, 20)
		.map((pin, idx) => `${idx + 1}. ${pin.title} - ${pin.description}`)
		.join("\n");

	let aiAnalysis = "";

	// Option A: Use OpenAI
	if (openaiApiKey) {
		const response = await fetch("https://api.openai.com/v1/chat/completions", {
			method: "POST",
			headers: {
				Authorization: `Bearer ${openaiApiKey}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				model: "gpt-4o-mini",
				messages: [
					{
						role: "system",
						content:
							"You are a fashion expert specializing in Australian independent brands. Analyze Pinterest board pins and suggest matching Australian fashion brands.",
					},
					{
						role: "user",
						content: `Based on these Pinterest pins, suggest 5 Australian independent fashion brands that match this aesthetic:\n\n${pinDescriptions}\n\nFor each brand, provide:\n1. Brand name (must be a real Australian brand)\n2. Brief description\n3. Why it matches (specific aesthetic elements)\n4. Confidence score (0-100)\n\nFormat as JSON array with fields: name, description, matchReason, confidence.`,
					},
				],
				temperature: 0.7,
			}),
		});

		const data = await response.json();
		aiAnalysis = data.choices[0].message.content;
	}
	// Option B: Use Anthropic Claude
	else if (anthropicApiKey) {
		const response = await fetch("https://api.anthropic.com/v1/messages", {
			method: "POST",
			headers: {
				"x-api-key": anthropicApiKey,
				"anthropic-version": "2023-06-01",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				model: "claude-3-5-sonnet-20241022",
				max_tokens: 1024,
				messages: [
					{
						role: "user",
						content: `You are a fashion expert specializing in Australian independent brands. Based on these Pinterest pins, suggest 5 Australian independent fashion brands that match this aesthetic:\n\n${pinDescriptions}\n\nFor each brand, provide:\n1. Brand name (must be a real Australian brand)\n2. Brief description\n3. Why it matches (specific aesthetic elements)\n4. Confidence score (0-100)\n\nFormat as JSON array with fields: name, description, matchReason, confidence.`,
					},
				],
			}),
		});

		const data = await response.json();
		aiAnalysis = data.content[0].text;
	} else {
		return getMockBrandSuggestions();
	}

	// Parse AI response
	try {
		const jsonMatch = aiAnalysis.match(/\[[\s\S]*\]/);
		if (jsonMatch) {
			const suggestions = JSON.parse(jsonMatch[0]);
			return suggestions.map((brand: any, idx: number) => ({
				id: `brand-${idx}`,
				name: brand.name || brand.brandName,
				description: brand.description,
				matchReason: brand.matchReason || brand.why,
				confidence: brand.confidence || 75,
			}));
		}
	} catch (parseError) {
		console.error("Error parsing AI response:", parseError);
	}

	return getMockBrandSuggestions();
}

/**
 * Mock data handler for development
 */
async function handleMockData(username: string, boardSlug: string) {
	// Simulate API delay
	await new Promise((resolve) => setTimeout(resolve, 1500));

	const mockPins: PinterestPin[] = [
		{
			id: "1",
			title: "Minimalist Linen Dress",
			description: "Sustainable summer style with organic linen",
			image_url: "https://via.placeholder.com/400x600/f5e6d3/000000?text=Linen+Dress",
			link: "https://pinterest.com",
		},
		{
			id: "2",
			title: "Earthy Tone Outfit",
			description: "Natural fabrics and neutral colors",
			image_url: "https://via.placeholder.com/400x600/e8d5c4/000000?text=Earthy+Tones",
			link: "https://pinterest.com",
		},
	];

	const result: AnalysisResult = {
		success: true,
		pins: mockPins,
		suggestedBrands: getMockBrandSuggestions(),
	};

	return result;
}

/**
 * Mock brand suggestions for development
 */
function getMockBrandSuggestions() {
	return [
		{
			id: "brand-1",
			name: "Baiia",
			description:
				"Sustainable Australian brand focused on minimalist, timeless pieces made from natural fabrics.",
			matchReason:
				"Matches the linen aesthetic and sustainable values shown in your board",
			confidence: 92,
		},
		{
			id: "brand-2",
			name: "Dissh",
			description:
				"Contemporary Australian fashion with a focus on feminine, elegant designs.",
			matchReason: "Similar neutral color palette and modern silhouettes",
			confidence: 85,
		},
		{
			id: "brand-3",
			name: "The Bare Road",
			description:
				"Ethical Australian label creating versatile, earth-toned essentials.",
			matchReason: "Earthy tones and natural fabrics align with your board aesthetic",
			confidence: 88,
		},
		{
			id: "brand-4",
			name: "Ozma",
			description:
				"Slow fashion brand specializing in linen and organic cotton basics.",
			matchReason: "Strong focus on linen pieces matching your saved pins",
			confidence: 90,
		},
		{
			id: "brand-5",
			name: "Esse Studios",
			description:
				"Minimalist Australian brand with refined, architectural designs.",
			matchReason: "Clean lines and minimalist aesthetic matches your style",
			confidence: 82,
		},
	];
}
