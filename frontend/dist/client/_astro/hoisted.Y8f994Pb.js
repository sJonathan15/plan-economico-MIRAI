import{api as c}from"./api.CPfjwQVw.js";import"./hoisted.Qv3mm9Uz.js";import"./Sidebar.astro_astro_type_script_index_0_lang.DZqaJy4g.js";const d=document.getElementById("entrepreneurship-list");async function m(){if(d)try{const i=await c.getEntrepreneurships(),s=i.entrepreneurships||i;if(!s||s.length===0){d.innerHTML=`
                    <div class="col-span-full text-center py-20 card flex flex-col items-center justify-center my-8">
                        <div class="w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-sm mb-6">
                           <svg class="w-10 h-10 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                        </div>
                        <h2 class="text-xl font-bold text-slate-800 mb-2">Comienza tu emprendimiento</h2>
                        <p class="text-slate-500 mb-8 max-w-xs mx-auto text-sm font-medium">Registra tu primer emprendimiento para empezar a proyectar tus planes económicos con MIRAI.</p>
                        <a href="/entrepreneurship/create" class="btn btn-primary btn-sm px-10 shadow-lg shadow-indigo-500/10">Crear mi primer proyecto</a>
                    </div>
                `;return}d.innerHTML=s.map(e=>{const t=e.logoUrl||e.imageUrl||e.logo||e.image,l="http://localhost:3000";let o=null;return t&&typeof t=="string"&&t.trim()!==""&&(o=t.startsWith("http")?t:`${l}${t.startsWith("/")?"":"/"}${t}`),`
                <div class="card overflow-hidden hover:shadow-2xl hover:shadow-slate-200/50 hover:-translate-y-2 transition-all duration-500 flex flex-col h-full relative">
                    <!-- Top section: Image/Banner Area -->
                    <div class="relative h-48 w-full overflow-hidden bg-white border-b" >
                        <div class="w-full h-full bg-gradient-to-br from-indigo-500 via-indigo-600 to-purple-700 flex items-center justify-center relative overflow-hidden">
                             <!-- Decorative elements -->
                             <div class="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
                             <div class="absolute -left-10 -top-10 w-40 h-40 bg-indigo-400/20 rounded-full blur-3xl"></div>
                             
                             ${o?`<img src="${o}" alt="${e.name}" class="relative z-10 w-full h-full object-contain p-8 transition-transform duration-1000 group-hover:scale-105" />`:`<span class="text-7xl font-black text-white/20 select-none tracking-tighter">${e.name.charAt(0).toUpperCase()}</span>`}
                        </div>
                        
                        <!-- Sector Badge Overlay -->
                        <div class="absolute top-6 right-6 z-20">
                            ${(()=>{const r=e.sector||"General";let n="bg-white/95 text-indigo-700";return r.includes("Tecnología")?n="bg-blue-600 text-white":r.includes("Alimentos")?n="bg-orange-500 text-white":r.includes("Producción")?n="bg-emerald-600 text-white":r.includes("Agrícola")?n="bg-lime-600 text-white":r.includes("Servicios")?n="bg-indigo-600 text-white":r.includes("Comercio")?n="bg-purple-600 text-white":r.includes("Turismo")?n="bg-cyan-500 text-white":r.includes("Salud")?n="bg-rose-500 text-white":r.includes("Educación")&&(n="bg-amber-500 text-white"),`<span class="${n} backdrop-blur-md text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-[0.15em] shadow-lg border border-white/20">
                                    ${r}
                                </span>`})()}
                        </div>
                    </div>

                    <!-- Content Section -->
                    <div class="p-8 flex-1 flex flex-col">
                        <div class="mb-6">
                            <h3 class="text-2xl font-black text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors line-clamp-1 leading-tight" title="${e.name}">
                                ${e.name}
                            </h3>
                            <div class="flex flex-col">
                                <span class="text-slate-700 font-bold text-sm tracking-tight">${e.representativeName||"Representante no registrado"}</span>
                                <span class="text-slate-400 font-medium text-xs opacity-80">${e.email||"correo@no-registrado.com"}</span>
                            </div>
                        </div>

                        <div class="flex-1"></div>
                        
                        <!-- Actions Section -->
                        <div class="mt-auto flex items-center gap-3 pt-6 border-t border-slate-50">
                            <a href="/plan/create?entId=${e.id}" class="btn btn-primary btn-sm flex-1 shadow-lg shadow-indigo-500/10 text-sm py-3 active:scale-95 transition-all">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"></path></svg>
                                <span>Crear Plan</span>
                            </a>
                            <button 
                                class="btn-edit-ent btn btn-secondary btn-sm p-3"
                                data-id="${e.id}"
                                title="Editar Emprendimiento"
                            >
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                            </button>
                            <button 
                                class="btn-delete-ent btn btn-ghost btn-sm text-red-600 hover:bg-red-50 p-3"
                                data-id="${e.id}"
                                title="Eliminar Emprendimiento"
                            >
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                            </button>
                        </div>
                    </div>
                </div>
            `}).join(""),document.querySelectorAll(".btn-delete-ent").forEach(e=>{e.addEventListener("click",t=>{const o=t.currentTarget.dataset.id;v("delete-entrepreneurship",o)})}),document.querySelectorAll(".btn-edit-ent").forEach(e=>{e.addEventListener("click",async t=>{const o=t.currentTarget.dataset.id;try{const r=await c.getEntrepreneurship(parseInt(o));window.dispatchEvent(new CustomEvent("open-entrepreneurship-wizard",{detail:{mode:"edit",data:r}}))}catch{alert("Error al cargar datos del emprendimiento")}})})}catch(i){console.error(i),d.innerHTML='<p class="text-red-500">Error al cargar listado.</p>'}}const u=document.getElementById("security_confirm_modal"),g=document.getElementById("security-confirm-form"),p=document.getElementById("security-password"),h=document.getElementById("security-error"),a=document.getElementById("security-submit-btn");function v(i,s){document.getElementById("security-action-type").value=i,document.getElementById("security-target-id").value=s,p.value="",h?.classList.add("hidden"),u?.showModal()}g?.addEventListener("submit",async i=>{i.preventDefault();const s=document.getElementById("security-action-type").value,e=document.getElementById("security-target-id").value,t=p.value;a&&(a.innerHTML='<span class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>',a.disabled=!0);try{await c.verifyPassword(t),s==="delete-entrepreneurship"&&(await c.deleteEntrepreneurship(parseInt(e)),m()),u?.close()}catch(l){console.error(l),h?.classList.remove("hidden")}finally{a&&(a.innerHTML="<span>Confirmar y Eliminar</span>",a.disabled=!1)}});document.getElementById("security-cancel-btn")?.addEventListener("click",()=>u?.close());document.getElementById("btn-close-security-modal")?.addEventListener("click",()=>u?.close());const b=document.getElementById("btn-new-entrepreneurship");b?.addEventListener("click",()=>{window.dispatchEvent(new CustomEvent("open-entrepreneurship-wizard",{detail:{mode:"create"}}))});window.addEventListener("entrepreneurship-success",()=>{m()});m();
