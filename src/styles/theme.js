import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    heading: 'var(--font-poppins)',
    body: 'var(--font-poppins)',
  },
  styles: {
    global: {
      body: {
        lineHeight: '1.5',
        color: '#282727',
        fontFamily: 'Poppins, sans-serif',
      },
    },
  },
  colors: {
    brand: {
      500: '#FF0151',
      200: '#909090',
    },

    main: {
      black: '#282727',
      white: '#FFFFFF',
      red: '#FF0151',
      lightRed: '#FFE7EE',
      blueOxford: '#040629',
      alabaster: '#EDEADE',
      blueYonder: '#4f759b',
      stateGray: '#6D8A96',
      mainGray: '#EFEFEF',
      darkGray: '#BDBDBD',
      textGray: '#909090',
      lightGray: '#D2D2D2',
      gray: '#919191',
      grayRgba: 'rgba(40, 39, 39, 0.7)',
      pink: '#FFE8EF',
    },
    checkbox: {
      500: '#FF0151',
    },
    bg: {
      main: '#FFFFFF',
      auth: '#FAFAFA',
      secondary: '#EEEEEE',
      light: '#F9FAFC',
      bg404: '#2E4081',
      red: '#FF0151',
      lightRed: '#FEE7EE',
      black: '#282727',
      blackSubstrate: '#282727B2',
      pink: '#FFE8EF',
      blue: '#4F759A',
      gray: 'rgba(40, 39, 39, 0.7)',
    },
    textColor: {
      lightRed: '#AF6267',
      black: '#282727',
      gray: '#919191',
      grayDark: '#717171',
      red: '#FF0151',
      white: '#FFFFFF',
      lightGray: '#D2D2D2',
    },
  },
  // breakpoints: {
  //   sm: '480px',
  //   md: '768px',
  //   lg: '992px',
  //   xl: '1200px',
  //   xl2: '1440px',
  // },
  // components: {
  //   Textarea: {
  //     baseStyle: {
  //       field: {
  //         minHeight: '120px',
  //         border: '1px solid #D2D2D2',
  //         borderColor: 'brand.lightGray',
  //         borderRadius: '10px',
  //         bgColor: 'brand.white',
  //         ':focus': {
  //           borderColor: 'brand.gray',
  //         },
  //       },
  //     },
  //     sizes: {},
  //     variants: {},
  //     defaultProps: {
  //       variant: null, // null here
  //     },
  //   },
  // },
});

export default theme;
