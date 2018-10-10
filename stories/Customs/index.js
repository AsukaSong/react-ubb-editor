import React from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'

import creatEditor from '../../src/index'
import LayoutDecorator from '../components/Layout'
import Table from '../components/Table'
import types from '../types/basicuse'

const Upload = ({ dispatch, message }) => (
  <div style={{ display: 'none' }}>
    <input id="upload" type="file" onChange={() => {/** dispatch action or alert message */}} />
  </div>
)

const config = {
  configs: [
    {
      type: 2,
      tagName: 'upload',
      title: '上传文件',
      label: <label style={{ cursor: 'pointer' }} htmlFor="upload"><Icon icon={faUpload} /></label>,
      index: 10,
      Component: Upload
    }
  ]
}

const UbbEditor = creatEditor(config, true)
UbbEditor.displayName = 'Editor'

storiesOf('Customs', module)
  .addDecorator(LayoutDecorator)
  .add('upload', 
    withInfo({
      text: require('./upload.md'),
      propTablesExclude: [UbbEditor],
    })(
      () => <UbbEditor />
    )
  )
