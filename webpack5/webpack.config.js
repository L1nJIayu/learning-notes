const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { DefinePlugin } = require('webpack')

module.exports = {
    entry: './src/main.js',
    output: {
        filename: 'build.js',
        path: path.resolve(__dirname, 'dist'),
        // assetModuleFilename: 'static/[name]-[hash:6][ext]'   // 资源文件统一配置
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            esModule: false
                        }
                    },
                    'postcss-loader'
                ]
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
            },
            // {
            //     test: /\.png|svg|jpe?g$/,
            //     use: [
            //         // 'file-loader'
            //         {
            //             // loader: 'file-loader',
            //             loader: 'url-loader',
            //             options: {
            //                 // esModule: false,
            //                 name: 'imgs/[name]-[hash:6].[ext]',
            //                 // name: '[name]-[hash:6].[ext]',
            //                 // outputPath: 'imgs'
            //                 limit: 200 * 1024
            //             }
            //         }
            //     ]
            // },
            // {
            //     test: /\.png|svg|jpe?g$/,
            //     type: 'asset/resource',
            //     generator: {
            //         filename: 'static/imgs/[name]-[hash:6][ext]'
            //     }
            // },
            // {
            //     test: /\.png|svg|jpe?g$/,
            //     type: 'asset/inline'
            // },
            {
                test: /\.png|gif|jpe?g|svg$/,
                type: 'asset',
                generator: {
                    filename: 'static/imgs/[name]-[hash:6][ext]'
                },
                parser: {
                    dataUrlCondition: {
                        maxSize: 20 * 1024
                    }
                }
            },
            {
                test: /\.(ttf|woff2?)$/,
                type: 'asset',
                generator: {
                    filename: 'static/fonts/[name]-[hash:3][ext]'
                }
            },
            {
                test: /^\.js$/,
                use: ['babel-loader']
                // use: [
                //     {
                //         loader: 'babel-loader',
                //         options: {
                //             // plugins: [
                //             //     '@babel/plugin-transform-arrow-functions',
                //             //     '@babel/plugin-transform-block-scoping'
                //             // ]
                //             // presets: [
                //             //     [
                //             //         '@babel/preset-env',
                //             //         { targets: 'chrome 91' }
                //             //     ]
                //             // ]
                //         }
                //     }
                // ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'html-webpack-plugin',
            template: './public/index.html'
        }),
        new DefinePlugin({
            BASE_URL: '"./"'
        })
    ]
}