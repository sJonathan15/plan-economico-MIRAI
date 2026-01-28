import { c as createComponent, m as maybeRenderHead, r as renderTemplate } from './astro/server_4vhllsMT.mjs';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';

const $$Navbar = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<nav id="main-navbar" class="fixed top-0 left-0 w-full z-[100] transition-all duration-300 border-b border-transparent"> <div class="container-custom"> <div class="flex items-center justify-between h-20 transition-all duration-300" id="navbar-height"> <!-- Logo --> <a href="/" class="flex items-center space-x-3 group"> <img src="/images/Logo_MIRAI_color_sinf.png" alt="MIRAI Logo" class="h-10 w-auto transform group-hover:scale-105 transition-transform"> <span class="text-2xl font-black tracking-tighter text-slate-900">MIRAI</span> </a> <!-- Navigation Links --> <div class="hidden md:flex items-center space-x-8"> <a href="/" class="text-sm font-bold text-slate-600 hover:text-indigo-600 nav-link" id="nav-home">Inicio</a> </div> <!-- Auth Buttons --> <div class="flex items-center space-x-4"> <div id="auth-buttons" class="flex items-center gap-3"> <a href="/login" class="text-sm font-bold text-slate-600 hover:text-indigo-600 px-4 py-2 transition-all nav-link" id="nav-login">Iniciar Sesión</a> <a href="/register" class="btn btn-primary px-6 py-3 text-sm shadow-xl shadow-indigo-500/20 hover:-translate-y-0.5">Registrarse</a> </div> <div id="user-menu" class="hidden"> <button id="logout-btn" class="btn btn-secondary text-sm">Cerrar Sesión</button> </div> </div> </div> </div> </nav> `;
}, "C:/Users/jonat/Downloads/Proyecto_creatividad/frontend/src/components/Navbar.astro", void 0);

export { $$Navbar as $ };
