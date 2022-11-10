const path = require('path')
const Dotenv = require('dotenv-webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: process.env.NODE_ENV,
    entry: './src/main.js',
    output:{
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    plugins: [new HtmlWebpackPlugin({
        template: "./src/index.html"
    }),
    new Dotenv()],
    module:{
        rules:[{
            test: /\.css$/i,
            use: ["style-loader", "css-loader"]
        }]
    }
}