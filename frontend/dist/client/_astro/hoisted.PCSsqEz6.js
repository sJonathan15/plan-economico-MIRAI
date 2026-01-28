import{a as i}from"./api.DUBSwrnZ.js";import"./hoisted.DbckvgP9.js";async function p(){try{const e=localStorage.getItem("user");if(!e){window.location.href="/login";return}const r=JSON.parse(e);document.getElementById("user-name").innerText=r.name;const c=await i.getProfile();document.getElementById("entrepreneurship-count").innerText=c.entrepreneurships?.length?.toString()||"0";const a=await i.getPlans();document.getElementById("plans-count").innerText=a.length.toString();const l=document.getElementById("loading"),m=document.getElementById("empty-state"),g=document.getElementById("plans-grid");l&&l.classList.add("hidden"),a.length===0?m&&m.classList.remove("hidden"):g&&(g.innerHTML=a.slice(0,3).map(o=>`
                <div class="group relative">
                    <a href="/plan/${o.id}" class="block h-full">
                        <div class="bg-white rounded-2xl p-8 border-2 border-transparent hover:border-indigo-600 shadow-lg shadow-slate-200/50 transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-indigo-100 h-full flex flex-col">
                            <div class="flex justify-between items-start mb-4">
                                ${(()=>{const t=o.entrepreneurship,n=t.logoUrl||t.imageUrl||t.logo||t.image,y="http://localhost:3000";let u=null;return n&&typeof n=="string"&&n.trim()!==""&&(u=n.startsWith("http")?n:`${y}${n.startsWith("/")?"":"/"}${n}`),u?`<div class="w-12 h-12 bg-white rounded-xl flex items-center justify-center p-1 border border-slate-100 shadow-sm">
                                            <img src="${u}" alt="${t.name}" class="w-full h-full object-contain" />
                                        </div>`:`<div class="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center font-black text-xl">
                                            ${t.name.charAt(0).toUpperCase()}
                                        </div>`})()}
                                <span class="bg-green-50 text-green-700 text-xs font-black px-2.5 py-1.5 rounded-full uppercase tracking-wider">
                                    Activo
                                </span>
                            </div>
                            <h3 class="text-xl font-black text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">${o.entrepreneurship.name}</h3>
                            <p class="text-slate-500 text-sm font-medium mb-6 line-clamp-1">${o.entrepreneurship.sector||"General"}</p>
                            
                            <div class="mt-auto pt-4 border-t border-slate-100 flex justify-between items-center text-xs font-bold">
                                <span class="text-slate-400 uppercase">${new Date(o.createdAt).toLocaleDateString()}</span>
                                <span class="text-indigo-600">Ver Detalles →</span>
                            </div>
                        </div>
                    </a>
                    
                    <button 
                        class="btn-delete-plan absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm text-red-600 rounded-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-red-600 hover:text-white shadow-sm z-10"
                        data-id="${o.id}"
                        title="Eliminar Plan"
                    >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                        </svg>
                    </button>
                </div>
            `).join(""),document.querySelectorAll(".btn-delete-plan").forEach(o=>{o.addEventListener("click",t=>{t.preventDefault(),t.stopPropagation();const n=t.currentTarget.dataset.id;n&&v("delete-plan",n)})}))}catch(e){if(console.error("Error loading dashboard:",e),e.message?.includes("401")||e.message?.includes("Unauthorized")||!localStorage.getItem("token")){localStorage.removeItem("token"),localStorage.removeItem("user"),window.location.href="/login";return}const r=document.getElementById("loading");r&&(r.innerHTML=`
                    <div class="text-red-500 p-4 bg-red-50 rounded-lg border border-red-200 inline-block">
                        <p class="font-bold">Error al cargar el dashboard</p>
                        <p class="text-sm">${e.message||"Por favor, intenta recargar la página."}</p>
                        <button onclick="window.location.reload()" class="mt-2 text-xs underline">Recargar</button>
                    </div>
                `)}}const d=document.getElementById("security_confirm_modal"),b=document.getElementById("security-confirm-form"),h=document.getElementById("security-password"),f=document.getElementById("security-error"),s=document.getElementById("security-submit-btn");function v(e,r){document.getElementById("security-action-type").value=e,document.getElementById("security-target-id").value=r,h.value="",f?.classList.add("hidden"),d.showModal()}b?.addEventListener("submit",async e=>{e.preventDefault();const r=document.getElementById("security-action-type").value,c=document.getElementById("security-target-id").value,a=h.value;s&&(s.innerHTML='<span class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>',s.disabled=!0);try{await i.verifyPassword(a),r==="delete-plan"&&(await i.deletePlan(parseInt(c)),p()),d.close()}catch(l){console.error(l),f?.classList.remove("hidden")}finally{s&&(s.innerHTML="<span>Confirmar y Eliminar</span>",s.disabled=!1)}});document.getElementById("security-cancel-btn")?.addEventListener("click",()=>d.close());document.getElementById("btn-close-security-modal")?.addEventListener("click",()=>d.close());p();
