import{S as u,a as m,i as n}from"./assets/vendor-D8_O3--j.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();const c=document.querySelector(".gallery"),d=new u(".gallery a",{captions:!0,captionsData:"alt",captionDelay:250});function f(s){const o=s.map(({webformatURL:r,largeImageURL:i,tags:e,likes:t,views:a,comments:l,downloads:p})=>`
        <a class="gallery-item" href="${i}">
          <img class="gallery-image" src="${r}" alt="${e}" />
          <ul class="photo-list">
            <li class="photo-item">
              <p class="text">Likes <span class="photo-item-span">${t}</span></p>
            </li>
            <li class="photo-item">
              <p class="text">Views <span class="photo-item-span">${a}</span></p>
            </li>
            <li class="photo-item">
              <p class="text">Comments <span class="photo-item-span">${l}</span></p>
            </li>
            <li class="photo-item">
              <p class="text">Downloads <span class="photo-item-span">${p}</span></p>
            </li>
          </ul>
        </a>
      `).join("");c.insertAdjacentHTML("beforeend",o),d.refresh()}function y(){c.innerHTML=""}function h(){document.querySelector(".loader").classList.add("is-visible")}function g(){document.querySelector(".loader").classList.remove("is-visible")}const L="51409693-2d1545100387263aa5c533cc2";async function b(s){try{const r=(await m("https://pixabay.com/api/",{params:{key:L,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0}})).data.hits;return!r||r.length===0?(n.error({message:"Sorry, no images match your search query. Please try again.",position:"topRight"}),[]):r}catch(o){return n.error({title:"Error",message:o.message,position:"topRight"}),[]}}const q=document.querySelector(".form"),S=document.querySelector('input[name="search-text"]');q.addEventListener("submit",x);async function x(s){s.preventDefault();const o=S.value.trim();if(!o){n.warning({title:"Warning",message:"Please enter a search query.",position:"topRight"});return}y(),h();try{const r=await b(o);console.log(r),f(r)}catch(r){console.error("Error fetching images:",r)}finally{g()}}
//# sourceMappingURL=index.js.map
