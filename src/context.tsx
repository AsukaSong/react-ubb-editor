import React from 'react'
import config from './config'
import { ConfigMap, IConfig, Omit } from './types'

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
  // @ts-ignore
  // FIXME: move to hooks
  <Consumer>{config => <Component {...props} config={config} />}</Consumer>
)

export { Provider, withConfig }
