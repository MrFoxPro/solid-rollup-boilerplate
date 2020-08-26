# Solid JS ❤ Rollup

## Ingredients

🏎 Solid JS  
🍣 Rollup  
🧼 Babel + Typescript + ESLint + Prettier  
📑 Jest  
🔃 Routing  
📴 PWA Powered  
🖍 SCSS modules + assets resolution  
🔠 Inline SNG  
🛰 Native ES Modules with `modulepreload`  
👨‍💻 CSS Modules assistance

## Usage

`git clone https://github.com/MrFoxPro/solid-rollup-boilerplate.git && npm i`  
run `npm start` and open `http://localhost:3000`  
After every change you need manually reload page to see changes. You could enable livereloading with `https://www.npmjs.com/package/rollup-plugin-livereload`, but it significaly slows down build speed  
![alt](https://i.imgur.com/Dupj25y.png)  
run `npm run build` to create optimized build

text from https://philipwalton.com/articles/using-native-javascript-modules-in-production-today/

## Why deploy real modules?

If you’re already using a bundler like webpack, and you’re already using granular code splitting and preloading those files (similar to what I describe here), you might be wondering whether it’s worth switching to a strategy that uses real modules. Here are a few reasons why I think you should consider it, and why bundling to real modules is better than using classic scripts with their own module-loading code.

### Smaller total code footprint

When using real modules, users on modern browsers don’t have to load any unnecessary module loading or dependency management code. For example the webpack runtime and manifest would not be needed at all if using real modules.

### Better preloading

So regardless of how granularly you code-split your app, it’s more performant to load chunks using import statements and modulepreload than it is to load them via classic script tags and regular preload (especially if those tags are dynamically generated and added to the DOM at runtime).  
In other words, a Rollup bundle consisting of 20 module chunks will load faster than the same code base bundled to 20 classic-script chunks with webpack (not because it’s webpack, but because it’s not real modules).

## HTML2 Plugin explanation

This boilerplate temporary uses fork of rollup-plugin-html2. Check [this PR](https://github.com/mentaljam/rollup-plugin-html2/pull/7)

Thanks to [@high1](https://github.com/high1) for jest configuration  
Thanks to [@philipwalton](https://github.com/philipwalton) for great articles about native modules and simple rollup setup

## Useful articles

[Using Native ES Modules](https://philipwalton.com/articles/using-native-javascript-modules-in-production-today)
[Preloading modules](https://developers.google.com/web/updates/2017/12/modulepreload)

## TODO

- Split configuration for modern and legacy browsers.  
  This bolierplate is configured with @babel/preset-env to support Edge browser.  
  For more modern browsers you could completely remove preset-env and uncomment `manualChunks` in config

- Setup tests
- Add build-time typechecking
- Create true differential build for modern/legacy browsers
- Add option to transpile Service Worker to CommonJS due to chromium bug
- Find/Create more perfomant livereload plugin
