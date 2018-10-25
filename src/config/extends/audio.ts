import { faMusic } from '@fortawesome/free-solid-svg-icons'
import { ConfigType, ExtendValueType, IUBBExtendConfig } from '../../types'

const config: IUBBExtendConfig = {
  type: ConfigType.Extend,
  tagName: 'audio',
  title: '插入音频',
  icon: faMusic,
  index: 140,
  inputs: [
    {
      label: '请输入音频地址',
      key: '',
      type: ExtendValueType.Content,
    },
  ],
}

export default config
