import * as React from 'react'
import { ConfigProps, withConfig } from 'src/context'

type props = ConfigProps & {
  
}

class Buttons extends React.Component<props> {
  render() {
    const { config } = this.props
    console.log(config)

    return null
  }
}

export default withConfig(Buttons)