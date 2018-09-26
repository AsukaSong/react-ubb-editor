import * as React from 'react'
import { ConfigProps, withConfig } from 'src/context'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { IAction, IUBBButtonConfig } from 'src/types'
import createAction from 'src/actionCreator'

type props = ConfigProps & {
  reduce: (action: IAction) => void
}

class Buttons extends React.Component<props> {
  constructor(props: props) {
    super(props)


  }

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
        {configs.map(item => {
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