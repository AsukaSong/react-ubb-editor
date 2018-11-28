import styled from '@emotion/styled'
import React from 'react'

export const Layout = styled('div')`
  border: 1px solid rgb(238, 238, 238);
  padding: 0px 5px;
  border-radius: 2px;
`

Layout.displayName = 'Container'

export default (storyFn: () => React.ReactNode) => <Layout>{storyFn()}</Layout>
