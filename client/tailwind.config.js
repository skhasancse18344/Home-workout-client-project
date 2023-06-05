/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  
  theme: {
    
    colors:{
     workout:{
       secondary:"#0C1729",
       primary:"#91E03D",
       900:"bg-red-500"
     }
    },
    extend: {},
  },
  plugins: [require("daisyui")],
}