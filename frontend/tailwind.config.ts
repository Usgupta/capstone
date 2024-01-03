import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
		'max-sm': {'max': '640px'},
        'min-sm': {'min': '641px'},
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
				theme: {
					light: "#f2f2e6",
					dark: "#000000"
				},
				whitehue: {
					50: "#faf4ef",
					100: "#fff9f5",
					200: "#fffaf8",
					300: "#fffcfb",
					400: "#fffefd",
					500: "#ffffff",
					600: "#dfdfdf",
					700: "#b3b3b3",
					800: "#7c7c7c",
					900: "#404040",
				},
				yellowConeflower: {
					50: "#f7f3d5",
					100: "#fcf3c3",
					200: "#ffec9d",
					300: "#ffe07b",
					400: "#fdd164",
					500: "#ebb856",
					600: "#cc9b53",
					700: "#a37d52",
					800: "#715b49",
					900: "#3a332f",
				},
				coldHeights: {
					50: "#e5cdf8",
					100: "#cab3fd",
					200: "#7c8eff",
					300: "#4ea5ff",
					400: "#2fc9ff",
					500: "#22d3ee",
					600: "#28b8cf",
					700: "#3687a5",
					800: "#3b5773",
					900: "#2c2e3b",
				},
				brightBlueViolet: {
					50: "#f7cfe4",
					100: "#fbb8e6",
					200: "#ff87fc",
					300: "#de5dff",
					400: "#b540fc",
					500: "#9333ea",
					600: "#8136cb",
					700: "#763ea2",
					800: "#603f71",
					900: "#382c3a",
				},
			},
    },
  },
  plugins: [
    require("daisyui")
  ],
}
export default config
