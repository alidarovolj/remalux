const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        mainColor: "#ad2725",
      },
      width: {
        sixth: "15.5%",
        third: "32.6%",
        fourth: "24%",
        fifth: "19%",
        half: "49%",
      },
      boxShadow: {
        hovShadow: "0px 0px 20px 0px #9D181840"
      },
      fontFamily: {
        montserrat: ['Montserrat Alternates', ...defaultTheme.fontFamily.sans],
      }
    },
  },
  plugins: [],
}

