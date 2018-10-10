// @ts-ignore
import { configure } from '@storybook/react'
import React from 'react'
import { setDefaults } from '@storybook/addon-info'
import ReactMarkdown from 'react-markdown'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { prism } from 'react-syntax-highlighter/styles/prism';
import 'highlight.js/styles/xcode.css'

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
    }
  }
})

const loadStories = () => {
  require('../stories/Welcome'),
  require('../stories/Editor'),
  require('../stories/Buttons')
}

configure(loadStories, module)