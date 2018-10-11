import React, { Fragment } from 'react'
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

  message = () => {
    this.editor.notice('a simple message')
  }

  getRef = it => this.editor = it

  render() {
    return (
      <Fragment>
        <UbbEditor wrappedComponentRef={this.getRef} />
        <button onClick={this.message}>message</button>
      </Fragment>
    )
  }
}

class Container2 extends React.Component {
  handleDrop(e, dispatch) {
    const files = e.dataTransfer.files
    if(files.length > 0) {
      e.preventDefault()
      dispatch({
        type: 0,
        tagName: 'file',
        payload: {
          content: Array.from(files)[0].name
        }
      })
    }
  }

  render() {
    return (
      <UbbEditor defaultValue="drop file here" onDrop={this.handleDrop} />
    )
  }
}


UbbEditor.displayName = 'Editor'
Container.displayName = 'Container'
Container2.displayName = 'Container'

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
  .add('dropAndPaste',
    withInfo({
      text: require('./dropAndPaste.md'),
      propTablesExclude: [Container2]
    })(
      () => <Container2 />
    )
  )
