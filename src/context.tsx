import { Omit } from 'lodash'
import React from 'react'
import config from './config'
import { ConfigMap, IConfig } from './types'

export interface IConfigProps {
  config: Omit<IConfig, 'configs'> & {
    configs: ConfigMap,
  }
}

const context = React.createContext({
  configs: config,
})

const { Provider, Consumer } = context

const withConfig: <P extends IConfigProps>(
  Component: React.ComponentType<P>,
) => React.ComponentType<Omit<P, keyof IConfigProps>> = Component => props => (
  <Consumer>{config => <Component {...props} config={config} />}</Consumer>
)

export { Provider, withConfig }
