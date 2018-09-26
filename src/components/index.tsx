import React from 'react'
import bindAll from 'lodash-decorators/bindAll'
// import Notification from ''
import { props as indexProps } from 'src/index'
import { IState, IAction } from 'src/types'
import { withConfig, ConfigProps } from 'src/context'
import defaultHandler from 'src/defaultHandler'

import Buttons from './buttons'

type props = indexProps & ConfigProps

type state = IState & {
  extendTagName: string
  message: string
  isPreviewing: boolean
}

@bindAll()
class Core extends React.Component<props, state> {
  constructor(props: props) {
    super(props)
    this.state = {
      value: props.value,
      start: 0,
      end: 0,
      extendTagName: '',
      message: '',
      isPreviewing: false,
    }
  }

  reduce(action: IAction): void {
    const handler = this.getHandlerByTagName(action.tagName)
    this.setState(prevState => handler(prevState, action))
  }

  getHandlerByTagName(tagName: string) {
    const { config } = this.props
    const buttomConfig = config.configs.filter(item => item.tagName === tagName).pop()
    if(buttomConfig && buttomConfig.handler)  return buttomConfig.handler
    return defaultHandler
  }

  render() {
    return <div>hello world<Buttons /></div>
  }
}

export default withConfig(Core)
