import handler from '../src/defaultHandler'
import { IAction } from '../src/types'

const initState = {
  start: 0,
  end: 0,
  value: '',
}

describe('default handler', () => {
  it('simple button action', () => {
    const action: IAction = {
      type: 0,
      tagName: 'b',
    }

    const state = handler(initState, action)

    expect(state).toEqual({
      value: '[b][/b]',
      start: 0,
      end: 7,
    })
  })

  it('simple extend action', () => {
    const action: IAction = {
      type: 1,
      tagName: 'url',
      payload: {
        content: 'url',
      },
    }

    const state = handler(initState, action)

    expect(state).toEqual({
      value: '[url]url[/url]\n',
      start: state.value.length,
      end: state.value.length,
    })
  })

  it('action with mian value', () => {
    const action: IAction = {
      type: 1,
      tagName: 'img',
      payload: {
        content: 'image',
        mainValue: '1',
      },
    }

    const state = handler(initState, action)

    expect(state).toEqual({
      value: '[img=1]image[/img]\n',
      start: state.value.length,
      end: state.value.length,
    })
  })

  it('action with sub values', () => {
    const action: IAction = {
      type: 1,
      tagName: 'img',
      payload: {
        subValues: [
          {
            key: 'width',
            value: '100',
          },
        ],
        content: 'image',
      },
    }

    const state = handler(initState, action)

    expect(state).toEqual({
      value: '[img,width=100]image[/img]\n',
      start: state.value.length,
      end: state.value.length,
    })
  })

  it('custom action', () => {
    const action: IAction = {
      type: 1,
      tagName: 'url',
      shouldEnter: false,
      shouldSelect: true,
    }

    const state = handler(initState, action)

    expect(state).toEqual({
      value: '[url][/url]',
      start: 0,
      end: state.value.length,
    })
  })
})
