import React from 'react'
import uniqBy from 'lodash/uniqBy'
import orderBy from 'lodash/orderBy'
import {
  IUBBConfig,
  Config,
  IUBBButtonConfig,
  IUBBExtendConfig,
  IUBBCustomConfig
} from 'src/types'
import { defaultConfig } from './config'
import { Provider } from './context'
import Core, { indexProps } from './components'
import createAction from './actionCreator'

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

  const Editor: React.SFC<indexProps> = (props) => (
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

export {
  IUBBConfig,
  IUBBButtonConfig,
  IUBBExtendConfig,
  IUBBCustomConfig,
  createAction,
}