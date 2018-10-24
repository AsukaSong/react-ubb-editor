import { shallow } from 'enzyme'
import React from 'react'
import ReactDOM from 'react-dom'

import createEditor from '../src'
import defaultConfig from '../src/config'

const Editor = createEditor()

describe('editor factory', () => {
  it('render without crash', done => {
    const div = document.createElement('div')
    ReactDOM.render(<Editor />, div, () => {
      done()
    })
  })

  it('use default config', () => {
    const wrapper = shallow(<Editor />)

    expect(wrapper.prop('value').configs).toEqual(defaultConfig)
  })

  it('ignore default config', () => {
    const Editor = createEditor({ configs: [] }, true)
    const wrapper = shallow(<Editor />)

    expect(wrapper.prop('value').configs).toEqual([])
  })

  it('contain extra config', () => {
    const Editor = createEditor({ configs: [
      {
        type: 0,
        tagName: 'english',
        index: 0,
      },
    ]})
    const wrapper = shallow(<Editor />)

    expect(wrapper.prop('value').configs[0].tagName).toBe('english')
  })

  it('throw error', () => {
    expect(() => createEditor({}, true)).toThrowError()
  })
})
