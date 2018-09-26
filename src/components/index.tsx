import React from 'react'
import bindAll from 'lodash-decorators/bindAll'
import { IState, IAction } from 'src/types'
import { withConfig, ConfigProps } from 'src/context'
import defaultHandler from 'src/defaultHandler'

import Buttons from './buttons'
import Textarea from './textarea'

export type indexProps = {
  value: string
  onChange: (value: string) => void
  option?: any // TODO
}

type props = indexProps & ConfigProps

type state = IState & {
  extendTagName: string
  message: string
  isPreviewing: boolean
}

@bindAll()
class Core extends React.Component<props, state> {
  customTextarea!: Textarea

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

  componentWillReceiveProps(newProps: props) {
    if(this.state.value !== newProps.value) this.setState({
        value: newProps.value,
        start: newProps.value.length,
        end: newProps.value.length,
    }, this.focusAndSelectTextarea)
  }

  focusAndSelectTextarea() {
    this.customTextarea.textarea.focus()
    this.customTextarea.textarea.setSelectionRange(this.state.start, this.state.end)
  }

  private reduce(action: IAction): void {
    console.log(action)
    const handler = this.getHandlerByTagName(action.tagName)
    this.setState(
      prevState => handler(prevState, action),
      this.focusAndSelectTextarea
    )
  }

  private getHandlerByTagName(tagName: string) {
    const { config: { configs } } = this.props
    const config = configs.filter(item => item.tagName === tagName).pop()
    if(config && config.handler)  return config.handler
    return defaultHandler
  }

  private handleTextareaChange(value: string) {
    this.setState({
      value,
    })
    this.props.onChange(value)
  }

  render() {
    return (
      <div>
        <Buttons
          reduce={this.reduce} 
        />
        <Textarea 
          ref={(it: any) => this.customTextarea = it}
          onChange={this.handleTextareaChange} 
          onBlur={e => {
            const { selectionStart: start, selectionEnd: end } = e.target
            this.setState({ start, end })
          }}
          value={this.state.value} 
        />
      </div>
    )
  }
}

export default withConfig(Core)
