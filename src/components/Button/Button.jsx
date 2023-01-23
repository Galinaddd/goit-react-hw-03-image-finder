import css from './Button.module.css';
import PropTypes from 'prop-types'; 

export const Button = ({ children, onButtonClick }) => {
  return (
    <button typ="button" className={css.Button} onClick={onButtonClick}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  onButtonClick: PropTypes.func.isRequired
};