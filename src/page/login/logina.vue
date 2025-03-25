<template>
	<div class="backcont">
		<div id="pdfDom">
		   <!-- 要下载的HTML页面,页面是由后台返回 -->
		  <div class="meituan-content">
			<div class="login-cont">
				<div class="meituan-title">
					
				</div>
				<div class="meituan-user">
					<p>账号</p>
					<el-input class="inptflex" type="text" v-model="user.account" placeholder="请输入账号" clearable />
				</div>
				<div class="meituan-user">
					<p>密码</p>
					<el-input class="inptflex"  show-password type="password" v-model="user.password" placeholder="请输入密码" clearable />
				</div>
				<!-- 登陆和注册按钮的切换 -->
				<div class="reg-view" @click="xiugai"><p>{{user.regi}}</p></div>
				<!-- 登陆或注册按钮提交 -->
				<el-checkbox style="margin-left:200px" v-model="checked" label="是否勾选" @change="get" size="large" />
				<el-button :disabled="display" v-if="user.regi=='注册'" @click="signin" type="primary" class="meituan-btn">登录</el-button>
				<el-button :disabled="display" v-else type="primary" @click="register" class="meituan-btn">注册</el-button>
			</div>
		</div>
		</div>
		<el-button type="primary" size="small" @click="getPdf('#pdfDom')" class="meituan-btn">点击下载</el-button>
	</div>
	
</template>

<script>
	import htmlToPdf from '../utils/htmlToPdf.js'
	import {ref,reactive,toRefs} from 'vue'
	import {ElMessageBox} from 'element-plus'
	import {getCurrentInstance} from 'vue'
	import { useRouter } from 'vue-router'
	export default{
		setup(){
			const htmlTitle=ref('111')
			const router = useRouter()
			const {proxy} = getCurrentInstance()
			const checked=ref(false)
			const display=ref(true)
			const user=reactive({
				account:"",
				password:"",
				regi:"注册"
			})
			
			//清空表单
			const empty=()=>{
				user.account=''
				user.password=''
			}
			const get=(z)=>{
				console.log(z)
				if(z==false){
					display.value=true
				}else if(z==true){
					display.value=false
				}
			}
			//登陆
			const signin=()=>{
				console.log(user.account)
				console.log(user.password)
				ElMessageBox.alert("fuck", '提示',{
					confirmButtonText: '完成',
					type:"error"
				}).then(res=>{
					
				}).catch(err=>{
					
				})
				empty()
			}
			//注册
			const register=async()=>{
				const obj = {
					account:user.account,
					password:user.password
				}
				const res = await new proxy.$request(proxy.$urls.m().register,obj).modepost()
				console.log(res)
				router.push('/datav')
				empty()
			}
			//修改
			const xiugai=()=>{
				if(user.regi=='注册'){
					user.regi='登录'
					checked.value=false
					display.value=true
				}else if(user.regi=='登录'){
					user.regi='注册'
					checked.value=false
					display.value=true
				}
			}
			return {
				user,signin,register,empty,checked,display,get,xiugai,router,htmlTitle
			}
		}
	}
</script>

<style scoped>
	.backcont{
		height: 100%;
	}
</style>
