import styled from '@emotion/styled'
import clear from './utils/clear'

const Textarea = styled('textarea')`
  ${clear};
  width: 100%;
  min-height: 100px;
  flex-grow: 1;
  resize: none;
  font-size: inherit;
  padding: 0.5rem;
  box-sizing: border-box;
`

export default Textarea
