const path = require("path")

module.exports = ({ config, mode }) => {

  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    include: path.resolve(__dirname, "../"),
    use: [
      require.resolve("awesome-typescript-loader"),
      require.resolve("react-docgen-typescript-loader")
    ],
  })
  config.resolve.extensions.push(".ts", ".tsx")
  return config
}
