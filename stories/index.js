import React from 'react';
import { storiesOf } from '@storybook/react';

import UbbEditor from '../src/index'

storiesOf('Editor', module)
  .add('basic use', () => (
    <UbbEditor />
  ))
