import { faRedo, faUndo, faWindowMaximize } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import bindAll from 'lodash-decorators/bindAll'
import * as React from 'react'

import { IConfigProps, withConfig } from '../context'
import createAction from '../createAction'
import { ConfigType, ICustomComponentProps, IUBBConfig, IUBBCustomConfig } from '../types'

import Button from './styles/Button'
import ButtonContainer from './styles/ButtonContainer'
import ButtonRoot from './styles/ButtonRoot'

interface IMap<T> {
  [key: string]: T
}

export interface IProps extends IConfigProps, ICustomComponentProps {
  customTagName: string
  onExtendButtonClick: (tagName: string) => void
  onCustomButtonClick: (tagName: string) => void
  redo: () => void
  undo: () => void
  changePreviewing: () => void
  isPreviewing: boolean
}

@bindAll()
export class Buttons extends React.PureComponent<IProps> {
  handlerMap: IMap<() => void | undefined> = {}

  renderContent(config: IUBBConfig): JSX.Element {
    return (
      <span>
        {config.label}
        {config.icon ? <Icon icon={config.icon} size="lg" /> : null}
      </span>
    )
  }

  generateHandleButtonClick(config: IUBBConfig) {
    let handler = this.handlerMap[config.tagName]
    if (handler) return handler
    switch (config.type) {
      case ConfigType.Button:
        handler = () => this.props.dispatch(createAction(config))
        break
      case ConfigType.Extend:
        handler = () => this.props.onExtendButtonClick(config.tagName)
        break
      case ConfigType.Custom:
        handler = () => this.props.onCustomButtonClick(config.tagName)
        break
    }
    this.handlerMap[config.tagName] = handler
    return handler
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
    const { config, isPreviewing } = this.props
    const { configs: buttonConfigs, UbbContainer } = config

    return (
      <ButtonRoot>
        {buttonConfigs.map(item => (
          <ButtonContainer key={item.tagName}>
            <Button
              disabled={isPreviewing}
              title={item.title}
              onClick={this.generateHandleButtonClick(item)}
            >
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
