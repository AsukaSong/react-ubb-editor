import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import bindAll from 'lodash-decorators/bindAll'
import dropRight from 'lodash/dropRight'
import * as React from 'react'

import { IConfigProps, withConfig } from '../context'
import createAction from '../createAction'
import { ConfigType, ExtnedInputType, IAction, IUBBExtendConfig } from '../types'

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
    switch (item.type) {
      case ExtnedInputType.Input:
        return (
          <input key={key} name={item.key === '' ? undefined : item.key} placeholder={item.label} />
        )
      case ExtnedInputType.Checkbox:
        const id = `ubb-editor-${config.tagName}-${item.key}`
        return (
          <React.Fragment key={key}>
            <input id={id} type="checkbox" name={item.key} />
            <label htmlFor={id}>{item.label}</label>
          </React.Fragment>
        )
    }
  }

  renderForm(config: IUBBExtendConfig): React.ReactNode {
    return (
      <form onSubmit={this.handleFormSubmit}>
        {config.inputs.map(item => this.renderFormItem(item, config))}
        <button type="submit">
          <Icon icon={faCheck} />
        </button>
        <button type="reset">
          <Icon icon={faTimes} />
        </button>
      </form>
    )
  }

  render() {
    const { extendTagName } = this.props
    if (!extendTagName) return <div />
    const config = this.getCurrConfig(extendTagName)
    return <div>{this.renderForm(config)}</div>
  }
}

export default withConfig(Extends)
