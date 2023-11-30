import {
  defineConfig
} from 'vite'
import react from '@vitejs/plugin-react'
import {
  ViteImageOptimizer
} from 'vite-plugin-image-optimizer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), ViteImageOptimizer({
    DEFAULT_OPTIONS
  }), ],
})



const DEFAULT_OPTIONS = {
  test: /\.(jpe?g|png|gif|tiff|webp|svg|avif)$/i,
  exclude: undefined,
  include: undefined,
  includePublic: true,
  logStats: true,
  ansiColors: true,
  svg: {
    multipass: true,
    plugins: [{
        name: 'preset-default',
        params: {
          overrides: {
            cleanupNumericValues: false,
            removeViewBox: false, // https://github.com/svg/svgo/issues/1128
          },
          cleanupIDs: {
            minify: true,
            remove: false,
          },
          convertPathData: false,
        },
      },
      'sortAttrs',
      {
        name: 'addAttributesToSVGElement',
        params: {
          attributes: [{
            xmlns: 'http://www.w3.org/2000/svg'
          }],
        },
      },
    ],
  },
  png: {
    // https://sharp.pixelplumbing.com/api-output#png
    quality: 60,
  },
  jpeg: {
    // https://sharp.pixelplumbing.com/api-output#jpeg
    quality: 60,
  },
  jpg: {
    // https://sharp.pixelplumbing.com/api-output#jpeg
    quality: 60,
  },
  tiff: {
    // https://sharp.pixelplumbing.com/api-output#tiff
    quality: 60,
  },
  // gif does not support lossless compression
  // https://sharp.pixelplumbing.com/api-output#gif
  gif: {},
  webp: {
    // https://sharp.pixelplumbing.com/api-output#webp
    lossless: true,
  },
  avif: {
    // https://sharp.pixelplumbing.com/api-output#avif
    lossless: true,
  },
  cache: true,
  cacheLocation: undefined,
};