import createAction from '../src/createAction'
import { IUBBButtonConfig } from '../src/types'

const config: IUBBButtonConfig = {
  type: 0,
  tagName: 'b',
  index: 0,
}

describe('action creator', () => {
  it('basic use', () => {
    const action = createAction(config)

    expect(action).toEqual({
      type: config.type,
      tagName: config.tagName,
    })
  })

  it('with payload', () => {
    const customPayload = {
      content: '',
    }

    const action = createAction(config, customPayload)

    expect(action).toEqual({
      type: config.type,
      tagName: config.tagName,
      payload: customPayload,
    })
  })

  it('with custom action', () => {
    const customAction = {
      shouldEnter: true,
      shouldSelect: true,
    }

    const action = createAction(config, undefined, customAction)

    expect(action).toEqual({
      type: config.type,
      tagName: config.tagName,
      ...customAction,
    })
  })
})
