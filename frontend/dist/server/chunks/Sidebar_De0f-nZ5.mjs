import { c as createComponent, a as createAstro, m as maybeRenderHead, b as addAttribute, r as renderTemplate } from './astro/server_Ji_6uJhi.mjs';
import 'kleur/colors';
import 'clsx';

const $$Astro = createAstro();
const $$Sidebar = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Sidebar;
  const pathname = new URL(Astro2.request.url).pathname;
  const links = [
    {
      href: "/dashboard",
      label: "Panel General",
      icon: "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
    },
    {
      href: "/entrepreneurship",
      label: "Mis Emprendimientos",
      icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
    },
    {
      href: "/plan",
      label: "Mis Planes",
      icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    }
  ];
  return renderTemplate`${maybeRenderHead()}<aside class="bg-slate-900 text-slate-400 z-50 flex flex-col transition-all duration-300 h-screen border-r border-slate-800" id="sidebar"> <!-- Brand & Toggle (Improved) --> <div class="h-20 flex items-center px-6 relative flex-shrink-0"> <a href="/dashboard" class="flex items-center space-x-3 overflow-hidden whitespace-nowrap"> <div class="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20"> <span class="text-white font-black text-xl">M</span> </div> <span class="text-xl font-black text-white tracking-widest sidebar-text">MIRAI</span> </a> <!-- Toggle Button (Smaller & Discrete) --> <button id="sidebar-toggle" class="absolute -right-3 top-7 w-6 h-6 bg-slate-800 border border-slate-700 rounded-full flex items-center justify-center text-slate-400 hover:text-white transition-all shadow-md z-50 hover:scale-110"> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"></path> </svg> </button> </div> <!-- Navigation --> <nav class="flex-1 py-4 space-y-1"> ${links.map((link) => {
    const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
    return renderTemplate`<a${addAttribute(link.href, "href")}${addAttribute([
      "flex items-center px-6 py-3 transition-all duration-200 whitespace-nowrap",
      isActive ? "bg-slate-800 text-white border-r-4 border-white" : "hover:bg-slate-800 hover:text-white"
    ], "class:list")}${addAttribute(link.label, "title")}> <svg class="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"${addAttribute(link.icon, "d")}></path> </svg> <span class="sidebar-text">${link.label}</span> </a>`;
  })} </nav> <!-- User Footer --> <div class="p-4 border-t border-slate-800"> <div class="relative group"> <button id="user-menu-btn" class="w-full flex items-center p-2 rounded-lg hover:bg-slate-800 transition-colors text-left"> <div class="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-white font-bold flex-shrink-0 overflow-hidden" id="user-avatar-container"> <span id="user-initial">U</span> <img id="user-sidebar-img" src="" class="w-full h-full object-cover hidden" alt="Profile"> </div> <div class="ml-3 sidebar-text overflow-hidden"> <p class="text-sm font-medium text-white truncate" id="user-name">
Usuario
</p> <p class="text-xs text-slate-500 truncate">Configuración</p> </div> </button> <!-- Dropdown --> <div id="user-dropdown" class="absolute bottom-full left-0 w-48 mb-2 bg-slate-800 rounded-lg shadow-xl border border-slate-700 hidden group-hover:block transition-all z-50"> <a href="/profile" class="block px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-white rounded-t-lg">
Mi Perfil
</a> <button id="logout-btn-sidebar" class="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-slate-700 hover:text-red-300 rounded-b-lg">
Cerrar Sesión
</button> </div> </div> </div> </aside> `;
}, "C:/Users/jonat/Downloads/Proyecto_creatividad/frontend/src/components/Sidebar.astro", void 0);

export { $$Sidebar as $ };
