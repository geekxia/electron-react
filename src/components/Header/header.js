import React from 'react';

import './header.css';
import { history } from 'react-router-dom';
import exitImg from '../../../images/exit.png';

import dvaApp from '../../../dva/index.js';
import { getDvaModel } from '../../../utils/arrayHandle.js';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nickName: ''
    };
  }

  componentDidMount() {
    // const nickName = sessionStorage.getItem('nickName') || '';
    // this.setState({nickName: nickName});
    // 获取用户名
    setTimeout(function() {
      const loginState = getDvaModel('login', dvaApp._models);
      const nickName = loginState.nickName;
      this.setState({nickName: nickName});
    }.bind(this), 500);


  }

  // 退出登录
  _loginOut() {
    sessionStorage.removeItem('isLogin');
    location.reload();
  }


  render() {
    return(
      <div className='container-header'>
        <img className='h-exit' src={exitImg} onClick={this._loginOut.bind(this)} />
        <span className='h-nickname'>{this.state.nickName}</span>
      </div>
    )
  }
}
