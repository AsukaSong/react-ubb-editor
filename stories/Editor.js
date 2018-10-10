import React from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import LayoutDecorator, { Layout } from './components/Layout'

import creatEditor from '../src/index'

import Table from './components/Table'
import types from './types/basicuse'

const UbbEditor = creatEditor()
UbbEditor.displayName = 'Editor'

storiesOf('Editor', module)
  .addDecorator(LayoutDecorator)
  .add('basic use', 
    withInfo({
      TableComponent: Table(types),
    })(
      () => <UbbEditor />
    )
  )
