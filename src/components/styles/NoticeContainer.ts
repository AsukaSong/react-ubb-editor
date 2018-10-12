import styled from 'react-emotion'
import slideIn from './keyframes/slideIn'

const NoticeContainer = styled('div')`
  position: absolute;
  top: 2rem;
  width: 100%;
  height: 2rem;
  display: flex;
  align-items: center;
  pointer-events: none;

  div,
  span {
    width: 100%;
    height: 2rem;
  }

  .rc-notification-notice {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    margin-bottom: 10px;
  }

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

export default NoticeContainer
