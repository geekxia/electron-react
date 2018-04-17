import dva from 'dva';

let dvaApp = dva();
dvaApp.model({
  namespace: 'login',
  state: {
    nickName: '',
    current: 0,
  },
  reducers: {
    add  (count) { return count + 1 },
    minus(count) { return count - 1 },
  }
});
dvaApp.model({
  namespace: 'count2',
  state: {
    record : 3,
    current: 3,
  },
});
export default dvaApp;
