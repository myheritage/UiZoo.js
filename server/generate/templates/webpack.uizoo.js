const path = require('path');
const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const express = require('express');
const createConfigs = require('./createConfigsScript');
const {serverPort, componentsRootDir} = require('./config');

/**
 * Just a simple webpack config, you can replace or extend it
 */
const webpackConfig = {
    entry: {
        app: [path.join(__dirname, 'index.js')]
    },
    output: {
        filename: 'components.js',
        path: __dirname,
        publicPath: path.sep
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
                    }
                ]
            }
        ]
    }
};

/**
 * Plugin to create the UiZoo config on each file change while using the webpack dev server
 * @class GenerateUiZooConfigsPlugin
 */
class GenerateUiZooConfigsPlugin {
    apply(compiler) {
        compiler.plugin('watch-run', (c, cb) => {
            createConfigs()
                .then(() => cb())
                .catch(e => console.error(e));
        });
    }
}

// Addition to the config for the web dev server
webpackConfig.entry.app.push(`webpack-dev-server/client?http://localhost:${serverPort}/`, "webpack/hot/dev-server");
webpackConfig.plugins = [].concat(webpackConfig.plugins || [], [
    new webpack.HotModuleReplacementPlugin(),
    new GenerateUiZooConfigsPlugin()
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
        app.use('[/]', (req, res) => { // redirect on exact '/' url
            res.redirect('/uizoo');
        });
        app.use(express.static(componentsRootDir));
        app.all('/uizoo*', (req, res) => { // this is needed for the client router to work
            res.sendFile('index.html', {root: __dirname});
        });
    }
});

server.listen(serverPort, 'localhost', () => {
    console.log(`    +*+*+ UiZoo on localhost:${serverPort} +*+*+`);
});