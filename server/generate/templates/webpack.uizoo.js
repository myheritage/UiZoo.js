const path = require('path');
const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const express = require('express');

const SERVER_PORT = 5005;
const componentsRoot = path.dirname(__dirname);

const webpackConfig = {
    entry: {
        app: [path.join(__dirname, 'index.js')],
    },
    output: {
        filename: 'components.js',
        path: __dirname,
        publicPath: path.sep,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules.*/,
                use: [
                    {
                        loader: require.resolve('babel-loader'),
                        options: {
                            presets: [
                                require.resolve('babel-preset-env'),
                                require.resolve('babel-preset-react')
                            ],
                            plugins: [
                                require.resolve('babel-plugin-transform-object-rest-spread'),
                                require.resolve('babel-plugin-syntax-dynamic-import')
                            ],
                        }
                    },
                ],
            },
        ]
    },
};

// Addition to the config for the web dev server
webpackConfig.entry.app.push(`webpack-dev-server/client?http://localhost:${SERVER_PORT}/`, "webpack/hot/dev-server");
webpackConfig.plugins = [].concat(webpackConfig.plugins || [], [
    new webpack.HotModuleReplacementPlugin()
]);
webpackConfig.devServer = {
    inline: true,
    hot: true
};

const server = new WebpackDevServer(webpack(webpackConfig), {
    contentBase: 'uizoo-app/',
    hot: true,
    noInfo: true,
    before: (app) => {
        app.use('[/]', (req, res) => {
            res.redirect('/uizoo');
        });
        app.use(express.static(componentsRoot));
        app.all('/uizoo*', (req, res) => {
            res.sendFile('index.html', {root: __dirname});
        });
    },
});

server.listen(SERVER_PORT, 'localhost', () => {
    console.log(`    +*+*+ UiZoo on localhost:${SERVER_PORT} +*+*+`);
});