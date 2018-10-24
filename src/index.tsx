import orderBy from 'lodash/orderBy'
import uniqBy from 'lodash/uniqBy'
import React from 'react'
import Core, { Core as CoreType, IProps } from './components'
import defaultConfig from './config'
import { Provider } from './context'
import createAction from './createAction'
// prettier-ignore
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
  let configs!: IUBBConfig[]

  if (ignoreDefaultConfig) {
    if (!extraConfig.configs) {
      throw new Error('need extra config with ignoreDefaultConfig specified')
    }
    configs = extraConfig.configs
  } else if (extraConfig.configs) {
    configs = uniqBy([...extraConfig.configs, ...defaultConfig], 'tagName')
  } else {
    configs = defaultConfig
  }

  configs = orderBy(configs, ['index'], ['asc'])
  const config = Object.assign({}, extraConfig, { configs })

  const Editor: React.SFC<IProps> = props => (
    <Provider value={config}>
      <Core {...props} />
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
