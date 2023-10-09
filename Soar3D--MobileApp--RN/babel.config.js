module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    [
      "module-resolver",
      {
        alias: {
          assets: "./src/assets",
          shared: "./src/shared",
          screens: "./src/screens",
          store: "./src/store",
        },
        extensions: [".ios.js", ".android.js", ".js", ".ts", ".tsx", ".json"],
      },
    ],
    "react-native-reanimated/plugin",
    "module:react-native-dotenv",
  ],
};
