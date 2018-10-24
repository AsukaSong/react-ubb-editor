import { Omit } from 'lodash'
import * as React from 'react'
import defaultConfig from './config'
import { IConfig, IUBBConfig } from './types'

export interface IConfigProps {
  config: IConfig & {
    configs: IUBBConfig[],
  }
}

const context = React.createContext({
  configs: defaultConfig,
})

const { Provider, Consumer } = context

const withConfig: <P extends IConfigProps>(
  Component: React.ComponentType<P>,
) => React.ComponentType<Omit<P, keyof IConfigProps>> = Component => props => (
  <Consumer>{config => <Component {...props} config={config} />}</Consumer>
)

export { Provider, withConfig }
