### Source

```jsx
const Editor = creatEditor()
```

### Params

| params | name                | type    | description                        |
| ------ | ------------------- | ------- | ---------------------------------- |
| first  | extraConfig         | IConfig | config for editor, more info below |
| second | ignoreDefaultConfig | boolean | whether to ignore default config   |

### IConfig

| name         | type                                   | description           |
| ------------ | -------------------------------------- | --------------------- |
| configs      | Array<IUBBConfig>                      | more in next chapters |
| UbbContainer | React.ComponentType<{ value: string }> | for preview           |