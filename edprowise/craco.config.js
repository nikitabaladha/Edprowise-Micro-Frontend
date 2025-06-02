const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");

const smp = new SpeedMeasurePlugin();

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Wrap with speed-measure-webpack-plugin for timing
      return smp.wrap(webpackConfig);
    },
  },
  babel: {
    plugins: [
      [
        "babel-plugin-styled-components",
        {
          pure: true,
          displayName: true,
        },
      ],
      [
        "@babel/plugin-proposal-class-properties",
        {
          loose: true,
        },
      ],
      [
        "@babel/plugin-proposal-private-methods",
        {
          loose: true,
        },
      ],
      [
        "@babel/plugin-proposal-private-property-in-object",
        {
          loose: true,
        },
      ],
      "@babel/plugin-syntax-dynamic-import",
    ],
  },
};
