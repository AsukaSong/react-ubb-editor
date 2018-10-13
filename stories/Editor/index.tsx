import { withInfo } from '@storybook/addon-info'
import { storiesOf } from '@storybook/react'
import React, { Fragment } from 'react'

import creatEditor, { CoreType, IAction } from '../../src'
import LayoutDecorator from '../components/Layout'
import Table from '../components/Table'
import types from '../types/basicuse'

const UbbEditor = creatEditor()

class Container extends React.Component {
  static displayName = 'Container'
  editor!: CoreType

  componentDidMount() {
    this.editor.focusAndSelectTextarea()
  }

  message = () => {
    this.editor.notice('a simple message')
  }

  getRef = (it: CoreType) => this.editor = it

  render() {
    return (
      <Fragment>
        <UbbEditor wrappedComponentRef={this.getRef} />
        <button onClick={this.message}>message</button>
      </Fragment>
    )
  }
}

// tslint:disable-next-line
class Container2 extends React.Component {
  static displayName = 'Container'
  it!: CoreType

  handleDrop(
    e: React.DragEvent<HTMLTextAreaElement>,
    dispatch: (action: IAction) => void,
    message: (message: string) => void,
  ) {
    const files = Array.from(e.dataTransfer.files) as File[]
    if (files.length > 0) {
      e.preventDefault()
      this.it.customTextarea.blur()
      dispatch({
        type: 0,
        tagName: 'file',
        payload: {
          content: files[0].name,
        },
      })
      message('上传成功')
    }
  }

  render() {
    return (
      <UbbEditor
        wrappedComponentRef={it => this.it = it}
        defaultValue="drop file here"
        onDrop={this.handleDrop}
      />
    )
  }
}

UbbEditor.displayName = 'Editor'

storiesOf('Editor', module)
  .addDecorator(LayoutDecorator)
  .add(
    'basic use',
    withInfo({
      text: require('./basicUse.md'),
      TableComponent: Table(types),
    } as any)(
      () => <UbbEditor />,
    ),
  )
  .add(
    'wrapped component ref',
    withInfo({
      text: require('./wrappedComponentRef.md'),
      propTablesExclude: [Container],
    })(
      () => <Container />,
    ),
  )
  .add(
    'drop and paste',
    withInfo({
      text: require('./dropAndPaste.md'),
      propTablesExclude: [Container2],
    })(
      () => <Container2 />,
    ),
  )
