/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,ts,css,scss}'],
  theme: {
    extend: {},
    fontSize: {
      'size-quark': '12px',
      'size-nano': '14px',
      'size-micro': '16px',
      'size-tiny': '18px',
      'size-smaller': '20px',
      'size-small': '24px',
      'size-medium': '28px',
      'size-large': '32px',
      'size-larger': '36px',
      'size-huge': '40px',
      'size-massive': '44px',
    },
    backgroundColor: {
      'highlight-1': '#f1f1f1',
      'highlight-2': '#e1e1e1',
      'highlight-3': '#d1d1d1',
      'highlight-4': '#c1c1c1',
      'highlight-5': '#b1b1b1',
      'highlight-6': '#a1a1a1',
      'highlight-7': '#909090',
      'highlight-8': '#808080',
      'highlight-9': '#707070',
      'highlight-10': '#606060',
    },
  },
  plugins: [],
};
