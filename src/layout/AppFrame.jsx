import React from 'react';
import { NavBar, Icon, Toast, Drawer, List } from 'antd-mobile';
import PropTypes from 'prop-types';
import './index.module.css';
import routers from '../routers';

const tabs = routers.tab;
const navTabsArray = [];
for (let tab in tabs) {
  if (typeof tabs !== 'object') {
    continue;
  }

  navTabsArray.push({
    ...tabs[tab],
    tab,
  });
}
console.log(routers)
const initialOptions = {
  title: 'react',
  withHeader: true,
};

const AppFrameContext = React.createContext(null);

const AppFrame = (props) => {
  const [open, setOpen] = React.useState(false)
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

  const handleNavClick = () => {
    Toast.info('TODO');
  }

  const sidebar = (
    <List>
      {
        navTabsArray.map(({tab, path, name}) => (
          <List.Item 
            key={name}
            onClick={handleNavClick}
          >
            {name}
          </List.Item>
        ))
      }
    </List>
  );

  const navBarWrap = {
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 2,
    width: '100%'
  };
  const drawStyle = {
    position: 'fixed',
    minHeight: document.documentElement.clientHeight,
    zIndex: 2,
    top: '45px',
  };
  return (
    <AppFrameContext.Provider value={dispatch}>
      {withHeader && (
        <React.Fragment>
          <div style={navBarWrap}>
            <NavBar
              mode="dark"
              onLeftClick={() => { setOpen(!open) }}
              leftContent={
                <span>Tabs</span>
              }
              rightContent={
                <Icon key="1" type="ellipsis" />
              }
            >
            cnode
          </NavBar>
          </div>
          
          <Drawer
            className="my-drawer"
            style={drawStyle}
            enableDragHandle
            contentStyle={{ color: '#A6A6A6', textAlign: 'center', paddingTop: 42 }}
            sidebar={sidebar}
            open={open}
            onOpenChange={() => { setOpen(!open) }}
          >
          </Drawer>
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

  return React.useCallback(options => {
    const type = options.reset ? 'RESET' : 'CHANGE';
    dispatch({ type, payload: options });
  }, [dispatch]);
};