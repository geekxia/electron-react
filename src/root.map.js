import Welcome from './views/Welcome/welcome.js';
import First from './views/First/first.js';

export default {
  '/welcome': {
    key: 0,
    text: '欢迎页',
    component: Welcome
  },
  '/first': {
    key: 1,
    text: '第一页',
    component: First
  }
}
