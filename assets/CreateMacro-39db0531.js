import{r,t as y,j as e}from"./index-8f09256f.js";import{u as M,B as t,M as D}from"./constants-207803bb.js";import{T as d}from"./TextField-ec058c47.js";import{S as E,A as k}from"./Snackbar-debfbf7c.js";import{D as w,a as A,b as N,c as O}from"./DialogContentText-ee66d805.js";const G=()=>{const{createMacro:u}=M(D),[n,m]=r.useState(""),[l,s]=r.useState(""),[C,o]=r.useState(!1),[h,i]=r.useState(!1),[x,f]=r.useState(""),g=y(),p=a=>{m(a.target.value)},j=a=>{s(a.target.value)},b=a=>{s("")},v=a=>{i(!0),f(a)},S=a=>{a.preventDefault();try{u(n,l),g("/")}catch(c){c instanceof Error&&v(c.message)}};return e.jsxs("div",{children:[e.jsxs("form",{onSubmit:S,children:[e.jsxs("div",{style:{display:"grid",rowGap:"1rem",gridTemplateColumns:"1fr",paddingBottom:"1.5rem"},children:[e.jsx(d,{label:"Name",fullWidth:!0,value:n,onChange:p}),e.jsx(d,{label:"Content",multiline:!0,fullWidth:!0,value:l,onChange:j,minRows:5,maxRows:15})]}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between"},children:[e.jsx(t,{variant:"contained",type:"submit",children:"Create Macro"}),e.jsx(t,{variant:"outlined",color:"error",onClick:b,children:"Clear"})]})]}),e.jsx(E,{open:h,autoHideDuration:5e3,onClose:()=>i(!1),children:e.jsx(k,{severity:"error",children:x})}),e.jsxs(w,{open:C,onClose:()=>o(!1),"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description",children:[e.jsx(A,{children:e.jsx(N,{id:"alert-dialog-description",children:"Do you really want to clear the current macro?"})}),e.jsxs(O,{children:[e.jsx(t,{onClick:()=>o(!1),children:"No"}),e.jsx(t,{onClick:()=>{s(""),o(!1)},autoFocus:!0,children:"Yes"})]})]})]})};export{G as default};