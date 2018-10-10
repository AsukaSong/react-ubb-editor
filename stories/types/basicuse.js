export default [
  {
    property: 'value',
    propType: 'string',
    required: false,
    description: 'value of editor',
    defaultValue: 'undefined',
  },
  {
    property: 'onChange',
    propType: 'function',
    required: false,
    description: 'invoke after value change',
    defaultValue: '(value) => null',
  },
  {
    property: 'wrappedComponentRef',
    propType: '(it: Core) => void',
    required: false,
    description: 'get ref of editor',
    defaultValue: '',
  },
  {
    property: '...props',
    propType: 'other props could be passed to textarea',
    required: false,
    description: '',
    defaultValue: '',
  },
]