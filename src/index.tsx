import React from 'react'
import uniqBy from 'lodash/uniqBy'
import orderBy from 'lodash/orderBy'
import {
  IUBBConfig,
} from 'src/types'
import { defaultConfig } from './config'
import { Provider } from './context'
import Core from './components'


export type props = {
  value: string
  onChange: (value: string) => void
  option?: any // TODO
}

export interface Config {
  configs?: IUBBConfig[]
}

export default function createEditor(extraConfig: Config = {}, ignoreDefaultConfig = false) {
  let configs!: IUBBConfig[];

  if(ignoreDefaultConfig) {
    if(!extraConfig.configs) throw new Error('need extra config with ignoreDefaultConfig specified')
    configs = extraConfig.configs
  } else if(extraConfig.configs) {
    configs = uniqBy([ ...extraConfig.configs, ...defaultConfig ], 'tagName')
  } else {
    configs = defaultConfig
  }

  configs = orderBy(configs, ['index'], ['asc'])

  const Editor: React.SFC<props> = (props) => (
    <Provider value={{
      configs,
    }}>
      <Core {...props} />
    </Provider>
  )

  Editor.defaultProps = {
    value: '',
    onChange: () => null,
  }

  return Editor
}
