/* empty css                                     */
import { c as createComponent, d as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_Ji_6uJhi.mjs';
import 'kleur/colors';
import { $ as $$MainLayout } from '../chunks/MainLayout_CdEvISrY.mjs';
export { renderers } from '../renderers.mjs';

const $$Login = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "Iniciar Sesi\xF3n" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex items-center justify-center min-h-[80vh]"> <div class="card w-full max-w-md"> <h2 class="text-2xl font-bold text-center mb-2">
Bienvenido de nuevo
</h2> <p class="text-center text-slate-500 mb-8">
Ingresa a tu cuenta para continuar
</p> <form id="login-form" class="space-y-4"> <div class="mb-4"> <label class="label" for="email">Correo Electrónico</label> <input type="email" id="email" name="email" class="input" required placeholder="correo@institucion.edu"> </div> <div class="mb-6"> <label class="label" for="password">Contraseña</label> <input type="password" id="password" name="password" class="input" required placeholder="••••••••"> </div> <button type="submit" class="btn btn-primary w-full shadow-lg hover:shadow-xl transition-all">
Iniciar Sesión
</button> </form> <p class="mt-6 text-center text-sm text-slate-600">
¿No tienes cuenta? <a href="/register" class="text-primary-600 font-medium hover:underline">Regístrate</a> </p> </div> </div> ` })} `;
}, "C:/Users/jonat/Downloads/Proyecto_creatividad/frontend/src/pages/login.astro", void 0);

const $$file = "C:/Users/jonat/Downloads/Proyecto_creatividad/frontend/src/pages/login.astro";
const $$url = "/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Login,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
