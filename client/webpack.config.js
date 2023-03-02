const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");

module.exports = () => {
  return {
    mode: "development",
    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js",
    },
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    plugins: [
      // webpack plugin that generates HTML file and injects bundles
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        title: "Offline Text",
      }),
      // injects our custom service worker
      new InjectManifest({
        swSrc: "./src/sw.js",
        swDest: "sw.js",
      }),
      // generates a manifest file
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: "Offline Text",
        short_name: "Offline Text",
        description: "An offline text editor",
        background_color: "#01579b",
        theme_color: "#ffffff",
        start_url: "/",
        publicPath: "/",
        icons: [
          {
            src: path.resolve("src/images/icon.png"),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join("assets", "icons"),
          },
        ],
      }),
    ],

    module: {
      // css loaders
      rules: [
        {
          test: /\.css$/i,
          exclude: /node_modules/,
          // use babel-loader in order to use ES6
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: [
                "@babel/plugin-proposal-object-rest-spread",
                "@babel/transform-runtime",
              ],
            },
          },
        },
      ],
    },
  };
};
