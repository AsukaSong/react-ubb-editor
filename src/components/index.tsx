import bindAll from 'lodash-decorators/bindAll'
// @ts-ignore there's no types for rc-notification
import Notification from 'rc-notification'
import React from 'react'
import { IConfigProps, withConfig } from '../context'
import defaultHandler from '../defaultHandler'
import { IAction, IState as State } from '../types'

import Buttons from './buttons'
import Extend from './extend'
import Textarea, { IProps as TextareaProps } from './textarea'

import { NoticeContainer, Root } from './styles'

// @ts-ignore override interface type
export interface IProps extends TextareaProps {
  onDrop?: (
    e: React.DragEvent<HTMLTextAreaElement>,
    dispatch: (action: IAction) => void,
    notice: (message: string) => void,
  ) => void
  onPaste?: (
    e: React.ClipboardEvent<HTMLTextAreaElement>,
    dispatch: (action: IAction) => void,
    notice: (message: string) => void,
  ) => void
  wrappedComponentRef?: (it: Core) => void
  onChange?: (value: string) => void
  value?: string
  defaultValue?: string
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
  static defaultProps = {
    onChange: () => null,
  }

  public customTextarea!: Textarea
  private root!: HTMLDivElement
  private message: any

  constructor(props: props) {
    super(props)

    this.state = {
      customTagName: '',
      end: 0,
      extendTagName: '',
      isPreviewing: false,
      message: '',
      start: 0,
      value: props.value! || props.defaultValue!,
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
    const { value } = newProps
    if (value && this.state.value !== value) {
      this.setState(
        {
          value,
          end: value.length,
          start: value.length,
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

  notice(message: string) {
    this.message.notice({
      content: message,
      style: {
        right: 0,
      } as React.CSSProperties,
    })
  }

  private reduce(action: IAction): void {
    const handler = this.getHandlerByTagName(action.tagName)
    this.setState(
      prevState => handler(prevState, action),
      () => {
        this.focusAndSelectTextarea()
        this.props.onChange!(this.state.value)
      },
    )
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
    this.props.onChange!(value)
  }

  private handleExtendButtonClick(extendTagName: string) {
    this.setState(prevState => ({
      extendTagName: prevState.extendTagName === extendTagName ? '' : extendTagName,
      customTagName: '',
    }))
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

  private handleDrop(e: React.DragEvent<HTMLTextAreaElement>) {
    this.customTextarea.blur()
    const { onDrop } = this.props
    if (onDrop) {
      onDrop(e, this.reduce, this.notice)
    }
  }

  private handlePaste(e: React.ClipboardEvent<HTMLTextAreaElement>) {
    this.customTextarea.blur()
    const { onPaste } = this.props
    if (onPaste) {
      onPaste(e, this.reduce, this.notice)
    }
  }

  public render() {
    const { customTagName, isPreviewing, extendTagName, value } = this.state
    const { config } = this.props
    const { UbbContainer } = config

    return (
      <Root>
        <Buttons
          customTagName={customTagName}
          dispatch={this.reduce}
          onExtendButtonClick={this.handleExtendButtonClick}
          onCustomButtonClick={this.handleCustomButtonClick}
          redo={this.redo}
          undo={this.undo}
          message={this.notice}
          changePreviewing={this.changePreviewing}
          isPreviewing={isPreviewing}
        />
        <Extend dispatch={this.reduce} message={this.notice} extendTagName={extendTagName} />
        {!isPreviewing && (
          <Textarea
            {...this.props}
            ref={(it: any) => (this.customTextarea = it)}
            onChange={this.handleTextareaChange}
            onBlur={this.handleTextareaBlur}
            onDrop={this.handleDrop}
            onFocus={this.clearExtendAndCustom}
            onPaste={this.handlePaste}
            value={this.props.value || value}
          />
        )}
        {isPreviewing && UbbContainer && <UbbContainer value={value} />}
        <NoticeContainer innerRef={(it: any) => (this.root = it)} />
      </Root>
    )
  }
}

export default withConfig(Core)
