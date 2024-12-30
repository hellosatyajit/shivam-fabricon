/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {fontFamily: {
			inter: ['Inter', 'sans-serif'],
		  },},
		  screens: {
			sm: '640px',
			md: '768px',
			lg: '1024px',
			xl: '1280px',
		  },
	},
	plugins: [],
}
