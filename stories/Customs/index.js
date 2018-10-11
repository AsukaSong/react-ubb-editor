import React from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'

import LayoutDecorator from '../components/Layout'
import Upload from './upload'
import Emoji from './emoji'

storiesOf('Customs', module)
  .addDecorator(LayoutDecorator)
  .add('upload', 
    withInfo({
      text: require('./upload.md'),
      propTablesExclude: [Upload],
    })(
      () => <Upload />
    )
  )
  .add('emoji', 
    withInfo({
      text: require('./emoji.md'),
      propTablesExclude: [Emoji],
    })(
      () => <Emoji />
    )
  )
