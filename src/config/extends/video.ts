import { faFilm } from '@fortawesome/free-solid-svg-icons'
import { ConfigType, ExtendValueType, IUBBExtendConfig } from '../../types'

const config: IUBBExtendConfig = {
  type: ConfigType.Extend,
  tagName: 'video',
  title: '插入视频',
  icon: faFilm,
  index: 120,
  inputs: [
    {
      label: '请输入视频地址',
      key: '',
      type: ExtendValueType.Content,
    },
  ],
}

export default config
