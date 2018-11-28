import styled from '@emotion/styled'
import center from './utils/center'
import clear from './utils/clear'

const Button = styled('button')`
  ${clear};
  ${center};
  cursor: pointer;
  width: 1.5rem;
  height: 2rem;
  margin: 0 0.25rem;

  &:disabled {
    color: #aaa;
    cursor: not-allowed;
  }
`

export default Button
