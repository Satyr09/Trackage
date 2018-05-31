module.exports = {
  entry : {app: './src/index.js',test:'./src/test.js',login:'./src/login.js',profile:'./src/profile.js', detailedview:'./src/detailedview.js'},
  output: {
    path : __dirname + '/public',
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test:/\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      { test: /\.css$/, use: [ 'style-loader', 'css-loader' ] },

    ]
  }
};
