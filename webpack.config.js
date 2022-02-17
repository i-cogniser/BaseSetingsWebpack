const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

process.env.NODE_ENV === 'production' ?
   mode = 'production' :
   mode = 'development'



console.log('mode ' + mode);

module.exports = {
   mode: mode,

   entry: {
      scripts: './src/index.js',
      user: './src/index.js'
   },

   output:
   {
      filename: '[name].[contenthash].js',
      assetModuleFilename: "assets/[hash][ext][query]",
      clean: true,
   },

   devtool: 'source-map',

   optimization: {
      splitChunks: {
         chunks:'all',
      }
   },

   plugins:
   [
      new MiniCssExtractPlugin({
         filename: '[name].[contenthash].css'
      }),

      new HtmlWebpackPlugin({
         template: './src/index.pug'
      }),
   ],

   module:
   {

      rules:
      [
         {  /* html */
            test: /\.html$/i,
            loader: "html-loader",
         },

         {  /* styles */
            test: /\.(sa|sc|c)ss$/,
            use:[

               (mode === 'development')
               ? "style-loader"
               : MiniCssExtractPlugin.loader,
               "css-loader",

                  {
                  loader: "postcss-loader",
                     options:
                     {
                        postcssOptions:
                        {
                           plugins:
                           [
                              [
                                 "postcss-preset-env",
                                 { /* Options */},
                              ],
                           ],
                        },
                     },
                  },
               "sass-loader",
            ],
         },

         {  /* images */
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: 'asset/resource',
         },

         {  /* fonts */
            test: /\.(woff|woff2|eot|ttf|otf)$/i,
            type: 'asset/resource',
         },

         {  /* pug */
            test: /\.pug$/,
            loader: 'pug-loader',
            exclude: /node_modules|bower_components/,
         },

         {  /* js */
            test: /\.js$/,
            exclude: /node_modules/,

            use:
            {
               loader: 'babel-loader',

               options:
               {
                  presets:
                  [
                     '@babel/preset-env'
                  ]
               }
            }
         },
      ],
   }
}
