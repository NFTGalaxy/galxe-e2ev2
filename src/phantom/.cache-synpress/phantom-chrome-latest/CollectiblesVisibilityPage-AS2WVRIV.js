import{a as j}from"./chunk-QRFYOF7X.js";import{a as K}from"./chunk-434BBR5P.js";import{a as $}from"./chunk-7HVPMGIM.js";import{a as U}from"./chunk-5JZQS2KU.js";import{b as Z}from"./chunk-5JENFDOJ.js";import{b as F}from"./chunk-EO44IRW5.js";import{Ia as X}from"./chunk-BUUR4IB6.js";import{l as G}from"./chunk-3SDMYXX6.js";import"./chunk-BWY4SFOW.js";import"./chunk-BO5X4B7T.js";import"./chunk-KWV5LCG2.js";import"./chunk-P4WYBUL7.js";import"./chunk-6RUUKR5H.js";import{a as T}from"./chunk-ZDIDSVJZ.js";import"./chunk-WWRJFBPZ.js";import"./chunk-RPAWFSR5.js";import"./chunk-EYRQTEYY.js";import"./chunk-4X4FCHBV.js";import"./chunk-3XNDUML4.js";import{g as Q}from"./chunk-CXTBE6XQ.js";import"./chunk-DNIKDYGU.js";import{a as B}from"./chunk-T35FRZUG.js";import"./chunk-QNLSAEYJ.js";import"./chunk-XVSHIHTB.js";import"./chunk-64KTDFHS.js";import{a as O}from"./chunk-VKDZ35Y6.js";import"./chunk-XSN3P2VT.js";import"./chunk-5UQY3H6E.js";import"./chunk-DYF4TIEK.js";import"./chunk-LFW6VOKO.js";import"./chunk-TLPEUAVS.js";import"./chunk-QKQTXGH3.js";import"./chunk-IYMLQYB2.js";import"./chunk-5HTF5CEZ.js";import"./chunk-YLX2CXTY.js";import"./chunk-VGIRFM65.js";import"./chunk-4FHWVLFG.js";import"./chunk-2AJHLE3Z.js";import"./chunk-OVAE6C3A.js";import{c as V}from"./chunk-EREDVFEV.js";import{C as z,db as x,m as s}from"./chunk-2ST3CGSE.js";import"./chunk-Q2TGNWPS.js";import"./chunk-CHXPHGEW.js";import"./chunk-3JCRVFH6.js";import{V as E,aa as A,ca as _,da as N,r as D}from"./chunk-JOOVJERF.js";import"./chunk-Z4NIAEKD.js";import"./chunk-FWDXF6DS.js";import"./chunk-HZ46BFL2.js";import"./chunk-GW7A3FSK.js";import"./chunk-5DTGGQTS.js";import"./chunk-KK53XKFJ.js";import"./chunk-DALLY2ZR.js";import"./chunk-MN377ENM.js";import"./chunk-7XMFOJLY.js";import{rb as v}from"./chunk-4HRGOILD.js";import"./chunk-4KPHYKUF.js";import{Rd as W}from"./chunk-ODNNZUPK.js";import"./chunk-UAQWDGIM.js";import{T as L,Ua as k,V as C,_a as P,a as M,r as p}from"./chunk-LELMSWC2.js";import"./chunk-RCTLXTBM.js";import"./chunk-Z26KXQRL.js";import"./chunk-NUMCZRU4.js";import"./chunk-L7YPSK2Y.js";import"./chunk-VAUOTJLY.js";import{a as S,g as H,i as I,n as f}from"./chunk-NSVULBS3.js";I();f();var t=H(M(),1);I();f();var o=H(M(),1);var Y=L({marginLeft:4}),R=s(T).attrs({align:"center",padding:"10px"})`
  background-color: ${C.colors.legacy.elementBase};
  border-radius: 6px;
  height: 74px;
  margin: 4px 0;
`,tt=s.div`
  display: flex;
  align-items: center;
`,et=s(B)`
  flex: 1;
  min-width: 0;
  text-align: left;
  align-items: normal;
`,ot=s(x).attrs({size:16,weight:600,lineHeight:19,noWrap:!0,maxWidth:"175px",textAlign:"left"})``,it=s(x).attrs({color:C.colors.legacy.textDiminished,size:14,lineHeight:17,noWrap:!0})`
  text-align: left;
  margin-top: 5px;
`,nt=s.div`
  width: 55px;
  min-width: 55px;
  max-width: 55px;
  height: 55px;
  min-height: 55px;
  max-height: 55px;
  aspect-ratio: 1;
  margin-right: 10px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`,q=o.default.memo(e=>{let{t:n}=p(),{collection:i,unknownItem:m,isHidden:r,isSpam:a,onToggleHidden:d}=e,{name:c,id:g}=i,l=_(i),h=l?.chainData,b=N(i),u=A(l?.media,"image",!1,"small"),w=c||l?.name||m;return o.default.createElement(R,null,o.default.createElement(nt,null,a&&r?o.default.createElement(j,{width:32}):u?o.default.createElement(Z,{uri:u}):D(h)?o.default.createElement(K,{...h.utxoDetails}):o.default.createElement(F,{type:"image",width:42})),o.default.createElement(T,null,o.default.createElement(et,null,o.default.createElement(tt,null,o.default.createElement(ot,null,w),a?o.default.createElement(z,{className:Y,fill:C.colors.legacy.spotWarning,height:16,width:16}):null),o.default.createElement(it,null,n("collectiblesSearchNrOfItems",{nrOfItems:b})))),o.default.createElement($,{id:g,label:`${c} visible`,checked:!r,onChange:y=>{d(y.target.checked?"show":"hide")}}))});var lt=74,st=10,rt=lt+st,at=20,mt=s.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`,ct=s.div`
  position: relative;
  width: 100%;
