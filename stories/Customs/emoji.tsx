
import { faLaugh } from '@fortawesome/free-solid-svg-icons'
import React from 'react'

import creatEditor, { IAction, IState } from '../../src/index'

const Emoji = ({ dispatch }: { dispatch: (action: IAction) => void }) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch({
      type: 2,
      tagName: 'emoji',
      payload: {
        content: (e.target as HTMLButtonElement).innerText,
      },
    })
  }

  return (
    <div>
      <button onClick={handleClick}>1</button>
    </div>
  )
}

const handler = (state: IState, action: IAction) => {
  const { start, end, value } = state
  const { payload } = action
  const before = value.slice(0, start)
  const after = value.slice(end, value.length)
  const content = `[em:${payload!.content}]`

  return {
    start,
    value: `${before}${content}${after}`,
    end: start + content.length,
  }
}

const config = {
  configs: [
    {
      handler,
      type: 2,
      tagName: 'emoji',
      title: '插入表情',
      icon: faLaugh,
      index: 10,
      Component: Emoji,
    },
  ],
}

const Editor = creatEditor(config, true)
Editor.displayName = 'Editor'
export default Editor
