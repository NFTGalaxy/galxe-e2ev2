import{a as L,b as N,d as F,e as G,h as I}from"./chunk-PRWMXS4A.js";import{a as w}from"./chunk-FMLT43Q6.js";import"./chunk-KMTZXE4T.js";import{a as T}from"./chunk-OOKHCNEK.js";import"./chunk-XYJ446B4.js";import"./chunk-RIRK4I4P.js";import"./chunk-NH4DWOIN.js";import"./chunk-Q3RBD6MB.js";import"./chunk-3UGELAB4.js";import"./chunk-BUUR4IB6.js";import"./chunk-3SDMYXX6.js";import"./chunk-BWY4SFOW.js";import"./chunk-BO5X4B7T.js";import"./chunk-KWV5LCG2.js";import"./chunk-P4WYBUL7.js";import"./chunk-6RUUKR5H.js";import{a as D}from"./chunk-ZDIDSVJZ.js";import"./chunk-WWRJFBPZ.js";import"./chunk-RPAWFSR5.js";import"./chunk-EYRQTEYY.js";import"./chunk-4X4FCHBV.js";import"./chunk-3XNDUML4.js";import"./chunk-CXTBE6XQ.js";import"./chunk-DNIKDYGU.js";import"./chunk-T35FRZUG.js";import{e as _}from"./chunk-QNLSAEYJ.js";import"./chunk-XVSHIHTB.js";import{b as h}from"./chunk-64KTDFHS.js";import"./chunk-VKDZ35Y6.js";import"./chunk-JYMPCPLG.js";import"./chunk-XSN3P2VT.js";import"./chunk-5UQY3H6E.js";import"./chunk-DYF4TIEK.js";import"./chunk-LFW6VOKO.js";import"./chunk-TLPEUAVS.js";import"./chunk-KLVOWC76.js";import"./chunk-IJMSB5F7.js";import"./chunk-IYMLQYB2.js";import"./chunk-5HTF5CEZ.js";import"./chunk-YLX2CXTY.js";import"./chunk-VGIRFM65.js";import"./chunk-4FHWVLFG.js";import"./chunk-2AJHLE3Z.js";import"./chunk-OVAE6C3A.js";import"./chunk-EREDVFEV.js";import{m as s,v as O}from"./chunk-2ST3CGSE.js";import{a as S}from"./chunk-W4Y45LIO.js";import"./chunk-Q2TGNWPS.js";import"./chunk-CHXPHGEW.js";import"./chunk-3JCRVFH6.js";import"./chunk-JOOVJERF.js";import"./chunk-Z4NIAEKD.js";import"./chunk-FWDXF6DS.js";import"./chunk-HZ46BFL2.js";import"./chunk-GW7A3FSK.js";import"./chunk-5DTGGQTS.js";import"./chunk-KK53XKFJ.js";import"./chunk-DALLY2ZR.js";import"./chunk-MN377ENM.js";import"./chunk-7XMFOJLY.js";import{hb as B,nb as E}from"./chunk-4HRGOILD.js";import"./chunk-4KPHYKUF.js";import"./chunk-ODNNZUPK.js";import"./chunk-UAQWDGIM.js";import{V as e,a as v,oa as P,sa as $}from"./chunk-LELMSWC2.js";import"./chunk-RCTLXTBM.js";import"./chunk-Z26KXQRL.js";import"./chunk-NUMCZRU4.js";import"./chunk-L7YPSK2Y.js";import"./chunk-VAUOTJLY.js";import{a as u,g as H,i as n,n as i}from"./chunk-NSVULBS3.js";n();i();var t=H(v(),1);n();i();var a=H(v(),1);n();i();var M=s(h)`
  cursor: pointer;
  width: 24px;
  height: 24px;
  transition: background-color 200ms ease;
  background-color: ${o=>o.$isExpanded?e.colors.legacy.black:e.colors.legacy.elementAccent} !important;
  :hover {
    background-color: ${e.colors.legacy.gray};
    svg {
      fill: white;
    }
  }
  svg {
    fill: ${o=>o.$isExpanded?"white":e.colors.legacy.textDiminished};
    transition: fill 200ms ease;
    position: relative;
    ${o=>o.top?`top: ${o.top}px;`:""}
    ${o=>o.right?`right: ${o.right}px;`:""}
  }
`;var q=s(D).attrs({justify:"space-between"})`
  background-color: ${e.colors.legacy.areaBase};
  padding: 10px 16px;
  border-bottom: 1px solid ${e.colors.legacy.borderDiminished};
  height: 46px;
  opacity: ${o=>o.opacity??"1"};
`,z=s.div`
  display: flex;
  margin-left: 10px;
  > * {
    margin-right: 10px;
  }
`,W=s.div`
  width: 24px;
  height: 24px;
`,X=u(({onBackClick:o,totalSteps:c,currentStepIndex:l,isHidden:m,showBackButtonOnFirstStep:r,showBackButton:g=!0})=>a.default.createElement(q,{opacity:m?0:1},g&&(r||l!==0)?a.default.createElement(M,{right:1,onClick:o},a.default.createElement(O,null)):a.default.createElement(W,null),a.default.createElement(z,null,L(c).map(p=>{let d=p<=l?e.colors.legacy.spotBase:e.colors.legacy.elementAccent;return a.default.createElement(h,{key:p,diameter:12,color:d})})),a.default.createElement(W,null)),"StepHeader");n();i();var Q=u(()=>{let{mutateAsync:o}=E(),{hardwareStepStack:c,pushStep:l,popStep:m,currentStep:r,setOnConnectHardwareAccounts:g,setOnConnectHardwareDone:k,setExistingAccounts:p}=N(),{data:d=[],isFetched:y,isError:A}=B(),C=_(c,(f,V)=>f?.length===V.length),j=c.length>(C??[]).length,b=C?.length===0,J={initial:{x:b?0:j?150:-150,opacity:b?1:0},animate:{x:0,opacity:1},exit:{opacity:0},transition:{duration:.2}},U=(0,t.useCallback)(()=>{r()?.props.preventBack||(r()?.props.onBackCallback&&r()?.props.onBackCallback?.(),m())},[r,m]);return T(()=>{g(async f=>{await o(f),await S.set(w,!await S.get(w))}),k(()=>self.close()),l(t.default.createElement(I,null))},c.length===0),(0,t.useEffect)(()=>{p({data:d,isFetched:y,isError:A})},[d,y,A,p]),t.default.createElement(F,null,t.default.createElement(X,{totalSteps:3,onBackClick:U,showBackButton:!r()?.props.preventBack,currentStepIndex:c.length-1}),t.default.createElement(P,{mode:"wait"},t.default.createElement($.div,{style:{display:"flex",flexGrow:1},key:`${c.length}_${C?.length}`,...J},t.default.createElement(G,null,r()))))},"SettingsConnectHardware"),Oo=Q;export{Oo as default};
//# sourceMappingURL=SettingsConnectHardware-A6JGXZJP.js.map
