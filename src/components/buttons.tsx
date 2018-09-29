import * as React from 'react'
import { ConfigProps, withConfig } from '../context'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import bindAll from 'lodash-decorators/bindAll'
import { IAction, IUBBButtonConfig } from '../types'
import createAction from '../actionCreator'

type props = ConfigProps & {
  reduce: (action: IAction) => void
}

@bindAll()
class Buttons extends React.Component<props> {
  renderButton(config: IUBBButtonConfig): JSX.Element {
    return (
      <button
        onClick={() => this.props.reduce(createAction(config))}
      >
        {config.icon ? <Icon icon={config.icon} /> : <span>{config.label}</span>}
      </button>
    )
  }

  render() {
    const { config: { configs } } = this.props

    return (
      <div>
        {configs.map((item) => {
          switch(item.type) {
            case 'button': return this.renderButton(item)
            default: return ''
          }
        })}
      </div>
    )
  }
}

export default withConfig(Buttons)