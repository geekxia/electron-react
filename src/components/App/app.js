import React from 'react';
import { withRouter } from 'react-router-dom';

import Header from '../Header/header.js';
import Nav from '../Nav/nav.js';
import Content from '../Content/content.js';

import './app.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // 初始启动，进入欢迎页面
    this.props.history.push('/welcome');
  }

  render() {
    return(
      <div className='app'>
        <div className='app-header'><Header /></div>
        <div className='app-nav'><Nav /></div>
        <div className='app-content'><Content /></div>
      </div>
    )
  }
}

export default withRouter(App);
