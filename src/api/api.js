import Vue from 'vue'
const actions = {
	"get": 'application/json',
	"post": 'application/x-www-form-urlencoded'
}
function instance(options){
	const params = {
		url: Vue.prototype.ip_pltopen,
		method: "POST",
		data:{
			"url":Vue.prototype.ip_options + options.url,
			"token": Vue.prototype.tokens,
			'method': options.method,
			'domain': 'HQ', //非必填，默认HQ，取当前登录用户的companyID
			'parameter': options?.data ?? {}
		}
	}
	uni.showLoading({
		title: "加载中",
		mask: true,
	});
	return new Promise((resolve, reject) =>{
		uni.request({
			...params,
			success(res) {
				resolve(res)
			},
			fail(rej) {
				reject(rej)
			},
			complete: () => {
				// 成功或失败关闭
				uni.hideLoading();
			}
		})
	}).then(res => {
		return res.data
	}).catch(rej => {
		return rej
	})
}

// 人员定位(实时)
export const getPersonnelrealtime = () => {
  return instance({
    method: 'GET',
    url: '/monitor-server-hd/locationReal/current',
    data: { isLeader: '1' },
  })
}

export const minePersonnelInformation = () => {
  return instance({
    url: '/monitor-server-hd/locationReal/currentLeaderAndCurrentPeopleCount',
    method: 'GET'
  })
}
// 获取矿端实时井下人数
export const getPersonnelNumber = () => {
  return instance({
    method: 'GET',
    url: '/monitor-server-hd/locationReal/currentCount',
  })
}

export const getRosteringData = (data) =>{
	return instance({
	  method: 'GET',
	  url: '/monitor-server-hd/locationGuideLeader/getByMonth',
	  data
	})
}

export const getMonthLeader = (data) =>{
	return instance({
	  method: 'GET',
	  url: '/monitor-server-hd/locationGuideLeader/getMonthLeaderSum',
	  data
	})
}

export const getLocusData = (data) =>{
	return instance({
	  method: 'GET',
	  url: '/monitor-server-hd/locationPathHi/listByDate',
	  data
	})
}