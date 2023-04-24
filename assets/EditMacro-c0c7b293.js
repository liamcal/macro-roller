import{t as I,y as M,x as A,r as s,j as e}from"./index-8f09256f.js";import{u as w,B as r,M as B}from"./constants-207803bb.js";import{T as f}from"./TextField-ec058c47.js";import{D as O,a as R,b as L,c as N}from"./DialogContentText-ee66d805.js";import{S as T,A as F}from"./Snackbar-debfbf7c.js";const K=()=>{const l=I(),{state:n}=M(),h=(n==null?void 0:n.back)??"/",{macroId:i}=A(),{macros:c,updateMacroById:g,deleteMacro:p}=w(B),t=s.useMemo(()=>i?c.find(a=>a.macroId===i):void 0,[c,i]),[C,o]=s.useState(!1),[b,d]=s.useState(!1),[j,D]=s.useState(""),[m,S]=s.useState((t==null?void 0:t.content)??""),[u,v]=s.useState((t==null?void 0:t.name)??"");if(!t)return null;const k=a=>{d(!0),D(a)},y=a=>{a.preventDefault();try{g({macroId:t.macroId,name:u,content:m}),l(h)}catch(x){x instanceof Error&&k(x.message)}},E=()=>{o(!1),p(t.macroId),l("/",{replace:!0})};return e.jsxs("div",{children:[e.jsxs("form",{onSubmit:y,children:[e.jsx(f,{sx:{paddingBlockEnd:"1rem"},fullWidth:!0,value:u,onChange:a=>v(a.target.value),label:"Name"}),e.jsx(f,{sx:{paddingBlockEnd:"1rem"},multiline:!0,fullWidth:!0,value:m,onChange:a=>S(a.target.value),minRows:5,maxRows:15,label:"Content"}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsx(r,{variant:"contained",type:"submit",children:"Save Changes"}),e.jsx(r,{variant:"outlined",color:"error",onClick:()=>o(!0),children:"Delete"})]})]}),e.jsxs(O,{open:C,onClose:()=>o(!1),"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description",children:[e.jsx(R,{children:e.jsx(L,{id:"alert-dialog-description",children:"Do you really want to delete the current macro?"})}),e.jsxs(N,{children:[e.jsx(r,{onClick:()=>o(!1),autoFocus:!0,children:"Cancel"}),e.jsx(r,{onClick:E,children:"Delete"})]})]}),e.jsx(T,{open:b,autoHideDuration:5e3,onClose:()=>d(!1),children:e.jsx(F,{severity:"error",children:j})})]})};export{K as default};