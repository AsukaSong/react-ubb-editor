import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info'
import { action } from '@storybook/addon-actions'
import PropTypes from 'prop-types'

import creatEditor from '../src/index'

import Table from './components/Table'
import types from './proptypes/basicuse'

const UbbEditor = creatEditor()

storiesOf('Editor', module)
  .add('basic use', 
    withInfo({
      inline: true,
      TableComponent: Table(types),
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
        <UbbEditor value="some value" onChange={action('change')} />
      )
    )
  )
