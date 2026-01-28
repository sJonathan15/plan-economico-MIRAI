import { renderers } from './renderers.mjs';
import { s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_VFUEmVsm.mjs';
import { manifest } from './manifest_DAqRsgyA.mjs';
import { createExports } from '@astrojs/vercel/entrypoint';

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/dashboard.astro.mjs');
const _page2 = () => import('./pages/entrepreneurship/create.astro.mjs');
const _page3 = () => import('./pages/entrepreneurship/edit/_id_.astro.mjs');
const _page4 = () => import('./pages/entrepreneurship.astro.mjs');
const _page5 = () => import('./pages/login.astro.mjs');
const _page6 = () => import('./pages/plan/create.astro.mjs');
const _page7 = () => import('./pages/plan/_id_.astro.mjs');
const _page8 = () => import('./pages/plan.astro.mjs');
const _page9 = () => import('./pages/profile.astro.mjs');
const _page10 = () => import('./pages/register.astro.mjs');
const _page11 = () => import('./pages/reset-password.astro.mjs');
const _page12 = () => import('./pages/index.astro.mjs');

const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/dashboard.astro", _page1],
    ["src/pages/entrepreneurship/create.astro", _page2],
    ["src/pages/entrepreneurship/edit/[id].astro", _page3],
    ["src/pages/entrepreneurship/index.astro", _page4],
    ["src/pages/login.astro", _page5],
    ["src/pages/plan/create.astro", _page6],
    ["src/pages/plan/[id].astro", _page7],
    ["src/pages/plan/index.astro", _page8],
    ["src/pages/profile.astro", _page9],
    ["src/pages/register.astro", _page10],
    ["src/pages/reset-password.astro", _page11],
    ["src/pages/index.astro", _page12]
]);
const serverIslandMap = new Map();
const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
