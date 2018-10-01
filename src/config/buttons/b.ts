import { faBold } from '@fortawesome/free-solid-svg-icons'
import { ConfigType, IUBBButtonConfig } from '../../types'

const config: IUBBButtonConfig = {
  type: ConfigType.Button,
  tagName: 'b',
  title: '加粗',
  icon: faBold,
  index: 10,
}

export default config
