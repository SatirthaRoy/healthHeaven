/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
export default withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      theme: '#44c2fd',
      text: '#041530'
    },
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ]
})