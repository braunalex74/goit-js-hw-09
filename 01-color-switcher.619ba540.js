let t;const e=document.querySelector("[data-start]"),a=document.querySelector("[data-stop]");e.addEventListener("click",(function(){t=setInterval((()=>{document.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,"0")}`}),1e3),e.disabled=!0})),a.addEventListener("click",(function(){clearInterval(t),e.disabled=!1}));
//# sourceMappingURL=01-color-switcher.619ba540.js.map
