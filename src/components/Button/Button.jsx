import cn from 'classnames';
import PropTypes from 'prop-types';

import css from './button.module.css';

export const Button = ({ className, children, disabled, tabIndex, onClick }) => (
  <button
    className={cn(css.root, className)}
    disabled={disabled}
    tabIndex={tabIndex}
    type="button"
    onClick={onClick}
  >
    {children}
  </button>
);

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  tabIndex: PropTypes.string,
  onClick: PropTypes.func,
};
