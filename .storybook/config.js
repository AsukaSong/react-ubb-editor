// @ts-ignore
import { configure } from '@storybook/react';

const loadStories = () => {
  require('../stories/Welcome'),
  require('../stories/Editor')
}

configure(loadStories, module)