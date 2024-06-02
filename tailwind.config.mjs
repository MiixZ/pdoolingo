/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      backgroundImage: {
        "ejercicio-background": "url('/logo.png')",
        "pecera-background": "url('/pecera.jpg')",
      },
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
        moveUpDown: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(50px)" },
        },
        moveLeftRight: {
          "0%, 100%": { transform: "translateX(0px)" },
          "50%": { transform: "translateX(50px)" },
        },
      },
      animation: {
        moveUpDown: "moveUpDown 2s ease-in-out infinite",
        moveLeftRight: "moveLeftRight 2s linear infinite",
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
