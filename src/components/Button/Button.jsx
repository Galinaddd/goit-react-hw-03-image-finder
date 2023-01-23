import css from './Button.module.css';

export const Button = ({ children, onButtonClick }) => {
  return (
    <button typ="button" className={css.Button} onClick={onButtonClick}>
      {children}
    </button>
  );
};
