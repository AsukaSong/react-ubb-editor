const path = require("path")

module.exports = (baseConfig, env, defaultConfig) => {

  defaultConfig.module.rules.push({
    test: /\.(ts|tsx)$/,
    include: path.resolve(__dirname, "../"),
    use: [
      require.resolve("awesome-typescript-loader"),
      require.resolve("react-docgen-typescript-loader")
    ],
  })
  defaultConfig.resolve.extensions.push(".ts", ".tsx")
  return defaultConfig
}
