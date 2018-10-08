import { faTextHeight } from '@fortawesome/free-solid-svg-icons'
import React from 'react'

import createAction from '../../../createAction'
import { ConfigType, ICustomComponentProps, IUBBCustomConfig } from '../../../types'

import { Button, Root, Triangle, TriangleBack } from './styles'

class SizePicker extends React.PureComponent<ICustomComponentProps> {
  sizes = ['1', '2', '3', '4', '5', '6', '7']

  generateHandleClick = (size: string) => () => {
    const { dispatch } = this.props
    dispatch(
      createAction(
        config,
        {
          mainValue: size,
        },
        {
          shouldSelect: true,
        },
      ),
    )
  }

  render() {
    return (
      <Root>
        <TriangleBack />
        <Triangle />
        {this.sizes.map(item => (
          <Button onClick={this.generateHandleClick(item)} key={item}>
            {item}
          </Button>
        ))}
      </Root>
    )
  }
}

const config: IUBBCustomConfig = {
  type: ConfigType.Custom,
  tagName: 'size',
  icon: faTextHeight,
  Component: SizePicker,
  index: 90,
  title: '字号',
}

export default config
