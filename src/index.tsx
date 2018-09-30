import orderBy from 'lodash/orderBy'
import uniqBy from 'lodash/uniqBy'
import React from 'react'
import Core, { IndexProps } from './components'
import { defaultConfig } from './config'
import { Provider } from './context'
import createAction from './createAction'
import { IConfig, IUBBButtonConfig, IUBBConfig, IUBBCustomConfig, IUBBExtendConfig } from './types'

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

  // tslint:disable-next-line
  const Editor: React.SFC<IndexProps> = props => (
    <Provider value={{ configs }}>
      <Core {...props} />
    </Provider>
  )

  Editor.defaultProps = {
    onChange: () => null,
    value: '',
  }

  return Editor
}

export { IUBBConfig, IUBBButtonConfig, IUBBExtendConfig, IUBBCustomConfig, createAction }
