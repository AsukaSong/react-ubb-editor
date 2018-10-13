import styled, { css } from 'react-emotion'

import content from './notice/content'
import notice from './notice/notice'

const other = css`
  div,
  span {
    width: 100%;
    height: 2rem;
  }
`

const NoticeContainer = styled('div')`
  position: absolute;
  top: 2rem;
  width: 100%;
  height: 2rem;
  display: flex;
  align-items: center;
  pointer-events: none;

  ${other}
  ${notice}
  ${content}
`

export default NoticeContainer
