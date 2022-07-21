import './Button.scss';

const BUTTON_TYPE_CLASSES = {
  google: 'google-sign-in',
  inverted: 'inverted',
};
const Button = ({ children, buttonType, onClick, otherProps }) => {
  return (
    <button
      className={`${BUTTON_TYPE_CLASSES[buttonType] || ''} button-container`}
      onClick={onClick}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default Button;
