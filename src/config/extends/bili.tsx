import React from 'react'
import { ConfigType, ExtendValueType, IUBBExtendConfig } from '../../types'

const config: IUBBExtendConfig = {
  type: ConfigType.Extend,
  tagName: 'bili',
  title: '插入bilibili视频',
  label: <span style={{ fontSize: 16 }}>Bili</span>,
  index: 120,
  inputs: [
    {
      label: '输入bilibili网站视频AV号（数字）',
      key: '',
      type: ExtendValueType.Content,
    },
    {
      label: '请输入要显示的分P序号（默认为1）',
      key: '',
      type: ExtendValueType.Main,
    },
  ],
}

export default config
