const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const OpimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');


const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;


const optimization = () => {
    const config = {
        splitChunks: {
            chunks: 'all'
        }
    };
    if (isProd) {
        config.minimizer = [
            new TerserWebpackPlugin(),
            new OpimizeCssAssetsWebpackPlugin()
        ];
    };
    return config;
};


const generateHtmlPlugin = (fileName) => {
    return new HTMLWebpackPlugin({
        filename: `${fileName}.html`,
        template: `./src/templates/${fileName}.html`,
        minify: {
            collapseWhitespace: isProd
        },
        chunks: [`${fileName}`]
    });
};


const setHtmlPlugins = (pagesArray) => {
    const result = [];
    pagesArray.forEach(page => {
        result.push(generateHtmlPlugin(page));
    });
    return result;
};


const pages = setHtmlPlugins(['calendar', 'create_event']);
const [calendar, create_event] = pages;


module.exports = {
    mode: 'development',
    entry: {
        calendar: ['@babel/polyfill', './src/scripts/calendar.js'],
        create_event: ['@babel/polyfill', './src/scripts/create_event.js']
    },
    output: {
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, 'dist')
    },
    optimization: optimization(),
    devtool: "source-map",
    plugins: [
        calendar,
        create_event,
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css'
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.(sass|scss)$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
};