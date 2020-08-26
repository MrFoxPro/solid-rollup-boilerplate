import html2 from 'rollup-plugin-html2';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import alias from '@rollup/plugin-alias';
import path from 'path';
import { terser } from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';
import visualizer from 'rollup-plugin-visualizer';
import serve from 'rollup-plugin-serve';
import url from '@rollup/plugin-url';
import strip from '@rollup/plugin-strip';
import cssUrl from 'postcss-url';
import svg from 'rollup-plugin-inline-svg';
import manifest from 'rollup-plugin-manifest-json';
import copy from 'rollup-plugin-copy';
import replace from '@rollup/plugin-replace';

const extensions = ['ts', 'tsx', 'js', 'jsx'].map((x) => '.' + x);
const preload = ['solid-js', 'router5', 'serviceWorker'];
const production = process.env.NODE_ENV === 'production';

/** @type {import('rollup').RollupOptions} */
const config = {
  input: ['src/index.tsx', 'src/workers/serviceWorker.ts'],
  treeshake: production,
  preserveEntrySignatures: false,
  watch: {
    clearScreen: true,
  },
  output: {
    sourcemap: !production ? 'inline' : false,
    dir: 'dist',
    format: 'es',
    chunkFileNames: '[name].[hash].mjs',
    entryFileNames: '[name].[hash].mjs',
    minifyInternalExports: production,
    // comment this for Microsoft Edge
    manualChunks: (id) => {
      const { ext, name: fileName } = path.parse(id);
      if (!extensions.includes(ext)) return;
      let name = fileName;
      if (id.includes('node_modules')) {
        const directories = id.split(path.sep);
        name = directories[directories.lastIndexOf('node_modules') + 1];
      }
      const lib = preload.find((x) => name.includes(x));
      if (lib) return lib;
      // force keep deps in the default chunk.
      if (name === 'loadash.throttle') {
        return;
      }
      return;
    },
  },
  plugins: [
    nodeResolve({
      extensions,
    }),
    babel({
      extensions,
      babelHelpers: 'bundled',
      presets: [
        // use this for Microsoft Edge
        // [
        //   '@babel/preset-env',
        //   {
        //     useBuiltIns: 'usage',
        //     corejs: 3,
        //     forceAllTransforms: true,
        //     targets: { browsers: 'last 2 versions' },
        //   },
        // ],
        'solid',
        '@babel/preset-typescript',
      ],
      // use this for Microsoft Edge
      // plugins: [
      //   '@babel/plugin-syntax-dynamic-import',
      //   '@babel/proposal-class-properties',
      //   '@babel/plugin-proposal-object-rest-spread',
      // ],
      // use use this for Microsoft Edge
      // exclude: [
      //   /(node_modules\/)(?!(solid-js|router5|solid-typefu-router5))/,
      //   /node_modules\/core-js/,
      // ],
      exclude: /node_modules\//,
    }),
    commonjs({
      extensions,
    }),
    replace({
      values: {
        'process.env.PUBLIC_URL': production
          ? '"https://xn--80ac0abgzx.xn--p1ai/"'
          : '"localhost:3000"',
      },
    }),
    postcss({
      modules: {
        generateScopedName: production ? '[local][hash:base64:2]' : undefined,
      },
      minimize: production,
      extract: true,
      to: path.resolve(__dirname, 'dist', 'assets'),
      plugins: [
        cssUrl({
          filter: /\.(png|jpg|ttf|svg)/,
          url: 'copy',
          useHash: true,
          basePath: '.',
        }),
      ],
    }),
    url({
      limit: 2048,
      exclude: /\.svg/,
    }),
    svg(),
    !production &&
      serve({
        contentBase: './dist',
        port: 3000,
        historyApiFallback: true,
      }),
    html2({
      template: './src/assets/index.html',
      modules: true,
      preload: preload.map((name) => ({
        rel: 'modulepreload',
        type: 'script',
        name,
      })),
      exclude: ['serviceWorker'],
      minify: {
        minifyCSS: production,
        minifyURLs: production,
        removeComments: production,
        removeEmptyAttributes: production,
        removeTagWhitespace: production,
        removeRedundantAttributes: production,
        removeAttributeQuotes: production,
        minifyJS: production,
      },
      externals: [],
    }),
    alias({
      entries: [{ find: '@', replacement: path.join(__dirname, 'src') }],
    }),
    manifest({
      input: 'manifest.json',
      minify: production,
    }),
    copy({
      flatten: true,
      overwrite: true,
      targets: [
        {
          src: './src/assets/images/favorite/*.*',
          dest: './dist',
        },
      ],
    }),
    production && strip(),
    production &&
      terser({
        toplevel: true,
        compress: true,
        module: true,
        format: {
          comments: false,
          ecma: 2020,
        },
      }),
    production &&
      visualizer({
        open: false,
        bundlesRelative: true,
      }),
  ],
};
export default config;
