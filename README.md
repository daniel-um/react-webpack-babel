# react-webpack-babel

- this serves as a refresher for setting up foundations of a minimal react + webpack + babel project
- this is not intended to be used as a boilerplate

## Genesis

- init project:
  - `npm init -y`
  - `git init`
  - `touch README.md .gitignore` and fill as needed
- init react:
  - `npm install react react-dom`
  - `touch index.html` and fill:
      ``` html
        <div id="react-dom-container"></div>
        <script src="index.jsx"></script>
      ```
  - `touch index.jsx` and fill:
      ```jsx
        import * as React from 'react';
        import ReactDom from 'react-dom';
        const reactDomContainer = document.getElemenentById('react-dom-container');
        const App = () => { return <h1>Good to go</h1> }
        const rootComponent = App();
        ReactDom.render(rootComponent, reactDomContainer);
      ```
- init babel (we're already using es6-style imports in the above jsx):
  - `npm install --save-dev @babel/core @babel/preset-env @babel/preset-react @babel/cli`
  - `touch babel.config.json` and fill:
      ```json
        {
          "presets": [
            "@babel/preset-env",
            "@babel/preset-react"
          ]
        }
      ```
  - now able to, for example, transpile via:
    - `npx babel index.jsx --out-dir lib` or
    - `node_modules/.bin/babel index.jsx --out-dir lib`
- init webpack (even the transpiled output -- index.js -- cannot be run because of the `require` statements, which is not understood in a browser -- it's node.js syntax):
  - `npm install --save-dev webpack webpack-cli`
  - `npm install --save-dev babel-loader` this one is needed to make babel work with webpack ("loaders" are a webpack thing)
  - `touch webpack.config.js` and fill:
    ```js
      const path = require('path');
      module.exports = {
        mode: 'development',
        entry: './index.jsx',
        output: {
          path: path.resolve(__dirname, 'dist'),
          filename: 'bundle.js'
        },
        module: {
          rules: [
            {
              test: /\.(js|jsx)$/, // regex for all js files in project
              exclude: /(node_modules)/,
              use: {
                loader: 'babel-loader',
                options: { // equiv to babel.config.json
                  presets: [
                    '@babel/preset-env',
                    '@babel/preset-react'
                  ]
                }
              }
            }
          ]
        }
      }
    ```
  - now able to bundle js via:
    - `npx webpack` or `node_modules/.bin/webpack`
- run react in browser:
  - point html to the bundle:
    - instead of `<script src="index.jsx">`
      - nor `<script src="lib/index.js">`
    - do this `<script src="dist/bundle.js">`
  - open index.html in browser
- clean up:
  - we no longer need the lib output dir
  - we no longer need babel.config.json (now handled via webpack.config.js)