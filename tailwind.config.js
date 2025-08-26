/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#F06400',
        background: '#192D56',
        success: '#50D45E',
        error: '#E94043',
        dark: '#101E39',
        'dark-grey': '#555555',
        grey: '#D8DBDF',
        'light-grey': '#F5F5F5',
        white: '#FFFFFF',
        red: '#E94043',
        'error-text': '#E70004',
        'error-background': '#F7D5D5',
      },
      fontFamily: {
        'oswald': ['Oswald', 'sans-serif'],
        'roboto': ['Roboto', 'sans-serif'],
      },
      fontSize: {
        'h1': ['24px', { fontWeight: '700' }],
        'h2': ['18px', { fontWeight: '700' }],
        'body': ['16px', { fontWeight: '400' }],
        'body-medium': ['16px', { fontWeight: '500' }],
        'body-semibold': ['16px', { fontWeight: '600' }],
        'button': ['14px', { fontWeight: '700' }],
        'caption': ['14px', { fontWeight: '700' }],
        'xxl': ['16px', { fontWeight: '400' }],
        'xxl-bold': ['16px', { fontWeight: '700' }],
        'xl': ['14px', { fontWeight: '400' }],
        'xl-bold': ['14px', { fontWeight: '700' }],
        'm': ['12px', { fontWeight: '400' }],
        'm-bold': ['12px', { fontWeight: '700' }],
        's': ['10px', { fontWeight: '400' }],
        's-bold': ['10px', { fontWeight: '700' }],
      }
    },
  },
  plugins: [],
}

