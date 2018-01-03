let path = require("path");
module.exports = {
    entry: [
      './src/index.js'
    ],
    output: {
      path: path.resolve(__dirname, "public"),
      filename: 'bundle.js'
    },
    module: {
      loaders: [{
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets:[ 'es2015', 'react', 'stage-2' ]}
      },
      { test: /\.css$/, loader: 'css-loader' }]
    },
    resolve: {
      extensions: ['.js', '.jsx']
    },
    devServer: {
      historyApiFallback: true,
      contentBase: './public/'
    }
  };