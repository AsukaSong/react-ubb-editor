import React from 'react'
import { faLaugh } from '@fortawesome/free-solid-svg-icons'

import creatEditor from '../../src/index'

const Emoji = ({ dispatch, message }) => {
  const handleClick = (e) => {
    dispatch({
      type: 2,
      tagName: 'emoji',
      payload: {
        content: e.target.innerText,
      }
    })
  }

  return (
    <div>
      <button onClick={handleClick}>1</button>
    </div>
  )
}

const handler = (state, action) => {
  const { start, end, value } = state
  const { payload } = action
  const before = value.slice(0, start)
  const after = value.slice(end, value.length)
  const content = `[em:${payload.content}]`

  return {
    start,
    value: `${before}${content}${after}`,
    end: start + content.length,
  }
}

const config = {
  configs: [
    {
      type: 2,
      tagName: 'emoji',
      title: '插入表情',
      icon: faLaugh,
      index: 10,
      Component: Emoji,
      handler,
    }
  ]
}

const Editor = creatEditor(config, true)
Editor.displayName = 'Editor'
export default Editor
