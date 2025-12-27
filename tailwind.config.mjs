/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        paper: '#F2F0E9',       // 纸张米色背景
        ink: '#121212',         // 墨黑（用于文字和边框）
        'safety-orange': '#FF4500', // 国际安全橙（强调色）
        grid: '#D1D1D1',        // 网格线颜色
      },
      fontFamily: {
        // 核心字体：等宽字体用于显示代码和数据，衬线字体用于大标题
        mono: ['"Space Mono"', '"Courier New"', 'monospace'],
        serif: ['"Libre Baskerville"', 'Georgia', 'serif'],
      },
      boxShadow: {
        // 硬阴影：不模糊的阴影，模拟纸张堆叠
        'brutal': '6px 6px 0px 0px #121212',
        'brutal-sm': '3px 3px 0px 0px #121212',
      },
      animation: {
        'blink': 'blink 1s step-end infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        }
      }
    },
  },
  plugins: [],
}