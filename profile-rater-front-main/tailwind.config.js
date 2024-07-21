/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx}",
    "./public/**/*.{html,js}"
  ],
  theme: {
    extend: {
      colors: {
        
        'color-1':'#E8B923',
        'color-2':'#1C1B1F',
        'color-3':'#484848',
        'color-4':'#767676',
        'color-5':'#D9D9D9',
        'color-6':'#F4F4F4',      
        'color-7':'#0c2d42',  
        'color-8':'#fef8f8',  
        'color-9':'#F5F5F5', 
      },
    },
    fontFamily: {
      'outfit': ['outfit', 'system-ui'],
      'outfit-medium': ['outfit-medium', 'system-ui'],
      'outfit-semibold': ['outfit-semibold', 'system-ui'],
      'outfit-bold': ['outfit-bold', 'system-ui'],
      'outfit-extrabold': ['outfit-extrabold', 'system-ui'],
      'outfit-black': ['outfit-black', 'system-ui'],
      'savoye': ['savoye'],
    },
  },
  plugins: [],
  darkMode:'selector',
}