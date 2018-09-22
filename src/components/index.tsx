import React from 'react'
import { props as indexProps } from 'src/index'
import { IState, IAction } from 'src/types'
import { withConfig, ConfigProps } from 'src/context'

type props = indexProps & ConfigProps

type state = IState & {
  extendTagName: string
  message: string
  isPreviewing: boolean
}

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
    const { configs } = this.props
    const config = configs.filter(item => item.tagName === tagName).pop()
    if(!config || !config.handler) throw new Error(`cannot find handler for ${tagName}`)
    return config.handler
  }

  render() {
    return <div>hello world</div>
  }
}

export default withConfig(Core)
