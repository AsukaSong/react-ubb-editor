import uniqBy from 'lodash/uniqBy'
import {
  IAction,
  IUBBConfig
} from './types'

const createAction: (config: IUBBConfig, payload: IAction['payload']) => IAction = (config, payload) => {
  const { tagName, type, defaultAction } = config

  let action: IAction = defaultAction || {
    tagName,
    type,
  }

  if(payload) {
    action.payload = payload
  }

  return action
}

export default createAction