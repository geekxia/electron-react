import React from 'react';

import dvaApp from '../../../dva/index.js';

export default class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    console.log('dva-app', dvaApp);
  }

  render(){
    return(
      <div>欢迎来到ERP工厂端</div>
    )
  }
}
