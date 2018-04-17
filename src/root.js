import React from 'react';
import ReactDOM from 'react-dom';
// 登录页
import Login from './components/Login/login.js';
// 内容页
import App from './components/App/app.js';

import { BrowserRouter, Route, withRouter } from 'react-router-dom';

class Root extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			isLogin: false
		}
	}

	componentDidMount() {
		if (sessionStorage.getItem('isLogin')) {
			this.setState({isLogin: true});
			console.log('已经登录');
		}
	}

	// 登录
	_loginHandle() {
		this.setState({isLogin: true});
		sessionStorage.setItem('isLogin', true);
		console.log('props',this.props);
		// this.props.history.push('/app');
	}

	render() {
		if(this.state.isLogin) {
			return(
				<BrowserRouter>
					<App />
				</BrowserRouter>
			)
		} else {
			return(<Login loginHandle={this._loginHandle.bind(this)} />);
		}
	}
}

ReactDOM.render(<Root />, document.getElementById('root'));
