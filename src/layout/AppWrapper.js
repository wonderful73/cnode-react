import PropTypes from 'prop-types';
import { useChangeApp } from './AppFrame';

const AppWrapper = (props) => {
  const changeApp = useChangeApp();

  const {
    title, 
    withHeader = true, 
    reset = false 
  } = props;

  changeApp({
    title,
    withHeader,
    reset
  });

  return props.children;
}

AppWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  withHeader: PropTypes.bool,
  reset: PropTypes.bool
}

export default AppWrapper;