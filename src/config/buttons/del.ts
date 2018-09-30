import { faStrikethrough } from '@fortawesome/free-solid-svg-icons'
import {
  IUBBButtonConfig,
} from '../../types'

export default <IUBBButtonConfig>{
  type: 'button',
  tagName: 'del',
  title: '删除线',
  icon: faStrikethrough,
  index: 40
}
