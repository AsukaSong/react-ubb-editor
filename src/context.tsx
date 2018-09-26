import * as React from 'react'
import { Omit } from 'lodash'
import { defaultConfig } from './config'
import { Config } from './index'
import { IUBBConfig } from 'src/types'

export interface ConfigProps {
  config: Config & {
    configs: IUBBConfig[]
  }
}

const context = React.createContext({
  configs: defaultConfig
})

const { Provider, Consumer } = context

export function withConfig<P extends ConfigProps>(Component: React.ComponentType<P>): React.ComponentType<Omit<P, keyof ConfigProps>> {
  return function(props) {
    return (
      <Consumer>
        {config => <Component {...props} config={config} />}
      </Consumer>
    )
  }
}

export {
  Provider,
}
