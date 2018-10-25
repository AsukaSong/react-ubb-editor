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

import audio from './extends/audio'
import bili from './extends/bili'
import url from './extends/url'
import video from './extends/video'

import { ConfigMap } from '../types'

// prettier-ignore
const defaultConfig = [
  b, i, u, del, left, center, right, replyview, // buttons
  size, color, // customs
  url, bili, video, audio, // extends
]

// convert array to map
export default defaultConfig.reduce(
  (map, item) => {
    map[item.tagName] = item
    return map
  },
  {} as ConfigMap,
)
