import { render, MountableElement } from 'solid-js/dom';
import App from './views/App';
// navigator.serviceWorker.register('serviceWorker.js', {
//   type: 'module',
// });
console.log('hellow, index');
render(() => <App />, document.getElementById('app') as MountableElement);
