/*
 * @description
 *   Please write the webpack.front.config.js script's description
 * @author rdshoep(rdshoep@126.com)
 *   http://www.rdshoep.com/
 * @version 
 *   1.0.0(2017/8/3)
 */
const webpack = require('webpack')
    , path = require('path')
    , ManifestPlugin = require('webpack-manifest-plugin')
    , ExtractTextPlugin = require("extract-text-webpack-plugin")
    , CleanWebpackPlugin = require('clean-webpack-plugin');

const entry = {
    app: './src/app/index.js',
}

const output = {
    path: __dirname + '/dist/',
    filename: '[name].[chunkhash].js',
    publicPath: '/dist/',
};

const resolve = {
    extensions: ['.js', '.jsx', '.css', '.less'],
    modules: [
        'src'
    ]
}

const commonExtractCss = new ExtractTextPlugin({
    filename: 'common.[contenthash].css',
    allChunks: true
})
    , projectExtractCss = new ExtractTextPlugin({
    filename: 'app.[contenthash].css',
    allChunks: true
});
const rules = [
    {
        test: /\.less$/,
        include: [path.resolve(__dirname, './src/app')],
        use: projectExtractCss.extract({
            fallback: "style-loader",
            use: [
                {loader: 'css-loader', options: {minimize: true, importLoaders: 1}},
                'less-loader'
            ]
        })
    },
    {
        test: /\.less$/,
        exclude: [path.resolve(__dirname, './src/app')],
        use: commonExtractCss.extract({
            fallback: "style-loader",
            use: [
                {loader: 'css-loader', options: {minimize: true, importLoaders: 1}},
                'less-loader'
            ]
        })
    }
]

const plugins = [
    new CleanWebpackPlugin(['dist']),
    commonExtractCss,
    projectExtractCss,
    new ManifestPlugin({
        basePath: '/dist/'
    })
];

module.exports = {
    entry,
    output,
    resolve,
    module: {
        rules
    },
    plugins
};
