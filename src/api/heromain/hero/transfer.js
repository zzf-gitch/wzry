import { getReq, postReq, patchReq, deleteReq } from "../../newwork/request.js";

//#####··········附件上传··········#####//
export const upload = (files) => {
  return instance.request({
      //#####··········附件上传请求方式··········#####//
      method: 'POST',
      //#####··········附件上传地址··········#####//
      url: '/file/file/createFile',
      data: {},
      transformRequest: function (data, headersGetter) {
          var newFormData = new FormData();
          files.forEach(item => {
              newFormData.append('file', item)
          })
          return newFormData;
      },
  })
}
//#####··········GET请求··········#####//
//####········获取者皮肤信息········####//
export const getSkinInfo = (params) => {
  return getReq("hero/hero.json", params);
};
//获取王者英雄基本信息
export const getHeroInfo = (params) => {
  return getReq("hero/heroInfo.json", params);
};
//获取王者英雄card(卡片)基本信息
export const getHeroInfocard = (params) => {
  return getReq("hero/heroInfocard.json", params);
};
//获取王者英雄头像(url)基本信息
export const getHeroUrl = (params) => {
  return getReq("hero/herourl.json", params);
};
//获取英雄联盟英雄基本信息
export const getHeroLOLInfo = (params) => {
  return getReq("hero/heroLOL.json", params);
};
//获取QQ主页基本信息
export const getQQInfo = (params) => {
  return getReq("hero/QQ.json", params);
};
//获取全国地理信息
export const getcityinfo = (params) => {
  return getReq("hero/citys.json", params);
};
// 获取路由列表信息 (故)
export const routerlist=(data)=>{
  return getReq("hero/routerlist.json", data);
}
// 获取路由列表信息 (小黄人)
export const routerHXR=(data)=>{
  return getReq("hero/routerXHR.json", data);
}
// 获取start开始数组信息
export const starts=(data)=>{
  return getReq("hero/start.json",data);
}
// 获取音乐数组信息
export const music=(data)=>{
  return getReq('hero/audio.json',data)
}
// 获取级联选择器数据
export const listLong = (data) => {
  return getReq("hero/arrlong.json" , data)
}
// export const music=(data)=>{
//   return getReq({
//     url:'hero/audio.json',
//     data
//   })
// }

//#####··········POST请求··········#####//
//####········注册英雄········####//
export const addHero = (data) => {
  return postReq("/hero", data);
};

//#####··········PATCH请求··········#####//
//####········修改英雄信息········####//
export const updateHero = (id, data) => {
  return patchReq(`/hero/${id}`, data);
};

//#####··········DELETE请求··········#####//
//####········删除英雄········####//
export const delHero = (data) => {
  return deleteReq("/hero", data);
};
// 删除英雄信息card
export const delHerocard = (data) => {
  return deleteReq("hero/heroInfocard.json", data);
};