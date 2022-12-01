/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  // prefix: 'lh', // 前缀
  theme: {
    extend: {}
  },
  /**
   * 这里提前安装了两个插件，如需其他的请自行下载
   * https://tailwindcss.com/docs/typography-plugin
   */
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/line-clamp')]
};
