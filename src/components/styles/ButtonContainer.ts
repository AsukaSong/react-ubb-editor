import styled from '@emotion/styled'

const ButtonContainer = styled('div')<{ index?: number }>`
  position: relative;
  order: ${props => props.index};
`

export default ButtonContainer
