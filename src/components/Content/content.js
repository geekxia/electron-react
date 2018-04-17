import React from 'react';

import { BrowserRouter, Route } from 'react-router-dom';
import './content.css';

import contentMap from '../../root.map.js';


export default class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    console.log('root-map', contentMap);
  }

  // 生成路由
  _createRoute() {
    let routeArr = [];
    for(let path in contentMap) {
      routeArr.push(
        <Route
          exact
          path={path}
          component={contentMap[path].component}
          key={contentMap[path].key}
          text={contentMap[path].name}
       />);
    }
    return routeArr;
  }

  render() {
    return(
        <div className='c-content'>
          {this._createRoute()}
        </div>
    )
  }
}
