const path = require('path');

module.exports = {
    entry: './src/BrowserLogic/init.ts',
    mode: "production",
    watchOptions: {
        ignored: ["node_modules"]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader',
                ],
            },
        ],
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ],
    },
    target: "electron-renderer",
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build'),
    },
};