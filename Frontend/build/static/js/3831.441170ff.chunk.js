"use strict";(self.webpackChunkmy_app=self.webpackChunkmy_app||[]).push([[3831,1238],{83831:function(e,t,n){n.r(t),n.d(t,{default:function(){return D}});var s=n(1413),r=n(93433),a=n(74165),i=n(15861),c=n(29439),l=n(87462),o=n(72791),d={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"defs",attrs:{},children:[{tag:"style",attrs:{}}]},{tag:"path",attrs:{d:"M912 820.1V203.9c28-9.9 48-36.6 48-67.9 0-39.8-32.2-72-72-72-31.3 0-58 20-67.9 48H203.9C194 84 167.3 64 136 64c-39.8 0-72 32.2-72 72 0 31.3 20 58 48 67.9v616.2C84 830 64 856.7 64 888c0 39.8 32.2 72 72 72 31.3 0 58-20 67.9-48h616.2c9.9 28 36.6 48 67.9 48 39.8 0 72-32.2 72-72 0-31.3-20-58-48-67.9zM888 112c13.3 0 24 10.7 24 24s-10.7 24-24 24-24-10.7-24-24 10.7-24 24-24zM136 912c-13.3 0-24-10.7-24-24s10.7-24 24-24 24 10.7 24 24-10.7 24-24 24zm0-752c-13.3 0-24-10.7-24-24s10.7-24 24-24 24 10.7 24 24-10.7 24-24 24zm704 680H184V184h656v656zm48 72c-13.3 0-24-10.7-24-24s10.7-24 24-24 24 10.7 24 24-10.7 24-24 24z"}},{tag:"path",attrs:{d:"M288 474h448c8.8 0 16-7.2 16-16V282c0-8.8-7.2-16-16-16H288c-8.8 0-16 7.2-16 16v176c0 8.8 7.2 16 16 16zm56-136h336v64H344v-64zm-56 420h448c8.8 0 16-7.2 16-16V566c0-8.8-7.2-16-16-16H288c-8.8 0-16 7.2-16 16v176c0 8.8 7.2 16 16 16zm56-136h336v64H344v-64z"}}]},name:"group",theme:"outlined"},u=n(54291),x=function(e,t){return o.createElement(u.Z,(0,l.Z)({},e,{ref:t,icon:d}))};var m=o.forwardRef(x),f=n(46379),h=n(2641),p=n(20043),g=n(86215),v=n(47646),j=n(75308),w=n(61994),y=n(7477),Z=n(23853),N=n(5796),_=n(96136),b=n(95364),k=n(51468),S=n(76421),C=n(81238),z=n(16856),M=n(80184),D=function(e){var t,n=e.selectedGroup,l=e.setSelectedGroup,d=localStorage.getItem("loggedInUser")?JSON.parse(localStorage.getItem("loggedInUser")):null,u=(0,o.useRef)(),x=(0,o.useState)([]),D=(0,c.Z)(x,2),L=D[0],U=D[1],I=(0,o.useContext)(b.SocketContext).socket,T=(0,o.useContext)(_.ChatContext).messageInfo,H=(0,o.useState)(""),R=(0,c.Z)(H,2),F=R[0],E=R[1],P=(0,o.useState)(!1),A=(0,c.Z)(P,2),B=A[0],G=A[1],V=(0,o.useState)(),O=(0,c.Z)(V,2),K=O[0],q=O[1],J=(0,o.useState)(!1),W=(0,c.Z)(J,2),Q=W[0],X=W[1],Y=(0,o.useState)(!1),$=(0,c.Z)(Y,2),ee=$[0],te=$[1],ne=function(){var e=(0,i.Z)((0,a.Z)().mark((function e(t){var n;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return G(!0),e.next=3,k.default.getChats(t);case 3:(n=e.sent).statusCode===y.WE.Ok&&U(n.data),G(!1);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),se=function(){var e=(0,i.Z)((0,a.Z)().mark((function e(t){var n,s,r;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n=t.file,s=t.onSuccess,r=t.onError,te(!0);try{q(n),s()}catch(a){r(a)}te(!1);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),re=function(){var e=(0,i.Z)((0,a.Z)().mark((function e(){var t,n;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!K){e.next=8;break}return(t=new FormData).append("file",K),e.next=5,k.default.uploadImage(t);case 5:if(!(n=e.sent)){e.next=8;break}return e.abrupt("return",n.data.uploadedFileUrl);case 8:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),ae=function(){var e=(0,i.Z)((0,a.Z)().mark((function e(t,n){var i;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return E(""),e.next=3,re();case 3:i=e.sent,U((function(e){return[].concat((0,r.Z)(e),[(0,s.Z)((0,s.Z)({},i&&{message_type:"file",file_url:i}),{},{message:n,sent_from:d._id,__v:0,date:(new Date).toString(),_id:Math.random().toString(),isReaded:!1,sent_to:t,chatType:"Personal"})])})),i&&q(void 0),I.mySocket.emit("personalMessage",(0,s.Z)((0,s.Z)({message:n},i&&{message_type:"file",file_url:i}),{},{sent_to:t,chatType:"Personal"}));case 7:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}();return(0,o.useEffect)((function(){n&&ne(n._id)}),[n]),(0,o.useEffect)((function(){T.message&&T.sentBy.id.toString()===n._id&&U((function(e){return[].concat((0,r.Z)(e),[(0,s.Z)((0,s.Z)({},(null===T||void 0===T?void 0:T.file_url)&&{message_type:"file",file_url:T.file_url}),{},{message:null===T||void 0===T?void 0:T.message,sent_from:T.sentBy.id,__v:0,date:(new Date).toString(),_id:Math.random().toString(),isReaded:!0,sent_to:d._id,chatType:"Personal"})])}))}),[T.message]),(0,M.jsx)(M.Fragment,{children:(0,M.jsxs)("div",{children:[(0,M.jsx)("div",{className:"bg-[#00A038] rounded-xl py-4",children:(0,M.jsxs)("div",{className:"flex justify-between px-6",children:[(0,M.jsxs)("div",{className:"text-white flex gap-4 items-center",children:[(0,M.jsx)(f.C,{size:"large",src:(0,M.jsx)(m,{})}),(0,M.jsx)("p",{className:"font-semibold",children:null===n||void 0===n?void 0:n.name})]}),(0,M.jsx)("div",{children:(0,M.jsx)(h.ZP,{onClick:function(){return l(null)},type:"primary",className:"text-white mt-2 text-base font-medium",children:"Go Back"})})]})}),(0,M.jsx)("div",{children:(0,M.jsxs)(p.Z,{spinning:ee,children:[B?(0,M.jsx)(N.default,{}):(0,M.jsxs)("div",{className:"shadow-3xl dark:shadow bg-white  mt-6   dark: dark:bg-navy-900 overflow-y-auto overflow-x-hidden ",children:[(0,M.jsx)("div",{className:"flex justify-center mt-2 py-4",children:(0,M.jsx)("p",{className:"text-center text-white bg-[#00A038] px-10 rounded-2xl  ",children:(0,C.formatDate)(null===L||void 0===L||null===(t=L[0])||void 0===t?void 0:t.date)})}),(0,M.jsx)("div",{className:"overflow-y-auto max-h-[500px]",style:{minHeight:"49vh"},children:L&&L.length>0?L.map((function(e){return e.sent_from.toString()!==d._id.toString()?e.file_url?(0,M.jsx)("div",{className:"flex mb-3 px-3",children:(0,M.jsxs)("div",{className:"bg-[#00A038] p-4 rounded-xl text-white flex flex-col gap-3",children:[(0,M.jsx)(g.Z,{src:e.file_url,width:200,height:200}),(0,M.jsxs)("div",{children:[" ",e.message]}),(0,M.jsx)("div",{className:"text-end",children:(0,M.jsx)("p",{className:"text-gray-800 text-xs",children:(0,C.formatTime)(e.date)})})]})},e._id):(0,M.jsx)("div",{className:"flex mb-3 px-6",children:(0,M.jsx)("div",{className:"bg-[#00A038] px-6 py-1 rounded-xl text-white flex flex-col gap-4",children:(0,M.jsxs)("div",{children:[" ",e.message," ",(0,M.jsx)("div",{className:"text-end",children:(0,M.jsx)("p",{className:"text-gray-800 text-xs",children:(0,C.formatTime)(e.date)})})]})})},e._id):e.file_url?(0,M.jsxs)("div",{className:"flex justify-between mb-3 px-3 ",children:[(0,M.jsx)("div",{}),(0,M.jsxs)("div",{className:"bg-brandLinear text-white p-4 rounded-xl flex flex-col gap-3",children:[(0,M.jsx)(g.Z,{src:e.file_url,width:200,height:200}),(0,M.jsxs)("div",{children:[e.message,(0,M.jsx)("div",{className:"text-end",children:(0,M.jsx)("p",{className:"text-gray-800 text-xs",children:(0,C.formatTime)(e.date)})})]})]})]},e._id):(0,M.jsxs)("div",{className:"flex justify-between px-3 py-1 mb-3 ",children:[(0,M.jsx)("div",{}),(0,M.jsx)("div",{className:"text-black shadow-xl bg-brandLinear text-white px-6 rounded-xl",children:e.message&&(0,M.jsxs)(M.Fragment,{children:[e.message,(0,M.jsx)("div",{className:"text-end",children:(0,M.jsx)("p",{className:"text-gray-800 text-xs",children:(0,C.formatTime)(e.date)})})]})})]},e._id)})):(0,M.jsx)("div",{className:"text-center mt-10 text-xl  dark:text-white font-medium pb-4",children:(0,M.jsx)("p",{children:"No Chats Found"})})}),(0,M.jsx)(S.ZP,{open:Q,className:"m-10",onEmojiClick:function(e){E((function(t){return t+e.emoji}))}}),K&&(0,M.jsx)(v.Z,{title:(0,M.jsxs)("div",{className:"flex justify-between align-middle",children:[(0,M.jsx)("div",{children:"Seletecd Media"})," ",(0,M.jsx)(z.FU5,{className:"border  cursor-pointer",size:"25px",onClick:function(){q(void 0)}})]}),className:"mt-5 mx-5 shadow-2xl",children:(0,M.jsx)("div",{children:(0,M.jsx)(g.Z,{src:URL.createObjectURL(K),width:100,height:100})})})]}),(0,M.jsx)(j.Z,{prefix:(0,M.jsxs)(M.Fragment,{children:[(0,M.jsx)(w.Z,{id:"file",ref:u,accept:"image/*",showUploadList:!1,customRequest:se,style:{display:"none"},multiple:!1,children:(0,M.jsx)(Z.UH,{className:"cursor-pointer"})}),(0,M.jsx)(Z.jMy,{onClick:function(){X(!Q)},className:"cursor-pointer"})]}),value:F,onKeyDown:function(e){"escape"===e.code.toLowerCase()&&X(!1),"enter"!==e.code.toLowerCase()||e.shiftKey||(F||K)&&ae(n._id,F)},onChange:function(e){return E(e.target.value)},placeholder:"Type here . . . . .",suffix:(0,M.jsx)(Z.LbG,{onClick:function(){return(F||K)&&ae(n._id,F)},className:"cursor-pointer"}),size:"large",className:"rounded-none w-full"})]})})]})})}},81238:function(e,t,n){function s(e){return new Date(e).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"})}function r(e,t){var n=(arguments.length>2&&void 0!==arguments[2]?arguments[2]:200)/Math.max(e,t);return{width:Math.ceil(e*n),height:Math.ceil(t*n)}}function a(e,t){var n=new Image;n.onload=function(){var e=n.width,s=n.height;t(e,s)},n.src=e}function i(e){var t=new Date(e).toLocaleString("en-US",{year:"numeric",month:"long",day:"numeric",hour:"numeric",minute:"numeric",timeZoneName:"short"}).split(" ");return t[4]+" "+t[5]}n.r(t),n.d(t,{formatDate:function(){return s},formatTime:function(){return i},getImageDimensions:function(){return a},scaleImageRatio:function(){return r}})}}]);
//# sourceMappingURL=3831.441170ff.chunk.js.map