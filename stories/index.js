import React from 'react';
// @ts-ignore
import { storiesOf } from '@storybook/react';

import creatEditor from '../src/index'

const UbbEditor = creatEditor()

storiesOf('Editor', module)
  .add('basic use', class extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        value: ''
      }
      this.onChange = this.onChange.bind(this)
    }

    onChange(value) {
      this.setState({
        value,
      })
    }

    render() {
      return <UbbEditor value={this.state.value} onChange={this.onChange} />
    }
  })
