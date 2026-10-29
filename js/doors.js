/* Doors — adapted from js/doors.js in the supplied template.
   Retains the two-panel closing/opening transition, adds keyboard/link safety. */
(()=>{const curtains=document.getElementById('curtains');if(!curtains)return;const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;const DUR=reduce?0:900;let navigating=false;
function open(){curtains.classList.remove('closed');navigating=false}
if(!reduce){curtains.classList.add('closed');requestAnimationFrame(()=>requestAnimationFrame(()=>setTimeout(open,150)))}
window.addEventListener('pageshow',e=>{if(e.persisted)open()});
document.addEventListener('click',e=>{const a=e.target.closest('a');if(!a||e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||a.target==='_blank'||a.hasAttribute('download'))return;const href=a.getAttribute('href');if(!href||href.startsWith('#')||href.startsWith('mailto:')||href.startsWith('tel:'))return;const url=new URL(href,location.href);if(url.origin!==location.origin||url.pathname===location.pathname)return;e.preventDefault();if(navigating)return;navigating=true;document.querySelectorAll('dialog[open]').forEach(d=>d.close());curtains.classList.add('closed');setTimeout(()=>location.href=url.href,DUR+60)})})();
