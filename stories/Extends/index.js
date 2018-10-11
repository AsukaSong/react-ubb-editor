import React from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { faImage } from '@fortawesome/free-solid-svg-icons'

import creatEditor from '../../src/index'
import LayoutDecorator from '../components/Layout'
import Table from '../components/Table'
import types from '../types/basicuse'

const config = {
  configs: [
    {
      type: 1,
      tagName: 'img',
      title: '插入图片',
      icon: faImage,
      index: 10,
      inputs: [
        {
          label: '请输入图片URL',
          type: 2,
        }
      ]
    }
  ]
}

const UbbEditor = creatEditor(config, true)
UbbEditor.displayName = 'Editor'

storiesOf('Extends', module)
  .addDecorator(LayoutDecorator)
  .add('basic use', 
    withInfo({
      text: require('./basicuse.md'),
      propTablesExclude: [UbbEditor],
    })(
      () => <UbbEditor />
    )
  )
