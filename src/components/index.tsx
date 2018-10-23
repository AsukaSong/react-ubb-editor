import bindAll from 'lodash-decorators/bindAll'
// @ts-ignore there's no types for rc-notification
import Notification from 'rc-notification'
import React from 'react'

import { IConfigProps, withConfig } from '../context'
import defaultHandler from '../defaultHandler'
import { IAction, IState as State, IUBBExtendConfig } from '../types'

import Buttons from './buttons'
import Extend from './extend'
import Textarea, { IProps as TextareaProps } from './textarea'

import NoticeContainer from './styles/NoticeContainer'
import Root from './styles/Root'

// @ts-ignore override interface type
interface ICustomProps {
  wrappedComponentRef?: (it: Core) => void
  onChange?: (value: string) => void
  value?: string
  defaultValue?: string
}

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>
type Diff<T, U> = T extends U ? never : T
type GetNames<T> = {
  [K in keyof T]: T[K] extends ((event: any) => void) | undefined ? K : never
}[keyof T]
type FunctionProperties<T> = Pick<T, Diff<GetNames<T>, undefined>>
type AddParams<T> = {
  [K in keyof T]: T[K] extends ((event: infer U) => void) | undefined
    ? (event: U, dispatch: (action: IAction) => void, message: (message: string) => void) => void
    : never
}

type EventWithParams = AddParams<FunctionProperties<Omit<TextareaProps, 'onChange'>>>
type OtherProps = Omit<Omit<TextareaProps, 'onChange'>, keyof EventWithParams | keyof ICustomProps>
export type IProps = EventWithParams & OtherProps & ICustomProps
export type props = IProps & IConfigProps

export interface IState extends State {
  extendConfig: IUBBExtendConfig | null
  customTagName: string
  message: string
  isPreviewing: boolean
}

@bindAll()
export class Core extends React.PureComponent<props, IState> {
  static defaultProps = {
    onChange: () => null,
    defaultValue: '',
  }

  public customTextarea!: Textarea
  private root!: HTMLDivElement
  private timer!: number
  public message: any

  constructor(props: props) {
    super(props)

    this.state = {
      customTagName: '',
      end: 0,
      extendConfig: null,
      isPreviewing: false,
      message: '',
      start: 0,
      value: props.value || props.defaultValue!,
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
    this.customTextarea.redo()
  }

  undo() {
    this.customTextarea.undo()
  }

  focusAndSelectTextarea() {
    this.customTextarea.textarea.focus()
    this.customTextarea.textarea.setSelectionRange(this.state.start, this.state.end)
  }

  clearExtendAndCustom() {
    this.setState({
      customTagName: '',
      extendConfig: null,
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
    const config = this.getConfigByTagName(tagName)
    if (config && config.handler) return config.handler
    return defaultHandler
  }

  private getConfigByTagName(tagName: string) {
    const {
      config: { configs },
    } = this.props
    return configs.filter(item => item.tagName === tagName).pop()
  }

  private handleTextareaChange(value: string) {
    this.setState({
      value,
    })
    this.props.onChange!(value)
  }

  private handleExtendButtonClick(extendTagName: string) {
    this.setState(prevState => ({
      extendConfig:
        prevState.extendConfig && prevState.extendConfig.tagName === extendTagName
          ? null
          : (this.getConfigByTagName(extendTagName) as IUBBExtendConfig),
      customTagName: '',
    }))
  }

  private handleCustomButtonClick(customTagName: string) {
    this.setState(prevState => ({
      customTagName: prevState.customTagName === customTagName ? '' : customTagName,
      extendConfig: null,
    }))
  }

  private handleTextareaBlur(e: React.FocusEvent<HTMLTextAreaElement>) {
    const { selectionStart: start, selectionEnd: end } = e.target
    this.setState({ start, end })
  }

  private handleFocus(e: React.FocusEvent<HTMLTextAreaElement>) {
    this.clearExtendAndCustom()
    if (this.props.onFocus) this.props.onFocus(e, this.reduce, this.notice)
  }

  handleRootBlur() {
    this.timer = setTimeout(() => {
      this.clearExtendAndCustom()
    })
  }

  handleRootFocus() {
    clearTimeout(this.timer)
  }

  public render() {
    const { customTagName, isPreviewing, extendConfig, value } = this.state
    const { config } = this.props
    const { UbbContainer } = config
    const props = new Proxy(
      { ...this.props },
      {
        get: (props: props, key: keyof props) => {
          if (typeof props[key] === 'function') {
            return (e: Event) => {
              ; (props[key] as any)(e, this.reduce, this.notice)
            }
          }
          return props[key]
        },
      },
    ) as any

    return (
      <Root onFocus={this.handleRootFocus} onBlur={this.handleRootBlur}>
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
        <Extend dispatch={this.reduce} message={this.notice} extendConfig={extendConfig} />
        {!isPreviewing && (
          <Textarea
            {...props}
            ref={(it: any) => (this.customTextarea = it)}
            onChange={this.handleTextareaChange}
            onBlur={this.handleTextareaBlur}
            onFocus={this.handleFocus}
            value={this.props.value || value}
          />
        )}
        {isPreviewing && UbbContainer && <UbbContainer value={this.props.value || value} />}
        <NoticeContainer innerRef={(it: any) => (this.root = it)} />
      </Root>
    )
  }
}

export default withConfig(Core)
