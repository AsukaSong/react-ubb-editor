import { faLink } from '@fortawesome/free-solid-svg-icons'
import { ConfigType, IUBBExtendConfig } from '../../types'

const config: IUBBExtendConfig = {
  type: ConfigType.Extend,
  tagName: 'url',
  title: '插入url',
  icon: faLink,
  index: 110,
  inputs: [
    {
      label: '请输入URL',
      type: 'input',
    },
  ],
}

export default config
