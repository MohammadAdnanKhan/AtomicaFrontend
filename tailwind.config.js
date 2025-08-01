// tailwind.config.js
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        light: {
          primary: '#1A73E8',        
          accent: '#38BDF8',         
          background: '#F0F4FF',     
          surface: '#FFFFFF',       
          text: '#1E293B',          
          secondary: '#64748B',      
        },

        dark: {
          primary: '#38BDF8',        
          accent: '#0EA5E9',        
          background: '#0F172A',     
          surface: '#1E293B',      
          text: '#F8FAFC',           
          secondary: '#94A3B8',      
        },

      },
      backgroundImage: {
        'light-gradient': 'linear-gradient(to bottom right, #e0f7ff, #f8f9fc)',
        'dark-gradient': 'linear-gradient(to bottom right, #0f2027, #203a43, #2c5364)',
      },
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
