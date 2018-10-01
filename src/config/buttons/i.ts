import { faItalic } from '@fortawesome/free-solid-svg-icons'
import { ConfigType, IUBBButtonConfig } from '../../types'

const config: IUBBButtonConfig = {
  type: ConfigType.Button,
  tagName: 'i',
  title: '斜体',
  icon: faItalic,
  index: 20,
}

export default config
