import { faAlignRight } from '@fortawesome/free-solid-svg-icons'
import { ConfigType, IUBBButtonConfig } from '../../types'

const config: IUBBButtonConfig = {
  type: ConfigType.Button,
  tagName: 'right',
  title: '右对齐',
  icon: faAlignRight,
  index: 70,
}

export default config
