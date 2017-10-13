const path = require('path');
const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const express = require('express');
const chalk = require('chalk');
const createConfigs = require('./createConfigsScript');
const {
    serverPort,
    serverHost,
    serverProtocol,
    componentsRootDir
} = require('./config');

/**
 * Just a simple webpack config, you can replace or extend it
 */
const webpackConfig = {
    devtool: 'cheap-module-source-map',
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
                test: /\.(js|jsx)$/,
                exclude: /node_modules.*/,
                use: [{
                    loader: require.resolve('babel-loader'),
                    options: {
                        babelrc: false,
                        presets: [
                            require.resolve('babel-preset-env'),
                            require.resolve('babel-preset-react')
                        ],
                        plugins: [
                            require.resolve('babel-plugin-transform-object-rest-spread'),
                            require.resolve('babel-plugin-syntax-dynamic-import')
                        ],
                        cacheDirectory: true
                    }
                }]
            },
            {
                test: /\.css$/,
                use: [
                    require.resolve('style-loader'),
                    require.resolve('css-loader'),

                    /**
                     * To support scss/sass files -
                     * 1. un comment line below 
                     * 2. run `npm i -D sass-loader node-sass-chokidar`
                     * 3. change the 'test' to `/\.scss$/` instead of the current `/\.css$/`
                     */
                    // require.resolve('sass-loader')
                ]
            }
        ]
    },
    // Mock node libs in case some npm pkg depend on them
    node: {
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
    },
    performance: {
        hints: false
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
    new GenerateUiZooConfigsPlugin(),
    new webpack.NamedModulesPlugin()
]);
webpackConfig.devServer = {
    inline: true,
    hot: true
};

// The Web Dev server
const server = new WebpackDevServer(webpack(webpackConfig), {
    contentBase: 'uizoo-app/',
    hot: true,
    noInfo: true,
    compress: true,
    https: serverProtocol === 'https',
    host: serverHost,
    before: (app) => {
        app.use('[/]', (req, res) => { // redirect on exact '/' url to /uizoo
            res.redirect('/uizoo');
        });
        app.use(express.static(componentsRootDir));
        app.all('/uizoo*', (req, res) => { // this is needed for the client router to work
            res.sendFile('index.html', {
                root: __dirname
            });
        });
    }
});

let {cyan, grey} = chalk;
server.listen(serverPort, 'localhost', () => {
    console.log(`    ${grey(`+*+*+`)} ${chalk.cyan(`UiZoo up on localhost:${serverPort}`)} ${grey(`+*+*+`)}`);
});