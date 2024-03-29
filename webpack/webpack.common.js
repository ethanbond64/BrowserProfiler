const webpack = require("webpack");
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const srcDir = path.join(__dirname, "..", "src");

const browser = process.env.BROWSER || 'chrome';

module.exports = {
    entry: {
        popup: path.join(srcDir, 'Popup.tsx'),
        background: path.join(srcDir, 'Background.ts'),
        content_script: path.join(srcDir, 'ContentScript.tsx'),
    },
    output: {
        path: path.join(__dirname, "../dist/js"),
        filename: "[name].js",
    },
    optimization: {
        splitChunks: {
            name: "vendor",
            chunks(chunk) {
                return chunk.name !== 'background';
            }
        },
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            }, {
                test: /\.css$/i,
                use: ["style-loader", "css-loader", "postcss-loader"],
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".css"]
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: ".", to: "../", context: "public" },
                {
                    from: `./manifest.${browser}.json`,
                    to: '../manifest.json',
                    context: "public"
                }],
            options: {},
        }),
    ],
};
