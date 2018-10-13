import { faBold } from '@fortawesome/free-solid-svg-icons'
import { withInfo } from '@storybook/addon-info'
import { storiesOf } from '@storybook/react'
import React from 'react'

import creatEditor from '../../src/index'
import LayoutDecorator from '../components/Layout'

const config = {
  configs: [
    {
      type: 0,
      tagName: 'b',
      title: '加粗',
      icon: faBold,
      index: 10,
    },
  ],
}

const UbbEditor = creatEditor(config, true)
UbbEditor.displayName = 'Editor'

const config2 = {
  configs: [
    {
      type: 0,
      tagName: 'english',
      title: 'english',
      label: <span style={{ fontSize: 16 }}>E</span>,
      index: 41,
    },
  ],
}

const UbbEditor2 = creatEditor(config2)
UbbEditor2.displayName = 'Editor'

storiesOf('Buttons', module)
  .addDecorator(LayoutDecorator)
  .add(
    'attach extra button',
    withInfo({
      text: require('./attachExtraButton.md'),
      propTablesExclude: [UbbEditor2],
    })(
      () => <UbbEditor2 />,
    ),
  )
  .add(
    'replace all',
    withInfo({
      text: require('./replaceAll.md'),
      propTablesExclude: [UbbEditor],
    })(
      () => <UbbEditor />,
    ),
  )
