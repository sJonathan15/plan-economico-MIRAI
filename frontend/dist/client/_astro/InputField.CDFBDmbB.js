import{r as y,R as j}from"./index.B52nOzfP.js";var m={exports:{}},d={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var h=y,v=Symbol.for("react.element"),N=Symbol.for("react.fragment"),R=Object.prototype.hasOwnProperty,g=h.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,E={key:!0,ref:!0,__self:!0,__source:!0};function p(s,e,a){var t,l={},o=null,n=null;a!==void 0&&(o=""+a),e.key!==void 0&&(o=""+e.key),e.ref!==void 0&&(n=e.ref);for(t in e)R.call(e,t)&&!E.hasOwnProperty(t)&&(l[t]=e[t]);if(s&&s.defaultProps)for(t in e=s.defaultProps,e)l[t]===void 0&&(l[t]=e[t]);return{$$typeof:v,type:s,key:o,ref:n,props:l,_owner:g.current}}d.Fragment=N;d.jsx=p;d.jsxs=p;m.exports=d;var r=m.exports;const O=j.forwardRef(({label:s,error:e,className:a="",multiline:t=!1,isTextArea:l=!1,rows:o=4,select:n=!1,options:b=[],...i},u)=>{const f=t||l,c=`
            w-full px-4 ${f?"h-auto py-3":"h-16"} rounded-xl bg-slate-50 border-2 transition-all outline-none text-slate-900 font-medium
            ${e?"border-red-500 bg-red-50 focus:border-red-600":"border-slate-100 hover:border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/10"}
            ${a}
        `;return r.jsxs("div",{className:"mb-6 flex flex-col space-y-1.5 w-full",children:[r.jsxs("label",{className:"text-sm font-bold text-slate-700 tracking-tight",children:[s," ",i.required&&r.jsx("span",{className:"text-red-500 font-black",children:"*"})]}),n?r.jsx("select",{ref:u,className:c,...i,children:b.map((x,_)=>r.jsx("option",{value:x.value,children:x.label},_))}):f?r.jsx("textarea",{ref:u,className:c,rows:o,...i}):r.jsx("input",{ref:u,className:c,...i}),e&&r.jsx("p",{className:"mt-1 text-xs font-bold text-red-600",children:e})]})});O.displayName="InputField";export{O as I,r as j};
