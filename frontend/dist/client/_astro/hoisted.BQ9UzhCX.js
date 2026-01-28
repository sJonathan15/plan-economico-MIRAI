import{api as d}from"./api.CPfjwQVw.js";import"./hoisted.Qv3mm9Uz.js";import"./Sidebar.astro_astro_type_script_index_0_lang.DZqaJy4g.js";const o=document.getElementById("security_confirm_modal"),p=document.getElementById("security-confirm-form"),u=document.getElementById("security-password"),m=document.getElementById("security-error"),i=document.getElementById("security-submit-btn");function f(r,s){document.getElementById("security-action-type").value=r,document.getElementById("security-target-id").value=s,u.value="",m?.classList.add("hidden"),o.showModal()}p?.addEventListener("submit",async r=>{r.preventDefault();const s=document.getElementById("security-action-type").value,l=document.getElementById("security-target-id").value,n=u.value;i&&(i.innerHTML='<span class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>',i.disabled=!0);try{await d.verifyPassword(n),s==="delete-plan"&&(await d.deletePlan(parseInt(l)),g()),o.close()}catch(e){console.error(e),m?.classList.remove("hidden")}finally{i&&(i.innerHTML="<span>Confirmar y Eliminar</span>",i.disabled=!1)}});document.getElementById("security-cancel-btn")?.addEventListener("click",()=>o.close());document.getElementById("btn-close-security-modal")?.addEventListener("click",()=>o.close());async function g(){try{const r=await d.getPlans(),s=document.getElementById("plans-grid"),l=document.getElementById("loading");l&&l.classList.add("hidden"),r.length===0?s&&(s.innerHTML='<p class="text-slate-500 col-span-3 text-center">No tienes planes creados.</p>'):s&&(s.innerHTML=r.map(n=>`
            <div class="relative group">
              <a href="/plan/${n.id}" class="block h-full">
                <div class="card h-full flex flex-col hover:border-indigo-600 transition-all hover:scale-[1.02] hover:shadow-xl" >
                  <div class="flex justify-between items-start mb-4">
                    ${(()=>{const e=n.entrepreneurship,t=e.logoUrl||e.imageUrl||e.logo||e.image,a="http://localhost:3000";let c=null;return t&&typeof t=="string"&&t.trim()!==""&&(c=t.startsWith("http")?t:`${a}${t.startsWith("/")?"":"/"}${t}`),c?`<div class="w-12 h-12 bg-white rounded-xl flex items-center justify-center p-1 border border-slate-100 shadow-sm">
                                <img src="${c}" alt="${e.name}" class="w-full h-full object-contain" />
                            </div>`:`<div class="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center font-black text-xl">
                                ${e.name.charAt(0).toUpperCase()}
                            </div>`})()}
                    ${(()=>{const e=n.entrepreneurship.sector||"General";let t="bg-indigo-50 text-indigo-700";return e.includes("Tecnología")?t="bg-blue-600 text-white":e.includes("Gastronomía")?t="bg-orange-500 text-white":e.includes("Producción")?t="bg-emerald-600 text-white":e.includes("Agrícola")&&(t="bg-lime-600 text-white"),`<span class="${t} text-[10px] font-black px-3 py-1.5 rounded-full tracking-wider uppercase">${e}</span>`})()}
                  </div>
                  
                  <h3 class="text-xl font-black text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                      ${n.entrepreneurship.name}
                  </h3>
                  <p class="text-slate-500 text-sm font-medium line-clamp-2 mb-6">
                      Plan estratégico para el desarrollo y proyección financiera.
                  </p>
                  
                  <div class="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between">
                     <div class="flex items-center text-slate-400 text-xs font-bold">
                      <div class="relative h-48 w-full overflow-hidden bg-white rounded-b-xl" ></div>
                      ${new Date(n.createdAt).toLocaleDateString()}
                     </div>
                     <div class="text-indigo-600 font-black text-sm group-hover:translate-x-1 transition-transform">
                      Ver Plan →
                     </div>
                  </div>
                </div>
              </a>
              <button 
                class="btn-delete-plan absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm text-red-600 rounded-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-red-600 hover:text-white shadow-sm"
                data-id="${n.id}"
                title="Eliminar Plan"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
              </button>
            </div>
          `).join(""),document.querySelectorAll(".btn-delete-plan").forEach(n=>{n.addEventListener("click",e=>{const a=e.currentTarget.dataset.id;f("delete-plan",a)})}))}catch(r){console.error("Error loading plans:",r)}}g();
