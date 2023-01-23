import PropTypes from 'prop-types';
export const ErrorMessage = ({ children }) => {
  return <p>{children}</p>;
};

ErrorMessage.protoTypes = {
  children: PropTypes.node,
};
