### Source
```jsx
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
```

### Instance Method
| name                   | type                      |
| ---------------------- | ------------------------- |
| undo                   | () => void                |
| redo                   | () => void                |
| focusAndSelectTextarea | () => void                |
| clearExtendAndCustom   | () => void                |
| notice                 | (message: string) => void |
