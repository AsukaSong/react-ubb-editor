import { faLink } from '@fortawesome/free-solid-svg-icons'
import { ConfigType, ExtnedInputType, IUBBExtendConfig } from '../../types'

const config: IUBBExtendConfig = {
  type: ConfigType.Extend,
  tagName: 'url',
  title: '插入url',
  icon: faLink,
  index: 110,
  inputs: [
    {
      label: '请输入URL',
      key: '',
      type: ExtnedInputType.Input,
    },
  ],
}

export default config
