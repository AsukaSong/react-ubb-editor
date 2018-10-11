### Source
```jsx
const UbbEditor = creatEditor()

class Container extends React.Component {
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
```

### Events
| name    | type                                                                                |
| ------- | ----------------------------------------------------------------------------------- |
| onDrop  | (e, dispatch: (action: IAction) => void, notice: (message: string) => void) => void |
| onPaste | (e, dispatch: (action: IAction) => void, notice: (message: string) => void) => void |
