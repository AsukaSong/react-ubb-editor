import { IAction, IUBBConfig } from './types'

const createAction: (config: IUBBConfig, payload?: IAction['payload']) => IAction = (
  config,
  payload,
) => {
  const { tagName, type, defaultAction } = config

  const action: IAction = defaultAction || {
    tagName,
    type,
  }

  if (payload) {
    action.payload = payload
  }

  return action
}

export default createAction
