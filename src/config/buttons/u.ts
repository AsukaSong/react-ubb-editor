import { faUnderline } from '@fortawesome/free-solid-svg-icons'
import { ConfigType, IUBBButtonConfig } from '../../types'

const config: IUBBButtonConfig = {
  type: ConfigType.Button,
  tagName: 'u',
  title: '下划线',
  icon: faUnderline,
  index: 30,
}

export default config
