import cn from 'classnames';
import PropTypes from 'prop-types';

import css from './button.module.css';

export const Button = ({ className, children }) => (
  <button className={cn(css.root, className)} type="button">
    {children}
  </button>
);

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};
