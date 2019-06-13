import { faImage, faUpload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { withInfo } from '@storybook/addon-info'
import { storiesOf } from '@storybook/react'
import React from 'react'

import createEditor from '../../src/index'
import LayoutDecorator from '../components/Layout'

const styles = {
  div: {
    display: 'flex',
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    margin: '.5rem',
  },
  upload: {
    display: 'none',
  },
}

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

const ExtraComponent = () => (
  <div style={styles.div}>
    <input id="file" type="file" style={styles.upload} />
    <label htmlFor="file" style={styles.label}>
      <Icon icon={faUpload} />
    </label>
    <input type="checkbox" id="checkbox" />
    <label style={styles.label} htmlFor="checkbox">
      无损上传
    </label>
  </div>
)

const config2 = {
  configs: [
    {
      ExtraComponent,
      ...config.configs[0],
    },
  ],
}

const UbbEditor = createEditor(config, true)
const UbbEditor2 = createEditor(config2, true)
UbbEditor.displayName = 'Editor'
UbbEditor2.displayName = 'Editor'

storiesOf('Extends', module)
  .addDecorator(LayoutDecorator)
  .add(
    'basic use',
    withInfo({
      text: require('./basicUse.md').default,
      propTablesExclude: [UbbEditor],
    })(() => <UbbEditor />)
  )
  .add(
    'with extra component',
    withInfo({
      text: require('./withExtraComponent.md').default,
      propTablesExclude: [UbbEditor],
    })(() => <UbbEditor2 />)
  )
