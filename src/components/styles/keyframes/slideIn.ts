import { keyframes } from 'react-emotion'

const slideIn = keyframes`
  from {
    top: 10px;
    opacity: 0;
  }
  to {
    top: 0;
    opacity: 1;
  }
`

export default slideIn
