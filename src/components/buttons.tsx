import { faRedo, faUndo, faWindowMaximize } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import bindAll from 'lodash-decorators/bindAll'
import * as React from 'react'
import { IConfigProps, withConfig } from '../context'
import createAction from '../createAction'
import { ConfigType, ICustomComponentProps, IUBBConfig, IUBBCustomConfig } from '../types'
import { Button, ButtonContainer, ButtonRoot } from './styles'

interface IProps extends IConfigProps, ICustomComponentProps {
  customTagName: string
  onExtendButtonClick: (tagName: string) => void
  onCustomButtonClick: (tagName: string) => void
  redo: () => void
  undo: () => void
  changePreviewing: () => void
}

@bindAll()
class Buttons extends React.Component<IProps> {
  renderContent(config: IUBBConfig): JSX.Element {
    return config.icon ? <Icon icon={config.icon} size="lg" /> : <span>{config.label}</span>
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
    const { customTagName, dispatch, message } = this.props
    const Component = config.Component
    return (
      <div
        style={{
          position: 'absolute',
          display: customTagName === config.tagName ? '' : 'none',
        }}
      >
        <Component dispatch={dispatch} message={message} />
      </div>
    )
  }

  render() {
    const { config } = this.props
    const { configs: buttonConfigs, UbbContainer } = config

    return (
      <ButtonRoot>
        {buttonConfigs.map(item => (
          <ButtonContainer key={item.tagName}>
            <Button title={item.title} onClick={this.generateHandleButtonClick(item)}>
              {this.renderContent(item)}
            </Button>
            {item.type === ConfigType.Custom && this.renderCustom(item)}
          </ButtonContainer>
        ))}
        <div style={{ flexGrow: 1 }} />
        <ButtonContainer>
          <Button title="撤销" onClick={this.props.undo}>
            <Icon icon={faUndo} />
          </Button>
        </ButtonContainer>
        <ButtonContainer>
          <Button title="重做" onClick={this.props.redo}>
            <Icon icon={faRedo} />
          </Button>
        </ButtonContainer>
        {UbbContainer && (
          <ButtonContainer>
            <Button title="预览" onClick={this.props.changePreviewing}>
              <Icon icon={faWindowMaximize} />
            </Button>
          </ButtonContainer>
        )}
      </ButtonRoot>
    )
  }
}

export default withConfig(Buttons)
