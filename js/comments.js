const loadDisqusStyle = () => {
  console.log('banana');
  const disqusElem = document.querySelector('#disqus_thread');
  console.log('->', disqusElem.querySelector('iframe').contentWindow);
  const disqusDocument = disqusElem.querySelector('iframe').contentWindow;

  // disqusDocument.on('DOMContentLoaded', () => {
    const iFrameHead = disqusDocument.querySelector('head');
    console.log(iFrameHead);

    const customCss = iFrameHead.createElement('link');

    customCss.href = '/assets/main.css';
    customCss.rel = 'stylesheet';
    customCss.type = 'text/css';

    iFrameHead.appendChild(customCss);
  // });
};
console.log('assinando evento');
window.addEventListener('disqus-loaded', loadDisqusStyle);
