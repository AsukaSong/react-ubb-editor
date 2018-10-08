import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import bindAll from 'lodash-decorators/bindAll'
import dropRight from 'lodash/dropRight'
import * as React from 'react'

import { IConfigProps, withConfig } from '../context'
import createAction from '../createAction'
import { ConfigType, IAction, IUBBExtendConfig } from '../types'
import { Button, Input } from './styles'

interface IProps extends IConfigProps {
  extendTagName: string
  dispatch: (action: IAction) => void
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
    const formData = dropRight(Array.from(e.target as HTMLFormElement), 2).map(
      (item: HTMLInputElement) => ({
        key: item.name,
        value: item.value,
        isMain: !item.name,
      }),
    )

    const mainValues = formData.filter(item => item.isMain)
    if (mainValues.length > 1) throw new Error('A tag may have only one mainValue')
    const mainValue = mainValues.pop()
    const subValues = formData.filter(item => !item.isMain)

    dispatch(
      createAction(config, {
        subValues,
        mainValue: mainValue ? mainValue.value : undefined,
      }),
    )
  }

  renderFormItem(item: IUBBExtendConfig['inputs'][0], config: IUBBExtendConfig) {
    const key = `${config.tagName}${item.key}`
    return (
      <Input key={key} name={item.key === '' ? undefined : item.key} placeholder={item.label} />
    )
  }

  renderForm(config: IUBBExtendConfig): React.ReactNode {
    return (
      <form onSubmit={this.handleFormSubmit}>
        {config.inputs.map(item => this.renderFormItem(item, config))}
        <Button type="submit">
          <Icon icon={faCheck} />
        </Button>
        <Button type="reset">
          <Icon icon={faTimes} />
        </Button>
      </form>
    )
  }

  render() {
    const { extendTagName, dispatch } = this.props
    if (!extendTagName) return <div />
    const config = this.getCurrConfig(extendTagName)
    const ExtraComponent = config.ExtraComponent
    return (
      <div>
        {this.renderForm(config)}
        {ExtraComponent && <ExtraComponent dispatch={dispatch} />}
      </div>
    )
  }
}

export default withConfig(Extends)
