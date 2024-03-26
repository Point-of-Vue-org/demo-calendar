import daisyui from 'daisyui'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#ff5500",
          secondary: "#666666",
          accent: "#a8a29e",
          neutral: "#3c3533",
          "base-100": "#292524",
          info: "#60a5fa",
          success: "#16a34a",
          warning: "#facc15",
          error: "#ef4444",
        }
      }
    ]
  },
  plugins: [daisyui],
}

