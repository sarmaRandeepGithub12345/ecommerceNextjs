/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      screens: {
        'twelveK': '1200px',  // Example custom breakpoint
        'nine':'900px',
        'sixHun':'610px',
        'sevenHun':'700px',
        'EightFif':'850px',
        'NineFif':'950px',
        'EightHun':'800px',
        'FourHun':'400px',
        'FourThir':'430px',
        'FourFT':'415px',
        'Thou':"1000px",
        'sixH':'600px',
        'FourFifty':'450px',
        'ThreeHun':'300px',
      },
    },
  },
  plugins: [],
}
