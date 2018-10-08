import { faLink } from '@fortawesome/free-solid-svg-icons'
import defaultHandler from '../../defaultHandler'
import { ConfigType, ExtendValueType, IUBBExtendConfig } from '../../types'

const config: IUBBExtendConfig = {
  type: ConfigType.Extend,
  tagName: 'url',
  title: '插入url',
  icon: faLink,
  index: 110,
  inputs: [
    {
      label: '请输入URL',
      key: '',
      type: ExtendValueType.Main,
    },
  ],
  handler: (state, action) => {
    if (state.end !== state.start) return defaultHandler(state, action)

    let content = `[url]${action.payload!.mainValue}[/url]`
    content += '\n'

    return {
      start: state.start + content.length,
      end: state.start + content.length,
      value:
        state.value.slice(0, state.start) +
        content +
        state.value.slice(state.start, state.value.length),
    }
  },
}

export default config
