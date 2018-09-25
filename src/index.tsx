import React from 'react'
import uniqBy from 'lodash/uniqBy'
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

export default function createEditor(extraConfig: IUBBConfig[] = [], ignoreDefaultConfig = false) {
  let config!: IUBBConfig[];

  if(ignoreDefaultConfig) {
    if(!extraConfig) throw new Error('need extra config with ignoreDefaultConfig specified')
    config = extraConfig
  } else {
    config = uniqBy([ ...extraConfig, ...defaultConfig ], 'tagName')
  }

  const Editor: React.SFC<props> = (props) => (
    <Provider value={config}>
      <Core {...props} />
    </Provider>
  )

  Editor.defaultProps = {
    value: '',
    onChange: () => null,
  }

  return Editor
}
