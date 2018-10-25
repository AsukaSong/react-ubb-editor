### Source
```tsx
const UbbEditor = creatEditor()

class Container extends React.Component {
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
```

### Instance Method
| name                   | type                                                  |
| ---------------------- | ----------------------------------------------------- |
| undo                   | () => void                                            |
| redo                   | () => void                                            |
| focusAndSelectTextarea | (start?: number, end?: number) => void                |
| clearExtendAndCustom   | () => void                                            |
| notice                 | (message: string) => void                             |
