import { faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { ConfigType, IUBBButtonConfig } from '../../types'

const config: IUBBButtonConfig = {
  type: ConfigType.Button,
  tagName: 'replyview',
  title: '回复后可见',
  icon: faEyeSlash,
  index: 80,
}

export default config
