import { faAlignCenter } from '@fortawesome/free-solid-svg-icons'
import { ConfigType, IUBBButtonConfig } from '../../types'

const config: IUBBButtonConfig = {
  type: ConfigType.Button,
  tagName: 'center',
  title: '居中',
  icon: faAlignCenter,
  index: 60,
}

export default config
