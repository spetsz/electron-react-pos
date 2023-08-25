const path = require("path");
const WebpackObfuscator = require("webpack-obfuscator");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./renderer/index.js",
  devtool: "inline-source-map",
  target: "electron-renderer",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  targets: {
                    esmodules: true,
                  },
                },
              ],
              "@babel/preset-react",
            ],
          },
        },
      },
      {
        test: [/\.s[ac]ss$/i, /\.css$/i],
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: ["file-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".js"],
  },

  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false,
          },
          mangle: true, // Obfuscation
          compress: true,
        },
      }),
    ],
  },

  plugins: [
    new WebpackObfuscator({
      rotateUnicodeArray: true,
    }),
  ],

  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "build", "js"),
  },
};
