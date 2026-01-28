/* empty css                                        */
import { c as createComponent, d as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_Ji_6uJhi.mjs';
import 'kleur/colors';
import { $ as $$MainLayout } from '../../chunks/MainLayout_CdEvISrY.mjs';
import { $ as $$BackButton } from '../../chunks/BackButton_qXsGqafz.mjs';
export { renderers } from '../../renderers.mjs';

const $$id = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "Detalle del Plan", "layoutMode": "app" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="w-full py-4 px-3 overflow-x-hidden"> <div id="loading" class="text-center py-20"> <div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary-500 border-t-transparent"></div> <p class="mt-2 text-slate-500">Cargando detalles...</p> </div> <div id="content" class="hidden"> <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4"> <div> ${renderComponent($$result2, "BackButton", $$BackButton, { "href": "/dashboard" })} <h1 id="project-name" class="text-4xl font-black text-slate-900 tracking-tight">
Nombre del Proyecto
</h1> <p id="project-sector" class="text-slate-400 font-medium">
Sector Económico
</p> </div> <div class="flex gap-3"> <button id="export-btn" class="btn btn-primary flex items-center bg-green-600 hover:bg-green-700 shadow-lg shadow-green-100"> <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path> </svg>
Descargar Word
</button> </div> </div> <div class="grid grid-cols-1 lg:grid-cols-4 gap-[15px]"> <!-- Main Content --> <div class="lg:col-span-3 space-y-4"> <!-- General Description --> <div class="card p-6"> <h3 class="text-xl font-bold mb-4 border-b border-slate-100 pb-2">
Resumen del Proyecto
</h3> <p id="project-description" class="text-slate-600 leading-relaxed italic"></p> </div> <!-- Strategic Analysis --> <div class="card p-6"> <h3 class="text-xl font-bold mb-4 border-b border-slate-100 pb-2 flex items-center"> <svg class="w-6 h-6 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>
Análisis Estratégico
</h3> <div class="grid grid-cols-1 md:grid-cols-2 gap-6"> <div> <h4 class="font-bold text-slate-700 text-sm uppercase mb-1">
Actividad Principal
</h4> <p id="main-activity" class="text-slate-600 text-sm"></p> </div> <div> <h4 class="font-bold text-slate-700 text-sm uppercase mb-1">
Enfoque Productivo
</h4> <p id="productive-focus" class="text-slate-600 text-sm"></p> </div> <div class="md:col-span-2"> <h4 class="font-bold text-slate-700 text-sm uppercase mb-1">
Impacto Social y Ambiental
</h4> <p id="social-impact" class="text-slate-600 text-sm"></p> </div> </div> </div> <!-- Market & Canvas --> <div class="card p-6"> <h3 class="text-xl font-bold mb-4 border-b border-slate-100 pb-2 flex items-center"> <svg class="w-6 h-6 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
Mercado y Modelo
</h3> <div class="space-y-6"> <div> <h4 class="font-bold text-slate-700 text-sm uppercase mb-1">
Propuesta de Valor
</h4> <p id="value-proposition" class="text-slate-600 text-sm"></p> </div> <div class="grid grid-cols-1 md:grid-cols-2 gap-6"> <div> <h4 class="font-bold text-slate-700 text-sm uppercase mb-1">
Diferenciación
</h4> <p id="differentiation" class="text-slate-600 text-sm"></p> </div> <div> <h4 class="font-bold text-slate-700 text-sm uppercase mb-1">
Beneficios al Cliente
</h4> <p id="customer-benefits" class="text-slate-600 text-sm"></p> </div> </div> </div> </div> <!-- Relational Tables --> <div class="grid grid-cols-1 xl:grid-cols-2 gap-8"> <!-- Team --> <div class="card p-6"> <h3 class="text-lg font-bold mb-4 border-b border-slate-100 pb-2">
Equipo de Trabajo
</h3> <div id="team-table" class="overflow-x-auto min-h-[100px]"></div> </div> <!-- Partners --> <div class="card p-6"> <h3 class="text-lg font-bold mb-4 border-b border-slate-100 pb-2">
Aliados Clave
</h3> <div id="partners-table" class="overflow-x-auto min-h-[100px]"></div> </div> </div> <!-- Supply Chain --> <div class="card p-6"> <h3 class="text-xl font-bold mb-4 border-b border-slate-100 pb-2">
Cadena de Suministro
</h3> <div id="supply-chain-content"></div> </div> <!-- Financial Detailed Tables --> <div class="space-y-8"> <div class="card p-6"> <h3 class="text-lg font-bold mb-4 border-b border-slate-100 pb-2">
Demanda Mensual
</h3> <div id="demand-table" class="overflow-x-auto"></div> </div> <div class="card p-6"> <h3 class="text-lg font-bold mb-4 border-b border-slate-100 pb-2">
Inversión en Equipos
</h3> <div id="equipment-table" class="overflow-x-auto"></div> </div> <div class="card p-6"> <h3 class="text-lg font-bold mb-4 border-b border-slate-100 pb-2">
Costos e Insumos
</h3> <div id="provisions-table" class="overflow-x-auto"></div> </div> <div class="card p-6"> <h3 class="text-lg font-bold mb-4 border-b border-slate-100 pb-2">
Plan de Financiamiento
</h3> <div id="financing-table" class="overflow-x-auto"></div> </div> </div> <!-- Projections --> <div class="card p-6 bg-slate-50 border-slate-200"> <h3 class="text-xl font-bold mb-4 border-b border-slate-200 pb-2">
Proyección Financiera (5 Años)
</h3> <div id="projections-table" class="overflow-x-auto custom-scrollbar"></div> </div> </div> <!-- Sidebar Summary --> <div class="space-y-6"> <!-- Viability Indicators --> <div class="card p-6 bg-indigo-900 text-white border-indigo-800 shadow-indigo-200/50"> <h3 class="text-lg font-bold mb-6 flex items-center"> <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
Viabilidad
</h3> <div class="space-y-4"> <div class="flex justify-between items-center text-sm"> <span class="text-indigo-300 font-bold uppercase tracking-tighter">Utilidad Neta (Año 1)</span> <span id="summary-profit" class="font-mono text-xl font-black text-green-400"></span> </div> <div class="h-px bg-indigo-800 my-2"></div> <div class="flex justify-between items-center text-sm"> <span class="text-indigo-300">VAN</span> <span id="van-result" class="font-mono text-lg font-bold"></span> </div> <div class="flex justify-between items-center text-sm"> <span class="text-indigo-300">TIR</span> <span id="tir-result" class="font-mono text-lg font-bold"></span> </div> <div class="flex justify-between items-center text-sm"> <span class="text-indigo-300">Relación B/C</span> <span id="bc-result" class="font-mono text-lg font-bold"></span> </div> <div class="flex justify-between items-center text-sm border-t border-indigo-800 pt-3"> <span class="text-indigo-300">Recuperación</span> <span id="payback-result" class="font-medium"></span> </div> </div> </div> <!-- Automatic Conclusion --> <div class="card p-6"> <h3 class="text-lg font-bold mb-3">Conclusión</h3> <p id="financial-conclusion" class="text-slate-600 text-sm leading-relaxed italic"></p> </div> <!-- Rates Setup --> <div class="card p-6 bg-slate-50 border-slate-100"> <h3 class="text-sm font-bold text-slate-500 uppercase mb-4 tracking-wider">
Tasas Aplicadas
</h3> <div class="space-y-3"> <div class="flex justify-between text-xs"> <span>Crecimiento</span> <span id="rate-growth" class="font-bold"></span> </div> <div class="flex justify-between text-xs"> <span>Inflación</span> <span id="rate-inflation" class="font-bold"></span> </div> <div class="flex justify-between text-xs"> <span>Descuento</span> <span id="rate-discount" class="font-bold"></span> </div> </div> </div> <!-- Documents --> <div class="card p-6"> <h3 class="text-lg font-bold mb-4">Descargas</h3> <ul id="documents-list" class="space-y-3"></ul> </div> </div> </div> </div> </div>  <dialog id="security_confirm_modal" class="modal"> <div class="modal-box bg-white p-0 rounded-2xl max-w-md w-full overflow-hidden"> <div class="p-6 border-b border-slate-100 flex justify-between items-center"> <h3 class="text-xl font-black text-slate-900">
Confirmar Acción
</h3> <button type="button" class="btn btn-ghost btn-sm btn-circle" id="btn-close-security-modal">✕</button> </div> <div class="p-8"> <div class="w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center mb-6"> <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 00-2 2zm10-10V7a4 4 0 00-8 0v4h8z"></path> </svg> </div> <p class="text-slate-500 font-medium mb-6 leading-relaxed">
Para continuar, por favor ingresa tu contraseña de inicio de
                    sesión. Esta acción no se puede deshacer.
</p> <form id="security-confirm-form" class="space-y-4"> <input type="hidden" id="security-action-type"> <input type="hidden" id="security-target-id"> <div> <label class="block text-sm font-bold text-slate-700 mb-2">Tu Contraseña</label> <input type="password" id="security-password" class="w-full h-14 px-4 rounded-xl border-2 border-slate-100 bg-slate-50 focus:border-indigo-600 focus:outline-none transition-all" placeholder="••••••••" required> <p id="security-error" class="mt-2 text-sm font-bold text-red-600 hidden flex items-center gap-1"> <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"> <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path> </svg>
Contraseña incorrecta
</p> </div> <div class="flex flex-col gap-3 pt-2"> <button type="submit" id="security-submit-btn" class="w-full h-14 bg-red-600 hover:bg-red-700 text-white font-black rounded-xl shadow-lg shadow-red-200 transition-all flex items-center justify-center gap-2 active:scale-95"> <span>Confirmar y Eliminar</span> </button> <button type="button" id="security-cancel-btn" class="w-full h-14 text-slate-500 font-bold hover:bg-slate-50 rounded-xl transition-all">
Cancelar
</button> </div> </form> </div> </div> </dialog> ` })} `;
}, "C:/Users/jonat/Downloads/Proyecto_creatividad/frontend/src/pages/plan/[id].astro", void 0);

const $$file = "C:/Users/jonat/Downloads/Proyecto_creatividad/frontend/src/pages/plan/[id].astro";
const $$url = "/plan/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$id,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
