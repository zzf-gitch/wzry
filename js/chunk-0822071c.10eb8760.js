(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0822071c"],{"1e08":function(e,t,a){"use strict";a("a107")},a107:function(e,t,a){},e348:function(e,t,a){"use strict";a.r(t);var n=a("7a23"),c=a("bc3a"),o=a.n(c),l=a("5502"),i=a("6c02"),u={class:"zhangjielist"},s={setup:function(e){Object(l["b"])(),Object(i["d"])(),Object(i["c"])();var t=Object(n["ref"])(1),a=Object(n["ref"])(10),c=Object(n["ref"])(""),s=Object(n["ref"])(10),r=Object(n["reactive"])({listpage:[]});Object(n["onMounted"])((function(){p()}));var p=function(){o.a.get("/page.json").then((function(e){console.log(e.data),r.listpage=e.data.listpage,a.value=e.data.listpage.length/a,c.value=e.data.listpage.length}))},g=function(e){r.page=e,o.a.get("/page.json").then((function(e){r.listpage=e.data.listpage}))};return function(e,o){var l=Object(n["resolveComponent"])("van-pagination");return Object(n["openBlock"])(),Object(n["createElementBlock"])("div",u,[(Object(n["openBlock"])(!0),Object(n["createElementBlock"])(n["Fragment"],null,Object(n["renderList"])(Object(n["unref"])(r).listpage,(function(e){return Object(n["openBlock"])(),Object(n["createElementBlock"])("div",{class:"zhangjie",key:e.id},Object(n["toDisplayString"])(e.chapter),1)})),128)),Object(n["createVNode"])(l,{onChange:g,modelValue:t.value,"onUpdate:modelValue":o[0]||(o[0]=function(e){return t.value=e}),"total-items":a.value,"page-count":c.value,"items-per-page":s.value,"force-ellipses":""},null,8,["modelValue","total-items","page-count","items-per-page"])])}}},r=(a("1e08"),a("6b0d")),p=a.n(r);const g=p()(s,[["__scopeId","data-v-a838a88e"]]);t["default"]=g}}]);
//# sourceMappingURL=chunk-0822071c.10eb8760.js.map