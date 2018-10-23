import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import bindAll from 'lodash-decorators/bindAll'
import * as React from 'react'

import { IConfigProps, withConfig } from '../context'
import createAction from '../createAction'
import { ExtendValueType, IAction, ICustomComponentProps, IUBBExtendConfig } from '../types'

import Button from './styles/Button'
import Divider from './styles/Divider'
import ExtendRoot from './styles/ExtendRoot'
import Input from './styles/Input'

export interface IProps extends IConfigProps, ICustomComponentProps {
  extendConfig: IUBBExtendConfig | null
}

@bindAll()
export class Extends extends React.PureComponent<IProps> {
  handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const { dispatch, extendConfig: config } = this.props
    const payload: IAction['payload'] = {
      subValues: [],
    }

    const formData = Array.from((e.target as HTMLFormElement).querySelectorAll('input'))
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
      }
    }

    dispatch(createAction(config!, payload))
  }

  renderFormItem(item: IUBBExtendConfig['inputs'][0], config: IUBBExtendConfig) {
    const key = `${config.tagName}${item.key}${item.type}`
    return (
      <React.Fragment key={key}>
        <Input
          data-editor={item.type}
          name={item.key === '' ? undefined : item.key}
          placeholder={item.label}
          valueType={item.type}
        />
        <Divider margin="0 5px" />
      </React.Fragment>
    )
  }

  renderContent(config: IUBBExtendConfig): React.ReactNode {
    if (!config) return null
    const { dispatch, message } = this.props
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
    const { extendConfig } = this.props
    return <ExtendRoot isShown={!!extendConfig}>{this.renderContent(extendConfig!)}</ExtendRoot>
  }
}

export default withConfig(Extends)
