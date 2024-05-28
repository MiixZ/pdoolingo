/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        "ejercicio-background": "url('/logo.png')",
      }),
      backgroundSize: {
        auto: "auto",
        cover: "cover",
        contain: "contain",
        custom: "300px 75px",
      },
      backgroundRepeat: {
        "no-repeat": "no-repeat",
      },
      backgroundPosition: {
        center: "center",
      },
      keyframes: {
        spin: {
          "0%": { transform: "rotate(45deg)" },
          "100%": { transform: "rotate(-45deg)" },
        },
      },
      animation: {
        spin: "spin 5s linear infinite",
      },
    },
  },
  plugins: [
    function ({ addComponents }) {
      const newComponents = {
        ".inputs::placeholder": {
          color: "black",
        },
        ".inputs:focus::placeholder": {
          color: "rgba(126, 119, 119, 0.733)",
          transition: "all 0.75s ease-in-out",
        },
        ".inputs:hover::placeholder": {
          color: "rgb(161, 157, 157)",
          transition: "all 0.75s ease-in-out",
        },
      };

      addComponents(newComponents);
    },
  ],
};
