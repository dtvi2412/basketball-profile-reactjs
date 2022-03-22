module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      keyframes: {
        dribble: {
          '0%': {
            transform: 'translate(0,0)',
          },
          '10%': {
            transform: 'translate(0%,80%)',
          },
          '20%': {
            transform: 'translate(0%,0%)',
          },
          '30%': {
            transform: 'translate(0%,80%)',
          },
          '40%': {
            transform: 'translate(00%,0%)',
          },
          '50%': {
            transform: 'translate(0%,80%)',
          },
          '60%': {
            transform: 'translate(20%,0%)',
          },
          '70%': {
            transform: 'translate(40%,80%)',
          },
          '80%': {
            transform: 'translate(60%,0%)',
          },
          '90%': {
            transform: 'translate(80%,80%)',
          },
          '100%': {
            transform: 'translate(100%,0%)',
          },
        },
        firefly: {
          '0%': {
            opacity: 1,
          },
          '50%': {
            opacity: 0,
          },
          '100%': {
            opacity: 1,
          },
        },
      },
      animation: {
        dribble: `dribble 2.5s linear infinite`,
        firefly: 'firefly 1s linear infinite',
      },
    },
  },
  plugins: [],
};
