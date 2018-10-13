### Source
~~~javascript
const config = {
  configs: [
    {
      type: 1,
      tagName: 'img',
      title: '插入图片',
      icon: faImage,
      index: 10,
      inputs: [
        {
          label: '请输入图片URL',
          type: 2,
        },
      ],
    },
  ],
}

const UbbEditor = creatEditor(config, true)
~~~
### Extend Config Type
| name          | type                     | isRequired | default        | description                                                |
| ------------- | ------------------------ | ---------- | -------------- | ---------------------------------------------------------- |
| type          | 1                        | true       |                | 1 stands for ExtendConfig                                  |
| tagName       | string                   | true       |                | tagName added into quote mark, should be unique            |
| index         | number                   | true       |                | index of the button, higher are later                      |
| inputs        | Array<InputType>         | true       |                | inputs shown on extend bar                                 |
| title         | string                   |            |                | displayed when hover the button                            |
| icon          | IconDefinition           |            |                | fontawesome icon type, will be displayed inside the button |
| label         | ReactNode                |            |                | will be displayed inside the button                        |
| handler       | (state, action) => state |            | defaultHandler | custom how to handle the action and insert the code        |
| defaultAction | IAction                  |            |                | default action                                             |

### InputType
| name  | type                 | description                    |
| ----- | -------------------- | ------------------------------ |
| label | string               | placeholder                    |
| key   | string               | key for sub values             |
| type  | enum ExtendValueType | 0 - main, 1 - sub, 2 - content |
