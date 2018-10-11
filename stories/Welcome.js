import React from 'react';
// @ts-ignore
import { storiesOf } from '@storybook/react'
import ReactMarkdown from 'react-markdown/with-html'
import Layout from './components/Layout'
import Head from './components/Head'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { prism } from 'react-syntax-highlighter/styles/prism';
import 'highlight.js/styles/xcode.css'

const code = `
# @CC98/react-ubb-editor
![ci](https://api.travis-ci.com/AsukaSong/react-ubb-editor.svg?branch=master)
[![codecov](https://codecov.io/gh/AsukaSong/react-ubb-editor/branch/master/graph/badge.svg)](https://codecov.io/gh/AsukaSong/react-ubb-editor)
[![npm version](https://img.shields.io/npm/v/%40cc98/react-ubb-editor.svg)](https://www.npmjs.com/package/@cc98/react-ubb-editor)
[![types](https://img.shields.io/npm/types/typescript.svg)](https://github.com/Microsoft/TypeScript)
[![develop tools](https://img.shields.io/badge/devtool-storybook-ff69b4.svg)](https://github.com/storybooks/storybook)
[![npm license](https://img.shields.io/npm/l/%40cc98%2Freact-ubb-editor.svg)](http://www.wtfpl.net/)
<br />
[![BCH compliance](https://bettercodehub.com/edge/badge/AsukaSong/react-ubb-editor?branch=master)](https://bettercodehub.com/)
[![CodeFactor](https://www.codefactor.io/repository/github/asukasong/react-ubb-editor/badge)](https://www.codefactor.io/repository/github/asukasong/react-ubb-editor)
[![dependencies Status](https://david-dm.org/asukasong/react-ubb-editor/status.svg)](https://david-dm.org/asukasong/react-ubb-editor)
[![devDependencies Status](https://david-dm.org/asukasong/react-ubb-editor/dev-status.svg)](https://david-dm.org/asukasong/react-ubb-editor?type=dev)

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

storiesOf('Welcome', module)
  .addDecorator(Layout)
  .add('readme', () => (
    <div style={{ padding: '1rem' }}>
      <ReactMarkdown
        escapeHtml={false}
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