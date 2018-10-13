### Source
```tsx
const Emoji = ({ dispatch }: { dispatch: (action: IAction) => void }) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch({
      type: 2,
      tagName: 'emoji',
      payload: {
        content: (e.target as HTMLButtonElement).innerText,
      },
    })
  }

  return (
    <div>
      <button onClick={handleClick}>1</button>
    </div>
  )
}

const handler = (state: IState, action: IAction) => {
  const { start, end, value } = state
  const { payload } = action
  const before = value.slice(0, start)
  const after = value.slice(end, value.length)
  const content = `[em:${payload!.content}]`

  return {
    start,
    value: `${before}${content}${after}`,
    end: start + content.length,
  }
}

const config = {
  configs: [
    {
      handler,
      type: 2,
      tagName: 'emoji',
      title: '插入表情',
      icon: faLaugh,
      index: 10,
      Component: Emoji,
    },
  ],
}

const Editor = creatEditor(config, true)
```
### Custom Config Type
| name          | type                     | isRequired | default        | description                                                |
| ------------- | ------------------------ | ---------- | -------------- | ---------------------------------------------------------- |
| type          | 2                        | true       |                | 2 stands for CustomConfig                                  |
| tagName       | string                   | true       |                | tagName added into quote mark, should be unique            |
| index         | number                   | true       |                | index of the button, higher are later                      |
| Component     | ReactComponent           | true       |                | will be rendered under the button                          |
| title         | string                   |            |                | displayed when hover the button                            |
| icon          | IconDefinition           |            |                | fontawesome icon type, will be displayed inside the button |
| label         | ReactNode                |            |                | will be displayed inside the button                        |
| handler       | (state, action) => state |            | defaultHandler | custom how to handle the action and insert the code        |
| defaultAction | IAction                  |            |                | default action                                             |
