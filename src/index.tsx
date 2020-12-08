import { render, MountableElement } from 'solid-js/web';

import App from './views/App';
navigator.serviceWorker.register('serviceWorker.js', {
  type: 'module',
});
render(() => <App />, document.getElementById('app') as MountableElement);
