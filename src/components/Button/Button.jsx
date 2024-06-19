import cn from 'classnames';
import PropTypes from 'prop-types';

import css from './button.module.css';

export const Button = ({ className, children, tabIndex = null, onClick }) => (
  <button className={cn(css.root, className)} tabIndex={tabIndex} type="button" onClick={onClick}>
    {children}
  </button>
);

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  tabIndex: PropTypes.number,
  onClick: PropTypes.func,
};
