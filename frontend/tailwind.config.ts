import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        'max-xs': {'max': '570px'}, 
        'min-xs': {'min': '570px'},
      },
      backgroundImage: {
        'test': 'radial-gradient(circle at top left, #e66465, transparent 100px), radial-gradient(circle at right, #4d9f0c, transparent 100px), radial-gradient(circle at bottom, #0000ff, transparent 100px),  radial-gradient(circle at center, #FFFFFF, #FFFFFF)',
      },
    },
  },
  plugins: [require("daisyui")],
}
export default config
