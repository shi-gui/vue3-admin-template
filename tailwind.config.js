module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        t: '0 -5px 5px -5px #DCDCDC',
        r: '5px 0 5px -5px #DCDCDC',
        b: '0 5px 5px -5px #DCDCDC',
        l: '-5px 0 5px -5px #DCDCDC'
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        font: {
          DEFAULT: '#333',
          gray: '#888888', //描述文字
          'gray-1': '#DCDCDC' //placeholder
        },
        border: {
          DEFAULT: '#E5E5E5'
        },

        default: {
          DEFAULT: '#000',
          light: '#E5E5E5'
        },
        primary: {
          DEFAULT: '#0052D9',
          light: '#ECF2FE'
        },
        success: {
          DEFAULT: '#52c41a',
          light: '#E8F7EB'
        },
        info: {
          DEFAULT: '#3D85D7'
        },
        warning: {
          DEFAULT: '#ED7B2F',
          light: '#FFEFEA'
        },
        danger: {
          DEFAULT: '#E34D59',
          light: '#FCF0F0'
        }
      },
      //rounded
      borderRadius: {
        none: '0',
        DEFAULT: '3px',
        full: '9999px'
      },
      spacing: {
        full: '100%',
        half: '50%',
        quarter: '25%',
        '1/2': '50%',
        '1/3': '33.333333%',
        '2/3': '66.666667%',
        '1/4': '25%',
        '2/4': '50%',
        '3/4': '75%',
        '1/5': '20%',
        '2/5': '40%',
        '3/5': '60%',
        '4/5': '80%',
        0: '0',
        1: '4px',
        2: '8px',
        3: '12px',
        4: '16px',
        5: '20px',
        6: '24px',
        7: '28px',
        8: '32px',
        9: '36px',
        10: '40px',
        form: '400px'
      },
      // text
      fontSize: {
        12: '12px',
        14: '14px',
        16: '16px',
        18: '18px',
        20: '20px',
        22: '22px',
        24: '24px',
        26: '26px',
        28: '28px',
        30: '30px',
        32: '32px',
        34: '34px',
        36: '36px',
        38: '38px',
        40: '40px',
        42: '42px',
        44: '44px',
        46: '46px',
        48: '48px',
        50: '50px'
      },
      //font
      fontWeight: {
        100: '100',
        200: '200',
        300: '300',
        400: '400',
        500: '500',
        600: '600',
        700: '700',
        800: '800',
        900: '900'
      },
      minHeight: {
        0: '0',
        full: '100%',
        screen: '100vh'
      },
      maxWidth: {
        form: '400px'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
