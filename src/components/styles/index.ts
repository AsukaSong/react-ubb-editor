import styled, { css } from 'react-emotion'

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

export const Button = styled('button')`
  ${clear};
  cursor: pointer;
  width: 1.5rem;
  height: 2rem;
  margin: 0 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const ButtonContainer = styled('div')`
  position: relative;
`

export const Input = styled('input')`
  ${clear};
`

export const Textarea = styled('textarea')`
  ${clear} width: 100%;
  flex-grow: 1;
  resize: none;
`

export const Root = styled('div')`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  font-size: 16px;
`

export const ButtonRoot = styled('div')`
  width: 100%;
  height: 2em;
  display: flex;
`

export const ExtendRoot = styled('div')<{ isShown: boolean }>(
  props => ({
    height: props.isShown ? '2em' : '0em',
  }),
  css`
    display: flex;
    transition-duration: 0.1s;
    transition-property: height;

    form {
      display: flex;
    }
  `,
)
