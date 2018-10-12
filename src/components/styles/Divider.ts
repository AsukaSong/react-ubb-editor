import styled from 'react-emotion'

const Divider = styled('span')<{ margin: string }>`
  display: inline-flex;
  align-items: center;
  color: #ddd;
  margin: ${props => props.margin};

  &:after {
    content: '|';
  }
`

export default Divider
