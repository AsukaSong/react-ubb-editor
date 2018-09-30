import { IUBBConfig } from '../types'

import b from './buttons/b'
import center from './buttons/center'
import del from './buttons/del'
import i from './buttons/i'
import left from './buttons/left'
import replyview from './buttons/replyview'
import right from './buttons/right'
import u from './buttons/u'

import color from './customs/color'
import size from './customs/size'

// prettier-ignore
export const defaultConfig: IUBBConfig[] = [
  b,
  i,
  u,
  del,
  left,
  center,
  right,
  replyview,
  size,
  color,
] // TODO
