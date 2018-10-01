import { faEyeDropper } from '@fortawesome/free-solid-svg-icons'
import bind from 'lodash-decorators/bind'
import React from 'react'
import { TwitterPicker } from 'react-color'
import createAction from '../../createAction'
import { ConfigType, ICustomComponentProps, IUBBCustomConfig } from '../../types'

interface IState {
  hex: string
}

class ColorPicker extends React.PureComponent<ICustomComponentProps, IState> {
  constructor(props: ICustomComponentProps) {
    super(props)

    this.state = {
      hex: '#FF6900',
    }
  }

  @bind
  handleColorChange({ hex }: { hex: string }) {
    this.setState({
      hex,
    })
  }

  @bind
  handleOk() {
    const { dispatch } = this.props
    const { hex } = this.state

    dispatch(
      createAction(
        config,
        {
          mainValue: hex,
        },
        {
          shouldSelect: true,
        },
      ),
    )
  }

  render() {
    return (
      <div>
        <TwitterPicker color={this.state.hex} onChangeComplete={this.handleColorChange} />
        <button onClick={this.handleOk}>确认</button>
      </div>
    )
  }
}

const config: IUBBCustomConfig = {
  type: ConfigType.Custom,
  tagName: 'color',
  icon: faEyeDropper,
  index: 100,
  Component: ColorPicker,
}

export default config
