const path=require('path');
const HtmlWebpackPlugin=require('html-webpack-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';
module.exports={
    mode:'development',
    context:path.resolve(__dirname,'src'),
    entry:{
        index:['babel-polyfill','./index.js'],
    },
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'bundle.[hash:10].js',
        publicPath:''
    },
    resolve:{
        extensions:['.css','.js','.jsx'],
        alias: {
            '@src': path.resolve(__dirname,'src'),
            '@components': path.resolve(__dirname,'src/components'),
            '@public': path.resolve(__dirname,'public')
        }
    },
    module:{
        rules:[
            {
                test:/\.(js|jsx)$/,
                use:['babel-loader'],
                exclude:path.resolve(__dirname,'node_modules')
            },
            {
                test:/\.(png|ico|jpg|jpeg|svg|ttf|rtf|eot|woff|woff2)$/,
                use:['file-loader']
            },
            {
                test:/\.css$/,
                use:[
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: isDev
                        }
                    },
                    'css-loader'
                ]
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:path.resolve(__dirname,'public/index.html'),
            favicon:path.resolve(__dirname,'public/favicon.png')
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            chunkFilename: 'chunkfile[id].css'
        })
    ],
    devServer:{
        port:2500,
        hot:isDev,
        historyApiFallback: true
    },
    devtool: isDev ? 'source-map' : 'eval',
    optimization:{
        minimize: !isDev,
        minimizer: [
            new CssMinimizerWebpackPlugin(),
            new TerserPlugin()
        ]
    }
}