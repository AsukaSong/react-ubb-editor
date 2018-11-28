### Source
~~~jsx
const config = {
  configs: [
    {
      type: 0,
      tagName: 'english',
      title: 'english',
      label: <span style={{ fontSize: 16 }}>E</span>,
      index: 41,
    },
  ],
}

const UbbEditor = createEditor(config)
~~~
### Button Config Type
| name          | type                     | isRequired | default        | description                                                |
| ------------- | ------------------------ | ---------- | -------------- | ---------------------------------------------------------- |
| type          | 0                        | true       |                | 0 stands for ButtonConfig                                  |
| tagName       | string                   | true       |                | tagName added into quote mark, should be unique            |
| index         | number                   | true       |                | index of the button, higher are later                      |
| title         | string                   |            |                | displayed when hover the button                            |
| icon          | IconDefinition           |            |                | fontawesome icon type, will be displayed inside the button |
| label         | ReactNode                |            |                | will be displayed inside the button                        |
| handler       | (state, action) => state |            | defaultHandler | custom how to handle the action and insert the code        |
| defaultAction | IAction                  |            |                | default action                                             |
