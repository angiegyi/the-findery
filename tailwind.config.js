/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Instrument Sans"],
			},
			colors: {
				primary: {
					DEFAULT: "#6f0000", // Deep burgundy red
					dark: "#550000", // Darker shade
					light: "#8b0000", // Lighter shade
				},
				accent: {
					orange: "#ff914d", // Bright orange
					cream: "#fdf2e3", // Soft cream
					pink: "#eb94a3", // Dusty pink
				},
			},
		},
	},
	plugins: [],
};
