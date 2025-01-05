/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {},
		fontFamily: {
			header: ['Comfortaa', 'sans-serif'],
			cursive: ['Licorice', 'cursive']
		},
		dropShadow: {
			yeller: '1px 0px 0px rgb(0 0 0 / 0.5)'
		}
	},
	plugins: []
};
