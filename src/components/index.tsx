import bindAll from 'lodash-decorators/bindAll'
import React from 'react'
import { IConfigProps, withConfig } from '../context'
import defaultHandler from '../defaultHandler'
import { IAction, IState } from '../types'

import Buttons from './buttons'
import Textarea from './textarea'

export interface IndexProps {
  value: string
  onChange: (value: string) => void
  option?: any // TODO:
}

type props = IndexProps & IConfigProps

type state = IState & {
  extendTagName: string
  customTagName: string
  message: string
  isPreviewing: boolean,
}

@bindAll()
class Core extends React.Component<props, state> {
  public customTextarea!: Textarea

  constructor(props: props) {
    super(props)

    this.state = {
      customTagName: '',
      end: 0,
      extendTagName: '',
      isPreviewing: false,
      message: '',
      start: 0,
      value: props.value,
    }
  }

  componentWillReceiveProps(newProps: props) {
    if (this.state.value !== newProps.value) {
      this.setState(
        {
          end: newProps.value.length,
          start: newProps.value.length,
          value: newProps.value,
        },
        this.focusAndSelectTextarea,
      )
    }
  }

  focusAndSelectTextarea() {
    this.customTextarea.textarea.focus()
    this.customTextarea.textarea.setSelectionRange(this.state.start, this.state.end)
  }

  clearExtendAndCustom() {
    this.setState({
      customTagName: '',
      extendTagName: '',
    })
  }

  private reduce(action: IAction): void {
    // tslint:disable-next-line
    console.log(action)
    const handler = this.getHandlerByTagName(action.tagName)
    this.setState(prevState => handler(prevState, action), this.focusAndSelectTextarea)
    this.clearExtendAndCustom()
  }

  private getHandlerByTagName(tagName: string) {
    const {
      config: { configs },
    } = this.props
    const config = configs.filter(item => item.tagName === tagName).pop()
    if (config && config.handler) return config.handler
    return defaultHandler
  }

  private handleTextareaChange(value: string) {
    this.setState({
      value,
    })
    this.props.onChange(value)
  }

  private handleExtendButtonClick(extendTagName: string) {
    this.setState({
      extendTagName,
      customTagName: '',
    })
  }

  private handleCustomButtonClick(customTagName: string) {
    this.setState({
      customTagName,
      extendTagName: '',
    })
  }

  private handleTextareaBlur(e: React.FocusEvent<HTMLTextAreaElement>) {
    const { selectionStart: start, selectionEnd: end } = e.target
    this.setState({ start, end })
  }

  public render() {
    return (
      <div>
        <Buttons
          customTagName={this.state.customTagName}
          dispatch={this.reduce}
          onExtendButtonClick={this.handleExtendButtonClick}
          onCustomButtonClick={this.handleCustomButtonClick}
        />
        <Textarea
          ref={(it: any) => (this.customTextarea = it)}
          onChange={this.handleTextareaChange}
          onBlur={this.handleTextareaBlur}
          value={this.state.value}
        />
      </div>
    )
  }
}

export default withConfig(Core)
