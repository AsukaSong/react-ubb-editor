import React from 'react'
import Text from './styles/Textarea'

// @ts-ignore override interface type
export interface IProps
  extends React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  onChange: (value: string) => void
  value: string
  ref?: any
}

interface IState {
  valueStack: string[]
  redoStack: string[]
}

export default class Textarea extends React.PureComponent<IProps, IState> {
  static getDerivedStateFromProps(nextProps: IProps, prevState: IState) {
    if (nextProps.value !== prevState.valueStack[prevState.valueStack.length - 1]) {
      prevState.valueStack.push(nextProps.value)
      prevState.redoStack = []
      return prevState
    }
    return null
  }

  constructor(props: IProps) {
    super(props)

    this.state = {
      valueStack: props.value === '' ? [''] : ['', props.value],
      redoStack: [],
    }
  }

  private scrollTop: number = 0
  textarea!: HTMLTextAreaElement

  undo = () => {
    if (this.state.valueStack.length === 1) {
      return
    }
    let prevValue = this.state.valueStack.pop()!
    this.state.redoStack.push(prevValue)
    prevValue = this.state.valueStack[this.state.valueStack.length - 1]
    this.props.onChange(prevValue)
  }

  redo = () => {
    const prevValue = this.state.redoStack.pop()
    if (prevValue) {
      this.state.valueStack.push(prevValue)
      this.props.onChange(prevValue)
    }
  }

  blur = () => {
    this.textarea.blur()
  }

  private changeValue = (value: string) => {
    this.props.onChange(value)
    this.state.valueStack.push(value)
    this.textarea.scrollTop = this.scrollTop
  }

  handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    this.textarea.scrollTop = this.scrollTop
    if (this.props.onFocus) this.props.onFocus(e)
  }

  render() {
    return (
      <Text
        innerRef={(it: any) => (this.textarea = it)}
        {...this.props}
        defaultValue={undefined}
        onChange={e => this.changeValue(e.target.value)}
        onScroll={() => (this.scrollTop = this.textarea.scrollTop)}
        onFocus={this.handleFocus}
        onInput={() => this.setState({ redoStack: [] })}
        onKeyDown={e => {
          if (this.props.onKeyDown) this.props.onKeyDown(e)
          if (e.key === 'z' && e.ctrlKey) this.undo()
          if (e.key === 'y' && e.ctrlKey) this.redo()
        }}
      />
    )
  }
}
