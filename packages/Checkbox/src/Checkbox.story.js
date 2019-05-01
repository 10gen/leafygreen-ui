import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';
import { text, boolean } from '@storybook/addon-knobs';
import { emotion } from '@leafygreen-ui/lib';
import { colors } from '@leafygreen-ui/theme';
import Checkbox from '.';

class Control extends PureComponent {
  static propTypes = {
    variant: PropTypes.oneOf(['default', 'light']),
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    indeterminate: PropTypes.bool,
    label: PropTypes.string,
    bold: PropTypes.bool,
  };

  state = { checked: false };

  onChange = e => {
    this.setState({ checked: e.target.checked });
  };

  render() {
    const {
      bold,
      indeterminate,
      label,
      disabled,
      variant = 'default',
    } = this.props;
    const { checked } = this.state;

    return (
      <div
        className={emotion.css`
        background-color: ${
          variant === 'light' ? colors.gray[1] : colors.gray[8]
        };
        padding: 20px;
      `}
      >
        <Checkbox
          checked={checked}
          disabled={disabled}
          indeterminate={indeterminate}
          onChange={this.onChange}
          label={label}
          variant={variant}
          bold={bold}
        />
      </div>
    );
  }
}

storiesOf('Checkbox', module)
  .add('Default', () => (
    <Control
      disabled={boolean('Disabled', false)}
      indeterminate={boolean('Indeterminate', false)}
      label={text('Label', 'I agree to this thing.')}
      bold={boolean('Bold text', false)}
    />
  ))
  .add('Light', () => (
    <Control
      disabled={boolean('Disabled', false)}
      indeterminate={boolean('Indeterminate', false)}
      label={text('Label', 'I agree to this thing.')}
      variant="light"
      bold={boolean('Bold text', false)}
    />
  ));
