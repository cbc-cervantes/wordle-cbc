module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "correct-green": "#6AAA64",
        "almost-yellow": "#CEB02C",
        "wrong-gray": "#939B9F",
        "blue-dark": "#262B3C",
        "icon-gray": "#818181",
        "gray-dark": "rgba(218, 220, 224, 0.03);",
        "gray-key": "#D3D6DA",
        "gray-key-dark": "#565F7E",
      },
      backgroundImage: {
        "switch-light": "url('static/img/switch_light.png')",
        "switch-dark": "url('static/img/switch_dark.png')",
      },
      keyframes: {
        fadeIn: {
          "0%": {
            opacity: 0,
            transform: "scale(.9)",
          },
          "100%": {
            opacity: 1,
            transform: "scale(1)",
          },
        },
      },
      animation: {
        "fade-in": "fadeIn .3s",
      },
    },
  },
  plugins: [],
};
