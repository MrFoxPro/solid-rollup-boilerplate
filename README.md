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

## HTML Plugin explanation

This boilerplate temporary uses fork of rollup-plugin-html2. Check [this PR](https://github.com/mentaljam/rollup-plugin-html2/pull/7)

`Thanks to @high1 for inspiring & creating jest setup`

## TODO

- Split configuration for modern and legacy browsers.  
  This bolierplate is configured with @babel/preset-env to support Edge browser.  
  For more modern browsers you could completely remove preset-env and uncomment `manualChunks` in config

- Setup tests
- Add build-time typechecking
- Create true differential build for modern/legacy browsers
- Add option to transpile Service Worker to CommonJS due to chromium bug
- Find/Create more perfomant livereload plugin
