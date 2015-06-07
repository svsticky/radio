var webpack = require('webpack');  
var path = require('path');
module.exports = {  
    entry: [
      'webpack/hot/only-dev-server',
      "./src/app"
    ],
    devtool: 'source-map',
    output: {
        path: __dirname + '/build',
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loaders: ['react-hot', 'babel-loader?stage=1']}
        ]
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
    ]

};
