const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = nodeEnv === 'production';

const sourcePath = path.join(__dirname, './src');
const staticPath = path.join(__dirname, './dist');

const commonCssOptions = {
  context: path.resolve(__dirname, '.'),
  output: {
    path: 'dist',
  },
};

const plugins = [
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: Infinity,
    filename: 'vendor.bundle.js',
  }),
  new webpack.DefinePlugin({
    'process.env': { NODE_ENV: JSON.stringify(nodeEnv) },
  }),
  new webpack.NamedModulesPlugin(),
  new ExtractTextPlugin({ filename: 'css/bundle.css', disable: false, allChunks: true }),
];

if (isProd) {
  plugins.push(
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
      options: commonCssOptions,
    })
  );
} else {
  plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.LoaderOptionsPlugin({
      options: commonCssOptions,
    })
  );
}

module.exports = {
  devtool: isProd ? false : 'cheap-module-source-map',
  entry: {
    js: './src/index.js',
    vendor: [
      'react',
      'react-dom',
    ],
  },
  output: {
    path: staticPath,
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: {
          loader: 'file-loader',
          query: {
            name: '[name].[ext]',
          },
        },
      },
      {
        test: /\.s?css$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
              localIdentName: '[name]__[local]_[hash:base64:5]',
            },
          },
          'sass-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js', '.jsx'],
    modules: [
      path.resolve(__dirname, 'node_modules'),
      sourcePath,
    ],
    alias: {
      components: path.resolve(__dirname, './src/components'),
    },
  },
  plugins,
  devServer: {
    contentBase: './src',
    historyApiFallback: true,
    host: '0.0.0.0',
    port: 3000,
    compress: isProd,
    inline: !isProd,
    hot: !isProd,
    quiet: true,
    stats: {
      assets: true,
      children: false,
      chunks: false,
      hash: false,
      modules: false,
      publicPath: false,
      timings: true,
      version: false,
      warnings: false,
      colors: {
        green: '\u001b[32m',
      },
      performance: {
        hints: false,
      },
    },
  },
  externals: {
    cheerio: 'window',
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
  },
};
