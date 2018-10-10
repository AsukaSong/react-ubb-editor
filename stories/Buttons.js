import React from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import LayoutDecorator from './components/Layout'
import { faBold } from '@fortawesome/free-solid-svg-icons'

import creatEditor from '../src/index'

import Table from './components/Table'
import types from './proptypes/basicuse'

const config = {
  configs: [
    {
      type: 0,
      tagName: 'b',
      title: '加粗',
      icon: faBold,
      index: 10,
    }
  ]
}

const UbbEditor = creatEditor(config, true)
UbbEditor.displayName = 'Editor'

const text = `
### Source
~~~javascript
const config = {
  configs: [
    {
      type: 0,
      tagName: 'b',
      title: '加粗',
      icon: faBold,
      index: 10,
    }
  ]
}

const UbbEditor = creatEditor(config, true)
~~~
### Button Config Type
| name          | type                     | isRequired | default        | description                                                |
| ------------- | ------------------------ | ---------- | -------------- | ---------------------------------------------------------- |
| type          | 0                        | true       |                | 0 stands for ButtonConfig                                  |
| tagName       | string                   | true       |                | tagName added into quote mark, should be unique            |
| index         | number                   | true       |                | index of the button, higher are later                      |
| title         | string                   |            |                | displayed when hover the button                            |
| icon          | IconDefinition           |            |                | fontawesome icon type, will be displayed inside the button |
| label         | ReactNode                |            |                | will be displayed inside the button                        |
| handler       | (state, action) => state |            | defaultHandler | custom how to handle the action and insert the code        |
| defaultAction | IAction                  |            |                | default action                                             |
`

storiesOf('Buttons', module)
  .addDecorator(LayoutDecorator)
  .add('basic use', 
    withInfo({
      text,
      TableComponent: Table(types),
    })(
      () => <UbbEditor />
    )
  )
