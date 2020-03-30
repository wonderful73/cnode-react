import React from 'react';

const style = {
  textAlign: 'center',
  lineHeight: '2rem',
  height: window.screen.height + 'px'
}
const Loading = () => {
  return (
    <div style={style}>加载中...</div>
  )
}

export default Loading;