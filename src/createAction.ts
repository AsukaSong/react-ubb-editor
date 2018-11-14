import { IAction, IUBBConfig, Omit } from './types'

// prettier-ignore
const createAction: (
  config: Pick<IUBBConfig, 'tagName' | 'type' | 'defaultAction'>,
  payload?: IAction['payload'],
  customAction?: Omit<IAction, 'payload' | 'tagName' | 'type'>,
) => IAction = (config, payload, customAction) => {
  const { tagName, type, defaultAction } = config

  const action: IAction = defaultAction || {
    tagName,
    type,
  }

  if (payload) {
    action.payload = payload
  }

  if (customAction) {
    Object.assign(action, customAction)
  }

  return action
}

export default createAction
