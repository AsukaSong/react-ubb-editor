import config from '../../../src/config/extends/url'

const handler = config.handler!

describe('url handler', () => {
  it('dont use defalut', () => {
    const { value } = handler(
      {
        value: '',
        start: 0,
        end: 0,
      },
      {
        tagName: 'url',
        type: 1,
        payload: {
          mainValue: 'test',
        },
      },
    )

    expect(value).toBe('[url]test[/url]\n')
  })

  it('use default', () => {
    const { value } = handler(
      {
        value: 'test',
        start: 0,
        end: 4,
      },
      {
        tagName: 'url',
        type: 1,
        payload: {
          mainValue: 'someurl',
        },
      },
    )

    expect(value).toBe('[url=someurl]test[/url]\n')
  })
})
