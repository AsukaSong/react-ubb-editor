import styled, { css } from 'react-emotion'

const ExtendRoot = styled('div')<{ isShown: boolean }>(
  props => ({
    height: props.isShown ? '2em' : '0em',
  }),
  css`
    display: flex;
    transition-duration: 0.1s;
    transition-property: height;
    padding: 0 0.5rem;
    border-bottom: 1px solid rgb(238, 238, 238);

    form {
      display: flex;
    }
  `,
)

export default ExtendRoot
