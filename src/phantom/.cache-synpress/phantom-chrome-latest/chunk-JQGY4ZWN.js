import{a as B,b as C}from"./chunk-L6SN4W4V.js";import{H as w,I as R,h as u,m as v}from"./chunk-IYMLQYB2.js";import{l as i,n as m}from"./chunk-2ST3CGSE.js";import{f as b}from"./chunk-77RLIZ3K.js";import{u as q}from"./chunk-HZ46BFL2.js";import{a as S,b as s}from"./chunk-KK53XKFJ.js";import{Qa as k}from"./chunk-4HRGOILD.js";import{Ac as l,Bc as a,Ec as c}from"./chunk-ODNNZUPK.js";import{V as d}from"./chunk-LELMSWC2.js";import{H as g,I as x}from"./chunk-VAUOTJLY.js";import{a as y,i as n,n as o}from"./chunk-NSVULBS3.js";n();o();var D=new k(s,b,B);n();o();var K=new q(C({isWriter:!1}),{fetch(){throw new Error("Fetch not yet implemented")}});n();o();var f,L=new S,O=y(async()=>f||(f=new v(new R),f),"juiceboxClient"),z={storage:L,authRepository:b,juiceboxClient:O},h=w(z);h.subscribe(u.RotationResult,({type:e,didRotate:t})=>{let r=`Se*dless Bundle Rotation Result: ${e}, didRotate: ${t}`;c.addBreadcrumb(a.Seedless,r,l.Info),s.capture("seedlessBundleRotationResult",{data:{type:e,didRotate:t}})});h.subscribe(u.RecoverResult,({type:e,reason:t})=>{let r=`Se*dless Bundle Recover Result: ${e}`;t&&(r+=`, reason: ${t}`),c.addBreadcrumb(a.Seedless,r,l.Info),s.capture("seedlessBundleRecoverResult",{data:{type:e,reason:t}})});h.subscribe(u.BackupResult,({type:e,didBackup:t})=>{let r=`Se*dless Bundle Backup Result: ${e}, didBackup: ${t}`;c.addBreadcrumb(a.Seedless,r,l.Info),s.capture("seedlessBundleBackupResult",{data:{type:e,didBackup:t}})});n();o();n();o();var T=function(e,t){return Object.defineProperty?Object.defineProperty(e,"raw",{value:t}):e.raw=t,e},I=i(j||(j=T([`
/* http://meyerweb.com/eric/tools/css/reset/
   v5.0.1 | 20191019
   License: none (public domain)
*/

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
  line-height: 1;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
`],[`
/* http://meyerweb.com/eric/tools/css/reset/
   v5.0.1 | 20191019
   License: none (public domain)
*/

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
  line-height: 1;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
`]))),ae=m($||($=T(["",""],["",""])),I),_=I,j,$;var A=i`
  ::-webkit-scrollbar {
    background: ${d.colors.legacy.areaBase};
    width: 7px;
  }

  ::-webkit-scrollbar-thumb {
    background: ${d.colors.legacy.elementBase};
    border-radius: 8px;
  }
`,P=i`
  ::-webkit-scrollbar {
    display: none;
  }
  * {
    scrollbar-width: none; /* Also needed to disable scrollbar Firefox */
  }
`,he=m`
    ${_}

    body, html, * {
        box-sizing: border-box;
        font-family: 'Inter', 'Roboto', Arial;
        user-select: none;
        color: currentColor;
        -moz-osx-font-smoothing: grayscale;
        text-rendering: optimizeSpeed;
        -webkit-font-smoothing: antialiased;
    }
    input, textarea {
        -webkit-user-select: text;
        -khtml-user-select: text;
        -moz-user-select: text;
        -ms-user-select: text;
        user-select: text;
    }
    body {
        color: ${d.colors.legacy.textBase};
        background: ${e=>e.backgroundColor};
        min-height: 100vh;
        margin: 0;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    *:focus, *:focus-within {
        outline-color: transparent !important;
        outline-style: none !important;
        outline-width: 0px !important;
    }

    ${g||x?P:A}
`;export{D as a,K as b,h as c,he as d};
//# sourceMappingURL=chunk-JQGY4ZWN.js.map
