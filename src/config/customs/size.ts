import { faTextHeight } from '@fortawesome/free-solid-svg-icons'
import { IUBBCustomConfig } from '../../types'

const config: IUBBCustomConfig = {
  type: 'custom',
  tagName: 'size',
  icon: faTextHeight,
  render: () => null,
  index: 90,
}

export default config
