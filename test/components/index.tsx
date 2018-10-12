import { mount, ReactWrapper, render, shallow } from 'enzyme'
import React from 'react'
import sinon from 'sinon'
import { Core, IState, props } from '../../src/components'
import { defaultConfig } from '../../src/config'

describe('editor core component', () => {
  it('select after set props', () => {
    const wrapper = mount(
      <Core config={{ configs: defaultConfig }} />,
    ) as ReactWrapper<props, IState, Core>
    const core = wrapper.instance()
    sinon.spy(core, 'focusAndSelectTextarea')

    wrapper.setProps({
      value: 'some value',
    })

    expect(wrapper.state('value')).toBe('some value')
    expect(core.focusAndSelectTextarea).toHaveProperty('callCount', 1)
  })
})
