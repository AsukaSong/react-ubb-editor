import React from 'react';
// @ts-ignore
import { storiesOf } from '@storybook/react';
import ReactMarkdown from 'react-markdown'

storiesOf('Welcome')
  .add('readme', () => <div style={{ padding: '1rem' }}><ReactMarkdown source={require('../README.md')} /></div>)