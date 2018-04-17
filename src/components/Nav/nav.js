import React from 'react'
import { Link } from 'react-router-dom';

import {logo} from '../../../images/commonImg.js';
import './nav.css';
import { Menu } from 'antd';
const SubMenu = Menu.SubMenu;

export default class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuList: [],
      openKeys: []
    };
  }

  // 点击Menu项时
  handleClick(e) {
    console.log(e);
  }

  // Menu展缩变化时
  onOpenChange(openKeys){
    // console.log(openKeys)
    this.setState({
      openKeys: openKeys.length > 0 ? openKeys.slice(-1) : []
    })
  }

  render() {
    // 生成<Menu>数据源
    let menuList = this.state.menuList;
		function sidebarChild(menuChild){
			if(Array.isArray(menuChild))
				return (
					menuChild.map((item,index) => {
						let route = '/webpage';
						if(rootMap[item.href]){
							route = item.href;
						}
						return (
							<Menu.Item key={item.id} url={domain + item.href}><Link to={route}>{item.text}</Link></Menu.Item>
						)
					})
				);
			else
				return [];
		}
		const sidebarMenu = menuList.length>0 ?
			menuList.map((listItem,index) => (
				<SubMenu key={listItem.id} title={<span>{listItem.menu[0].text}</span>}>
					{sidebarChild(listItem.menu[0].items)}
				</SubMenu>
		)) : '';

    return(
      <div className='sidebar'>
        <div className="logo">
          <img className="logo-image" src={logo} />
          <h1 className="logo-title">ERP</h1>
        </div>
        <ul>
          <li><Link to='/welcome'>欢迎页面</Link></li>
          <li><Link to='/first'>第一页</Link></li>
        </ul>
        <Menu
          onClick={this.handleClick.bind(this)}
					openKeys={this.state.openKeys}
					onOpenChange={this.onOpenChange.bind(this)}
					mode="inline"
					className="menu"
        >{sidebarMenu}</Menu>
      </div>
    )
  }
}
