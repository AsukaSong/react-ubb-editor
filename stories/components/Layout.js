import React from 'react'
import styled from 'react-emotion'

export const Layout = styled('div')`
  border: 1px solid rgb(238, 238, 238);
  padding: 0px 5px;
  border-radius: 2px;
`

Layout.displayName = 'Container'

export default storyFn => <Layout>{storyFn()}</Layout>
