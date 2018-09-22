import * as React from 'react'
import {
  IUBBConfig,
} from './types'
import { Omit } from 'lodash';
import { defaultConfig } from './config'


const context = React.createContext(defaultConfig)
const { Provider, Consumer } = context
export interface ConfigProps { configs: IUBBConfig[] }

export function withConfig<P extends ConfigProps>(Component: React.ComponentType<P>): React.ComponentType<Omit<P, keyof ConfigProps>> {
  return function(props) {
    return (
      <Consumer>
        {configs => <Component {...props} configs={configs} />}
      </Consumer>
    )
  }
}

export {
  Provider,
}
