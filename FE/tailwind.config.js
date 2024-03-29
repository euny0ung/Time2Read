export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          red: {
            DEFAULT: '#FFA19F',
            0: '#FBEDF0',
            1: '#FDB9AE',
            2: '#FE8E8C',
            3: '#FF7465',
            4: '#C13F3F',
          },
          teal: {
            DEFAULT: '#2BBAB4',
            0: '#EEFCFB',
            1: '#D3FFEE',
            2: '#A4E3D6',
            3: '#249593',
          },
          yellow: {
            DEFAULT: '#FEFEC3',
            0: '#FBFAEA',
            1: '#E3F1BE',
            2: '#C0CFA4',
          },
          indigo: {
            DEFAULT: '#8096C5',
            1: '#E8FFF7',
            2: '#7281AA',
            3: '#9A769A',
            4: '#603049',
          },
        },
        black: {
          DEFAULT: '#212529',
        },
        white: {
          DEFAULT: '#FAFAFA', // 애플 백그라운드 컬러 참고
        },
        light: {
          text: {
            DEFAULT: '#212529',
            1: '#CED4DA',
            2: '#868E96',
            3: '#495057',
          },
        },
        dark: {
          text: {
            DEFAULT: '#ECECEC',
            1: '#D9D9D9',
            2: '#ACACAC',
            3: '#595959',
          },
        },
      },
      backgroundImage: {
        holographic: 'linear-gradient(45deg, #ff4e50, #12c2e9, #ff49db,#FFA07A, #FFEF96)',
      },
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
        hologram: 'hologram 3s infinite linear',
        spin360: 'spin360 1s ease-in-out forwards',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        hologram: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        spin360: {
          from: { transform: 'rotateY(0deg)' },
          to: { transform: 'rotateY(360deg)' },
        },
      },
      backgroundSize: {
        '300%': '300% 300%',
      },
      spacing: {
        cardW: '14em', // 명함 너비
        cardH: '8em', // 명함 높이
      },
    },
  },
  plugins: [],
};
