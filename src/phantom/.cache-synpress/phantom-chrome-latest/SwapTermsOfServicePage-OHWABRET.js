import{f as w}from"./chunk-IZYWLB2B.js";import{Ia as C}from"./chunk-BUUR4IB6.js";import"./chunk-3SDMYXX6.js";import"./chunk-BWY4SFOW.js";import"./chunk-BO5X4B7T.js";import"./chunk-KWV5LCG2.js";import"./chunk-P4WYBUL7.js";import"./chunk-6RUUKR5H.js";import"./chunk-ZDIDSVJZ.js";import"./chunk-WWRJFBPZ.js";import"./chunk-RPAWFSR5.js";import"./chunk-EYRQTEYY.js";import"./chunk-4X4FCHBV.js";import"./chunk-3XNDUML4.js";import"./chunk-CXTBE6XQ.js";import"./chunk-DNIKDYGU.js";import"./chunk-T35FRZUG.js";import"./chunk-QNLSAEYJ.js";import"./chunk-XVSHIHTB.js";import"./chunk-64KTDFHS.js";import"./chunk-VKDZ35Y6.js";import"./chunk-XSN3P2VT.js";import"./chunk-5UQY3H6E.js";import"./chunk-DYF4TIEK.js";import"./chunk-LFW6VOKO.js";import"./chunk-TLPEUAVS.js";import"./chunk-IJMSB5F7.js";import"./chunk-IYMLQYB2.js";import"./chunk-5HTF5CEZ.js";import"./chunk-YLX2CXTY.js";import"./chunk-VGIRFM65.js";import"./chunk-4FHWVLFG.js";import"./chunk-2AJHLE3Z.js";import"./chunk-OVAE6C3A.js";import{d as v}from"./chunk-EREDVFEV.js";import{db as a,fa as g,m as r}from"./chunk-2ST3CGSE.js";import{Y as y,eb as T}from"./chunk-Q2TGNWPS.js";import"./chunk-CHXPHGEW.js";import"./chunk-3JCRVFH6.js";import"./chunk-JOOVJERF.js";import"./chunk-Z4NIAEKD.js";import{v as u}from"./chunk-FWDXF6DS.js";import"./chunk-HZ46BFL2.js";import"./chunk-GW7A3FSK.js";import"./chunk-5DTGGQTS.js";import"./chunk-KK53XKFJ.js";import"./chunk-DALLY2ZR.js";import"./chunk-MN377ENM.js";import"./chunk-7XMFOJLY.js";import"./chunk-4HRGOILD.js";import"./chunk-4KPHYKUF.js";import"./chunk-ODNNZUPK.js";import"./chunk-UAQWDGIM.js";import{V as t,a as h,r as S}from"./chunk-LELMSWC2.js";import"./chunk-RCTLXTBM.js";import"./chunk-Z26KXQRL.js";import"./chunk-NUMCZRU4.js";import"./chunk-L7YPSK2Y.js";import{u as d,v as f}from"./chunk-VAUOTJLY.js";import{a as n,g as O,i as m,n as p}from"./chunk-NSVULBS3.js";m();p();var e=O(h(),1);var k=r.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  padding: 16px;
`,b=r.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: -20px;
`,P=r(a).attrs({size:28,weight:500,color:t.colors.legacy.textBase})`
  margin-top: 24px;
`,A=r(a).attrs({size:16,weight:500,color:t.colors.legacy.textDiminished})`
  padding: 0px 5px;
  margin-top: 9px;
  span {
    color: ${t.colors.legacy.textBase};
  }
  label {
    color: ${t.colors.legacy.spotBase};
    cursor: pointer;
  }
`,B=r.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: fit-content;
`,M=r.div`
  margin-top: auto;
  width: 100%;
`,F=n(()=>{let{t:i}=S(),{mutateAsync:s}=w(),{handleHideModalVisibility:o,handleShowModalVisibility:c}=C(),x=(0,e.useCallback)(()=>{c("swapConfirmation",void 0,{event:"showSwapModal",payload:{data:{uiContext:y.SwapConfirmation}}}),o("swapTermsOfService")},[c,o]),l=T({goToConfirmation:x});return{onAgreeClick:(0,e.useCallback)(()=>{s(!0),l()},[s,l]),onCancelClick:n(()=>{o("swapTermsOfService")},"onCancelClick"),t:i}},"useSwapTermsOfServiceProps"),L=n(()=>{self.open(d,"_blank")},"handleTermsClick"),_=n(()=>{self.open(f,"_blank")},"handleFeesClick"),V=e.default.memo(({onAgreeClick:i,onCancelClick:s,t:o})=>e.default.createElement(k,null,e.default.createElement(b,null,e.default.createElement(B,null,e.default.createElement(g,null),e.default.createElement(P,null,o("termsOfServicePrimaryText")),e.default.createElement(A,null,e.default.createElement(u,{i18nKey:"termsOfServiceDiscliamerFeesEnabledInterpolated"},"We have revised our Terms of Service. By clicking ",e.default.createElement("span",null,'"I Agree"')," you agree to our new",e.default.createElement("label",{onClick:L},"Terms of Service"),".",e.default.createElement("br",null),e.default.createElement("br",null),"Our new Terms of Service include a new ",e.default.createElement("label",{onClick:_},"fee structure")," for certain products.")))),e.default.createElement(M,null,e.default.createElement(v,{primaryText:o("termsOfServiceActionButtonAgree"),secondaryText:o("commandCancel"),onPrimaryClicked:i,onSecondaryClicked:s})))),E=n(()=>{let i=F();return e.default.createElement(V,{...i})},"SwapTermsOfServicePage"),Y=E;export{E as SwapTermsOfServicePage,Y as default};
//# sourceMappingURL=SwapTermsOfServicePage-OHWABRET.js.map
