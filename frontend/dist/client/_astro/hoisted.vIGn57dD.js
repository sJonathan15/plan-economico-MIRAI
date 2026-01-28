import{api as w}from"./api.CPfjwQVw.js";import"./hoisted.Qv3mm9Uz.js";import"./Sidebar.astro_astro_type_script_index_0_lang.DZqaJy4g.js";const v=window.location.pathname.split("/").pop();async function I(){try{if(!v)return;const t=await w.getPlan(parseInt(v)),o=t.entrepreneurship,a=(e,l)=>{const p=document.getElementById(e);p&&(p.innerText=l)};a("project-name",o.name),a("project-sector",o.sector),a("project-description",t.businessDescription||"Sin descripción disponible.");const s=[t.mainActivity,t.productiveFocus,t.socialImpact].filter(e=>e&&e!=="N/A"&&e.trim()!=="").join(". ");a("main-activity",s||"Sin actividad registrada.");const r=[t.valueProposition,t.differentiation,t.customerBenefits].filter(e=>e&&e!=="N/A"&&e.trim()!=="").join(". ");a("value-proposition",r||"Sin propuesta registrada."),a("comm-channels",t.communicationChannels||"N/A"),a("com-channels",t.commercializationChannels||"N/A");const n=e=>new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}).format(parseFloat(e)||0);g("team-table",o.team,["Nombre","Rol","Experiencia"],["name","role","experience"]),g("partners-table",o.partners,["Nombre","Tipo"],["name","type"]),g("segments-table",o.segments,["Segmento","%","Edad","Nivel S.E.","Características"],["name","percentage","ageRange","socioeconomicLevel","characteristics"]);const i=document.getElementById("supply-chain-content");if(i)if(t.supplyChainMode==="IMAGE"&&t.supplyChainImageUrl){const e=t.supplyChainImageUrl.startsWith("http")?t.supplyChainImageUrl:`http://localhost:3000${t.supplyChainImageUrl}`;i.innerHTML=`<div class="flex flex-col items-center gap-4">
                        <img src="${e}" alt="Cadena de Suministro" class="max-w-full h-auto rounded-xl shadow-lg border" />
                        <div class="flex flex-col items-center gap-2">
                            <p class="text-xs text-slate-400 italic">Diagrama proporcionado por el usuario</p>
                            <a href="${e}" target="_blank" class="btn btn-sm btn-ghost text-indigo-600 flex items-center gap-2">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                Ver imagen completa
                            </a>
                        </div>
                    </div>`}else g("supply-chain-content",[{label:"Proveedores",val:t.supplyChainProviders},{label:"Producción",val:t.supplyChainProduction},{label:"Almacenamiento",val:t.supplyChainStorage},{label:"Distribución",val:t.supplyChainDistribution},{label:"Cliente Final",val:t.supplyChainClient}],["Etapa","Descripción"],["label","val"]);b("unit-costs-table",t.unitCosts,["Producto","Cant. Mes","V. Unitario","Total"],e=>[e.productName,e.monthlyQuantity,n(e.unitCost),n(e.total)]),b("demand-table",t.demands,["Producto","Demanda Mes","Precio","Total"],e=>[e.productName,e.monthlyDemand,n(e.unitPrice),n(e.monthlyDemand*e.unitPrice)]),b("equipment-table",t.equipments,["Descripción","Cant","Precio","Fuente"],e=>[e.description,e.quantity,n(e.unitPrice),e.financingSource]);const d=document.getElementById("provisions-table");if(d){d.innerHTML="";const e=t.unitCosts||[],l=t.provisions||[];if(e.length===0)d.innerHTML='<p class="text-slate-400 text-xs italic py-4 text-center">No hay productos registrados que requieran provisiones.</p>';else{e.forEach((u,$)=>{const f=l.filter(c=>String(c.productId)===String(u.wizardId)),B=f.reduce((c,E)=>c+parseFloat(E.monthlyQuantity)*parseFloat(E.unitPrice),0),M=`
                            <div class="mb-10 last:mb-0">
                                <div class="flex items-center gap-3 mb-4">
                                    <span class="flex items-center justify-center w-8 h-8 rounded-xl bg-indigo-600 text-white text-xs font-black shadow-sm shadow-indigo-200">${$+1}</span>
                                    <h4 class="text-sm font-black text-slate-800 uppercase tracking-tight">
                                        PRODUCTO: <span class="text-indigo-600">${u.productName}</span>
                                    </h4>
                                </div>
                                
                                <div class="overflow-x-auto rounded-2xl border border-slate-100 shadow-sm bg-white">
                                    <table class="w-full text-xs text-left">
                                        <thead class="bg-slate-50/80 text-slate-500 uppercase font-black text-[10px] tracking-wider">
                                            <tr>
                                                <th class="px-5 py-4">Insumo / Gasto</th>
                                                <th class="px-5 py-4 text-center">Unidad</th>
                                                <th class="px-5 py-4 text-center">Cantidad</th>
                                                <th class="px-5 py-4 text-right">P. Unitario</th>
                                                <th class="px-5 py-4 text-right">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody class="divide-y divide-slate-50">
                                            ${f.length>0?f.map(c=>`
                                                <tr class="hover:bg-slate-50/50 transition-colors">
                                                    <td class="px-5 py-3 text-slate-700 font-semibold">${c.item}</td>
                                                    <td class="px-5 py-3 text-center text-slate-500 font-medium">${c.unit}</td>
                                                    <td class="px-5 py-3 text-center font-mono font-bold text-slate-600">${c.monthlyQuantity}</td>
                                                    <td class="px-5 py-3 text-right font-mono font-bold text-slate-600">${n(c.unitPrice)}</td>
                                                    <td class="px-5 py-3 text-right font-mono font-bold text-indigo-600">${n(parseFloat(c.monthlyQuantity)*parseFloat(c.unitPrice))}</td>
                                                </tr>
                                            `).join(""):`
                                                <tr>
                                                    <td colspan="5" class="px-5 py-8 text-center text-slate-400 italic bg-slate-50/30">
                                                        No hay insumos registrados para este producto.
                                                    </td>
                                                </tr>
                                            `}
                                        </tbody>
                                        <tfoot class="bg-indigo-50/30 border-t border-indigo-100/50">
                                            <tr>
                                                <td colspan="4" class="px-5 py-3 text-right font-black text-indigo-400 uppercase text-[9px] tracking-widest">Costo Total Producto</td>
                                                <td class="px-5 py-3 text-right font-black text-indigo-700 font-mono text-sm">${n(B)}</td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                        `;d.innerHTML+=M});const p=`
                        <div class="mt-8 pt-8 border-t border-slate-100 flex justify-end">
                            <div class="relative group">
                                <div class="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                                <div class="relative flex items-center gap-6 bg-white px-8 py-5 rounded-2xl border border-slate-100 shadow-xl shadow-indigo-50">
                                    <div class="flex flex-col border-r border-slate-100 pr-6">
                                        <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total General</span>
                                        <span class="text-[9px] font-medium text-slate-300 italic">Provisiones G.A.V.</span>
                                    </div>
                                    <div class="flex flex-col">
                                        <span class="text-2xl font-black text-indigo-600 font-mono leading-none">${n(t.totalGeneralProvisions)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;d.innerHTML+=p}}b("financing-table",t.financingItems,["Concepto","Monto","Fuente"],e=>[e.concept,n(e.amount),e.source]),T(t.projections,n),a("summary-profit",n(t.netProfit)),a("summary-investment",n(t.totalCost)),a("van-result",n(t.van)),a("tir-result",(parseFloat(t.tir)*100).toFixed(2)+"%"),a("bc-result",parseFloat(t.benefitCostRatio).toFixed(2)),a("payback-result",t.paybackPeriod),a("financial-conclusion",t.financialConclusion||"Sin conclusión generada."),a("rate-growth",(t.growthRate*100).toFixed(2)+"%"),a("rate-price-growth",(t.priceGrowthRate*100).toFixed(2)+"%"),a("rate-inflation",(t.inflationRate*100).toFixed(2)+"%"),a("rate-salary-increase",(t.salaryIncreaseRate*100).toFixed(2)+"%"),a("rate-discount",(t.discountRate*100).toFixed(2)+"%");const h=document.getElementById("images-gallery");h&&t.images&&t.images.length>0?h.innerHTML=t.images.map(e=>{const l=e.url.startsWith("http")?e.url:`http://localhost:3000${e.url}`;return`
                        <a href="${l}" target="_blank" class="group relative aspect-square rounded-xl overflow-hidden border bg-slate-50 hover:border-indigo-500 transition-all shadow-sm">
                            <img src="${l}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                <svg class="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                            </div>
                        </a>
                    `}).join(""):h&&(h.innerHTML='<p class="text-xs text-slate-400 italic col-span-4">No se han cargado anexos gráficos.</p>');const x=document.getElementById("documents-list"),k=localStorage.getItem("token");x&&t.documents&&t.documents.length>0?(x.innerHTML=t.documents.map((e,l)=>{const p=new Date(e.createdAt).toLocaleDateString(),u=e.filePath.startsWith("http")?e.filePath:`http://localhost:3000${e.filePath}?token=${k}`;return`
                        <li class="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100 hover:border-indigo-200 transition-colors">
                            <div class="flex flex-col">
                                <span class="text-xs font-bold text-slate-700">Versión #${t.documents.length-l}</span>
                                <span class="text-[10px] text-slate-400 font-medium">${p}</span>
                            </div>
                            <div class="flex gap-2">
                                <button class="btn-delete-doc text-red-600 hover:bg-white p-1.5 rounded-lg border border-transparent hover:border-red-100 transition-all" data-id="${e.id}" title="Eliminar documento">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                </button>
                                <a href="${u}" download="plan_economico_${e.id}.docx" class="text-green-600 hover:bg-white p-1.5 rounded-lg border border-transparent hover:border-green-100 transition-all" title="Descargar">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                                </a>
                            </div>
                        </li>`}).join(""),document.querySelectorAll(".btn-delete-doc").forEach(e=>{e.addEventListener("click",l=>{const u=l.currentTarget.dataset.id;F("delete-document",u)})})):x&&(x.innerHTML='<p class="text-xs text-slate-400 italic text-center py-4">No hay documentos generados aún.</p>'),document.getElementById("export-btn")?.addEventListener("click",()=>{const e=`http://localhost:3000/api/binary/plans/${v}/export?token=${k}`;window.open(e,"_blank")}),document.getElementById("loading")?.classList.add("hidden"),document.getElementById("content")?.classList.remove("hidden")}catch(t){console.error("Error loading plan:",t),document.getElementById("loading").innerHTML='<p class="text-red-500">Error al cargar datos complejos.</p>'}}function g(t,o,a,s){const r=document.getElementById(t);if(!r)return;if(!o||o.length===0){r.innerHTML='<p class="text-slate-400 text-xs italic">Sin registros.</p>';return}let n='<table class="w-full text-xs text-left"><thead class="bg-slate-50 text-slate-500 uppercase"><tr>';a.forEach(i=>n+=`<th class="px-4 py-2">${i}</th>`),n+="</tr></thead><tbody>",o.forEach(i=>{n+='<tr class="border-b border-slate-50">',s.forEach(d=>n+=`<td class="px-4 py-2 text-slate-700">${i[d]||"N/A"}</td>`),n+="</tr>"}),n+="</tbody></table>",r.innerHTML=n}function b(t,o,a,s){const r=document.getElementById(t);if(!r)return;if(!o||o.length===0){r.innerHTML='<p class="text-slate-400 text-xs italic">Sin datos registrados.</p>';return}let n='<table class="w-full text-xs text-left"><thead class="bg-slate-50 text-slate-500 uppercase"><tr>';a.forEach(i=>n+=`<th class="px-4 py-2">${i}</th>`),n+="</tr></thead><tbody>",o.forEach(i=>{n+='<tr class="border-b border-slate-50">',s(i).forEach(d=>n+=`<td class="px-4 py-2">${d}</td>`),n+="</tr>"}),n+="</tbody></table>",r.innerHTML=n}function T(t,o){const a=document.getElementById("projections-table");if(!a||!t||t.length===0)return;let s='<table class="w-full text-xs text-left"><thead class="bg-slate-100 text-slate-600 uppercase"><tr><th class="px-4 py-2">Concepto</th>';t.forEach(n=>s+=`<th class="px-4 py-2 text-center">Año ${n.year}</th>`),s+="</tr></thead><tbody>",[{label:"Ingresos",key:"revenue"},{label:"EBIT",key:"ebit"},{label:"Utilidad Neta",key:"netProfit"},{label:"Flujo Caja",key:"cashFlow",color:"text-blue-600 font-bold"}].forEach(n=>{s+=`<tr class="border-b border-slate-100"><td class="px-4 py-2 font-bold bg-slate-50">${n.label}</td>`,t.forEach(i=>s+=`<td class="px-4 py-2 text-center ${n.color||""}">${o(i[n.key])}</td>`),s+="</tr>"}),s+="</tbody></table>",a.innerHTML=s}I();const y=document.getElementById("security_confirm_modal"),L=document.getElementById("security-confirm-form"),C=document.getElementById("security-password"),P=document.getElementById("security-error"),m=document.getElementById("security-submit-btn");function F(t,o){document.getElementById("security-action-type").value=t,document.getElementById("security-target-id").value=o,C.value="",P?.classList.add("hidden"),y.showModal()}L?.addEventListener("submit",async t=>{t.preventDefault();const o=document.getElementById("security-action-type").value,a=document.getElementById("security-target-id").value,s=C.value;m&&(m.innerHTML='<span class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>',m.disabled=!0);try{await w.verifyPassword(s),o==="delete-document"&&(await w.deleteDocument(parseInt(a)),I()),y.close()}catch(r){console.error(r),P?.classList.remove("hidden")}finally{m&&(m.innerHTML="<span>Confirmar y Eliminar</span>",m.disabled=!1)}});document.getElementById("security-cancel-btn")?.addEventListener("click",()=>y.close());document.getElementById("btn-close-security-modal")?.addEventListener("click",()=>y.close());
