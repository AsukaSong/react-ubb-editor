import { faEyeDropper } from '@fortawesome/free-solid-svg-icons'
import bind from 'lodash-decorators/bind'
import React from 'react'
import { ColorResult, GithubPicker } from 'react-color'
import createAction from '../../createAction'
import { ConfigType, ICustomComponentProps, IUBBCustomConfig } from '../../types'

interface IState {
  hex: string
}

class ColorPicker extends React.PureComponent<ICustomComponentProps, IState> {
  @bind
  handleOk(result: ColorResult) {
    const { dispatch } = this.props

    dispatch(
      createAction(
        config,
        {
          mainValue: result.hex,
        },
        {
          shouldSelect: true,
        },
      ),
    )
  }

  render() {
    return <GithubPicker onChangeComplete={this.handleOk} />
  }
}

const config: IUBBCustomConfig = {
  type: ConfigType.Custom,
  tagName: 'color',
  icon: faEyeDropper,
  index: 100,
  Component: ColorPicker,
  title: '颜色',
}

export default config
