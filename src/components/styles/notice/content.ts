import { css } from 'react-emotion'
import slideIn from '../keyframes/slideIn'

const content = css`
  .rc-notification-notice-content {
    animation: ${slideIn} 0.3s ease;
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 12px;
    min-width: 10rem;
    width: auto;
    color: #222;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }
`

export default content
