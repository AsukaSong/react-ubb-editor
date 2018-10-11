import React from 'react'
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'

import creatEditor from '../../src/index'

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

const Editor = creatEditor(config, true)
Editor.displayName = 'Editor'
export default Editor
