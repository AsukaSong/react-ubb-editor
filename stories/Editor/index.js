import React from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'

import creatEditor from '../../src/index'
import LayoutDecorator from '../components/Layout'
import Table from '../components/Table'
import types from '../types/basicuse'

const UbbEditor = creatEditor()
UbbEditor.displayName = 'Editor'

class Container extends React.Component {
  componentDidMount() {
    this.editor.focusAndSelectTextarea()
  }

  getRef = it => this.editor = it

  render() {
    return <UbbEditor wrappedComponentRef={this.getRef} />
  }
}

storiesOf('Editor', module)
  .addDecorator(LayoutDecorator)
  .add('basic use', 
    withInfo({
      TableComponent: Table(types),
    })(
      () => <UbbEditor />
    )
  )
  .add('wrappedComponentRef',
    withInfo({
      text: require('./wrappedComponentRef.md'),
      propTablesExclude: [Container],
    })(
      () => <Container />
    )
  )
