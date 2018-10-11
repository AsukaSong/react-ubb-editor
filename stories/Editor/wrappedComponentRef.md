### Source
```jsx
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
        <UbbEditor wrappedComponentRef={this.getRef}></UbbEditor>
        <button onClick={this.message}>message</button>
      </Fragment>
    )
  }
}
```

### Instance Method
| name                   | type                      |
| ---------------------- | ------------------------- |
| undo                   | () => void                |
| redo                   | () => void                |
| focusAndSelectTextarea | () => void                |
| clearExtendAndCustom   | () => void                |
| notice                 | (message: string) => void |
