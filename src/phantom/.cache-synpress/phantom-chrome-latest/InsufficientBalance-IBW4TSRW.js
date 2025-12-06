import{a as s,c as f}from"./chunk-V2TRLKNS.js";import{a as b}from"./chunk-KMTZXE4T.js";import"./chunk-G75QIEXP.js";import{Ia as w,R as T}from"./chunk-BUUR4IB6.js";import"./chunk-3SDMYXX6.js";import"./chunk-BWY4SFOW.js";import"./chunk-BO5X4B7T.js";import"./chunk-KWV5LCG2.js";import"./chunk-P4WYBUL7.js";import"./chunk-6RUUKR5H.js";import"./chunk-ZDIDSVJZ.js";import"./chunk-WWRJFBPZ.js";import"./chunk-RPAWFSR5.js";import"./chunk-EYRQTEYY.js";import"./chunk-4X4FCHBV.js";import"./chunk-3XNDUML4.js";import"./chunk-CXTBE6XQ.js";import"./chunk-DNIKDYGU.js";import"./chunk-T35FRZUG.js";import"./chunk-QNLSAEYJ.js";import"./chunk-XVSHIHTB.js";import"./chunk-64KTDFHS.js";import"./chunk-VKDZ35Y6.js";import"./chunk-XSN3P2VT.js";import"./chunk-5UQY3H6E.js";import"./chunk-DYF4TIEK.js";import"./chunk-LFW6VOKO.js";import"./chunk-TLPEUAVS.js";import"./chunk-IYMLQYB2.js";import"./chunk-5HTF5CEZ.js";import"./chunk-YLX2CXTY.js";import"./chunk-VGIRFM65.js";import"./chunk-4FHWVLFG.js";import"./chunk-2AJHLE3Z.js";import"./chunk-OVAE6C3A.js";import{c as C,d as I}from"./chunk-EREDVFEV.js";import{db as l,m as o}from"./chunk-2ST3CGSE.js";import"./chunk-Q2TGNWPS.js";import"./chunk-CHXPHGEW.js";import"./chunk-3JCRVFH6.js";import"./chunk-JOOVJERF.js";import"./chunk-Z4NIAEKD.js";import"./chunk-FWDXF6DS.js";import"./chunk-HZ46BFL2.js";import"./chunk-GW7A3FSK.js";import"./chunk-5DTGGQTS.js";import"./chunk-KK53XKFJ.js";import"./chunk-DALLY2ZR.js";import"./chunk-MN377ENM.js";import"./chunk-7XMFOJLY.js";import"./chunk-4HRGOILD.js";import"./chunk-4KPHYKUF.js";import{Pb as c,Wb as g,jc as x}from"./chunk-ODNNZUPK.js";import"./chunk-UAQWDGIM.js";import{V as a,a as M,ca as h,r as B}from"./chunk-LELMSWC2.js";import"./chunk-RCTLXTBM.js";import"./chunk-Z26KXQRL.js";import"./chunk-NUMCZRU4.js";import"./chunk-L7YPSK2Y.js";import"./chunk-VAUOTJLY.js";import{a as u,g as D,i as d,n as y}from"./chunk-NSVULBS3.js";d();y();var n=D(M(),1);var P=o.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: scroll;
`,N=o.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 90px;
`,S=o(l).attrs({size:28,weight:500,color:a.colors.legacy.textBase})`
  margin: 16px;
`,V=o(l).attrs({size:14,weight:400,lineHeight:17,color:a.colors.legacy.textDiminished})`
  max-width: 275px;

  span {
    color: white;
  }
`,$=u(({networkId:t,token:r})=>{let{t:i}=B(),{handleHideModalVisibility:m}=w(),p=(0,n.useCallback)(()=>{m("insufficientBalance")},[m]),k=t&&g(x(c.getChainID(t))),{canBuy:F,openBuy:v}=T({caip19:k||"",context:"modal",analyticsEvent:"fiatOnrampFromInsufficientBalance"}),e=t?c.getTokenSymbol(t):i("tokens");return n.default.createElement(P,null,n.default.createElement("div",null,n.default.createElement(N,null,n.default.createElement(b,{type:"failure",backgroundWidth:75}),n.default.createElement(S,null,i("insufficientBalancePrimaryText",{tokenSymbol:e})),n.default.createElement(V,null,i("insufficientBalanceSecondaryText",{tokenSymbol:e})),r?n.default.createElement(h,{borderRadius:8,gap:1,marginTop:32,width:"100%"},n.default.createElement(s,{label:i("insufficientBalanceRemaining")},n.default.createElement(f,{color:a.colors.legacy.spotNegative},`${r.balance} ${e}`)),n.default.createElement(s,{label:i("insufficientBalanceRequired")},n.default.createElement(f,null,`${r.required} ${e}`))):null)),F?n.default.createElement(I,{primaryText:i("buyAssetInterpolated",{tokenSymbol:e}),onPrimaryClicked:v,secondaryText:i("commandCancel"),onSecondaryClicked:p}):n.default.createElement(C,{onClick:p},i("commandCancel")))},"InsufficientBalance"),Q=$;export{$ as InsufficientBalance,Q as default};
//# sourceMappingURL=InsufficientBalance-IBW4TSRW.js.map
