import{a as c}from"./api.DUBSwrnZ.js";import"./hoisted.DbckvgP9.js";const i=document.getElementById("security_confirm_modal"),p=document.getElementById("security-confirm-form"),u=document.getElementById("security-password"),m=document.getElementById("security-error"),o=document.getElementById("security-submit-btn");function h(n,s){document.getElementById("security-action-type").value=n,document.getElementById("security-target-id").value=s,u.value="",m?.classList.add("hidden"),i.showModal()}p?.addEventListener("submit",async n=>{n.preventDefault();const s=document.getElementById("security-action-type").value,a=document.getElementById("security-target-id").value,r=u.value;o&&(o.innerHTML='<span class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>',o.disabled=!0);try{await c.verifyPassword(r),s==="delete-plan"&&(await c.deletePlan(parseInt(a)),g()),i.close()}catch(e){console.error(e),m?.classList.remove("hidden")}finally{o&&(o.innerHTML="<span>Confirmar y Eliminar</span>",o.disabled=!1)}});document.getElementById("security-cancel-btn")?.addEventListener("click",()=>i.close());document.getElementById("btn-close-security-modal")?.addEventListener("click",()=>i.close());async function g(){try{const n=await c.getPlans(),s=document.getElementById("plans-grid"),a=document.getElementById("loading");a&&a.classList.add("hidden"),n.length===0?s&&(s.innerHTML='<p class="text-slate-500 col-span-3 text-center">No tienes planes creados.</p>'):s&&(s.innerHTML=n.map(r=>`
            <div class="relative group">
              <a href="/plan/${r.id}" class="block h-full">
                <div class="bg-white rounded-2xl p-8 border-2 border-transparent hover:border-indigo-600 shadow-lg shadow-slate-200/50 transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-indigo-100 h-full flex flex-col">
                  <div class="flex justify-between items-start mb-4">
                    ${(()=>{const e=r.entrepreneurship,t=e.logoUrl||e.imageUrl||e.logo||e.image,l="http://localhost:3000";let d=null;return t&&typeof t=="string"&&t.trim()!==""&&(d=t.startsWith("http")?t:`${l}${t.startsWith("/")?"":"/"}${t}`),d?`<div class="w-12 h-12 bg-white rounded-xl flex items-center justify-center p-1 border border-slate-100 shadow-sm">
                                <img src="${d}" alt="${e.name}" class="w-full h-full object-contain" />
                            </div>`:`<div class="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center font-black text-xl">
                                ${e.name.charAt(0).toUpperCase()}
                            </div>`})()}
                    ${(()=>{const e=r.entrepreneurship.sector||"General";let t="bg-indigo-50 text-indigo-700";return e.includes("Tecnología")?t="bg-blue-600 text-white":e.includes("Gastronomía")?t="bg-orange-500 text-white":e.includes("Producción")?t="bg-emerald-600 text-white":e.includes("Agrícola")&&(t="bg-lime-600 text-white"),`<span class="${t} text-[10px] font-black px-3 py-1.5 rounded-full tracking-wider uppercase">${e}</span>`})()}
                  </div>
                  
                  <h3 class="text-xl font-black text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                      ${r.entrepreneurship.name}
                  </h3>
                  <p class="text-slate-500 text-sm font-medium line-clamp-2 mb-6">
                      Plan estratégico para el desarrollo y proyección financiera.
                  </p>
                  
                  <div class="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between">
                     <div class="flex items-center text-slate-400 text-xs font-bold">
                      <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                      ${new Date(r.createdAt).toLocaleDateString()}
                     </div>
                     <div class="text-indigo-600 font-black text-sm group-hover:translate-x-1 transition-transform">
                      Ver Plan →
                     </div>
                  </div>
                </div>
              </a>
              <button 
                class="btn-delete-plan absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm text-red-600 rounded-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-red-600 hover:text-white shadow-sm"
                data-id="${r.id}"
                title="Eliminar Plan"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
              </button>
            </div>
          `).join(""),document.querySelectorAll(".btn-delete-plan").forEach(r=>{r.addEventListener("click",e=>{const l=e.currentTarget.dataset.id;h("delete-plan",l)})}))}catch(n){console.error("Error loading plans:",n)}}g();
