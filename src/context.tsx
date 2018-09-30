import { Omit } from 'lodash';
import * as React from 'react';
import { defaultConfig } from './config';
import { IConfig, IUBBConfig } from './types';

export interface IConfigProps {
  config: IConfig & {
    configs: IUBBConfig[];
  };
}

const context = React.createContext({
  configs: defaultConfig,
});

const { Provider, Consumer } = context;

function withConfig<P extends IConfigProps>( // tslint:disable-next-line
  Component: React.ComponentType<P>
): React.ComponentType<Omit<P, keyof IConfigProps>> {
  // tslint:disable-next-line
  return function(props) {
    return <Consumer>{config => <Component {...props} config={config} />}</Consumer>;
  };
}

export { Provider, withConfig };
