// webpack.config.js
const { VueLoaderPlugin } = require('vue-loader')
const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
    mode: 'production',
    entry: {
        app: [path.resolve(__dirname, "src/components/bootstrap.js"), path.resolve(__dirname, "styles/app.scss")],
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.(s(a|c)ss)$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ],
    },
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "assets/build")
    },
    plugins: [
        new VueLoaderPlugin(),
        new Dotenv()
    ],
}
