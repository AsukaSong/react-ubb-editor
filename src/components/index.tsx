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

/**
 * TODO:
 * 1. add paste and drop event handlers for textarea
 * 3. add css
 */

export interface IProps {
  value: string
  onChange: (value: string) => void
  wrappedComponentRef?: (it: Core) => void
}

type props = IProps & IConfigProps

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

  redo() {
    if (this.customTextarea) {
      this.customTextarea.redo()
    }
  }

  undo() {
    if (this.customTextarea) {
      this.customTextarea.undo()
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

  changePreviewing() {
    this.setState(prevState => ({
      isPreviewing: !prevState.isPreviewing,
    }))
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
    const { customTagName, isPreviewing, extendTagName, value } = this.state
    const { config } = this.props
    const { UbbContainer } = config

    return (
      <div ref={(it: any) => (this.root = it)}>
        <Buttons
          customTagName={customTagName}
          dispatch={this.reduce}
          onExtendButtonClick={this.handleExtendButtonClick}
          onCustomButtonClick={this.handleCustomButtonClick}
          redo={this.redo}
          undo={this.undo}
          changePreviewing={this.changePreviewing}
        />
        <Extend dispatch={this.reduce} extendTagName={extendTagName} />
        {!isPreviewing && (
          <Textarea
            ref={(it: any) => (this.customTextarea = it)}
            onChange={this.handleTextareaChange}
            onBlur={this.handleTextareaBlur}
            value={value}
          />
        )}
        {isPreviewing && UbbContainer && <UbbContainer value={value} />}
      </div>
    )
  }
}

export default withConfig(Core)
