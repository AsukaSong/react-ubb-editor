import styled from '@emotion/styled'
import { setDefaults } from '@storybook/addon-info'
import { setOptions } from '@storybook/addon-options'
import { configure } from '@storybook/react'
import React from 'react'
// @ts-ignore
import { Prism } from 'react-syntax-highlighter'

import 'highlight.js/styles/xcode.css'

const Table = styled('table')`
  border-collapse: collapse;

  td {
    border: 1px solid #ccc;
    padding: 0 10px;
  }

  th {
    border: 1px solid #ccc;
  }
`

setOptions({
  showAddonPanel: false,
})

setDefaults({
  inline: true,
  styles: {
    header: {
      h1: {
        marginRight: '20px',
        fontSize: '25px',
        display: 'inline',
      },
      body: {
        paddingTop: 0,
        paddingBottom: 0,
      },
      h2: {
        display: 'inline',
        color: '#999',
      },
    },
    infoBody: {
      padding: '0px 5px',
      lineHeight: '2',
    },
  },
  components: {
    code: ({ language, code }: { language: string, code: string }) => {
      return <Prism language={language}>{code}</Prism>
    },
    table: ({ children }: { children: React.ReactChildren }) => <Table>{children}</Table>,
    h3: ({ children }: { children: React.ReactChildren }) => <h3>{children}</h3>,
  },
} as any)

const loadStories = () => {
  require('../stories/Welcome'),
  require('../stories/Editor'),
  require('../stories/Buttons'),
  require('../stories/Extends'),
  require('../stories/Customs')
}

configure(loadStories, module)
