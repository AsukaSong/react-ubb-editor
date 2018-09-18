/**
 * button - just a button
 * extend - expand a menu after button click 
 * custom - custom how to render the menu
 */
export type buttonType = 'button' | 'extend' | 'custom'

/**
 * @export
 * @interface IState 
 * @description state of editor
 */
export interface IState {
  /**
   * @type {string}
   * @memberof IState
   * @description value of editor
   */
  value: string
  /**
   * @type {number}
   * @memberof IState
   * @description where the select starts
   */
  start: number
  /**
   * @type {number}
   * @memberof IState
   * @description where the select ends
   */
  end: number
}

/**
 * @export
 * @interface IAction
 * @description to be dispatched after the button clicked
 */
export interface IAction {
  /**
   * @type {('button' | 'extend')}
   * @memberof IAction
   * @description determine which default handler to be used
   */
  type: 'button' | 'extend'
  /**
   * @type {string}
   * @memberof IAction
   * @description determine which specific handler to be used
   */
  tagName: string
  /**
   * @type {{mainValue?: string, subValues?: { key: string, value: string }[]}}
   * @memberof IAction
   * @description extra message passed by action
   */
  payload?: {
    /**
     * @type {string}
     * @example mainValue of '[align=center]' is center
     */
    mainValue?: string
    /**
     * @type {{ key: string, value: string | boolean }[]}
     * @example subValues of '[iframe,width=200,height=100]' is [{ width: '200', height: '100' }]
     */
    subValues?: {
      key: string
      value: string | boolean
    }[],
  }
}

/**
 * @export
 * @interface ICustomAction<T>
 * @description to be dispatched after the button clicked
 */
export interface ICustomAction<T> {
  /**
   * @type {string}
   * @memberof ICustomAction<T>
   * @description determine which specific handler to be used
   */
  tagName: string
  /**
   * @type {{T}}
   * @memberof ICustomAction<T>
   * @description extra message passed by action
   */
  payload: T
}

/**
 * @interface IUBBBaseConfig
 * @description base interface of config
 */
interface IUBBBaseConfig {
  /**
   * @type {buttonType}
   * @memberof IUBBBaseConfig
   * @description type of button
   */
  type: buttonType
  /**
   * @type {string}
   * @memberof IUBBBaseConfig
   * @description tagName added into quote mark, should be unique
   */
  tagName: string
  /**
   * @type {string}
   * @memberof IUBBBaseConfig
   * @description displayed when mouse hover the button
   */
  title?: string
  /**
   * @type {string}
   * @memberof IUBBBaseConfig
   * @description fontawesome icon type, will be displayed inside the button
   */
  icon?: string
  /**
   * @type {string}
   * @memberof IUBBBaseConfig
   * @description will be displayed inside the button if there's no icon given
   */
  label?: string
  /**
   * @memberof IUBBBaseConfig
   * @description custom how to handle the action and insert the code
   */
  handler?: (state: IState, action: IAction) => IState
}

/**
 * @export
 * @interface IUBBButtonConfig
 * @extends {IUBBBaseConfig}
 * @description just a simple button
 */
export interface IUBBButtonConfig extends IUBBBaseConfig {
  /**
   * @type {('button')}
   * @memberof IUBBButtonConfig
   * @description determine which default handler to be used
   */
  type: 'button'
}

export interface IUBBExtendConfig extends IUBBBaseConfig {
  /**
   * @type {('extend')}
   * @memberof IUBBExtendConfig
   * @description determine which default handler to be used
   */
  type: 'extend'
  /**
   * @type {({ label: string, type: 'checkbox' | 'input' }[])}
   * @memberof IUBBExtendConfig
   * @description inputs that will be displayed in extra menu
   */
  inputs: {
    /**
     * @type {string}
     * @description label for checkbox and placeholder for input
     */
    label: string
    /**
     * @type {('checkbox' | 'input')}
     * @description which kind of input to be displayed
     */
    type: 'checkbox' | 'input'
  }[]
  /**
   * @memberof IUBBExtendConfig
   * @description if specified, there will be an upload button inside extra menu
   */
  upload?: () => Promise<IAction>
}

export interface IUBBCustomConfig<T = any> {
  type: 'custom'
  handler: (state: IState, action: ICustomAction<T>) => IState
  render: (invoke: (action: ICustomAction<T>) => void) => JSX.Element
}

export type IUBBConfig = IUBBButtonConfig | IUBBCustomConfig | IUBBExtendConfig
