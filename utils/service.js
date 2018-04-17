import { remote } from 'electron';
import { domain } from '../config/domain.js';

import { message } from 'antd';

// import NProgress from '../containers/NProgress.js';
// import { hashHistory } from 'react-router';

function getData(obj){
  obj = obj || {}
  let str = '';
  for(let n in obj){
    str += (n + '=' + ((obj[n] === undefined || obj[n] === null)  ? '' : obj[n]) + '&');
  }
  return encodeURI(str);
}

function fetchJson(url, obj){
    // NProgress(true);
    obj = obj || { method: "GET" };
    obj.credentials = 'includes';
    if(!obj.headers){
        obj.headers = {};
    }
    if(sessionStorage.getItem('cookies')){
        obj['headers']['Cookie'] = sessionStorage.getItem('cookies');
    }
    if(!obj['headers']['Content-Type']){
        obj['headers']['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
    }
    console.log('1',domain);
    return remote.app.fetch(domain + url, obj).then(res => {
        if(res.headers.raw()['set-cookie']){
            let cookies = '';
            for(let i = 0;i < res.headers.raw()['set-cookie'].length;i++){
                cookies += res.headers.raw()['set-cookie'][i] + ';';
            }
            sessionStorage.setItem('cookies', cookies);
        }
        return res
    })
    .then(res => {
        if(res.status === 200){
            return res.text()
        }else if(/^4/.test(res.status)){
            // message.error('客户端请求错误！')
            console.log('客户端请求错误！');
        }else if(/^5/.test(res.status)){
            // message.error('服务器出错，请稍后尝试！');
            console.log('服务器出错，请稍后尝试！')
        }
        return res.url

    })
    .then(text => {
        // NProgress(false);
        text = text.trim();
        if(/^[\{\[]/.test(text)){
            // console.log(JSON.parse(text))
            if(JSON.parse(text).retCode === 5){
                sessionStorage.setItem('isLogin','false');
                sessionStorage.removeItem('cookies');
        				// message.info('登陆失效，请重新登录！');
        				// hashHistory.push('/');
        				return {
                        retCode: -1,
                        retData: [],
                     };
                }
            return JSON.parse(text)
        }else{
            // message.error('请求数据失败！')
            console.log('错误请求：', text);
            return {
                retCode: -1,
                retData: [],
                retMsg: text
            }
        }
    })
    .catch(err => {
        // NProgress(false);
        console.log('网络错误error：', err);
        return {
            retCode: -1,
            retData: [],
            retMsg: '网络异常，请尝试重新请求！'
        }
    })
};


function fetchBuffer(url, obj){
    obj = obj || {
        method: "GET"
    }
    if(!obj.headers){
        obj.headers = {};
    }
    if(sessionStorage.getItem('cookies')){
        obj['headers']['Cookie'] = sessionStorage.getItem('cookies');
    }
    if(!obj['headers']['Content-Type']){
        obj['headers']['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
    }
    console.log(domain)
    return remote.app.fetch(domain + url, obj).then(res => {

        if(res.headers.raw()['set-cookie']){
            let cookies = '';
            for(let i = 0;i < res.headers.raw()['set-cookie'].length;i++){
                cookies += res.headers.raw()['set-cookie'][i] + ';';
            }
            sessionStorage.setItem('cookies', cookies);
        }
        return res
    })
    .then(res => {
        if(res.status === 200){
            return res.buffer()
        }else if(/^4/.test(res.status)){
            message.error('客户端请求错误！')
        }else if(/^5/.test(res.status)){
            message.error('服务器出错，请稍后尝试！')
        }
        return -1

    })
    .then(buffer => buffer.toString('base64'))
    .catch(err => {
        message.error(err)
        return -1
    })
}

/* 登录页面 */
// 获取验证码
export function securityCodeHTTP() {
    return fetchBuffer('/verifycode?r=' + Math.random())
}
export function loginHTTP(data){
    return fetchJson('/login', {
        method: 'POST',
        body: encodeURI(`username=${data.username}&password=${data.password}&code=${data.code}`)
    })
}