`,dt=S(()=>{let{handleHideModalVisibility:e}=X(),{data:n,isPending:i}=v(),{viewState:m,viewStateLoading:r}=E({account:n}),a=(0,t.useCallback)(()=>e("collectiblesVisibility"),[e]),d=(0,t.useMemo)(()=>({...m,handleCloseModal:a}),[a,m]),c=(0,t.useMemo)(()=>i||r,[i,r]);return{data:d,loading:c}},"useProps"),pt=t.default.memo(e=>{let{t:n}=p(),i=(0,t.useRef)(null);return(0,t.useEffect)(()=>{setTimeout(()=>i.current?.focus(),200)},[]),t.default.createElement(t.default.Fragment,null,t.default.createElement(ct,null,t.default.createElement(Q,{ref:i,tabIndex:0,placeholder:n("assetListSearch"),maxLength:W,onChange:e.handleSearch,value:e.searchQuery,name:"Search collectibles"})),t.default.createElement(G,null,t.default.createElement(k,null,({height:m,width:r})=>t.default.createElement(P,{style:{padding:`${at}px 0`},scrollToIndex:e.searchQuery!==e.debouncedSearchQuery?0:void 0,height:m,width:r,rowCount:e.listItems.length,rowHeight:rt,rowRenderer:a=>t.default.createElement(gt,{...a,data:e.listItems,unknownItem:n("assetListUnknownToken"),getIsHidden:e.getIsHidden,getIsSpam:e.getIsSpam,getSpamStatus:e.getSpamStatus,onToggleHidden:e.onToggleHidden})}))))}),gt=S(e=>{let{index:n,data:i,style:m,unknownItem:r,getIsHidden:a,getIsSpam:d,getSpamStatus:c,onToggleHidden:g}=e,l=i[n],h=a(l),b=d(l),u=c(l),w=(0,t.useCallback)(y=>g({item:l,status:y}),[g,l]);return t.default.createElement("div",{style:m},t.default.createElement(q,{collection:l,unknownItem:r,isHidden:h,isSpam:b,spamStatus:u,onToggleHidden:w}))},"ResultRowWrapper"),ht=S(()=>{let{data:e,loading:n}=dt(),{t:i}=p();return t.default.createElement(mt,null,n?t.default.createElement(U,null):t.default.createElement(pt,{...e}),t.default.createElement(O,null,t.default.createElement(V,{onClick:e.handleCloseModal},i("commandClose"))))},"CollectiblesVisibilityPage"),Ft=ht;export{ht as CollectiblesVisibilityPage,Ft as default};
//# sourceMappingURL=CollectiblesVisibilityPage-AS2WVRIV.js.map
