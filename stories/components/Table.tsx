import styled from '@emotion/styled'
import React from 'react'

const Table = styled('table')`
  border-collapse: collapse;
`

const Td = styled('td')`
  border: 1px solid #ccc;
  padding: 0 10px;
`

const Th = styled('th')`
  border: 1px solid #ccc;
`

export default (config: any[]) => () => {
  const props = config.map(
    ({ property, propType, required, description, defaultValue }) => {
      return (
        <tr key={property}>
          <Td>
            {property}
            {required ? <span>*</span> : null}
          </Td>
          <Td>{propType}</Td>
          <Td>{defaultValue}</Td>
          <Td>{description}</Td>
        </tr>
      )
    },
  )

  return (
    <Table>
      <thead>
        <tr>
          <Th>name</Th>
          <Th>type</Th>
          <Th>default</Th>
          <Th>description</Th>
        </tr>
      </thead>
      <tbody>{props}</tbody>
    </Table>
  )
}
