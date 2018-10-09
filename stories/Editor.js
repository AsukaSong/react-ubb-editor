import React from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { action } from '@storybook/addon-actions'
import LayoutDecorator, { Layout } from './components/Layout'

import creatEditor from '../src/index'

import Table from './components/Table'
import types from './proptypes/basicuse'

const UbbEditor = creatEditor()
UbbEditor.displayName = 'Editor'

storiesOf('Editor', module)
  .addDecorator(LayoutDecorator)
  .add('basic use', 
    withInfo({
      inline: true,
      TableComponent: Table(types),
      propTablesExclude: [Layout],
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
      }
    })(
      () => ( 
        <Layout><UbbEditor onChange={action('change')} /></Layout>
      )
    )
  )
