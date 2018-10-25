import styled from 'react-emotion'

const ButtonContainer = styled('div')<{ index?: number }>`
  position: relative;
  order: ${props => props.index};
`

export default ButtonContainer
