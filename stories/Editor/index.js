import React from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'

import creatEditor from '../../src/index'
import LayoutDecorator from '../components/Layout'
import Table from '../components/Table'
import types from '../types/basicuse'

const UbbEditor = creatEditor()

class Container extends React.Component {
  componentDidMount() {
    this.editor.focusAndSelectTextarea()
  }

  getRef = it => this.editor = it

  render() {
    return <UbbEditor wrappedComponentRef={this.getRef} />
  }
}


UbbEditor.displayName = 'Editor'
Container.displayName = 'Container'

storiesOf('Editor', module)
  .addDecorator(LayoutDecorator)
  .add('basic use', 
    withInfo({
      text: require('./basicuse.md'),
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
