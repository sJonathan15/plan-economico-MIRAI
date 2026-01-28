/* empty css                                     */
import { c as createComponent, d as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_Ji_6uJhi.mjs';
import 'kleur/colors';
import { $ as $$MainLayout } from '../chunks/MainLayout_CdEvISrY.mjs';
export { renderers } from '../renderers.mjs';

const $$Register = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "Registro" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex items-center justify-center min-h-[80vh]"> <div class="card w-full max-w-md"> <h2 class="text-2xl font-bold text-center mb-2">Crear Cuenta</h2> <p class="text-center text-slate-500 mb-8">
Únete para gestionar tus emprendimientos
</p> <form id="register-form" class="space-y-4"> <div class="mb-4"> <label class="label" for="name">Nombre Completo</label> <input type="text" id="name" name="name" class="input" required placeholder="Juan Pérez"> </div> <div class="mb-4"> <label class="label" for="email">Correo Electrónico</label> <input type="email" id="email" name="email" class="input" required placeholder="correo@institucion.edu"> </div> <div class="mb-4"> <label class="label" for="password">Contraseña</label> <input type="password" id="password" name="password" class="input" required placeholder="••••••••" minlength="6"> </div> <div class="mb-6"> <label class="label" for="role">Tipo de Usuario</label> <select id="role" name="role" class="input"> <option value="STUDENT">Estudiante</option> <option value="TEACHER">Empresario</option> </select> </div> <button type="submit" class="btn btn-primary w-full shadow-lg hover:shadow-xl transition-all">
Registrarse
</button> </form> <p class="mt-6 text-center text-sm text-slate-600">
¿Ya tienes cuenta? <a href="/login" class="text-primary-600 font-medium hover:underline">Inicia Sesión</a> </p> </div> </div> ` })} `;
}, "C:/Users/jonat/Downloads/Proyecto_creatividad/frontend/src/pages/register.astro", void 0);

const $$file = "C:/Users/jonat/Downloads/Proyecto_creatividad/frontend/src/pages/register.astro";
const $$url = "/register";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Register,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
