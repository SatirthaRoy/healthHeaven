/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
const flowbite = require("flowbite-react/tailwind");
export default withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
    flowbite.content(),
  ],
  theme: {
    colors: {
      theme: '#44c2fd',
      text: '#041530'
    },
    extend: {},
  },
  plugins: [
    require('daisyui', 'flowbite/plugin'),
    flowbite.plugin(),
  ]
})