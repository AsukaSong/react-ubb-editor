import styled from 'react-emotion'

const ExtendRoot = styled('div')<{ isShown: boolean }>`
  height: ${props => (props.isShown ? '2em' : '0em')};
  display: flex;
  transition-duration: 0.1s;
  transition-property: height;
  padding: 0 0.5rem;
  border-bottom: 1px solid rgb(238, 238, 238);

  form {
    display: flex;
  }
`

export default ExtendRoot
