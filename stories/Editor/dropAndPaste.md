### Source
```tsx
const UbbEditor = createEditor()

class Container extends React.Component {
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
```

### Events
| name           | type                                                                                |
| -------------- | ----------------------------------------------------------------------------------- |
| onChange       | (value: string) => void                                                             |
| onDrop         | (e, dispatch: (action: IAction) => void, notice: (message: string) => void) => void |
| onPaste        | (e, dispatch: (action: IAction) => void, notice: (message: string) => void) => void |
| ...otherEvents | (e, dispatch: (action: IAction) => void, notice: (message: string) => void) => void |
