import React from 'react'
import uniqBy from 'lodash/uniqBy'
import {
  IUBBConfig,
} from './types'

const defaultConfig: IUBBConfig[] = [] // TODO

const context = React.createContext(defaultConfig)
const { Provider, Consumer } = context

type props = {
  value: string
  onChange: (value: string) => void
  option: any
}

export default function createEditor(extraConfig: IUBBConfig[] = [], ignoreDefaultConfig = false) {
  let config: IUBBConfig[];

  if(ignoreDefaultConfig) {
    if(!extraConfig) throw new Error('need extra config with ignoreDefaultConfig specified')
    config = extraConfig
  } else {
    config = uniqBy([ ...extraConfig, ...defaultConfig ], 'tagName')
  }

  let Editor: React.SFC<props> = () => (
    <Provider value={config}>
      <div>hello world</div>
    </Provider>
  )

  Editor.defaultProps = {
    value: '',
    onChange: () => null,
  }

  return Editor
}

export {
  Consumer,
  IUBBConfig,
}
