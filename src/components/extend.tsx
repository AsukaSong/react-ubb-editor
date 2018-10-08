import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import bindAll from 'lodash-decorators/bindAll'
import dropRight from 'lodash/dropRight'
import * as React from 'react'

import { IConfigProps, withConfig } from '../context'
import createAction from '../createAction'
import {
  ConfigType,
  ExtendValueType,
  IAction,
  ICustomComponentProps,
  IUBBExtendConfig,
} from '../types'
import { Button, ExtendRoot, Input } from './styles'

interface IProps extends IConfigProps, ICustomComponentProps {
  extendTagName: string
}

@bindAll()
class Extends extends React.Component<IProps> {
  getCurrConfig(tagName: string): IUBBExtendConfig {
    const {
      config: { configs },
    } = this.props
    const config = configs.filter(item => item.tagName === tagName).pop()
    if (config && config.type === ConfigType.Extend) {
      return config
    }

    throw new Error(`connot find config for ${tagName}`)
  }

  handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const { dispatch, extendTagName } = this.props
    const config = this.getCurrConfig(extendTagName)
    const payload: IAction['payload'] = {
      subValues: [],
    }

    const formData = dropRight(Array.from(e.target as HTMLFormElement), 2) as HTMLInputElement[]
    for (const item of formData) {
      switch (parseInt(item.dataset.editor!, 10)) {
        case ExtendValueType.Content:
          payload.content = item.value
          break
        case ExtendValueType.Main:
          payload.mainValue = item.value
          break
        case ExtendValueType.Sub:
          payload.subValues!.push({
            key: item.name,
            value: item.value,
          })
          break
        default:
          break
      }
    }

    dispatch(createAction(config, payload))
  }

  renderFormItem(item: IUBBExtendConfig['inputs'][0], config: IUBBExtendConfig) {
    const key = `${config.tagName}${item.key}`
    return (
      <Input
        data-editor={item.type}
        key={key}
        name={item.key === '' ? undefined : item.key}
        placeholder={item.label}
      />
    )
  }

  renderContent(extendTagName: string): React.ReactNode {
    if (!extendTagName) return
    const { dispatch, message } = this.props
    const config = this.getCurrConfig(extendTagName)
    const ExtraComponent = config.ExtraComponent

    return (
      <>
        <form onSubmit={this.handleFormSubmit}>
          {config.inputs.map(item => this.renderFormItem(item, config))}
          <Button type="submit">
            <Icon icon={faCheck} />
          </Button>
          <Button type="reset">
            <Icon icon={faTimes} />
          </Button>
        </form>
        {ExtraComponent && <ExtraComponent message={message} dispatch={dispatch} />}
      </>
    )
  }

  render() {
    const { extendTagName } = this.props
    return <ExtendRoot isShown={!!extendTagName}>{this.renderContent(extendTagName)}</ExtendRoot>
  }
}

export default withConfig(Extends)
