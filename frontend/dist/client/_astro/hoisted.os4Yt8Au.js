import{api as o}from"./api.CPfjwQVw.js";import"./Sidebar.astro_astro_type_script_index_0_lang.DZqaJy4g.js";async function b(){try{const e=o.getUser();if(!e){window.location.href="/login";return}const r=e.name?e.name.split(" ")[0]:"Usuario";document.getElementById("user-name").innerText=r;const u=await o.getProfile();document.getElementById("entrepreneurship-count").innerText=u.entrepreneurships?.length?.toString()||"0";const a=await o.getPlans();document.getElementById("plans-count").innerText=a.length.toString();const l=document.getElementById("loading"),p=document.getElementById("empty-state"),h=document.getElementById("plans-grid");l&&l.classList.add("hidden"),a.length===0?p&&p.classList.remove("hidden"):h&&(h.innerHTML=a.slice(0,3).map(s=>`
                <div class="group relative">
                    <a href="/plan/${s.id}" class="block h-full">
                        <div class="card p-8 border-transparent hover:border-indigo-600/30 transition-all h-full flex flex-col">
                            <div class="flex justify-between items-start mb-4">
                                ${(()=>{const t=s.entrepreneurship,n=t.logoUrl||t.imageUrl||t.logo||t.image,w="http://localhost:3000";let m=null;return n&&typeof n=="string"&&n.trim()!==""&&(m=n.startsWith("http")?n:`${w}${n.startsWith("/")?"":"/"}${n}`),m?`<div class="w-12 h-12 bg-white rounded-xl flex items-center justify-center p-1 border border-slate-100 shadow-sm">
                                            <img src="${m}" alt="${t.name}" class="w-full h-full object-contain" />
                                        </div>`:`<div class="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center font-black text-xl">
                                            ${t.name.charAt(0).toUpperCase()}
                                        </div>`})()}
                                <span class="bg-green-50 text-green-700 text-xs font-black px-2.5 py-1.5 rounded-full uppercase tracking-wider">
                                    Activo
                                </span>
                            </div>
                            <h3 class="text-xl font-black text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">${s.entrepreneurship.name}</h3>
                            <p class="text-slate-500 text-sm font-medium mb-6 line-clamp-1">${s.entrepreneurship.sector||"General"}</p>
                            
                            <div class="mt-auto pt-4 border-t border-slate-100 flex justify-between items-center text-xs font-bold">
                                <span class="text-slate-400 uppercase">${new Date(s.createdAt).toLocaleDateString()}</span>
                                <span class="text-indigo-600">Ver Detalles →</span>
                            </div>
                        </div>
                    </a>
                    
                    <button 
                        class="btn-delete-plan absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm text-red-600 rounded-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-red-600 hover:text-white shadow-sm z-10"
                        data-id="${s.id}"
                        title="Eliminar Plan"
                    >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                        </svg>
                    </button>
                </div>
            `).join(""),document.querySelectorAll(".btn-delete-plan").forEach(s=>{s.addEventListener("click",t=>{t.preventDefault(),t.stopPropagation();const n=t.currentTarget.dataset.id;n&&E("delete-plan",n)})}))}catch(e){if(console.error("Error loading dashboard:",e),e.message?.includes("401")||e.message?.includes("Unauthorized")||!o.isAuthenticated()){o.logout(),window.location.href="/login";return}const r=document.getElementById("loading");r&&(r.innerHTML=`
                    <div class="text-red-500 p-4 bg-red-50 rounded-lg border border-red-200 inline-block">
                        <p class="font-bold">Error al cargar el dashboard</p>
                        <p class="text-sm">${e.message||"Por favor, intenta recargar la página."}</p>
                        <button onclick="window.location.reload()" class="mt-2 text-xs underline">Recargar</button>
                    </div>
                `)}}const c=document.getElementById("security_confirm_modal"),x=document.getElementById("security-confirm-form"),d=document.getElementById("security-password"),v=document.getElementById("security-error"),i=document.getElementById("security-submit-btn");function E(e,r){document.getElementById("security-action-type").value=e,document.getElementById("security-target-id").value=r,d.value="",v?.classList.add("hidden"),c.showModal()}x?.addEventListener("submit",async e=>{e.preventDefault();const r=document.getElementById("security-action-type").value,u=document.getElementById("security-target-id").value,a=d.value;i&&(i.innerHTML='<span class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>',i.disabled=!0);try{await o.verifyPassword(a),r==="delete-plan"&&(await o.deletePlan(parseInt(u)),b()),c.close()}catch(l){console.error(l),v?.classList.remove("hidden")}finally{i&&(i.innerHTML="<span>Confirmar y Eliminar</span>",i.disabled=!1)}});document.getElementById("security-cancel-btn")?.addEventListener("click",()=>c.close());document.getElementById("btn-close-security-modal")?.addEventListener("click",()=>c.close());const g=document.getElementById("toggle-security-password"),y=g?.querySelector(".toggle-icon-show"),f=g?.querySelector(".toggle-icon-hide");g?.addEventListener("click",()=>{const e=d.getAttribute("type")==="password"?"text":"password";d.setAttribute("type",e),e==="text"?(y?.classList.add("hidden"),f?.classList.remove("hidden")):(y?.classList.remove("hidden"),f?.classList.add("hidden"))});b();
