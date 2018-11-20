import { storiesOf } from '@storybook/react'
import React from 'react'
// @ts-ignore
import ReactMarkdown from 'react-markdown/with-html'
// @ts-ignore
import { Prism } from 'react-syntax-highlighter'

import Head from './components/Head'
import Layout from './components/Layout'

import 'highlight.js/styles/xcode.css'

storiesOf('Welcome', module)
  .addDecorator(Layout)
  .add('readme', () => (
    <div style={{ padding: '1rem' }}>
      <ReactMarkdown
        escapeHtml={false}
        source={require('./Welcome.md')}
        renderers={{
          heading: ({ level, children }: { level: number, children: React.ReactChildren }) => {
            const H = Head(level)
            return <H>{children}</H>
          },
          code: ({ language, value }: { language: string, value: string }) => {
            return <Prism language={language}>{value}</Prism>
          },
        }}
      />
    </div>
  ))
