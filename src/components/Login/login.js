import React from 'react';
import { remote } from 'electron';
import { securityCodeHTTP, loginHTTP } from '../../../utils/service.js';

import './login.css';
import { logo } from '../../../images/commonImg.js';
import { Button, Input, Icon } from 'antd';

import dvaApp from '../../../dva/index.js';
import { getDvaModel } from '../../../utils/arrayHandle.js';
import { connect } from 'dva';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
			username: '',
			password: '',
			code: '',
			securityImg: ''
    };
  }

  componentDidMount() {
    // 获取验证码
    this.changeSecurityCode();
  }
  // 更新验证码
  changeSecurityCode(){
    securityCodeHTTP().then(code => {
      // console.log('验证码', code);
      this.setState({
        securityImg: code
      });
    })
  }

  getUsername(e) {
    this.setState({username: e.target.value})
  };
  getPassword(e) {
    this.setState({password: e.target.value})
  }
  getCode(e) {
    this.setState({ code: e.target.value})
  }

  // Enter键登录
  keyDown(event) {
    event.persist()
    if(event.keyCode === 13) {
      event.returnValue = false;
      event.cancel = true;
      this.onClick(event);
    }
  }
  // 点击登录
  onClick(e) {
    e.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    const code = this.state.code;
    if (username && password && code) {
      const values = {
        username,
        password,
        code,
      }
      loginHTTP(values).then(data => {
        console.log('登录', data);
        if(data.retCode === 0){
          sessionStorage.setItem('isLogin','true');
          sessionStorage.setItem('nickName',this.state.username);
          console.log('登录props', this.props)
          this.props.loginHandle();

          // 全局的用户名
          let loginState = getDvaModel('login', dvaApp._models);
          loginState.nickName = this.state.username;

          // 设置登录时的cookie
          const cookies = sessionStorage.getItem('cookies');
          const cookiesVal = cookies.slice(cookies.indexOf('PHPSESSID=')*1+10,cookies.indexOf(';',cookies.indexOf('PHPSESSID=')*1+10));
          document.cookie = cookies;
          remote.session.defaultSession.cookies.set({ url : this.state.requestUrl ,name: 'PHPSESSID',value : cookiesVal}, function(error) {
            console.log('错误',error);
            // webview.reload()
          });

        } else {
          alert(data.retMsg);
        }
      })
    } else {
      message.warning('Username,password and code are required!');
    }
  }

  render() {
    return(
      <div className="login-page">
				<center className="login-box">
					<div className="login-logo">
						<img src={logo} alt="卓讯互联" style={{height:60,width:60}}/>
					</div>
					<h2>ERP</h2>
					<Input
						className="login-input"
						size="large"
						placeholder="账号"
						value={this.state.username}
						onChange = {this.getUsername.bind(this)}
						prefix={<Icon type="user" />}
						onPressEnter = {this.keyDown.bind(this)}/>
					<Input
						type= "password"
						className="login-input"
						size="large"
						placeholder="密码"
						value={this.state.password}
						onChange = {this.getPassword.bind(this)}
						prefix={<Icon type="lock" />}
						onPressEnter = {this.keyDown.bind(this)} />
					<span className="security-wrapper">
						<Input
							size="large"
							value={this.state.code}
							onChange={this.getCode.bind(this)}
							className="security-code"
							placeholder="验证码"
							onPressEnter = {this.keyDown.bind(this)}/>
						<img
							src={"data:image/png;base64," + this.state.securityImg}
							onClick={this.changeSecurityCode.bind(this)}
							className="security-img" />
					</span>
					<Button type="primary" onClick={this.onClick.bind(this)}>
					  登录
					  <span class="pt-icon-standard pt-icon-arrow-right pt-align-right"></span>
					</Button>
				</center>
			</div>
    )
  }
}

export default Login;
