/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "clr-blue": "hsl(212 100% 50%)",
        "clr-marine": "hsl(217 35% 45%)",
        "clr-black": "hsl(220 40% 13%)",
        "clr-lightBlack": "hsl(222 41% 20%)",
      },
      fontFamily: {
        SpaceMono: ["Space Mono, sans-serif"],
      },
      container: {
        padding: "2rem",
        center: true,
      },
      screens: {
        sm: "640px",
        md: "768px",
      },
    },
  },
  plugins: [],
};

/*
    "clr-blue": "hsl(212 100% 50%)", 
    "clr-white": "hsl(0 0% 100,%)" 
    "clr-grayBlue": "hsl(217 20% 51%)", 
    "clr-marine": "hsl(217 35% 45%)", 
    "clr-darkBlue": "hsl(217 21% 21%)", 
    "clr-darkWhite": "hsl(227 100% 98%)", 
    "clr-black": "hsl(220 40% 13%)", 
    "clr-lightBlack": "hsl(222 41% 20%)", 
*/
