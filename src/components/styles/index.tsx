import styled, { css } from 'react-emotion'

const clear = css`
  appearance: none;
  border: none;

  &::-ms-expand {
    display: none;
  }

  &:focus {
    outline: 0;
  }

  &:active {
    border: 0;
  }
`

export const Button = styled('button')`
  ${clear} cursor: pointer;
`

export const ButtonContainer = styled('div')`
  position: relative;
`

export const Input = styled('input')`
  ${clear};
`

export const Textarea = styled('textarea')`
  ${clear} width: 100%;
  height: 500px;
  resize: none;
`
