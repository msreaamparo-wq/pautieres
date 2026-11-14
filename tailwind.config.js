// Same palette as the invitation website.
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#fffdf8',
        cream: '#fbf6ec',
        mist: '#edf7ff',
        sky: '#cfe6fb',
        baby: '#9ec9f2',
        ocean: '#4f8fd0',
        gold: '#b8922e',
        champagne: '#ead9bd',
        sun: '#fde9a2',
        ink: '#24415f'
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        soft: '0 18px 50px rgba(36, 65, 95, 0.12)',
        card: '0 8px 24px rgba(36, 65, 95, 0.07)'
      }
    }
  },
  plugins: []
};
