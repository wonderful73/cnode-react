import React from 'react';

function useAdaper(uiWidth) {

  function getFontSize() {
    const docEl = document.documentElement;
    const fixedWidth = uiWidth / 2;
    let screenWidth = docEl.clientWidth ? docEl.clientWidth : window.screen.width;
    const fontSize = (screenWidth / fixedWidth) * 20;
    return fontSize;
  }

  const [fontSize, setFonsize] = React.useState(getFontSize());

  function handleResize() {
    setFonsize(getFontSize());
    document.documentElement.style.fontSize = fontSize + 'px';
  }

  React.useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  })
}

export default useAdaper;