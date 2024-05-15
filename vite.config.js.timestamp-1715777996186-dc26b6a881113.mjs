// vite.config.js
import { defineConfig } from "file:///D:/coding/wallpaper.shenzjd.com/node_modules/.pnpm/vite@5.0.2_@types+node@20.12.5_sass@1.74.1_terser@5.30.3/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/coding/wallpaper.shenzjd.com/node_modules/.pnpm/@vitejs+plugin-vue@4.5.0_vite@5.0.2_@types+node@20.12.5_sass@1.74.1_terser@5.30.3__vue@3.3.8/node_modules/@vitejs/plugin-vue/dist/index.mjs";

// postcss.config.js
import autoprefixer from "file:///D:/coding/wallpaper.shenzjd.com/node_modules/.pnpm/autoprefixer@10.4.19_postcss@8.4.38/node_modules/autoprefixer/lib/autoprefixer.js";
var postcss_config_default = {
  plugins: [
    autoprefixer({
      // 指定目标浏览器
      overrideBrowserslist: [
        "Android 4.1",
        "iOS 7.1",
        "Chrome > 31",
        "ff > 31",
        "ie >= 8"
      ],
      grid: true
    })
  ]
};

// vite.config.js
import { visualizer } from "file:///D:/coding/wallpaper.shenzjd.com/node_modules/.pnpm/rollup-plugin-visualizer@5.12.0_rollup@4.14.1/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
import viteImagemin from "file:///D:/coding/wallpaper.shenzjd.com/node_modules/.pnpm/vite-plugin-imagemin@0.6.1_vite@5.0.2_@types+node@20.12.5_sass@1.74.1_terser@5.30.3_/node_modules/vite-plugin-imagemin/dist/index.mjs";
import { createHtmlPlugin } from "file:///D:/coding/wallpaper.shenzjd.com/node_modules/.pnpm/vite-plugin-html@3.2.2_vite@5.0.2_@types+node@20.12.5_sass@1.74.1_terser@5.30.3_/node_modules/vite-plugin-html/dist/index.mjs";
import externalGlobals from "file:///D:/coding/wallpaper.shenzjd.com/node_modules/.pnpm/rollup-plugin-external-globals@0.10.0_rollup@4.14.1/node_modules/rollup-plugin-external-globals/index.js";
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    visualizer({ open: false }),
    createHtmlPlugin({
      inject: {
        data: {
          script: ``
        }
      }
    }),
    viteImagemin({
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false
      },
      // 无损压缩配置，无损压缩下图片质量不会变差
      optipng: {
        optimizationLevel: 7
      },
      mozjpeg: {
        quality: 20
      },
      // 有损压缩配置，有损压缩下图片质量可能会变差
      pngquant: {
        quality: [0.8, 0.9]
      },
      // svg 优化
      svgo: {
        plugins: [
          {
            name: "removeViewBox"
          },
          {
            name: "removeEmptyAttrs",
            active: false
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      "@": "/src/client"
    }
  },
  esbuild: {
    drop: ["console", "debugger"]
  },
  build: {
    target: "modules",
    // 默认值是一个 Vite 特有的值：'modules' https://cn.vitejs.dev/config/build-options.html#build-target
    minify: "esbuild",
    // 默认为'esbuild'，boolean | 'terser' | 'esbuild' | 'gzip' | 'both'
    rollupOptions: {
      output: {
        chunkFileNames: "js/[name]-[hash].js",
        // 引入文件名的名称
        entryFileNames: "js/[name]-[hash].js",
        // 包的入口文件名称
        assetFileNames: "[ext]/[name]-[hash].[ext]",
        // 资源文件像 字体，图片等
        manualChunks: {}
      },
      //  告诉打包工具 在external配置的 都是外部依赖项  不需要打包
      plugins: [externalGlobals({})]
    }
  },
  css: {
    postcss: postcss_config_default
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiLCAicG9zdGNzcy5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxjb2RpbmdcXFxcd2FsbHBhcGVyLnNoZW56amQuY29tXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxjb2RpbmdcXFxcd2FsbHBhcGVyLnNoZW56amQuY29tXFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9jb2Rpbmcvd2FsbHBhcGVyLnNoZW56amQuY29tL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHZ1ZSBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tdnVlXCI7XHJcbmltcG9ydCBwb3N0Y3NzQ29uZmlnIGZyb20gXCIuL3Bvc3Rjc3MuY29uZmlnXCI7XHJcbmltcG9ydCB7IHZpc3VhbGl6ZXIgfSBmcm9tIFwicm9sbHVwLXBsdWdpbi12aXN1YWxpemVyXCI7IC8vIFx1NjI1M1x1NTMwNVx1NEY1M1x1NzlFRlx1NTIwNlx1Njc5MFx1NjNEMlx1NEVGNlxyXG5pbXBvcnQgdml0ZUltYWdlbWluIGZyb20gXCJ2aXRlLXBsdWdpbi1pbWFnZW1pblwiOyAvLyBcdTU2RkVcdTcyNDdcdTUzOEJcdTdGMjlcdTYzRDJcdTRFRjZcclxuaW1wb3J0IHsgY3JlYXRlSHRtbFBsdWdpbiB9IGZyb20gXCJ2aXRlLXBsdWdpbi1odG1sXCI7IC8vIFx1NzUxRlx1NjIxMCBodG1sIFx1NjNEMlx1NEVGNlxyXG5pbXBvcnQgZXh0ZXJuYWxHbG9iYWxzIGZyb20gXCJyb2xsdXAtcGx1Z2luLWV4dGVybmFsLWdsb2JhbHNcIjsgLy8gXHU1QkZDXHU1MUZBXHU1MTY4XHU1QzQwXHU1M0Q4XHU5MUNGXHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIHBsdWdpbnM6IFtcclxuICAgIHZ1ZSgpLFxyXG4gICAgdmlzdWFsaXplcih7IG9wZW46IGZhbHNlIH0pLFxyXG4gICAgY3JlYXRlSHRtbFBsdWdpbih7XHJcbiAgICAgIGluamVjdDoge1xyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgIHNjcmlwdDogYGAsXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgIH0pLFxyXG4gICAgdml0ZUltYWdlbWluKHtcclxuICAgICAgZ2lmc2ljbGU6IHtcclxuICAgICAgICBvcHRpbWl6YXRpb25MZXZlbDogNyxcclxuICAgICAgICBpbnRlcmxhY2VkOiBmYWxzZSxcclxuICAgICAgfSxcclxuICAgICAgLy8gXHU2NUUwXHU2MzVGXHU1MzhCXHU3RjI5XHU5MTREXHU3RjZFXHVGRjBDXHU2NUUwXHU2MzVGXHU1MzhCXHU3RjI5XHU0RTBCXHU1NkZFXHU3MjQ3XHU4RDI4XHU5MUNGXHU0RTBEXHU0RjFBXHU1M0Q4XHU1REVFXHJcbiAgICAgIG9wdGlwbmc6IHtcclxuICAgICAgICBvcHRpbWl6YXRpb25MZXZlbDogNyxcclxuICAgICAgfSxcclxuICAgICAgbW96anBlZzoge1xyXG4gICAgICAgIHF1YWxpdHk6IDIwLFxyXG4gICAgICB9LFxyXG4gICAgICAvLyBcdTY3MDlcdTYzNUZcdTUzOEJcdTdGMjlcdTkxNERcdTdGNkVcdUZGMENcdTY3MDlcdTYzNUZcdTUzOEJcdTdGMjlcdTRFMEJcdTU2RkVcdTcyNDdcdThEMjhcdTkxQ0ZcdTUzRUZcdTgwRkRcdTRGMUFcdTUzRDhcdTVERUVcclxuICAgICAgcG5ncXVhbnQ6IHtcclxuICAgICAgICBxdWFsaXR5OiBbMC44LCAwLjldLFxyXG4gICAgICB9LFxyXG4gICAgICAvLyBzdmcgXHU0RjE4XHU1MzE2XHJcbiAgICAgIHN2Z286IHtcclxuICAgICAgICBwbHVnaW5zOiBbXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwicmVtb3ZlVmlld0JveFwiLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgbmFtZTogXCJyZW1vdmVFbXB0eUF0dHJzXCIsXHJcbiAgICAgICAgICAgIGFjdGl2ZTogZmFsc2UsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIF0sXHJcbiAgICAgIH0sXHJcbiAgICB9KSxcclxuICBdLFxyXG4gIHJlc29sdmU6IHtcclxuICAgIGFsaWFzOiB7XHJcbiAgICAgIFwiQFwiOiBcIi9zcmMvY2xpZW50XCIsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgZXNidWlsZDoge1xyXG4gICAgZHJvcDogW1wiY29uc29sZVwiLCBcImRlYnVnZ2VyXCJdLFxyXG4gIH0sXHJcbiAgYnVpbGQ6IHtcclxuICAgIHRhcmdldDogXCJtb2R1bGVzXCIsIC8vIFx1OUVEOFx1OEJBNFx1NTAzQ1x1NjYyRlx1NEUwMFx1NEUyQSBWaXRlIFx1NzI3OVx1NjcwOVx1NzY4NFx1NTAzQ1x1RkYxQSdtb2R1bGVzJyBodHRwczovL2NuLnZpdGVqcy5kZXYvY29uZmlnL2J1aWxkLW9wdGlvbnMuaHRtbCNidWlsZC10YXJnZXRcclxuICAgIG1pbmlmeTogXCJlc2J1aWxkXCIsIC8vIFx1OUVEOFx1OEJBNFx1NEUzQSdlc2J1aWxkJ1x1RkYwQ2Jvb2xlYW4gfCAndGVyc2VyJyB8ICdlc2J1aWxkJyB8ICdnemlwJyB8ICdib3RoJ1xyXG4gICAgcm9sbHVwT3B0aW9uczoge1xyXG4gICAgICBvdXRwdXQ6IHtcclxuICAgICAgICBjaHVua0ZpbGVOYW1lczogXCJqcy9bbmFtZV0tW2hhc2hdLmpzXCIsIC8vIFx1NUYxNVx1NTE2NVx1NjU4N1x1NEVGNlx1NTQwRFx1NzY4NFx1NTQwRFx1NzlGMFxyXG4gICAgICAgIGVudHJ5RmlsZU5hbWVzOiBcImpzL1tuYW1lXS1baGFzaF0uanNcIiwgLy8gXHU1MzA1XHU3Njg0XHU1MTY1XHU1M0UzXHU2NTg3XHU0RUY2XHU1NDBEXHU3OUYwXHJcbiAgICAgICAgYXNzZXRGaWxlTmFtZXM6IFwiW2V4dF0vW25hbWVdLVtoYXNoXS5bZXh0XVwiLCAvLyBcdThENDRcdTZFOTBcdTY1ODdcdTRFRjZcdTUwQ0YgXHU1QjU3XHU0RjUzXHVGRjBDXHU1NkZFXHU3MjQ3XHU3QjQ5XHJcbiAgICAgICAgbWFudWFsQ2h1bmtzOiB7fSxcclxuICAgICAgfSxcclxuICAgICAgLy8gIFx1NTQ0QVx1OEJDOVx1NjI1M1x1NTMwNVx1NURFNVx1NTE3NyBcdTU3MjhleHRlcm5hbFx1OTE0RFx1N0Y2RVx1NzY4NCBcdTkwRkRcdTY2MkZcdTU5MTZcdTkwRThcdTRGOURcdThENTZcdTk4NzkgIFx1NEUwRFx1OTcwMFx1ODk4MVx1NjI1M1x1NTMwNVxyXG4gICAgICBwbHVnaW5zOiBbZXh0ZXJuYWxHbG9iYWxzKHt9KV0sXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgY3NzOiB7XHJcbiAgICBwb3N0Y3NzOiBwb3N0Y3NzQ29uZmlnLFxyXG4gIH0sXHJcbn0pO1xyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXGNvZGluZ1xcXFx3YWxscGFwZXIuc2hlbnpqZC5jb21cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXGNvZGluZ1xcXFx3YWxscGFwZXIuc2hlbnpqZC5jb21cXFxccG9zdGNzcy5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L2NvZGluZy93YWxscGFwZXIuc2hlbnpqZC5jb20vcG9zdGNzcy5jb25maWcuanNcIjsvLyBwb3N0Y3NzLmNvbmZpZy5qc1xyXG5pbXBvcnQgYXV0b3ByZWZpeGVyIGZyb20gXCJhdXRvcHJlZml4ZXJcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAgIHBsdWdpbnM6IFtcclxuICAgICAgICBhdXRvcHJlZml4ZXIoe1xyXG4gICAgICAgICAgICAvLyBcdTYzMDdcdTVCOUFcdTc2RUVcdTY4MDdcdTZENEZcdTg5QzhcdTU2NjhcclxuICAgICAgICAgICAgb3ZlcnJpZGVCcm93c2Vyc2xpc3Q6IFtcclxuICAgICAgICAgICAgICAgIFwiQW5kcm9pZCA0LjFcIixcclxuICAgICAgICAgICAgICAgIFwiaU9TIDcuMVwiLFxyXG4gICAgICAgICAgICAgICAgXCJDaHJvbWUgPiAzMVwiLFxyXG4gICAgICAgICAgICAgICAgXCJmZiA+IDMxXCIsXHJcbiAgICAgICAgICAgICAgICBcImllID49IDhcIixcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgZ3JpZDogdHJ1ZSxcclxuICAgICAgICB9KSxcclxuICAgIF0sXHJcbn1cclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFxUixTQUFTLG9CQUFvQjtBQUNsVCxPQUFPLFNBQVM7OztBQ0FoQixPQUFPLGtCQUFrQjtBQUV6QixJQUFPLHlCQUFRO0FBQUEsRUFDWCxTQUFTO0FBQUEsSUFDTCxhQUFhO0FBQUE7QUFBQSxNQUVULHNCQUFzQjtBQUFBLFFBQ2xCO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLE1BQ0o7QUFBQSxNQUNBLE1BQU07QUFBQSxJQUNWLENBQUM7QUFBQSxFQUNMO0FBQ0o7OztBRGRBLFNBQVMsa0JBQWtCO0FBQzNCLE9BQU8sa0JBQWtCO0FBQ3pCLFNBQVMsd0JBQXdCO0FBQ2pDLE9BQU8scUJBQXFCO0FBRzVCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLElBQUk7QUFBQSxJQUNKLFdBQVcsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUFBLElBQzFCLGlCQUFpQjtBQUFBLE1BQ2YsUUFBUTtBQUFBLFFBQ04sTUFBTTtBQUFBLFVBQ0osUUFBUTtBQUFBLFFBQ1Y7QUFBQSxNQUNGO0FBQUEsSUFDRixDQUFDO0FBQUEsSUFDRCxhQUFhO0FBQUEsTUFDWCxVQUFVO0FBQUEsUUFDUixtQkFBbUI7QUFBQSxRQUNuQixZQUFZO0FBQUEsTUFDZDtBQUFBO0FBQUEsTUFFQSxTQUFTO0FBQUEsUUFDUCxtQkFBbUI7QUFBQSxNQUNyQjtBQUFBLE1BQ0EsU0FBUztBQUFBLFFBQ1AsU0FBUztBQUFBLE1BQ1g7QUFBQTtBQUFBLE1BRUEsVUFBVTtBQUFBLFFBQ1IsU0FBUyxDQUFDLEtBQUssR0FBRztBQUFBLE1BQ3BCO0FBQUE7QUFBQSxNQUVBLE1BQU07QUFBQSxRQUNKLFNBQVM7QUFBQSxVQUNQO0FBQUEsWUFDRSxNQUFNO0FBQUEsVUFDUjtBQUFBLFVBQ0E7QUFBQSxZQUNFLE1BQU07QUFBQSxZQUNOLFFBQVE7QUFBQSxVQUNWO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxJQUNGLENBQUM7QUFBQSxFQUNIO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLO0FBQUEsSUFDUDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE1BQU0sQ0FBQyxXQUFXLFVBQVU7QUFBQSxFQUM5QjtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsUUFBUTtBQUFBO0FBQUEsSUFDUixRQUFRO0FBQUE7QUFBQSxJQUNSLGVBQWU7QUFBQSxNQUNiLFFBQVE7QUFBQSxRQUNOLGdCQUFnQjtBQUFBO0FBQUEsUUFDaEIsZ0JBQWdCO0FBQUE7QUFBQSxRQUNoQixnQkFBZ0I7QUFBQTtBQUFBLFFBQ2hCLGNBQWMsQ0FBQztBQUFBLE1BQ2pCO0FBQUE7QUFBQSxNQUVBLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7QUFBQSxJQUMvQjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLEtBQUs7QUFBQSxJQUNILFNBQVM7QUFBQSxFQUNYO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
