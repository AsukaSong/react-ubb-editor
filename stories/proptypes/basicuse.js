export default [
  {
    property: 'value',
    propType: 'string',
    required: false,
    description: 'value of editor',
    defaultValue: 'empty string',
  },
  {
    property: 'onChange',
    propType: 'function',
    required: false,
    description: 'invoke after value change',
    defaultValue: '(value) => null',
  }
]