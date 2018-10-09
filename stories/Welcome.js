import React from 'react';
// @ts-ignore
import { storiesOf } from '@storybook/react';
import ReactMarkdown from 'react-markdown'
import Layout from './components/Layout'
import Head from './components/Head'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { prism } from 'react-syntax-highlighter/styles/prism';
import 'highlight.js/styles/xcode.css'

storiesOf('Welcome')
  .addDecorator(Layout)
  .add('readme', () => (
    <div style={{ padding: '1rem' }}>
      <ReactMarkdown
        source={require('../README.md')}
        renderers={{
          heading: ({ level, children }) => {
            const H = Head(level)
            return <H>{children}</H>
          },
          code: ({ language, value }) => {
            return <SyntaxHighlighter style={prism} language={language}>{value}</SyntaxHighlighter>
          }
        }}
      />
    </div>
  ))