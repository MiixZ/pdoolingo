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
        custom: "200px 50px",
      },
      backgroundRepeat: {
        "no-repeat": "no-repeat",
      },
      backgroundPosition: {
        center: "center",
      },
    },
  },
  plugins: [],
};
