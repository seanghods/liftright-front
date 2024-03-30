import theme from "daisyui/src/theming/themes";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "index.html",
    "node_modules/daisyui/dist/**/*.js",
    "node_modules/react-daisyui/dist/**/*.js",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gym-bg-login": "url('./assets/auth-bg/gym-bg-login.jpeg')",
        "gym-bg-register": "url('./assets/auth-bg/gym-bg-register.jpeg')",
        "gym-bg-forgot": "url('./assets/auth-bg/gym-bg-forgot.jpeg')",
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "6rem",
        "2xl": "8rem",
      },
    },
    fontFamily: {
      body: ["'DM Sans'", "sans-serif"],
    },
  },
  daisyui: {
    themes: [
      {
        light: {
          ...theme.light,
          primary: "#1b77ff",
          "primary-content": "#ffffff",
          secondary: "#494949",
          neutral: "#03131a",
          info: "#00e1ff",
          success: "#90ca27",
          warning: "#ff8800",
          error: "#ff7f7f",
          "--rounded-box": "0.25rem",
          "--rounded-btn": "0.25rem",
        },
        dark: {
          ...theme.dark,
          primary: "#1b77ff",
          "primary-content": "#ffffff",
          secondary: "#494949",
          neutral: "#03131a",
          info: "#00e1ff",
          success: "#90ca27",
          warning: "#ff8800",
          error: "#ff7f7f",
          "base-100": "#14181c",
          "base-200": "#1e2328",
          "base-300": "#28323c",
          "base-content": "#dcebfa",
          "--rounded-box": "0.25rem",
          "--rounded-btn": "0.25rem",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
