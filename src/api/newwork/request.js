
import axios from "axios";
import { Base64 } from "js-base64"
import {ElMessageBox} from 'element-plus'

//#####··········域名管理··········#####//
const server = axios.create({
//   baseURL: "http://localhost:8081",
  time: 10000,
});

//#####·········配置默认请求··········#####//
//####········GET请求········####//
export function getReq(url, params) {
  return server({ method: "GET", url, params });
}

//####········POST请求········####//
export function postReq(url, data) {
  return server({ method: "POST", url, data });
}

//####········PUT请求········####//
export function putReq(url, data) {
  return server({ method: "PUT", url, data });
}

//####········PATCH请求········####//
export function patchReq(url, data) {
  return server({ method: "PATCH", url, data });
}

//####········DELETE请求········####//
export function deleteReq(url,params) {
  return server({ method: "DELETE", url,params });
}



//创建通用axios配置
let instance = axios.create({
	responseType:"json",
	headers:{'Content-Type':'application/json'}
})

//对token加密
function baseFun(){
	const token=localStorage.getItem('token')//从本地缓存里取出token
	const base64=Base64.encode(token + ':')//对token加密
	return 'Basic' + base64
}

//http拦截:是在axios请求发出之前给每一个接口携带token去后端校验身份
instance.interceptors.request.use(
	config=>{
		let token = localStorage.getItem('token')
		if(token){
			config.headers.Authorization = baseFun
		}
		return config
	},
	err=>{
		return Promise.reject(err)
	}
)

//http拦截:是在axios请求发出之后
instance.interceptors.request.use(
	response => {
		return response
	},
	error => {
		if(error.response){
			let ERRS = error.response.status
			let MSG = error.response.data.msg.msg
			let errdata = ERRS == 401 ? MSG : '服务器发生错误'
			switch(ERRS){
				case 401:
				//没有访问权限,token过期,没有携带token请求,token错误
				ElMessageBox.alert(errdata, '提示',{
					confirmButtonText: '完成',
					type:"error"
				}).then(res=>{
					
				}).catch(err=>{
					
				})
				break;
			}
		}
		return Promise.reject(error.response.data)//返回接口的错误信息
	}
)
//#####·········拦截器··········#####//
//####·······请求拦截器········####//
// server.interceptors.request.use((config) => {
//   Vue.prototype.$lybLoad.show();
//   config.headers.authorization = localStorage.getItem("token");
//   return config;
// });
// //####·······响应拦截器········####//
// server.interceptors.response.use(
//   (res) => {
//     setTimeout(() => {
//       Vue.prototype.$lybLoad.close();
//     }, 1000);
//     return res;
//   },
//   () => {
//     Vue.prototype.$lybLoad.close();
//     Vue.prototype.$tip("请求失败！", "danger");
//   },
// );