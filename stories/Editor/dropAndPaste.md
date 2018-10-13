### Source
```tsx
const UbbEditor = creatEditor()

class Container extends React.Component {
  handleDrop(
    e: React.DragEvent<HTMLTextAreaElement>,
    dispatch: (action: IAction) => void,
  ) {
    const files = Array.from(e.dataTransfer.files) as File[]
    if (files.length > 0) {
      e.preventDefault()
      dispatch({
        type: 0,
        tagName: 'file',
        payload: {
          content: files[0].name,
        },
      })
    }
  }

  render() {
    return (
      <UbbEditor defaultValue="drop file here" onDrop={this.handleDrop} />
    )
  }
}
```

### Events
| name    | type                                                                                |
| ------- | ----------------------------------------------------------------------------------- |
| onDrop  | (e, dispatch: (action: IAction) => void, notice: (message: string) => void) => void |
| onPaste | (e, dispatch: (action: IAction) => void, notice: (message: string) => void) => void |
