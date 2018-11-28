import { CacheProvider } from '@emotion/core'
import { cache } from 'emotion'
import React from 'react'

import Core, { Core as CoreType, IProps } from './components'
import configMap from './config'
import { Provider } from './context'
import createAction from './createAction'
import {
  ConfigType,
  ExtendValueType,
  IAction,
  IConfig,
  ICustomComponentProps,
  IState,
  IUBBButtonConfig,
  IUBBConfig,
  IUBBCustomConfig,
  IUBBExtendConfig,
} from './types'

export default function createEditor(extraConfig: IConfig = {}, ignoreDefaultConfig = false) {
  let configs = { ...configMap }

  if (ignoreDefaultConfig) {
    if (!extraConfig.configs) {
      throw new Error('need extra config with ignoreDefaultConfig specified')
    }
    configs = {}
  }

  if (extraConfig.configs) {
    extraConfig.configs.forEach(item => (configs[item.tagName] = item))
  }

  const Editor: React.SFC<IProps> = props => (
    <Provider value={{ ...extraConfig, configs }}>
      <CacheProvider value={cache}>
        <Core {...props} />
      </CacheProvider>
    </Provider>
  )

  return Editor
}

export {
  IUBBConfig,
  IUBBButtonConfig,
  IUBBExtendConfig,
  IUBBCustomConfig,
  IConfig,
  ICustomComponentProps,
  createAction,
  ConfigType,
  ExtendValueType,
  IAction,
  IState,
  CoreType,
}
