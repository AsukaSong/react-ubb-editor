// @ts-ignore
import { configure } from '@storybook/react';

const loadStories = () => {
  require('../stories/index')
}

configure(loadStories, module)