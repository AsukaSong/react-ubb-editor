### Source
```jsx
const Upload = ({ dispatch, message }) => 
  <input
    id="upload"
    type="file"
    onChange={/* dispatch action or alert message */}
  />

const config = {
  configs: [
    {
      type: 2,
      tagName: 'upload',
      title: '上传文件',
      label: <label htmlFor="upload"><Icon icon={faUpload}></Icon></label>,
      index: 10,
      Component: Upload
    }
  ]
}

const UbbEditor = creatEditor(config, true)
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
