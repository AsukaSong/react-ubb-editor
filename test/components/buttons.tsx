import { mount, ReactWrapper, render, shallow } from 'enzyme'
import React from 'react'
import sinon from 'sinon'
import { Buttons, IProps } from '../../src/components/buttons'
import { defaultConfig } from '../../src/config'
import colorConfig from '../../src/config/customs/color'

const props: IProps = {
  customTagName: '',
  onCustomButtonClick: () => null,
  onExtendButtonClick: () => null,
  redo: () => null,
  undo: () => null,
  changePreviewing: () => null,
  isPreviewing: false,
  config: {
    configs: defaultConfig,
  },
  dispatch: () => null,
  message: () => null,
}

describe('editor core component', () => {
  it('render buttons by config', () => {
    const wrapper = mount(
      <Buttons {...props} />,
    ) as ReactWrapper<IProps, null, Buttons>

    let buttons = wrapper.find('button[title]')

    expect(buttons).toHaveProperty('length', defaultConfig.length + 2)

    wrapper.setProps({
      config: {
        configs: defaultConfig,
        UbbContainer: ({ value }) => <span>value</span>,
      },
    })

    buttons = wrapper.find('button[title]')

    expect(buttons).toHaveProperty('length', defaultConfig.length + 3)
  })

  it('render custom div', () => {
    const wrapper = mount(
      <Buttons {...props} />,
    ) as ReactWrapper<IProps, null, Buttons>

    let components = wrapper.find(colorConfig.Component)
    expect(components).toHaveProperty('length', 1)

    let div = components.first().parent()
    expect(div.prop('style')).toHaveProperty('display', 'none')

    wrapper.setProps({
      customTagName: colorConfig.tagName,
    })

    components = wrapper.find(colorConfig.Component)
    expect(components).toHaveProperty('length', 1)

    div = components.first().parent()

    expect(div.prop('style')).toHaveProperty('display', '')
  })

  it('callback after click', () => {
    const test = {
      dispatch: () => null,
      onCustomButtonClick: () => null,
      onExtendButtonClick: () => null,
    }
    sinon.spy(test, 'dispatch')
    sinon.spy(test, 'onCustomButtonClick')
    sinon.spy(test, 'onExtendButtonClick')

    const wrapper = mount(
      <Buttons
        {...props}
        dispatch={test.dispatch}
        onCustomButtonClick={test.onCustomButtonClick}
        onExtendButtonClick={test.onExtendButtonClick}
      />,
    ) as ReactWrapper<IProps, null, Buttons>

    let buttons = wrapper.find('button[title="加粗"]')
    buttons.first().simulate('click')
    expect(test.dispatch).toHaveProperty('callCount', 1)

    buttons = wrapper.find('button[title="颜色"]')
    buttons.first().simulate('click')
    expect(test.onCustomButtonClick).toHaveProperty('callCount', 1)

    buttons = wrapper.find('button[title="插入url"]')
    buttons.first().simulate('click')
    expect(test.onExtendButtonClick).toHaveProperty('callCount', 1)
  })
})
