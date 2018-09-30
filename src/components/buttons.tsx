import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import bindAll from 'lodash-decorators/bindAll';
import * as React from 'react';
import { IConfigProps, withConfig } from '../context';
import createAction from '../createAction';
import { IAction, IUBBConfig } from '../types';

type props = IConfigProps & {
  dispatch: (action: IAction) => void;
  onExtendButtonClick: (tagName: string) => void;
  onCustomButtonClick: (tagName: string) => void;
};

@bindAll()
class Buttons extends React.Component<props> {
  public renderContent(config: IUBBConfig): JSX.Element {
    return config.icon ? <Icon icon={config.icon} /> : <span>{config.label}</span>;
  }

  public generateHandleButtonClick(config: IUBBConfig) {
    switch (config.type) {
      case 'button':
        return () => this.props.dispatch(createAction(config));
      case 'custom':
        return () => this.props.onExtendButtonClick(config.tagName);
      case 'extend':
        return () => this.props.onCustomButtonClick(config.tagName);
    }
  }

  public render() {
    const {
      config: { configs },
    } = this.props;

    return (
      <div>
        {configs.map(item => (
          <button onClick={this.generateHandleButtonClick(item)}>{this.renderContent(item)}</button>
        ))}
      </div>
    );
  }
}

export default withConfig(Buttons);
