import { faAlignLeft } from '@fortawesome/free-solid-svg-icons'
import { ConfigType, IUBBButtonConfig } from '../../types'

const config: IUBBButtonConfig = {
  type: ConfigType.Button,
  tagName: 'left',
  title: '左对齐',
  icon: faAlignLeft,
  index: 50,
}

export default config
