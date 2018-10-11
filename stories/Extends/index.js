import React from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { faImage, faUpload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'

import creatEditor from '../../src/index'
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
        }
      ]
    }
  ]
}

const ExtraComponent = ({ dispatch }) => (
  <div style={styles.div}>
    <input id="file" type="file" style={styles.upload}></input>
    <label htmlFor="file" style={styles.label}><Icon icon={faUpload}></Icon></label>
    <input type="checkbox" id="checkbox"></input>
    <label style={styles.label} htmlFor="checkbox">无损上传</label>
  </div>
)

const config2 = {
  configs: [
    {
      type: 1,
      tagName: 'img',
      title: '插入图片',
      icon: faImage,
      index: 10,
      ExtraComponent,
      inputs: [
        {
          label: '请输入图片URL',
          type: 2,
        }
      ]
    }
  ]
}

const UbbEditor = creatEditor(config, true)
const UbbEditor2 = creatEditor(config2, true)
UbbEditor.displayName = 'Editor'
UbbEditor2.displayName = 'Editor'

storiesOf('Extends', module)
  .addDecorator(LayoutDecorator)
  .add('basic use', 
    withInfo({
      text: require('./basicUse.md'),
      propTablesExclude: [UbbEditor],
    })(
      () => <UbbEditor />
    )
  )
  .add('with extra component', 
    withInfo({
      text: require('./withExtraComponent.md'),
      propTablesExclude: [UbbEditor],
    })(
      () => <UbbEditor2 />
    )
  )
