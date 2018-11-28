import styled from '@emotion/styled'
import { ExtendValueType } from '../../types'
import clear from './utils/clear'

const Input = styled('input')<{ valueType: ExtendValueType }>`
  ${clear};
  width: ${props => (props.valueType === ExtendValueType.Sub ? '5rem' : '15rem')};
`

export default Input
