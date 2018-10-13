### Source
~~~tsx
const ExtraComponent = ({ dispatch }) => (
  <div>
    <input id="file" type="file" onChange={/* dispatch action */}></input>
    <label htmlFor="file"><Icon icon={faUpload}></Icon></label>
    <input type="checkbox" id="checkbox"></input>
    <label htmlFor="checkbox">无损上传</label>
  </div>
)

const config = {
  configs: [
    {
      ExtraComponent,
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
### ExtraComponent Props
| name     | type                      | description     |
| -------- | ------------------------- | --------------- |
| dispatch | (action: IAction) => void | dispatch action |
| message  | (message: string) => void | invoke message  |
