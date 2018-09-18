import React from 'react';
import { storiesOf } from '@storybook/react';

import creatEditor from '../src/index'

const UbbEditor = creatEditor()

storiesOf('Editor', module)
  .add('basic use', () => (
    <UbbEditor />
  ))
