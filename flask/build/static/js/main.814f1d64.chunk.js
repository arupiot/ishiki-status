(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{13:function(e,t,a){e.exports=a.p+"static/media/francesco.8c6a2873.png"},17:function(e,t,a){e.exports=a(44)},23:function(e,t,a){},43:function(e,t,a){},44:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),c=a(9),r=a.n(c),l=(a(23),a(10)),s=a(11),i=a(15),m=a(12),d=a(16),u=a(13),p=a.n(u),h=a(14),k=a.n(h),w=(a(43),function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(i.a)(this,Object(m.a)(t).call(this,e))).state={booked:!1,userEmail:"",deskName:""},a}return Object(d.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this;k.a.get("https://arup-iot-desk.appspot.com/api/desks/5629499534213120").then(function(t){console.log(t.data),e.setState({booked:t.data.booked,userEmail:t.data.user_email,deskName:t.data.name})});var t=window.location.hostname;return o.a.createElement("div",{className:"App"},o.a.createElement("header",{className:"App-header"},o.a.createElement("p",null,o.a.createElement("code",null,t)),o.a.createElement("p",null,o.a.createElement("code",null,this.state.deskName)),o.a.createElement("img",{src:p.a,className:"App-logo",alt:"logo"}),o.a.createElement("p",null,"Booked by: ",this.state.userEmail),o.a.createElement("p",null,"Booked until 5:30pm")))}}]),t}(o.a.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(o.a.createElement(w,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[17,1,2]]]);
//# sourceMappingURL=main.814f1d64.chunk.js.map