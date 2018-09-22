const path = require("path");
const ROOT_PATH = path.resolve(process.cwd())

module.exports = (baseConfig, env, defaultConfig) => {

  defaultConfig.module.rules.push({
    test: /\.(ts|tsx)$/,
    include: path.resolve(__dirname, "../src"),
    loader: require.resolve("awesome-typescript-loader"),
  });
  defaultConfig.resolve.extensions.push(".ts", ".tsx")
  defaultConfig.resolve.alias = {
    src: path.resolve(ROOT_PATH, 'src')
  }

  return defaultConfig
}
