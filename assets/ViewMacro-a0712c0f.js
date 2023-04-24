import{a as W,g as L,s as R,_ as i,r as l,u as q,b as O,k as fe,j as n,d as I,e as U,v as xe,w as ge,B as he,o as be,p as ye,R as K,q as ve,x as Ce,I as Re,L as we}from"./index-8f09256f.js";import{l as Ee,d as Se}from"./Edit-636d7b56.js";import{b as je,c as Ae,g as ee,u as Me,d as $e,T as Te,B as te,r as _e,M as ze}from"./constants-207803bb.js";import{P as oe,T as De}from"./TextField-ec058c47.js";function ke(e){return W("MuiCollapse",e)}L("MuiCollapse",["root","horizontal","vertical","entered","hidden","wrapper","wrapperInner"]);const Ie=["addEndListener","children","className","collapsedSize","component","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","orientation","style","timeout","TransitionComponent"],Ne=e=>{const{orientation:t,classes:s}=e,o={root:["root",`${t}`],entered:["entered"],hidden:["hidden"],wrapper:["wrapper",`${t}`],wrapperInner:["wrapperInner",`${t}`]};return U(o,ke,s)},Pe=R("div",{name:"MuiCollapse",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:s}=e;return[t.root,t[s.orientation],s.state==="entered"&&t.entered,s.state==="exited"&&!s.in&&s.collapsedSize==="0px"&&t.hidden]}})(({theme:e,ownerState:t})=>i({height:0,overflow:"hidden",transition:e.transitions.create("height")},t.orientation==="horizontal"&&{height:"auto",width:0,transition:e.transitions.create("width")},t.state==="entered"&&i({height:"auto",overflow:"visible"},t.orientation==="horizontal"&&{width:"auto"}),t.state==="exited"&&!t.in&&t.collapsedSize==="0px"&&{visibility:"hidden"})),Be=R("div",{name:"MuiCollapse",slot:"Wrapper",overridesResolver:(e,t)=>t.wrapper})(({ownerState:e})=>i({display:"flex",width:"100%"},e.orientation==="horizontal"&&{width:"auto",height:"100%"})),Ge=R("div",{name:"MuiCollapse",slot:"WrapperInner",overridesResolver:(e,t)=>t.wrapperInner})(({ownerState:e})=>i({width:"100%"},e.orientation==="horizontal"&&{width:"auto",height:"100%"})),ne=l.forwardRef(function(t,s){const o=q({props:t,name:"MuiCollapse"}),{addEndListener:a,children:c,className:u,collapsedSize:p="0px",component:x,easing:d,in:g,onEnter:h,onEntered:w,onEntering:E,onExit:$,onExited:m,onExiting:b,orientation:C="vertical",style:S,timeout:y=xe.standard,TransitionComponent:F=Ae}=o,N=O(o,Ie),j=i({},o,{orientation:C,collapsedSize:p}),A=Ne(j),J=je(),X=l.useRef(),M=l.useRef(null),H=l.useRef(),P=typeof p=="number"?`${p}px`:p,z=C==="horizontal",D=z?"width":"height";l.useEffect(()=>()=>{clearTimeout(X.current)},[]);const B=l.useRef(null),ie=fe(s,B),T=r=>f=>{if(r){const v=B.current;f===void 0?r(v):r(v,f)}},Q=()=>M.current?M.current[z?"clientWidth":"clientHeight"]:0,ae=T((r,f)=>{M.current&&z&&(M.current.style.position="absolute"),r.style[D]=P,h&&h(r,f)}),ce=T((r,f)=>{const v=Q();M.current&&z&&(M.current.style.position="");const{duration:k,easing:G}=ee({style:S,timeout:y,easing:d},{mode:"enter"});if(y==="auto"){const Z=J.transitions.getAutoHeightDuration(v);r.style.transitionDuration=`${Z}ms`,H.current=Z}else r.style.transitionDuration=typeof k=="string"?k:`${k}ms`;r.style[D]=`${v}px`,r.style.transitionTimingFunction=G,E&&E(r,f)}),de=T((r,f)=>{r.style[D]="auto",w&&w(r,f)}),le=T(r=>{r.style[D]=`${Q()}px`,$&&$(r)}),ue=T(m),pe=T(r=>{const f=Q(),{duration:v,easing:k}=ee({style:S,timeout:y,easing:d},{mode:"exit"});if(y==="auto"){const G=J.transitions.getAutoHeightDuration(f);r.style.transitionDuration=`${G}ms`,H.current=G}else r.style.transitionDuration=typeof v=="string"?v:`${v}ms`;r.style[D]=P,r.style.transitionTimingFunction=k,b&&b(r)}),me=r=>{y==="auto"&&(X.current=setTimeout(r,H.current||0)),a&&a(B.current,r)};return n.jsx(F,i({in:g,onEnter:ae,onEntered:de,onEntering:ce,onExit:le,onExited:ue,onExiting:pe,addEndListener:me,nodeRef:B,timeout:y==="auto"?null:y},N,{children:(r,f)=>n.jsx(Pe,i({as:x,className:I(A.root,u,{entered:A.entered,exited:!g&&P==="0px"&&A.hidden}[r]),style:i({[z?"minWidth":"minHeight"]:P},S),ownerState:i({},j,{state:r}),ref:ie},f,{children:n.jsx(Be,{ownerState:i({},j,{state:r}),className:A.wrapper,ref:M,children:n.jsx(Ge,{ownerState:i({},j,{state:r}),className:A.wrapperInner,children:c})})}))}))});ne.muiSupportAuto=!0;const Ve=ne,We=l.createContext({}),re=We;function Le(e){return W("MuiAccordion",e)}const qe=L("MuiAccordion",["root","rounded","expanded","disabled","gutters","region"]),V=qe,Oe=["children","className","defaultExpanded","disabled","disableGutters","expanded","onChange","square","TransitionComponent","TransitionProps"],Ue=e=>{const{classes:t,square:s,expanded:o,disabled:a,disableGutters:c}=e;return U({root:["root",!s&&"rounded",o&&"expanded",a&&"disabled",!c&&"gutters"],region:["region"]},Le,t)},Fe=R(oe,{name:"MuiAccordion",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:s}=e;return[{[`& .${V.region}`]:t.region},t.root,!s.square&&t.rounded,!s.disableGutters&&t.gutters]}})(({theme:e})=>{const t={duration:e.transitions.duration.shortest};return{position:"relative",transition:e.transitions.create(["margin"],t),overflowAnchor:"none","&:before":{position:"absolute",left:0,top:-1,right:0,height:1,content:'""',opacity:1,backgroundColor:(e.vars||e).palette.divider,transition:e.transitions.create(["opacity","background-color"],t)},"&:first-of-type":{"&:before":{display:"none"}},[`&.${V.expanded}`]:{"&:before":{opacity:0},"&:first-of-type":{marginTop:0},"&:last-of-type":{marginBottom:0},"& + &":{"&:before":{display:"none"}}},[`&.${V.disabled}`]:{backgroundColor:(e.vars||e).palette.action.disabledBackground}}},({theme:e,ownerState:t})=>i({},!t.square&&{borderRadius:0,"&:first-of-type":{borderTopLeftRadius:(e.vars||e).shape.borderRadius,borderTopRightRadius:(e.vars||e).shape.borderRadius},"&:last-of-type":{borderBottomLeftRadius:(e.vars||e).shape.borderRadius,borderBottomRightRadius:(e.vars||e).shape.borderRadius,"@supports (-ms-ime-align: auto)":{borderBottomLeftRadius:0,borderBottomRightRadius:0}}},!t.disableGutters&&{[`&.${V.expanded}`]:{margin:"16px 0"}})),He=l.forwardRef(function(t,s){const o=q({props:t,name:"MuiAccordion"}),{children:a,className:c,defaultExpanded:u=!1,disabled:p=!1,disableGutters:x=!1,expanded:d,onChange:g,square:h=!1,TransitionComponent:w=Ve,TransitionProps:E}=o,$=O(o,Oe),[m,b]=ge({controlled:d,default:u,name:"Accordion",state:"expanded"}),C=l.useCallback(A=>{b(!m),g&&g(A,!m)},[m,g,b]),[S,...y]=l.Children.toArray(a),F=l.useMemo(()=>({expanded:m,disabled:p,disableGutters:x,toggle:C}),[m,p,x,C]),N=i({},o,{square:h,disabled:p,disableGutters:x,expanded:m}),j=Ue(N);return n.jsxs(Fe,i({className:I(j.root,c),ref:s,ownerState:N,square:h},$,{children:[n.jsx(re.Provider,{value:F,children:S}),n.jsx(w,i({in:m,timeout:"auto"},E,{children:n.jsx("div",{"aria-labelledby":S.props.id,id:S.props["aria-controls"],role:"region",className:j.region,children:y})}))]}))}),Qe=He;function Ke(e){return W("MuiAccordionDetails",e)}L("MuiAccordionDetails",["root"]);const Ye=["className"],Je=e=>{const{classes:t}=e;return U({root:["root"]},Ke,t)},Xe=R("div",{name:"MuiAccordionDetails",slot:"Root",overridesResolver:(e,t)=>t.root})(({theme:e})=>({padding:e.spacing(1,2,2)})),Ze=l.forwardRef(function(t,s){const o=q({props:t,name:"MuiAccordionDetails"}),{className:a}=o,c=O(o,Ye),u=o,p=Je(u);return n.jsx(Xe,i({className:I(p.root,a),ref:s,ownerState:u},c))}),et=Ze;function tt(e){return W("MuiAccordionSummary",e)}const ot=L("MuiAccordionSummary",["root","expanded","focusVisible","disabled","gutters","contentGutters","content","expandIconWrapper"]),_=ot,nt=["children","className","expandIcon","focusVisibleClassName","onClick"],rt=e=>{const{classes:t,expanded:s,disabled:o,disableGutters:a}=e;return U({root:["root",s&&"expanded",o&&"disabled",!a&&"gutters"],focusVisible:["focusVisible"],content:["content",s&&"expanded",!a&&"contentGutters"],expandIconWrapper:["expandIconWrapper",s&&"expanded"]},tt,t)},st=R(he,{name:"MuiAccordionSummary",slot:"Root",overridesResolver:(e,t)=>t.root})(({theme:e,ownerState:t})=>{const s={duration:e.transitions.duration.shortest};return i({display:"flex",minHeight:48,padding:e.spacing(0,2),transition:e.transitions.create(["min-height","background-color"],s),[`&.${_.focusVisible}`]:{backgroundColor:(e.vars||e).palette.action.focus},[`&.${_.disabled}`]:{opacity:(e.vars||e).palette.action.disabledOpacity},[`&:hover:not(.${_.disabled})`]:{cursor:"pointer"}},!t.disableGutters&&{[`&.${_.expanded}`]:{minHeight:64}})}),it=R("div",{name:"MuiAccordionSummary",slot:"Content",overridesResolver:(e,t)=>t.content})(({theme:e,ownerState:t})=>i({display:"flex",flexGrow:1,margin:"12px 0"},!t.disableGutters&&{transition:e.transitions.create(["margin"],{duration:e.transitions.duration.shortest}),[`&.${_.expanded}`]:{margin:"20px 0"}})),at=R("div",{name:"MuiAccordionSummary",slot:"ExpandIconWrapper",overridesResolver:(e,t)=>t.expandIconWrapper})(({theme:e})=>({display:"flex",color:(e.vars||e).palette.action.active,transform:"rotate(0deg)",transition:e.transitions.create("transform",{duration:e.transitions.duration.shortest}),[`&.${_.expanded}`]:{transform:"rotate(180deg)"}})),ct=l.forwardRef(function(t,s){const o=q({props:t,name:"MuiAccordionSummary"}),{children:a,className:c,expandIcon:u,focusVisibleClassName:p,onClick:x}=o,d=O(o,nt),{disabled:g=!1,disableGutters:h,expanded:w,toggle:E}=l.useContext(re),$=C=>{E&&E(C),x&&x(C)},m=i({},o,{expanded:w,disabled:g,disableGutters:h}),b=rt(m);return n.jsxs(st,i({focusRipple:!1,disableRipple:!0,disabled:g,component:"div","aria-expanded":w,className:I(b.root,c),focusVisibleClassName:I(b.focusVisible,p),onClick:$,ref:s,ownerState:m},d,{children:[n.jsx(it,{className:b.content,ownerState:m,children:a}),u&&n.jsx(at,{className:b.expandIconWrapper,ownerState:m,children:u})]}))}),dt=ct;var Y={},lt=ye;Object.defineProperty(Y,"__esModule",{value:!0});var se=Y.default=void 0,ut=lt(be()),pt=n,mt=(0,ut.default)((0,pt.jsx)("path",{d:"M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z"}),"ExpandMore");se=Y.default=mt;const ft=({macro:e,upsertMacroQuery:t})=>{const s=(o,a)=>{const c=e.queries[o];t(e.macroId,{...c,value:a})};return n.jsx("div",{style:{display:"grid",columnGap:"1rem",rowGap:"0.75rem",gridTemplateColumns:"1fr 1fr",paddingBottom:"1rem"},children:Object.keys(e.queries).map(o=>{const{value:a,defaultValue:c}=e.queries[o];return n.jsx(K.Fragment,{children:e.queries[o]&&n.jsx(De,{label:o,value:a??"",onChange:u=>s(o,u.target.value),type:"number",helperText:c?`Default: ${c}`:" "},o)},`query-textfield-${o}`)})})},xt=Ee(()=>ve(()=>import("./EditMacro-c0c7b293.js"),["assets/EditMacro-c0c7b293.js","assets/index-8f09256f.js","assets/index-e88c1300.css","assets/constants-207803bb.js","assets/TextField-ec058c47.js","assets/DialogContentText-ee66d805.js","assets/Snackbar-debfbf7c.js"])),vt=()=>{const{macroId:e}=Ce(),{macros:t,upsertMacroQuery:s}=Me(ze),o=l.useMemo(()=>e?t.find(d=>d.macroId===e):void 0,[t,e]),a=l.useMemo(()=>{var d;if(o!=null&&o.content){if(((d=o.compiledMacro)==null?void 0:d.length)>0)return o.compiledMacro;try{return $e(o.content)}catch{return[]}}return[]},[o]),[c,u]=l.useState(null);if(!o)return null;const p=()=>Object.fromEntries(Object.keys(o.queries).map(d=>[d,parseInt(o.queries[d].value||o.queries[d].defaultValue||"0")])),x=d=>{u(g=>{const h=_e(a,p());return d?n.jsxs(K.Fragment,{children:[g,n.jsx("br",{}),h]}):n.jsx(K.Fragment,{children:h})})};return o?n.jsxs("div",{children:[n.jsx("div",{style:{paddingBottom:"1rem"},children:n.jsxs(Qe,{disableGutters:!0,children:[n.jsx(dt,{expandIcon:n.jsx(se,{}),"aria-controls":"panel1a-content",id:"panel1a-header",children:n.jsxs("div",{style:{alignItems:"center",display:"flex",justifyContent:"space-between"},children:[n.jsx(Re,{"aria-label":"edit",component:we,to:"edit",state:{back:`/macro/${e}`},sx:{alignSelf:"top"},onMouseOver:xt.preload,children:n.jsx(Se,{})}),n.jsx("h2",{style:{marginBlock:0,marginInlineStart:"1rem"},children:o.name})]})}),n.jsx(et,{children:n.jsx(Te,{align:"left",sx:{fontSize:"1rem",whiteSpace:"pre-wrap",maxHeight:120,overflow:"auto"},children:o.content})})]})}),n.jsx(ft,{macro:o,upsertMacroQuery:s}),n.jsxs("div",{style:{display:"flex",marginBlockEnd:"1rem",justifyContent:"space-between",alignItems:"center"},children:[n.jsx(te,{variant:"contained",onClick:()=>x(!1),children:"Run Macro"}),c&&n.jsx(te,{variant:"outlined",onClick:()=>x(!0),children:"Re-run"})]}),c&&n.jsx(oe,{elevation:6,sx:{padding:"1rem",whiteSpace:"pre-wrap",wordBreak:"break-word",textAlign:"start",fontSize:"1.25rem"},children:c})]}):null};export{vt as default};