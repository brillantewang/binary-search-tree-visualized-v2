(this["webpackJsonpbinary-search-tree-visualized-v2"]=this["webpackJsonpbinary-search-tree-visualized-v2"]||[]).push([[0],{31:function(e,t,n){e.exports=n(80)},36:function(e,t,n){},80:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),i=n(8),o=n.n(i),c=(n(36),n(2)),l=n(1),u=n(26),h=n.n(u),s={circle:{stroke:"white",fill:"#162447"},name:{stroke:"white",fill:"white"}},d={links:{stroke:"white"},nodes:{node:s,leafNode:s}},m={shape:"circle",shapeProps:{r:40}},f={textAnchor:"middle",x:0,y:0},v=function(e){var t=e.source,n=e.target;return""===n.name?null:"M".concat(t.x,",").concat(t.y,"L").concat(n.x,",").concat(n.y)},p=function(e){var t=e.data,n=e.translate,a=e.zoomable,i=e.onUpdate;return r.a.createElement(h.a,{orientation:"vertical",pathFunc:v,styles:d,nodeSvgShape:m,textLayout:f,data:t,translate:n,zoomable:a,onUpdate:i})};p.defaultProps={zoomable:!0};var w=p,g=function e(t){var n=t.children||[];n.forEach((function(t){return e(t)})),1===n.length&&function(e){var t=e.children[0],n={name:"",nodeSvgShape:{shape:"circle",shapeProps:{r:0}}};parseInt(t.name)<parseInt(e.name)?e.children.push(n):e.children.unshift(n)}(t)},y=function(){return document.querySelector("g").getBoundingClientRect()};var b=c.a.div.withConfig({displayName:"Mobile__TreeContainer",componentId:"o1qdnv-0"})(["height:",";width:",';min-height:100vh;svg{overflow:visible;}circle[r="0"] + g{display:none;}'],(function(e){return"".concat(e.height,"px")}),(function(e){return"".concat(e.width,"px")})),E=200,x=20,j=200,O=20,S=function(e){var t=e.treeData,n=Object(a.useState)({x:0,y:0}),i=Object(l.a)(n,2),o=i[0],c=i[1],u=Object(a.useState)({height:0,width:0}),h=Object(l.a)(u,2),s=h[0],d=h[1];Object(a.useEffect)((function(){var e=function(e,t,n){var a;return function(){var r=this,i=arguments,o=function(){a=null,n||e.apply(r,i)},c=n&&!a;clearTimeout(a),a=setTimeout(o,t),c&&e.apply(r,i)}}((function(){console.log("yo"),m(),f()}),500),t=new ResizeObserver(e),n=document.querySelector("g");t.observe(n)}),[]);var m=function(){var e=y();d({height:E+e.height+j,width:O+e.width+x})},f=function(){var e=document.querySelector(".nodeBase").getBoundingClientRect(),t=y(),n=e.left-t.left,a=e.width/2;c({x:n+a+O,y:E})};return r.a.createElement(b,{height:s.height,width:s.width},r.a.createElement(w,{data:t,translate:o,zoomable:!1}))},k=c.a.div.withConfig({displayName:"Desktop__TreeContainer",componentId:"sc-1suu8l4-0"})(["height:100vh;width:100vw;"]),z=function(e){var t=e.treeData,n=Object(a.useRef)(null),i=Object(a.useState)({x:0,y:0}),o=Object(l.a)(i,2),c=o[0],u=o[1];return Object(a.useEffect)((function(){!function(){var e=n.current.getBoundingClientRect();u({x:e.width/2,y:e.height/2})}()}),[]),r.a.createElement(k,{ref:n},r.a.createElement(w,{data:t,translate:c}))},C=768,D=n(30),B=n.n(D),I=function(e){var t=e.rawTreeData,n=Object(a.useState)({}),i=Object(l.a)(n,2),o=i[0],c=i[1];return Object(a.useEffect)((function(){!function(){var e=B()(t);g(e),c(e)}()}),[t]),window.innerWidth<C?r.a.createElement(S,{treeData:o}):r.a.createElement(z,{treeData:o})},R=I;I.defaultProps={rawTreeData:{name:"12",children:[{name:"8",children:[{name:"15",children:[{name:"3"}]},{name:"19",children:[{name:"11"},{name:"55",children:[{name:"14",children:[{name:"444"}]}]}]}]},{name:"24",children:[{name:"2"}]}]}};var T=c.a.div.withConfig({displayName:"App__Root",componentId:"stqyjz-0"})(["background:#162447;@media (max-width:","px){min-width:100vw;display:flex;justify-content:center;width:fit-content;}"],C),_=function(){return r.a.createElement(T,null,r.a.createElement(R,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(_,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[31,1,2]]]);
//# sourceMappingURL=main.2140a222.chunk.js.map