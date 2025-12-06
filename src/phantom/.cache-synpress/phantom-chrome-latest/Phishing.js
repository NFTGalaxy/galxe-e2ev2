import{a as R,b as E}from"./chunk-CSFWSCXY.js";import{a as F}from"./chunk-4FHWVLFG.js";import"./chunk-2AJHLE3Z.js";import{a as _}from"./chunk-OVAE6C3A.js";import"./chunk-EREDVFEV.js";import{d as N,db as g,k as P,m as p,s as D}from"./chunk-2ST3CGSE.js";import"./chunk-G2YA2EOQ.js";import{d as I,f as C}from"./chunk-77RLIZ3K.js";import"./chunk-W4Y45LIO.js";import{b as y,g as v}from"./chunk-Q2TGNWPS.js";import"./chunk-CHXPHGEW.js";import"./chunk-3JCRVFH6.js";import"./chunk-JOOVJERF.js";import"./chunk-Z4NIAEKD.js";import{v as L}from"./chunk-FWDXF6DS.js";import"./chunk-HZ46BFL2.js";import"./chunk-GW7A3FSK.js";import"./chunk-5DTGGQTS.js";import{a as U}from"./chunk-KK53XKFJ.js";import"./chunk-DALLY2ZR.js";import"./chunk-MN377ENM.js";import{a as T}from"./chunk-7XMFOJLY.js";import"./chunk-4HRGOILD.js";import{ub as j}from"./chunk-4KPHYKUF.js";import{Cc as B,wd as m}from"./chunk-ODNNZUPK.js";import"./chunk-UAQWDGIM.js";import{V as f,a as O,r as W}from"./chunk-LELMSWC2.js";import"./chunk-RCTLXTBM.js";import"./chunk-Z26KXQRL.js";import"./chunk-NUMCZRU4.js";import"./chunk-L7YPSK2Y.js";import"./chunk-VAUOTJLY.js";import{a as e,g as l,i as s,n as a}from"./chunk-NSVULBS3.js";s();a();var S=l(O(),1);var A=l(R(),1);s();a();var n=l(O(),1);s();a();var $=l(j(),1);var o=l(O(),1);var c=f.colors.legacy.spotNegative,q=p.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: ${f.colors.brand.white};
  padding: clamp(24px, 16vh, 256px) 24px;
  box-sizing: border-box;
`,Q=p.div`
  margin-bottom: 24px;
  padding-bottom: 8vh;
`,V=p.div`
  max-width: 100ch;
  margin: auto;

  * {
    text-align: left;
  }
`,J=p.a`
  text-decoration: underline;
  color: ${c};
`,u=new U,z=e(({origin:i,subdomain:t})=>{let{t:d}=W(),h=i?v(i):"",G=i??"",b=new URL(G).hostname,x=t==="true"?b:h,k=(0,$.toUnicode)(x),H=e(async()=>{if(t==="true"){let w=await u.get(m.UserWhitelistSubdomains),r=JSON.parse(`${w}`);r?r.push(b):r=[b],r=[...new Set(r)],u.set(m.UserWhitelistSubdomains,JSON.stringify(r))}else{let w=await u.get(m.UserWhitelistedOrigins),r=JSON.parse(`${w}`);r?r.push(h):r=[h],r=[...new Set(r)],u.set(m.UserWhitelistedOrigins,JSON.stringify(r))}self.location.href=i},"handleClick");return o.default.createElement(q,null,o.default.createElement(V,null,o.default.createElement(Q,null,o.default.createElement(D,{width:128,fill:f.colors.brand.white})),o.default.createElement(g,{size:30,color:c,weight:"600"},d("blocklistOriginDomainIsBlocked",{domainName:k||d("blocklistOriginThisDomain")})),o.default.createElement(g,{color:c},d("blocklistOriginSiteIsMalicious")),o.default.createElement(g,{color:c},o.default.createElement(L,{i18nKey:"blocklistOriginCommunityDatabaseInterpolated"},"This site has been flagged as part of a",o.default.createElement(J,{href:y,rel:"noopener",target:"_blank"},"community-maintained database"),"of known phishing websites and scams. If you believe the site has been flagged in error,",o.default.createElement(J,{href:y,rel:"noopener",target:"_blank"},"please file an issue"),".")),x?o.default.createElement(g,{color:c,onClick:H,hoverUnderline:!0},d("blocklistOriginIgnoreWarning",{domainName:k})):o.default.createElement(o.default.Fragment,null)))},"BlocklistOrigin");var X=e(()=>{let i;try{i=new URLSearchParams(self.location.search).get("origin")||"",new URL(i)}catch{i=""}return i},"getOriginParam"),Y=e(()=>new URLSearchParams(self.location.search).get("subdomain")||"","getSubdomainParam"),K=e(()=>{let i=(0,n.useMemo)(X,[]),t=(0,n.useMemo)(Y,[]);return n.default.createElement(N,{future:{v7_startTransition:!0}},n.default.createElement(F,null,n.default.createElement(z,{origin:i,subdomain:t})))},"Blocklist");T();B.init({provider:E});await I("frontend",C);var Z=document.getElementById("root"),oo=(0,A.createRoot)(Z);oo.render(S.default.createElement(P,{theme:_},S.default.createElement(K,null)));
//# sourceMappingURL=Phishing.js.map
