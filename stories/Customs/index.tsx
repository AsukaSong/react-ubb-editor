import { withInfo } from '@storybook/addon-info'
import { storiesOf } from '@storybook/react'
import React from 'react'

import LayoutDecorator from '../components/Layout'
import Emoji from './emoji'
import Upload from './upload'

storiesOf('Customs', module)
  .addDecorator(LayoutDecorator)
  .add(
    'upload',
    withInfo({
      text: require('./upload.md'),
      propTablesExclude: [Upload],
    })(
      () => <Upload />,
    ),
  )
  .add(
    'emoji',
    withInfo({
      text: require('./emoji.md'),
      propTablesExclude: [Emoji],
    })(
      () => <Emoji />,
    ),
  )
