/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        Pretendard: ['Pretendard']
      },
      colors: {
        /** Primary **/
        'primary-50': '#e6f7ed',
        'primary-100': '#c3ead2',
        'primary-200': '#9cddb6',
        'primary-300': '#70d09a',
        'primary-400': '#4cc584',
        'primary-500': '#1aba6e',
        'primary-600': '#10ab63',
        'primary-700': '#009856',
        'primary-800': '#00874a',
        'primary-900': '#00874a',

        /** Gray **/
        'gray-50': '#f7f9fb',
        'gray-100': '#f3f5f9',
        'gray-200': '#ebeef3',
        'gray-300': '#dadfe7',
        'gray-400': '#b4bbc7',
        'gray-500': '#949ba7',
        'gray-600': '#6c727e',
        'gray-700': '#585f69',
        'gray-800': '#3a404a',
        'gray-900': '#191f28',
        'white': '#ffffff',
        'black': '#000000',

        /** Warning **/
        'warning-100': '#FFCBCE',
        'warning-200': '#FD9691',
        'warning-300': '#F76A65',
        'warning-400': '#FF433C',
        'warning-500': '#FF2B15',
        'warning-600': '#F81B19',
        'warning-700': '#E60012'
      },
      dropShadow: {
        'elevation1': '0 4px 24px rgba(0, 0, 0, 4)',
        'elevation2': '0 4px 24px rgba(0, 0, 0, 6)',
        'elevation3': '0 4px 24px rgba(0, 0, 0, 8)'
      }
    }
  },
  plugins: [
    ({ addUtilities }: any) => {
      addUtilities({
        '.font-default': {
          'font-family': 'Pretendard'
        },
        '.font-3xl-bold': {
          '@apply font-default font-bold': {},
          fontSize: '28px',
          lineHeight: '42px',
          letterSpacing: '-0.02em'
        },

        '.font-3xl-semibold': {
          '@apply font-default font-semibold': {},
          fontSize: '28px',
          lineHeight: '42px',
          letterSpacing: '-0.02em'
        },

        '.font-3xl-medium': {
          '@apply font-default font-medium': {},
          fontSize: '28px',
          lineHeight: '42px',
          letterSpacing: '-0.02em'
        },

        '.font-3xl-regular': {
          '@apply font-default font-normal': {},
          fontSize: '28px',
          lineHeight: '42px',
          letterSpacing: '-0.02em'
        },

        '.font-2xl-bold': {
          '@apply font-default font-bold': {},
          fontSize: '20px',
          lineHeight: '30px',
          letterSpacing: '-0.02em'
        },

        '.font-2xl-semibold': {
          '@apply font-default font-semibold': {},
          fontSize: '20px',
          lineHeight: '30px',
          letterSpacing: '-0.02em'
        },

        '.font-2xl-medium': {
          '@apply font-default font-medium': {},
          fontSize: '20px',
          lineHeight: '30px',
          letterSpacing: '-0.02em'
        },

        '.font-2xl-regular': {
          '@apply font-default font-normal': {},
          fontSize: '20px',
          lineHeight: '30px',
          letterSpacing: '-0.02em'
        },

        '.font-xl-bold': {
          '@apply font-default font-bold': {},
          fontSize: '18px',
          lineHeight: '27px',
          letterSpacing: '-0.02em'
        },

        '.font-xl-semibold': {
          '@apply font-default font-semibold': {},
          fontSize: '18px',
          lineHeight: '27px',
          letterSpacing: '-0.02em'
        },

        '.font-xl-medium': {
          '@apply font-default font-medium': {},
          fontSize: '18px',
          lineHeight: '27px',
          letterSpacing: '-0.02em'
        },

        '.font-xl-regular': {
          '@apply font-default font-normal': {},
          fontSize: '18px',
          lineHeight: '27px',
          letterSpacing: '-0.02em'
        },

        '.font-md-bold': {
          '@apply font-default font-bold': {},
          fontSize: '16px',
          lineHeight: '24px',
          letterSpacing: '-0.01em'
        },

        '.font-md-semibold': {
          '@apply font-default font-semibold': {},
          fontSize: '16px',
          lineHeight: '24px',
          letterSpacing: '-0.01em'
        },

        '.font-md-medium': {
          '@apply font-default font-medium': {},
          fontSize: '16px',
          lineHeight: '24px',
          letterSpacing: '-0.01em'
        },

        '.font-md-regular': {
          '@apply font-default font-normal': {},
          fontSize: '16px',
          lineHeight: '24px',
          letterSpacing: '-0.01em'
        },

        '.font-sm-bold': {
          '@apply font-default font-bold': {},
          fontSize: '14px',
          lineHeight: '21px',
          letterSpacing: '0'
        },

        '.font-sm-semibold': {
          '@apply font-default font-semibold': {},
          fontSize: '14px',
          lineHeight: '21px',
          letterSpacing: '0'
        },

        '.font-sm-medium': {
          '@apply font-default font-medium': {},
          fontSize: '14px',
          lineHeight: '21px',
          letterSpacing: '0'
        },

        '.font-sm-regular': {
          '@apply font-default font-normal': {},
          fontSize: '14px',
          lineHeight: '21px',
          letterSpacing: '0'
        },

        '.font-xs-bold': {
          '@apply font-default font-bold': {},
          fontSize: '12px',
          lineHeight: '18px',
          letterSpacing: '0'
        },

        '.font-xs-semibold': {
          '@apply font-default font-semibold': {},
          fontSize: '12px',
          lineHeight: '18px',
          letterSpacing: '0'
        },

        '.font-xs-medium': {
          '@apply font-default font-medium': {},
          fontSize: '12px',
          lineHeight: '18px',
          letterSpacing: '0'
        },

        '.font-xs-regular': {
          '@apply font-default font-normal': {},
          fontSize: '12px',
          lineHeight: '18px',
          letterSpacing: '0'
        }
      });
    }
  ]
};
