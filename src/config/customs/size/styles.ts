import styled from 'react-emotion'
import button from '../../../components/styles/Button'

export const Triangle = styled('div')`
  position: absolute;
  border-width: 7px;
  border-style: solid;
  border-color: transparent transparent rgb(255, 255, 255);
  border-image: initial;
  top: -14px;
  left: 17px;
`

export const TriangleBack = styled('div')`
  position: absolute;
  border-width: 8px;
  border-style: solid;
  border-color: transparent transparent rgba(0, 0, 0, 0.15);
  border-image: initial;
  top: -16px;
  left: 16px;
`

export const Button = styled(button)`
  margin: 0.4rem 0;
  height: 1.2rem;
  width: 3rem;

  &:hover {
    background-color: #ddd;
  }
`

export const Root = styled('div')`
  position: relative;
  left: -10px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 12px;
`
