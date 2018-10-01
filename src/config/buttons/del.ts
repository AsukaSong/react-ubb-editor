import { faStrikethrough } from '@fortawesome/free-solid-svg-icons'
import { ConfigType, IUBBButtonConfig } from '../../types'

const config: IUBBButtonConfig = {
  type: ConfigType.Button,
  tagName: 'del',
  title: '删除线',
  icon: faStrikethrough,
  index: 40,
}

export default config
