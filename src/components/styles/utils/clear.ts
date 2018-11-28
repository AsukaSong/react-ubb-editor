import { css } from '@emotion/core'

const clear = css`
  appearance: none;
  border: none;
  margin: 0;
  padding: 0;

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

export default clear
