import React from 'react';
import { NavBar, Icon, Toast } from 'antd-mobile';
import PropTypes from 'prop-types';

const initialOptions = {
  title: 'react',
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
    document.title = Boolean(title) ? title : 'react';
  }

  React.useEffect(() => {
    changeTitle(title);
  }, [title]);

  const handleLeftClick = () => {
    Toast.info('show tabs');
  }


  return (
    <AppFrameContext.Provider value={dispatch}>
    {withHeader && (
      <React.Fragment>
        <NavBar
          mode="light"
          onLeftClick={handleLeftClick}
          leftContent={
            <span>Tabs</span>
          }
          rightContent={
            <Icon key="1" type="ellipsis" />
          }
        >
          cnode
        </NavBar>
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

export const useChangeApp = () => {
  const dispatch = React.useContext(AppFrameContext);

  return React.useCallback((options => {
    const type = options.reset ? 'RESET' : 'CHANGE';
    dispatch({ type, payload: options });
  }), [dispatch]);
}