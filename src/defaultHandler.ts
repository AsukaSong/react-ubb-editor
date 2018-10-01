import { ConfigType, handler } from './types'

const defaultHandler: handler = (state, action) => {
  const { start, end, value } = state
  const { tagName, payload = {}, type } = action

  const {
    shouldEnter = type === ConfigType.Extend,
    shouldSelect = type === ConfigType.Button,
  } = action

  const before = value.slice(0, start)
  const after = value.slice(end, value.length)
  let content = `[${tagName}`
  if (payload.mainValue) {
    content += `=${payload.mainValue}`
  }
  if (payload.subValues && payload.subValues.length) {
    content += `,${payload.subValues.map(({ key, value }) => `${key}=${value}`).join(',')}`
  }
  content += `]${value.slice(start, end)}[/${tagName}]`
  if (shouldEnter) {
    content += '\n'
  }

  return {
    value: `${before}${content}${after}`,
    start: shouldSelect ? start : before.length + content.length,
    end: before.length + content.length,
  }
}

export default defaultHandler
