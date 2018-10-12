import styled from 'react-emotion'
import clear from './utils/clear'

const Button = styled('button')`
  ${clear};
  cursor: pointer;
  width: 1.5rem;
  height: 2rem;
  margin: 0 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &:disabled {
    color: #aaa;
    cursor: not-allowed;
  }
`

export default Button
