(()=>{"use strict";const e=["Cleaning","Packing","Mopping"],t=(e,t,n,d)=>{const i=document.createElement(e);return t&&i.classList.add(...t),n&&(i.textContent=n),d&&(i.id=d),i},n=()=>{const e=t("div",["flexCol"],"","sideBarNavCont"),n=t("div",["sideBarLink"],"Inbox");e.appendChild(n),n.addEventListener("click",d);const a=t("div",["sideBarLink"],"Today");e.appendChild(a),a.addEventListener("click",i);const l=t("div",["sideBarLink"],"This Week");return e.appendChild(l),l.addEventListener("click",o),e},d=e=>{console.log(e.target)},i=e=>{console.log(e.target)},o=e=>{console.log(e.target)},a=()=>{const n=t("div",["flexCol"],"","projCont"),d=t("div",["projItem"]);d.appendChild(t("h4",["flexCol"],"Projects"));const i=t("i",["fas","fa-plus"]);d.appendChild(i),i.addEventListener("click",l),n.appendChild(d);const o=t("ul",["projList"],"","projList");return n.appendChild(o),e.forEach((e=>o.appendChild(s(e)))),n},l=e=>{console.log(e.target)},s=e=>{const n=t("div",["projItem"]),d=t("li","",e);n.appendChild(d);const i=t("i",["far","fa-edit"]);n.appendChild(i),i.addEventListener("click",(()=>r(d)));const o=t("i",["far","fa-trash-alt"]);return n.appendChild(o),n},r=e=>{const n=e.textContent,d=t("input",["inputProj"],"","inputProj");d.type="text",d.required=!0,d.value=n;const i=t("form"),o=t("button");o.type="submit",i.append(d,o),i.addEventListener("submit",(e=>((e,t)=>{console.log("this.value added!"),e.preventDefault()})(e))),e.replaceWith(i)};(()=>{const e=document.querySelector("#sideBar");e.appendChild(n()),e.appendChild(a())})()})();