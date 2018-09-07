const webpack = require('webpack');

const path = require('path');

const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

let outputDir = '/'

// 是否监听文件变化
let watchFlag = true;

const isProduction = (function() {
    return process.env.NODE_ENV.replace(/\s*/g, '') === 'production';
})();

// 打包提示
var packTips = 'DEV Environment 请耐心等待，正在打包文件...';

//生产环境 去除 warnings
if (isProduction) {
    watchFlag = false;
    outputDir = '/../../dist/m/';
    packTips = 'PRD Environment 请耐心等待，正在打包并压缩文件...';
}

module.exports = {
    cache: true,
    entry: {
        detail: './src/index.jsx',
        index: './src/index/index.jsx'
    },
    output: {
        path: __dirname + outputDir,
        filename: '[name].js?[hash:6]'
    },
    module: {
        rules: [{
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.hbs$/,
                use: 'handlebars-loader'
            },
            {
                test: /\.(tpl|html)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'ivy-template-loader',
                    options: {
                        minimize: true
                    }
                }
            }
        ]
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    compress: {
                        properties: false
                    }
                }
            })
        ]
    },
    watch: watchFlag,
    resolve: {
        extensions: ['.js', '.jsx', '.hbs', '.json', '.tpl', '.html']
    },
    externals: {
        'Spring': 'Spring',
        'react': 'React',
        'react-dom': 'ReactDOM'
    },
    devServer: {}
};