import React from 'react';
import { NavBar, Icon, Toast, Drawer, List, Popover, } from 'antd-mobile';
import PropTypes from 'prop-types';
import './index.css';
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

const Item = Popover.Item;
const myImg = src => <img src={`https://gw.alipayobjects.com/zos/rmsportal/${src}.svg`} className="am-icon am-icon-xs" alt="" />;
const RightContent = () => {
  const [popoverShow, setPopoverShow] = React.useState(false);
  return (
    <Popover 

      overlayClassName="fortest"
      overlayStyle={{ color: 'currentColor' }}
      visible={popoverShow}
      overlay={[
        (<Item key="5" value="special" icon={myImg('PKAgAqZWJVNwKsAJSmXd')} style={{ whiteSpace: 'nowrap' }}>设置</Item>),
        (<Item key="6" value="button ct" icon={myImg('uQIYTFeRrjPELImDRrPt')}>
          <span style={{ marginRight: 5 }}>登录</span>
        </Item>),
      ]}
      align={{
        overflow: { adjustY: 0, adjustX: 0 },
        offset: [-10, 0],
      }}
      onVisibleChange={() => {setPopoverShow(!popoverShow)}}
      onSelect={() => {setPopoverShow(!popoverShow)}}
    >
      <div style={{
        height: '100%',
        padding: '0 15px',
        marginRight: '-15px',
        display: 'flex',
        alignItems: 'center',
      }}
      >
        <Icon type="ellipsis" />
      </div>
    </Popover>
  )
}

const AppFrame = (props) => {
  const [drawOpen, setDrawOpen] = React.useState(false);
  
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
    height: drawOpen ? document.documentElement.clientHeight : 0,
    overflow: 'hidden',
    // zIndex: 2,
    // top: '45px',
  };

  

  
  return (
    <AppFrameContext.Provider value={dispatch}>
      {withHeader && (
        <React.Fragment>
          <div style={navBarWrap}>
            <NavBar
              mode="dark"
              onLeftClick={() => { setDrawOpen(!drawOpen) }}
              leftContent={
                <span>Tabs</span>
              }
              rightContent={
                <RightContent></RightContent>
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
            open={drawOpen}
            onOpenChange={() => { setDrawOpen(!drawOpen) }}
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