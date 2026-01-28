/* empty css                                     */
import { c as createComponent, m as maybeRenderHead, r as renderTemplate, d as renderComponent } from '../chunks/astro/server_Ji_6uJhi.mjs';
import 'kleur/colors';
import { $ as $$MainLayout } from '../chunks/MainLayout_CdEvISrY.mjs';
import 'clsx';
export { renderers } from '../renderers.mjs';

const $$Navbar = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<nav class="bg-white/80 backdrop-blur-lg border-b border-slate-200 sticky top-0 z-50 shadow-sm"> <div class="container-custom"> <div class="flex items-center justify-between h-16"> <!-- Logo --> <a href="/" class="flex items-center space-x-2"> <svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path> </svg> <span class="text-xl font-bold gradient-text">KEIKAKU</span> </a> <!-- Navigation Links --> <div class="hidden md:flex items-center space-x-6"> <!-- Links removed for public layout --> <a href="/" class="text-slate-600 hover:text-primary-600 transition-colors">Inicio</a> </div> <!-- Auth Buttons --> <div class="flex items-center space-x-4"> <div id="auth-buttons"> <a href="/login" class="btn btn-secondary text-sm">Iniciar Sesión</a> <a href="/register" class="btn btn-primary text-sm ml-2">Registrarse</a> </div> <div id="user-menu" class="hidden"> <button id="logout-btn" class="btn btn-secondary text-sm">Cerrar Sesión</button> </div> </div> </div> </div> </nav> `;
}, "C:/Users/jonat/Downloads/Proyecto_creatividad/frontend/src/components/Navbar.astro", void 0);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "Inicio" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Navbar", $$Navbar, {})} ${maybeRenderHead()}<div class="container-custom"> <!-- Hero Section --> <section class="py-20 text-center"> <h1 class="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight"> <span class="block text-slate-900">Genera tu Plan con KEIKAKU</span> <span class="gradient-text">de forma automática</span> </h1> <p class="text-xl text-slate-600 max-w-2xl mx-auto mb-10">
Plataforma inteligente para emprendedores. Ingresa tus datos,
                calcula tus costos y obtén tu documento formal en minutos.
</p> <div class="flex justify-center gap-4"> <a href="/register" class="btn btn-primary text-lg px-8 py-4 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all">
Comenzar Ahora
</a> <a href="/login" class="btn btn-secondary text-lg px-8 py-4">
Ya tengo cuenta
</a> </div> </section> <!-- Features Grid --> <section class="py-16 grid grid-cols-1 md:grid-cols-3 gap-8"> <div class="card p-8"> <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 text-blue-600"> <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg> </div> <h3 class="text-xl font-bold mb-2">Gestión de Proyectos</h3> <p class="text-slate-600">
Organiza todos tus emprendimientos en un solo lugar. Mantén
                    el historial de tus versiones.
</p> </div> <div class="card p-8"> <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 text-purple-600"> <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 36v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg> </div> <h3 class="text-xl font-bold mb-2">Cálculos Automáticos</h3> <p class="text-slate-600">
Olvídate de las hojas de cálculo complejas. El sistema
                    calcula ROI, márgenes y proyecciones por ti.
</p> </div> <div class="card p-8"> <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 text-green-600"> <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg> </div> <h3 class="text-xl font-bold mb-2">Exportación a Word</h3> <p class="text-slate-600">
Genera documentos profesionales con el formato institucional
                    listo para presentar.
</p> </div> </section> </div> ` })}`;
}, "C:/Users/jonat/Downloads/Proyecto_creatividad/frontend/src/pages/index.astro", void 0);

const $$file = "C:/Users/jonat/Downloads/Proyecto_creatividad/frontend/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
