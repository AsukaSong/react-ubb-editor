import { mount, ReactWrapper } from 'enzyme'
import React from 'react'
import sinon from 'sinon'
import { Core, IState, props } from '../../src/components'
import { defaultConfig } from '../../src/config'
import color from '../../src/config/customs/color'
import size from '../../src/config/customs/size'

const Render = (props: any) => <span>{props.value}</span>

describe('editor core component', () => {
  it('render without crash', () => {
    const wrapper = mount(
      <Core config={{ configs: defaultConfig }} />,
    ) as ReactWrapper<props, IState, Core>
    const textarea = wrapper.find('textarea').first()
    textarea.simulate('drop')
    textarea.simulate('paste')
    textarea.simulate('focus')
  })

  it('get innerRef', () => {
    let ref;

    mount(
      <Core config={{ configs: defaultConfig }} wrappedComponentRef={it => ref = it} />,
    )

    expect(ref).toBeInstanceOf(Core)
  })

  it('select after set props', () => {
    const wrapper = mount(
      <Core value="" config={{ configs: defaultConfig }} />,
    ) as ReactWrapper<props, IState, Core>
    const core = wrapper.instance()
    core.notice('text')
    sinon.spy(core, 'focusAndSelectTextarea')

    wrapper.setProps({
      value: 'some value',
    })

    expect(wrapper.state('value')).toBe('some value')
    expect(core.focusAndSelectTextarea).toHaveProperty('callCount', 1)

    wrapper.setProps({
      value: 'some value',
    })
    expect(core.focusAndSelectTextarea).toHaveProperty('callCount', 1)
  })

  it('invoke change handler', () => {
    const test = {
      handleChange: () => null,
    }
    sinon.spy(test, 'handleChange')
    const event = { target: { value: 'some value' } }
    const wrapper = mount(
      <Core config={{ configs: defaultConfig }} onChange={test.handleChange} />,
    ) as ReactWrapper<props, IState, Core>
    const textarea = wrapper.find('textarea').first()
    textarea.simulate('change', event)

    expect(test.handleChange).toHaveProperty('callCount', 1)
  })

  it('invoke paste handler', () => {
    const test = {
      handlePaste: () => null,
    }
    sinon.spy(test, 'handlePaste')
    const wrapper = mount(
      <Core config={{ configs: defaultConfig }} onPaste={test.handlePaste} />,
    ) as ReactWrapper<props, IState, Core>
    const textarea = wrapper.find('textarea').first()
    textarea.simulate('paste')

    expect(test.handlePaste).toHaveProperty('callCount', 1)
  })

  it('invoke drop handler', () => {
    const test = {
      handleDrop: () => null,
    }
    sinon.spy(test, 'handleDrop')
    const wrapper = mount(
      <Core config={{ configs: defaultConfig }} onDrop={test.handleDrop} />,
    ) as ReactWrapper<props, IState, Core>
    const textarea = wrapper.find('textarea').first()
    textarea.simulate('drop')

    expect(test.handleDrop).toHaveProperty('callCount', 1)
  })

  it('invoke focus handler', () => {
    const test = {
      handleFocus: () => null,
    }
    sinon.spy(test, 'handleFocus')
    const wrapper = mount(
      <Core config={{ configs: defaultConfig }} onFocus={test.handleFocus} />,
    ) as ReactWrapper<props, IState, Core>
    const textarea = wrapper.find('textarea').first()
    textarea.simulate('focus')

    expect(test.handleFocus).toHaveProperty('callCount', 1)
  })

  it('record textarea select range after blur', () => {
    const wrapper = mount(
      <Core config={{ configs: defaultConfig }} value="12345"/>,
    ) as ReactWrapper<props, IState, Core>

    const textarea = wrapper.find('textarea').first()
    // @ts-ignore
    textarea.getDOMNode().setSelectionRange(0, 4)
    textarea.simulate('blur')

    expect(wrapper.state('start')).toBe(0)
    expect(wrapper.state('end')).toBe(4)
  })

  it('insert value after click 1', () => {
    const wrapper = mount(
      <Core config={{ configs: defaultConfig }} />,
    ) as ReactWrapper<props, IState, Core>

    const button = wrapper.find('button[title="加粗"]').first()
    button.simulate('click')

    expect(wrapper.state('value')).toBe('[b][/b]')
  })

  it('insert value after click 2', () => {
    const wrapper = mount(
      <Core config={{ configs: defaultConfig }} />,
    ) as ReactWrapper<props, IState, Core>

    const button = wrapper.find(size.Component).find('button').first()
    button.simulate('click')

    expect(wrapper.state('value')).toBe('[size=1][/size]')
  })

  it('show extend after click', () => {
    const wrapper = mount(
      <Core config={{ configs: defaultConfig }} />,
    ) as ReactWrapper<props, IState, Core>

    const button = wrapper.find('button[title="插入url"]').first()

    button.simulate('click')
    expect(wrapper.state('extendTagName')).toBe('url')

    button.simulate('click')
    expect(wrapper.state('extendTagName')).toBe('')
  })

  it('insert value after click 3', () => {
    const wrapper = mount(
      <Core config={{ configs: defaultConfig }} />,
    ) as ReactWrapper<props, IState, Core>

    const button = wrapper.find('button[title="插入url"]').first()

    button.simulate('click')
    expect(wrapper.state('extendTagName')).toBe('url')

    const form = wrapper.find('form').first()
    form.simulate('submit')

    expect(wrapper.state('value')).toBe('[url][/url]\n')
  })

  it('insert value after click 4', () => {
    const wrapper = mount(
      <Core config={{ configs: defaultConfig }} />,
    ) as ReactWrapper<props, IState, Core>
    const button = wrapper.find(color.Component).first().instance() as any
    button.handleOk({ hex: '#000000' })

    expect(wrapper.state('value')).toBe('[color=#000000][/color]')
  })

  it('show custom after click', () => {
    const wrapper = mount(
      <Core config={{ configs: defaultConfig }} />,
    ) as ReactWrapper<props, IState, Core>

    const button = wrapper.find('button[title="颜色"]').first()

    button.simulate('click')
    expect(wrapper.state('customTagName')).toBe('color')

    button.simulate('click')
    expect(wrapper.state('customTagName')).toBe('')
  })

  it('show change previewing', () => {
    const wrapper = mount(
      <Core config={{ configs: defaultConfig, UbbContainer: Render }} />,
    )

    const core = wrapper.instance() as Core

    expect(wrapper.state('isPreviewing')).toBeFalsy()

    core.changePreviewing()
    expect(wrapper.state('isPreviewing')).toBeTruthy()
  })

  it('undo and redo', () => {
    const event = { target: { value: 'test' } }
    const wrapper = mount(
      <Core config={{ configs: defaultConfig }} />,
    ) as ReactWrapper<props, IState, Core>
    const textarea = wrapper.find('textarea').first()
    textarea.simulate('change', event)
    const core = wrapper.instance()

    expect(wrapper.state('value')).toBe('test')
    core.undo()
    expect(wrapper.state('value')).toBe('')
    core.undo()
    expect(wrapper.state('value')).toBe('')
    core.redo()
    expect(wrapper.state('value')).toBe('test')
  })

  it('undo and redo with keyboard event', () => {
    const event = { target: { value: 'test' } }
    const wrapper = mount(
      <Core config={{ configs: defaultConfig }} />,
    ) as ReactWrapper<props, IState, Core>
    const textarea = wrapper.find('textarea').first()
    textarea.simulate('change', event)

    expect(wrapper.state('value')).toBe('test')
    textarea.simulate('keydown', {
      key: 'z',
      ctrlKey: true,
    })
    expect(wrapper.state('value')).toBe('')
    textarea.simulate('keydown', {
      key: 'y',
      ctrlKey: true,
    })
    expect(wrapper.state('value')).toBe('test')
  })
})
