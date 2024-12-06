// Generated using webpack-cli https://github.com/webpack/webpack-cli

import path from "path";
import  {BundleAnalyzerPlugin} from "webpack-bundle-analyzer";
import pkg from "webpack";
import TerserPlugin from "terser-webpack-plugin";
const { BannerPlugin } = pkg;
const isProduction = process.env.NODE_ENV == "production";

const config = {
  entry: "./src/index.ts",
  output: {
    path: path.resolve(process.cwd(), "bin"),
    libraryTarget: "module",
    filename: (pathData) => {
      if (pathData.chunk.name === "main") {
        return "[name].js";
      } else {
        return "[name].[contenthash].js";
      }
    },
  },
  target: "node",
  experiments: {
    outputModule: true, // 启用 ES模块输出的实验特性
  },
  plugins: [
    new BannerPlugin({
      banner: "#!/usr/bin/env node\n", // 添加 shebang 行
      raw: true, // 保证 banner 中的内容不会被处理成字符串
      entryOnly: true, // 只在入口文件的打包结果中添加
    }),
    new BundleAnalyzerPlugin(),
  ],
  resolve: {
    extensions: [".ts", ".js", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: "ts-loader",
        exclude: ["/node_modules/"],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", "..."],
  },
  optimization: {
    // splitChunks: {
    //   cacheGroups: {
    //     vendor: {
    //       test: /[\\/]node_modules[\\/](execa|commander|chalk|@inquirer)[\\/]/,
    //       name: "vendor", // 提取 node_modules 中的模块
    //       chunks: "initial", // 拆分所有模块
    //       enforce: true,
    //     },
    //     babel: {
    //       test: /[\\/]node_modules[\\/]([^\\/]*babel[^\\/]*)([\\/])/,
    //       name: "babel", // 提取 node_modules 中的模块
    //       chunks: "initial", // 拆分所有模块
    //       enforce: true,
    //     },
    //   },
    // },
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          compress: {
            // 删除 console 语句
            drop_console: false, // 保留 console
          },
        },
      }),
    ],
  },
};

export default () => {
  if (isProduction) {
    config.mode = "production";
  } else {
    config.mode = "development";
  }
  return config;
};
