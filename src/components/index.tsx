import bindAll from 'lodash-decorators/bindAll'
// @ts-ignore there's no types for rc-notification
import Notification from 'rc-notification'
import React from 'react'
import { IConfigProps, withConfig } from '../context'
import defaultHandler from '../defaultHandler'
import { IAction, IState as State } from '../types'

import Buttons from './buttons'
import Extend from './extend'
import Textarea from './textarea'

export interface IndexProps {
  value: string
  onChange: (value: string) => void
  wrappedComponentRef?: (it: Core) => void
  option?: any // TODO:
}

type props = IndexProps & IConfigProps

interface IState extends State {
  extendTagName: string
  customTagName: string
  message: string
  isPreviewing: boolean
}

@bindAll()
class Core extends React.Component<props, IState> {
  public customTextarea!: Textarea
  private root!: HTMLDivElement
  public message: any

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

  componentDidMount() {
    Notification.newInstance(
      {
        getContainer: () => this.root,
      },
      (n: any) => (this.message = n),
    )
    const { wrappedComponentRef } = this.props
    if (wrappedComponentRef) wrappedComponentRef(this)
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
      <div ref={(it: any) => (this.root = it)}>
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
        <Extend dispatch={this.reduce} extendTagName={this.state.extendTagName} />
      </div>
    )
  }
}

export default withConfig(Core)
