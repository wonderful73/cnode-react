import React from 'react';
import PropTypes from 'prop-types';

const initialOptions = {
  title: 'RCNode',
  withHeader: true,
};

const AppFrameContext = React.createContext(null);

const AppFrame = (props) => {
  const [options, dispatch] = React.useReducer((state, {type, payload}) => {
    switch (type) {
      case 'CHANGE':
        return {
          ...state,
          title: payload.title || state.title,
          withHeader: payload.withHeader,
        };
      case 'RESET':
        return {
          ...initialOptions,
        };
      default:
        throw new Error(`Unrecognized type ${type}`);
    }
  }, initialOptions)

  const {title, withHeader} = options;

  const changeTitle = title => {
    document.title = Boolean(title) ? title : 'react-cnode';
  }

  React.useReducer(() => {
    changeTitle(title);
  }, [title]);


  return (
    <AppFrameContext.Provider value={dispatch}>
    {withHeader && (
      <React.Fragment>
        头部
      </React.Fragment>
    )}

    {props.children}
    </AppFrameContext.Provider>
  )
}

AppFrame.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppFrame;