(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/club/club"],{"1c65":function(t,n,e){"use strict";var a=e("5f17"),u=e.n(a);u.a},"5f17":function(t,n,e){},6971:function(t,n,e){"use strict";e.r(n);var a=e("ae35"),u=e("e03e");for(var o in u)"default"!==o&&function(t){e.d(n,t,(function(){return u[t]}))}(o);e("1c65");var c,r=e("f0c5"),f=Object(r["a"])(u["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],c);n["default"]=f.exports},"8a30":function(t,n,e){"use strict";(function(t,e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a=t.database(),u={data:function(){return{arrs:[]}},methods:{showqq:function(t){console.log(t),e.showModal({content:"QQ群："+t.qq,confirmText:"复制群号",success:function(n){n.confirm&&e.setClipboardData({data:t.qq,success:function(){e.showToast({title:"复制成功",duration:1e3})}})}})}},onLoad:function(){var t=this;e.showLoading(),a.collection("club").get().then((function(n){t.arrs=n.result.data,e.hideLoading()}))}};n.default=u}).call(this,e("a9ff")["default"],e("543d")["default"])},"8d2d":function(t,n,e){"use strict";(function(t){e("343f"),e("a9ff");a(e("66fd"));var n=a(e("6971"));function a(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=e,t(n.default)}).call(this,e("543d")["createPage"])},ae35:function(t,n,e){"use strict";var a;e.d(n,"b",(function(){return u})),e.d(n,"c",(function(){return o})),e.d(n,"a",(function(){return a}));var u=function(){var t=this,n=t.$createElement;t._self._c},o=[]},e03e:function(t,n,e){"use strict";e.r(n);var a=e("8a30"),u=e.n(a);for(var o in a)"default"!==o&&function(t){e.d(n,t,(function(){return a[t]}))}(o);n["default"]=u.a}},[["8d2d","common/runtime","common/vendor"]]]);