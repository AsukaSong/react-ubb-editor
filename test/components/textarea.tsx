import { mount, ReactWrapper } from 'enzyme'
import React from 'react'
import sinon from 'sinon'
import Textarea, { IProps } from '../../src/components/textarea'

const props: IProps = {
  value: '',
  onChange: () => null,
}

describe('editor buttons component', () => {
  it('render buttons by config', () => {
    const wrapper = mount(
      <Textarea {...props} />,
    ) as ReactWrapper<IProps, null, Textarea>

    const textarea = wrapper.find('textarea')
    textarea.getDOMNode().scrollTop = 100
    textarea.simulate('scroll')

    expect(wrapper.instance()).toHaveProperty('scrollTop', 100)
  })

  it('undo and redo', () => {
    const test = {
      handleChange: () => null,
    } as any
    sinon.spy(test, 'handleChange')
    const wrapper = mount(
      <Textarea {...props} onChange={test.handleChange} />,
    ) as ReactWrapper<IProps, null, Textarea>
    wrapper.setProps({
      value: 'test',
    })
    expect(test.handleChange).toHaveProperty('callCount', 0)
    wrapper.instance().undo()
    expect(test.handleChange).toHaveProperty('callCount', 1)
    expect(test.handleChange.getCall(0).args[0]).toEqual('')
    wrapper.instance().redo()
    expect(test.handleChange).toHaveProperty('callCount', 2)
    expect(test.handleChange.getCall(1).args[0]).toEqual('test')
    wrapper.instance().undo()
    expect(test.handleChange).toHaveProperty('callCount', 3)
    expect(test.handleChange.getCall(0).args[0]).toEqual('')

    const textarea = wrapper.find('textarea').first()
    textarea.simulate('input')
    wrapper.instance().redo()
    expect(test.handleChange).toHaveProperty('callCount', 3)
  })

  it('do nothing', () => {
    const wrapper = mount(
      <Textarea {...props} />,
    ) as ReactWrapper<IProps, null, Textarea>

    const textarea = wrapper.find('textarea').first()
    textarea.simulate('focus')
    textarea.simulate('keydown')
  })

  it('callback on key down', () => {
    const test = {
      handleKeyDown: () => null,
    } as any
    sinon.spy(test, 'handleKeyDown')
    const wrapper = mount(
      <Textarea {...props} onKeyDown={test.handleKeyDown} />,
    ) as ReactWrapper<IProps, null, Textarea>
    const textarea = wrapper.find('textarea').first()
    textarea.simulate('keydown')
    expect(test.handleKeyDown).toHaveProperty('callCount', 1)
  })

  it('blur', () => {
    const wrapper = mount(
      <Textarea {...props} />,
    ) as ReactWrapper<IProps, null, Textarea>
    const textarea = wrapper.find('textarea').first()
    // @ts-ignore
    textarea.getDOMNode().focus()
    expect(document.activeElement!.tagName).toBe('TEXTAREA')
    wrapper.instance().blur()
    expect(document.activeElement!.tagName).toBe('BODY')
  })
})
