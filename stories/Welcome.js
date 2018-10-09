import React from 'react';
// @ts-ignore
import { storiesOf } from '@storybook/react';
import ReactMarkdown from 'react-markdown'
import Layout from './components/Layout'
import Head from './components/Head'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { prism } from 'react-syntax-highlighter/styles/prism';
import 'highlight.js/styles/xcode.css'

const code = `
# @CC98/react-ubb-editor

A ubb editor based on react

## Install

with yarn
~~~bash
yarn add @cc98/react-ubb-editor
~~~

or with npm
~~~bash
npm install --save @cc98/react-ubb-editor
~~~

## Usage

~~~jsx
import createEditor from '@cc98/react-ubb-editor'
const Editor = createEditor()
ReactDOM.render(<Editor />, document.getElementById('app'))
~~~

## Development

~~~bash
git clone https://github.com/AsukaSong/react-ubb-editor.git
cd react-ubb-editor
yarn start
~~~
`

storiesOf('Welcome')
  .addDecorator(Layout)
  .add('readme', () => (
    <div style={{ padding: '1rem' }}>
      <ReactMarkdown
        source={code}
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