import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import bindAll from 'lodash-decorators/bindAll'
import * as React from 'react'
import { IConfigProps, withConfig } from '../context'
import createAction from '../createAction'
import { ConfigType, IAction, IUBBConfig, IUBBCustomConfig } from '../types'

interface IProps extends IConfigProps {
  dispatch: (action: IAction) => void
  customTagName: string
  onExtendButtonClick: (tagName: string) => void
  onCustomButtonClick: (tagName: string) => void
}

@bindAll()
class Buttons extends React.Component<IProps> {
  renderContent(config: IUBBConfig): JSX.Element {
    return config.icon ? <Icon icon={config.icon} /> : <span>{config.label}</span>
  }

  generateHandleButtonClick(config: IUBBConfig) {
    switch (config.type) {
      case ConfigType.Button:
        return () => this.props.dispatch(createAction(config))
      case ConfigType.Extend:
        return () => this.props.onExtendButtonClick(config.tagName)
      case ConfigType.Custom:
        return () => this.props.onCustomButtonClick(config.tagName)
    }
  }

  renderCustom(config: IUBBCustomConfig) {
    const { customTagName, dispatch } = this.props
    const Component = config.Component
    return (
      <div
        style={{
          position: 'absolute',
          display: customTagName === config.tagName ? '' : 'none',
        }}
      >
        <Component dispatch={dispatch} />
      </div>
    )
  }

  render() {
    const {
      config: { configs },
    } = this.props

    return (
      <div style={{ display: 'flex' }}>
        {configs.map(item => (
          <div key={item.tagName} style={{ position: 'relative' }}>
            <button onClick={this.generateHandleButtonClick(item)}>
              {this.renderContent(item)}
            </button>
            {item.type === ConfigType.Custom && this.renderCustom(item)}
          </div>
        ))}
      </div>
    )
  }
}

export default withConfig(Buttons)
