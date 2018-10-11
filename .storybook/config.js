// @ts-ignore
import { configure } from '@storybook/react'
import React from 'react'
import { setDefaults } from '@storybook/addon-info'
import { setOptions } from '@storybook/addon-options'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { prism } from 'react-syntax-highlighter/styles/prism';
import 'highlight.js/styles/xcode.css'
import styled from 'react-emotion'

const Head = level => styled(`h${level}`)`
border-bottom: 1px solid #eaecef;
`

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
        marginRight: "20px",
        fontSize: "25px",
        display: "inline"
      },
      body: {
        paddingTop: 0,
        paddingBottom: 0
      },
      h2: {
        display: "inline",
        color: "#999"
      }
    },
    infoBody: {
      padding: "0px 5px",
      lineHeight: "2"
    }
  },
  components: {
    code: ({ language, code }) => {
      return <SyntaxHighlighter style={prism} language={language}>{code}</SyntaxHighlighter>
    },
    table: ({ children }) => <Table>{children}</Table>,
    h3: ({ children }) => <h3>{children}</h3>
  }
})

const loadStories = () => {
  require('../stories/Welcome'),
  require('../stories/Editor'),
  require('../stories/Buttons'),
  require('../stories/Extends'),
  require('../stories/Customs')
}

configure(loadStories, module)