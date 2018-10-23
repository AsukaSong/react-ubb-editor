import { mount, ReactWrapper } from 'enzyme'
import React from 'react'
import sinon from 'sinon'
import { ExtendValueType, ICustomComponentProps, IUBBExtendConfig } from '../../src'
import { Extends, IProps } from '../../src/components/extend'
import ExtendRoot from '../../src/components/styles/ExtendRoot'
import { defaultConfig } from '../../src/config'
import url from '../../src/config/extends/url'

const props: IProps = {
  extendConfig: null,
  config: {
    configs: defaultConfig,
  },
  dispatch: () => null,
  message: () => null,
}

const config: IUBBExtendConfig = {
  tagName: 'img',
  type: 1,
  index: 0,
  title: '图片',
  inputs: [
    {
      label: 'content',
      type: ExtendValueType.Content,
      key: 'content',
    },
    {
      label: 'main',
      type: ExtendValueType.Main,
      key: 'main',
    },
    {
      label: 'sub',
      type: ExtendValueType.Sub,
      key: 'sub',
    },
  ],
  ExtraComponent: class extends React.PureComponent<ICustomComponentProps> {
    render() {
      return <input />
    }
  },
}

describe('editor extend component', () => {
  it('render content by tagName', () => {
    const wrapper = mount(
      <Extends {...props} />,
    ) as ReactWrapper<IProps, null, Extends>

    let root = wrapper.find(ExtendRoot).first()
    expect(root.prop('isShown')).toBeFalsy()

    wrapper.setProps({
      extendConfig: url,
    })

    root = wrapper.find(ExtendRoot).first()
    expect(root.prop('isShown')).toBeTruthy()
    expect(wrapper.find('input').length).toBe(1)
  })

  it('callback after form submit', () => {
    const test = {
      dispatch: () => null,
    }
    sinon.spy(test, 'dispatch')

    const wrapper = mount(
      <Extends
        {...props}
        config={{
          configs: [...defaultConfig, config],
        }}
        extendConfig={config}
        dispatch={test.dispatch}
      />,
    ) as ReactWrapper<IProps, null, Extends>

    const form = wrapper.find('form').first()
    form.simulate('submit')

    expect(test.dispatch).toHaveProperty('callCount', 1)
    // @ts-ignore
    expect(test.dispatch.getCall(0).args[0]).toHaveProperty('tagName', 'img')
  })

  it('render extra component', () => {
    const wrapper = mount(
      <Extends
        {...props}
        config={{
          configs: [...defaultConfig, config],
        }}
        extendConfig={config}
      />,
    ) as ReactWrapper<IProps, null, Extends>
    expect(wrapper.find('input').length).toBe(4)
  })
})
