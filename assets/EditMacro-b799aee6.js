import{u as I,a as M,w,r as s,j as e,p as h,q as r,D as A,s as O,t as R,v as B,S as L,A as N}from"./vendor-e5663e25.js";import{u as F,M as T}from"./constants-9e207655.js";const W=()=>{const i=I(),{state:n}=M(),f=(n==null?void 0:n.back)??"/",{macroId:l}=w(),{macros:c,updateMacroById:g,deleteMacro:C}=F(T),a=s.useMemo(()=>l?c.find(t=>t.macroId===l):void 0,[c,l]),[p,o]=s.useState(!1),[b,d]=s.useState(!1),[j,v]=s.useState(""),[u,D]=s.useState((a==null?void 0:a.content)??""),[m,S]=s.useState((a==null?void 0:a.name)??"");if(!a)return null;const k=t=>{d(!0),v(t)},E=t=>{t.preventDefault();try{g({macroId:a.macroId,name:m,content:u}),i(f)}catch(x){x instanceof Error&&k(x.message)}},y=()=>{o(!1),C(a.macroId),i("/",{replace:!0})};return e.jsxs("div",{children:[e.jsxs("form",{onSubmit:E,children:[e.jsx(h,{sx:{paddingBlockEnd:"1rem"},fullWidth:!0,value:m,onChange:t=>S(t.target.value),label:"Name"}),e.jsx(h,{sx:{paddingBlockEnd:"1rem"},multiline:!0,fullWidth:!0,value:u,onChange:t=>D(t.target.value),minRows:5,maxRows:15,label:"Content"}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsx(r,{variant:"contained",type:"submit",children:"Save Changes"}),e.jsx(r,{variant:"outlined",color:"error",onClick:()=>o(!0),children:"Delete"})]})]}),e.jsxs(A,{open:p,onClose:()=>o(!1),"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description",children:[e.jsx(O,{children:e.jsx(R,{id:"alert-dialog-description",children:"Do you really want to delete the current macro?"})}),e.jsxs(B,{children:[e.jsx(r,{onClick:()=>o(!1),autoFocus:!0,children:"Cancel"}),e.jsx(r,{onClick:y,children:"Delete"})]})]}),e.jsx(L,{open:b,autoHideDuration:5e3,onClose:()=>d(!1),children:e.jsx(N,{severity:"error",children:j})})]})};export{W as default};
