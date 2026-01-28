import '@astrojs/internal-helpers/path';
import 'cookie';
import 'kleur/colors';
import 'es-module-lexer';
import 'html-escaper';
import 'clsx';
import { N as NOOP_MIDDLEWARE_HEADER, h as decodeKey } from './chunks/astro/server_4vhllsMT.mjs';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

const codeToStatusMap = {
  // Implemented from tRPC error code table
  // https://trpc.io/docs/server/error-handling#error-codes
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  TIMEOUT: 405,
  CONFLICT: 409,
  PRECONDITION_FAILED: 412,
  PAYLOAD_TOO_LARGE: 413,
  UNSUPPORTED_MEDIA_TYPE: 415,
  UNPROCESSABLE_CONTENT: 422,
  TOO_MANY_REQUESTS: 429,
  CLIENT_CLOSED_REQUEST: 499,
  INTERNAL_SERVER_ERROR: 500
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///C:/Users/jonat/Downloads/Proyecto_creatividad/frontend/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.os4Yt8Au.js"}],"styles":[{"type":"external","src":"/_astro/dashboard.BcfxfTUL.css"},{"type":"external","src":"/_astro/dashboard.Bt_HUPgF.css"},{"type":"inline","content":":root{--primary-50: #f0f9ff;--primary-100: #e0f2fe;--primary-200: #bae6fd;--primary-300: #7dd3fc;--primary-400: #38bdf8;--primary-500: #0ea5e9;--primary-600: #0284c7;--primary-700: #0369a1;--primary-800: #075985;--primary-900: #0c4a6e;--slate-50: #f8fafc;--slate-100: #f1f5f9;--slate-800: #1e293b;--slate-900: #0f172a}\n"}],"routeData":{"route":"/dashboard","isIndex":false,"type":"page","pattern":"^\\/dashboard\\/?$","segments":[[{"content":"dashboard","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/dashboard.astro","pathname":"/dashboard","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.Qv3mm9Uz.js"}],"styles":[{"type":"external","src":"/_astro/dashboard.BcfxfTUL.css"},{"type":"external","src":"/_astro/dashboard.Bt_HUPgF.css"},{"type":"inline","content":":root{--primary-50: #f0f9ff;--primary-100: #e0f2fe;--primary-200: #bae6fd;--primary-300: #7dd3fc;--primary-400: #38bdf8;--primary-500: #0ea5e9;--primary-600: #0284c7;--primary-700: #0369a1;--primary-800: #075985;--primary-900: #0c4a6e;--slate-50: #f8fafc;--slate-100: #f1f5f9;--slate-800: #1e293b;--slate-900: #0f172a}\n"}],"routeData":{"route":"/entrepreneurship/create","isIndex":false,"type":"page","pattern":"^\\/entrepreneurship\\/create\\/?$","segments":[[{"content":"entrepreneurship","dynamic":false,"spread":false}],[{"content":"create","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/entrepreneurship/create.astro","pathname":"/entrepreneurship/create","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.CJFAsuIv.js"}],"styles":[{"type":"external","src":"/_astro/dashboard.BcfxfTUL.css"},{"type":"external","src":"/_astro/dashboard.Bt_HUPgF.css"},{"type":"inline","content":":root{--primary-50: #f0f9ff;--primary-100: #e0f2fe;--primary-200: #bae6fd;--primary-300: #7dd3fc;--primary-400: #38bdf8;--primary-500: #0ea5e9;--primary-600: #0284c7;--primary-700: #0369a1;--primary-800: #075985;--primary-900: #0c4a6e;--slate-50: #f8fafc;--slate-100: #f1f5f9;--slate-800: #1e293b;--slate-900: #0f172a}\n"}],"routeData":{"route":"/entrepreneurship/edit/[id]","isIndex":false,"type":"page","pattern":"^\\/entrepreneurship\\/edit\\/([^/]+?)\\/?$","segments":[[{"content":"entrepreneurship","dynamic":false,"spread":false}],[{"content":"edit","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"src/pages/entrepreneurship/edit/[id].astro","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.Y8f994Pb.js"}],"styles":[{"type":"external","src":"/_astro/dashboard.BcfxfTUL.css"},{"type":"external","src":"/_astro/dashboard.Bt_HUPgF.css"},{"type":"inline","content":":root{--primary-50: #f0f9ff;--primary-100: #e0f2fe;--primary-200: #bae6fd;--primary-300: #7dd3fc;--primary-400: #38bdf8;--primary-500: #0ea5e9;--primary-600: #0284c7;--primary-700: #0369a1;--primary-800: #075985;--primary-900: #0c4a6e;--slate-50: #f8fafc;--slate-100: #f1f5f9;--slate-800: #1e293b;--slate-900: #0f172a}\n"}],"routeData":{"route":"/entrepreneurship","isIndex":true,"type":"page","pattern":"^\\/entrepreneurship\\/?$","segments":[[{"content":"entrepreneurship","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/entrepreneurship/index.astro","pathname":"/entrepreneurship","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.DabYzoR0.js"}],"styles":[{"type":"external","src":"/_astro/dashboard.BcfxfTUL.css"},{"type":"external","src":"/_astro/dashboard.Bt_HUPgF.css"},{"type":"inline","content":":root{--primary-50: #f0f9ff;--primary-100: #e0f2fe;--primary-200: #bae6fd;--primary-300: #7dd3fc;--primary-400: #38bdf8;--primary-500: #0ea5e9;--primary-600: #0284c7;--primary-700: #0369a1;--primary-800: #075985;--primary-900: #0c4a6e}.container-custom{margin-left:auto;margin-right:auto;max-width:80rem;padding-left:1rem;padding-right:1rem}@media (min-width: 640px){.container-custom{padding-left:1.5rem;padding-right:1.5rem}}@media (min-width: 1024px){.container-custom{padding-left:2rem;padding-right:2rem}}\n.status-modal[data-astro-cid-quopx4xp]{background:transparent;border:none;padding:0;max-width:none;max-height:none;width:100%;height:100%;align-items:center;justify-content:center}.status-modal[data-astro-cid-quopx4xp][open]{display:flex}.status-modal[data-astro-cid-quopx4xp].success #icon-container[data-astro-cid-quopx4xp]{--tw-bg-opacity: 1;background-color:rgb(236 253 245 / var(--tw-bg-opacity, 1));--tw-text-opacity: 1;color:rgb(5 150 105 / var(--tw-text-opacity, 1))}.status-modal[data-astro-cid-quopx4xp].error #icon-container[data-astro-cid-quopx4xp]{--tw-bg-opacity: 1;background-color:rgb(254 242 242 / var(--tw-bg-opacity, 1));--tw-text-opacity: 1;color:rgb(220 38 38 / var(--tw-text-opacity, 1))}.status-modal[data-astro-cid-quopx4xp].warning #icon-container[data-astro-cid-quopx4xp]{--tw-bg-opacity: 1;background-color:rgb(255 251 235 / var(--tw-bg-opacity, 1));--tw-text-opacity: 1;color:rgb(217 119 6 / var(--tw-text-opacity, 1))}body:has(dialog[open].status-modal){overflow:hidden}\n"}],"routeData":{"route":"/login","isIndex":false,"type":"page","pattern":"^\\/login\\/?$","segments":[[{"content":"login","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/login.astro","pathname":"/login","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.Qv3mm9Uz.js"}],"styles":[{"type":"external","src":"/_astro/dashboard.BcfxfTUL.css"},{"type":"external","src":"/_astro/dashboard.Bt_HUPgF.css"},{"type":"inline","content":":root{--primary-50: #f0f9ff;--primary-100: #e0f2fe;--primary-200: #bae6fd;--primary-300: #7dd3fc;--primary-400: #38bdf8;--primary-500: #0ea5e9;--primary-600: #0284c7;--primary-700: #0369a1;--primary-800: #075985;--primary-900: #0c4a6e;--slate-50: #f8fafc;--slate-100: #f1f5f9;--slate-800: #1e293b;--slate-900: #0f172a}\n"}],"routeData":{"route":"/plan/create","isIndex":false,"type":"page","pattern":"^\\/plan\\/create\\/?$","segments":[[{"content":"plan","dynamic":false,"spread":false}],[{"content":"create","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/plan/create.astro","pathname":"/plan/create","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.vIGn57dD.js"}],"styles":[{"type":"external","src":"/_astro/dashboard.BcfxfTUL.css"},{"type":"external","src":"/_astro/dashboard.Bt_HUPgF.css"},{"type":"inline","content":":root{--primary-50: #f0f9ff;--primary-100: #e0f2fe;--primary-200: #bae6fd;--primary-300: #7dd3fc;--primary-400: #38bdf8;--primary-500: #0ea5e9;--primary-600: #0284c7;--primary-700: #0369a1;--primary-800: #075985;--primary-900: #0c4a6e}.container-custom{margin-left:auto;margin-right:auto;max-width:80rem;padding-left:1rem;padding-right:1rem}@media (min-width: 640px){.container-custom{padding-left:1.5rem;padding-right:1.5rem}}@media (min-width: 1024px){.container-custom{padding-left:2rem;padding-right:2rem}}\n"}],"routeData":{"route":"/plan/[id]","isIndex":false,"type":"page","pattern":"^\\/plan\\/([^/]+?)\\/?$","segments":[[{"content":"plan","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"src/pages/plan/[id].astro","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.BQ9UzhCX.js"}],"styles":[{"type":"external","src":"/_astro/dashboard.BcfxfTUL.css"},{"type":"external","src":"/_astro/dashboard.Bt_HUPgF.css"},{"type":"inline","content":":root{--primary-50: #f0f9ff;--primary-100: #e0f2fe;--primary-200: #bae6fd;--primary-300: #7dd3fc;--primary-400: #38bdf8;--primary-500: #0ea5e9;--primary-600: #0284c7;--primary-700: #0369a1;--primary-800: #075985;--primary-900: #0c4a6e;--slate-50: #f8fafc;--slate-100: #f1f5f9;--slate-800: #1e293b;--slate-900: #0f172a}\n"}],"routeData":{"route":"/plan","isIndex":true,"type":"page","pattern":"^\\/plan\\/?$","segments":[[{"content":"plan","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/plan/index.astro","pathname":"/plan","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.CCbPXMyB.js"}],"styles":[{"type":"external","src":"/_astro/dashboard.BcfxfTUL.css"},{"type":"external","src":"/_astro/dashboard.Bt_HUPgF.css"},{"type":"inline","content":":root{--primary-50: #f0f9ff;--primary-100: #e0f2fe;--primary-200: #bae6fd;--primary-300: #7dd3fc;--primary-400: #38bdf8;--primary-500: #0ea5e9;--primary-600: #0284c7;--primary-700: #0369a1;--primary-800: #075985;--primary-900: #0c4a6e;--slate-50: #f8fafc;--slate-100: #f1f5f9;--slate-800: #1e293b;--slate-900: #0f172a}\n"}],"routeData":{"route":"/profile","isIndex":false,"type":"page","pattern":"^\\/profile\\/?$","segments":[[{"content":"profile","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/profile.astro","pathname":"/profile","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.BXIpL4v9.js"}],"styles":[{"type":"external","src":"/_astro/dashboard.BcfxfTUL.css"},{"type":"external","src":"/_astro/dashboard.Bt_HUPgF.css"},{"type":"inline","content":":root{--primary-50: #f0f9ff;--primary-100: #e0f2fe;--primary-200: #bae6fd;--primary-300: #7dd3fc;--primary-400: #38bdf8;--primary-500: #0ea5e9;--primary-600: #0284c7;--primary-700: #0369a1;--primary-800: #075985;--primary-900: #0c4a6e}.container-custom{margin-left:auto;margin-right:auto;max-width:80rem;padding-left:1rem;padding-right:1rem}@media (min-width: 640px){.container-custom{padding-left:1.5rem;padding-right:1.5rem}}@media (min-width: 1024px){.container-custom{padding-left:2rem;padding-right:2rem}}\n.status-modal[data-astro-cid-quopx4xp]{background:transparent;border:none;padding:0;max-width:none;max-height:none;width:100%;height:100%;align-items:center;justify-content:center}.status-modal[data-astro-cid-quopx4xp][open]{display:flex}.status-modal[data-astro-cid-quopx4xp].success #icon-container[data-astro-cid-quopx4xp]{--tw-bg-opacity: 1;background-color:rgb(236 253 245 / var(--tw-bg-opacity, 1));--tw-text-opacity: 1;color:rgb(5 150 105 / var(--tw-text-opacity, 1))}.status-modal[data-astro-cid-quopx4xp].error #icon-container[data-astro-cid-quopx4xp]{--tw-bg-opacity: 1;background-color:rgb(254 242 242 / var(--tw-bg-opacity, 1));--tw-text-opacity: 1;color:rgb(220 38 38 / var(--tw-text-opacity, 1))}.status-modal[data-astro-cid-quopx4xp].warning #icon-container[data-astro-cid-quopx4xp]{--tw-bg-opacity: 1;background-color:rgb(255 251 235 / var(--tw-bg-opacity, 1));--tw-text-opacity: 1;color:rgb(217 119 6 / var(--tw-text-opacity, 1))}body:has(dialog[open].status-modal){overflow:hidden}\n"}],"routeData":{"route":"/register","isIndex":false,"type":"page","pattern":"^\\/register\\/?$","segments":[[{"content":"register","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/register.astro","pathname":"/register","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.BljWyMoO.js"}],"styles":[{"type":"external","src":"/_astro/dashboard.BcfxfTUL.css"},{"type":"external","src":"/_astro/dashboard.Bt_HUPgF.css"},{"type":"inline","content":":root{--primary-50: #f0f9ff;--primary-100: #e0f2fe;--primary-200: #bae6fd;--primary-300: #7dd3fc;--primary-400: #38bdf8;--primary-500: #0ea5e9;--primary-600: #0284c7;--primary-700: #0369a1;--primary-800: #075985;--primary-900: #0c4a6e}.container-custom{margin-left:auto;margin-right:auto;max-width:80rem;padding-left:1rem;padding-right:1rem}@media (min-width: 640px){.container-custom{padding-left:1.5rem;padding-right:1.5rem}}@media (min-width: 1024px){.container-custom{padding-left:2rem;padding-right:2rem}}\n.animate-reveal[data-astro-cid-oiuorpsm]{animation:reveal .4s cubic-bezier(.22,1,.36,1)}@keyframes reveal{0%{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}\n"}],"routeData":{"route":"/reset-password","isIndex":false,"type":"page","pattern":"^\\/reset-password\\/?$","segments":[[{"content":"reset-password","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/reset-password.astro","pathname":"/reset-password","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.Bug5-Pr8.js"}],"styles":[{"type":"external","src":"/_astro/dashboard.BcfxfTUL.css"},{"type":"external","src":"/_astro/dashboard.Bt_HUPgF.css"},{"type":"inline","content":":root{--primary-50: #f0f9ff;--primary-100: #e0f2fe;--primary-200: #bae6fd;--primary-300: #7dd3fc;--primary-400: #38bdf8;--primary-500: #0ea5e9;--primary-600: #0284c7;--primary-700: #0369a1;--primary-800: #075985;--primary-900: #0c4a6e}.container-custom{margin-left:auto;margin-right:auto;max-width:80rem;padding-left:1rem;padding-right:1rem}@media (min-width: 640px){.container-custom{padding-left:1.5rem;padding-right:1.5rem}}@media (min-width: 1024px){.container-custom{padding-left:2rem;padding-right:2rem}}\n"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Users/jonat/Downloads/Proyecto_creatividad/frontend/src/pages/dashboard.astro",{"propagation":"none","containsHead":true}],["C:/Users/jonat/Downloads/Proyecto_creatividad/frontend/src/pages/entrepreneurship/create.astro",{"propagation":"none","containsHead":true}],["C:/Users/jonat/Downloads/Proyecto_creatividad/frontend/src/pages/entrepreneurship/edit/[id].astro",{"propagation":"none","containsHead":true}],["C:/Users/jonat/Downloads/Proyecto_creatividad/frontend/src/pages/entrepreneurship/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/jonat/Downloads/Proyecto_creatividad/frontend/src/pages/plan/create.astro",{"propagation":"none","containsHead":true}],["C:/Users/jonat/Downloads/Proyecto_creatividad/frontend/src/pages/plan/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/jonat/Downloads/Proyecto_creatividad/frontend/src/pages/profile.astro",{"propagation":"none","containsHead":true}],["C:/Users/jonat/Downloads/Proyecto_creatividad/frontend/src/pages/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/jonat/Downloads/Proyecto_creatividad/frontend/src/pages/login.astro",{"propagation":"none","containsHead":true}],["C:/Users/jonat/Downloads/Proyecto_creatividad/frontend/src/pages/plan/[id].astro",{"propagation":"none","containsHead":true}],["C:/Users/jonat/Downloads/Proyecto_creatividad/frontend/src/pages/register.astro",{"propagation":"none","containsHead":true}],["C:/Users/jonat/Downloads/Proyecto_creatividad/frontend/src/pages/reset-password.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(o,t)=>{let i=async()=>{await(await o())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/dashboard@_@astro":"pages/dashboard.astro.mjs","\u0000@astro-page:src/pages/entrepreneurship/create@_@astro":"pages/entrepreneurship/create.astro.mjs","\u0000@astro-page:src/pages/entrepreneurship/edit/[id]@_@astro":"pages/entrepreneurship/edit/_id_.astro.mjs","\u0000@astro-page:src/pages/entrepreneurship/index@_@astro":"pages/entrepreneurship.astro.mjs","\u0000@astro-page:src/pages/login@_@astro":"pages/login.astro.mjs","\u0000@astro-page:src/pages/plan/create@_@astro":"pages/plan/create.astro.mjs","\u0000@astro-page:src/pages/plan/[id]@_@astro":"pages/plan/_id_.astro.mjs","\u0000@astro-page:src/pages/plan/index@_@astro":"pages/plan.astro.mjs","\u0000@astro-page:src/pages/profile@_@astro":"pages/profile.astro.mjs","\u0000@astro-page:src/pages/register@_@astro":"pages/register.astro.mjs","\u0000@astro-page:src/pages/reset-password@_@astro":"pages/reset-password.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_DAqRsgyA.mjs","C:/Users/jonat/Downloads/Proyecto_creatividad/frontend/src/components/EntrepreneurshipModalManager":"_astro/EntrepreneurshipModalManager.BhON4mv5.js","/astro/hoisted.js?q=0":"_astro/hoisted.os4Yt8Au.js","/astro/hoisted.js?q=1":"_astro/hoisted.CJFAsuIv.js","/astro/hoisted.js?q=2":"_astro/hoisted.Y8f994Pb.js","/astro/hoisted.js?q=3":"_astro/hoisted.DabYzoR0.js","/astro/hoisted.js?q=4":"_astro/hoisted.vIGn57dD.js","/astro/hoisted.js?q=5":"_astro/hoisted.BQ9UzhCX.js","/astro/hoisted.js?q=6":"_astro/hoisted.CCbPXMyB.js","/astro/hoisted.js?q=7":"_astro/hoisted.BXIpL4v9.js","/astro/hoisted.js?q=8":"_astro/hoisted.BljWyMoO.js","/astro/hoisted.js?q=9":"_astro/hoisted.Bug5-Pr8.js","C:/Users/jonat/Downloads/Proyecto_creatividad/frontend/src/lib/api.ts":"_astro/api.CPfjwQVw.js","@astrojs/react/client.js":"_astro/client.kuiSb6pK.js","C:/Users/jonat/Downloads/Proyecto_creatividad/frontend/src/components/PlanCreationContainer":"_astro/PlanCreationContainer.DbNZn9On.js","C:/Users/jonat/Downloads/Proyecto_creatividad/frontend/src/components/EntrepreneurshipWizard":"_astro/EntrepreneurshipWizard.BMiBtE68.js","/astro/hoisted.js?q=10":"_astro/hoisted.Qv3mm9Uz.js","C:/Users/jonat/Downloads/Proyecto_creatividad/frontend/src/components/InputField":"_astro/InputField.C33CxFX_.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/dashboard.BcfxfTUL.css","/_astro/dashboard.Bt_HUPgF.css","/images/document_export_mockup.png","/images/hero_entrepreneur.png","/images/Logo_MIRAI_blanco_sinf.png","/images/Logo_MIRAI_color_sinf.png","/images/planning_team.png","/images/smart_dashboard_preview.png","/images/student_collaboration.png","/images/young_entrepreneur_success.png","/_astro/api.CPfjwQVw.js","/_astro/client.ecN81UPN.js","/_astro/client.kuiSb6pK.js","/_astro/EntrepreneurshipModalManager.BhON4mv5.js","/_astro/EntrepreneurshipWizard.BMiBtE68.js","/_astro/hoisted.BljWyMoO.js","/_astro/hoisted.BQ9UzhCX.js","/_astro/hoisted.Bug5-Pr8.js","/_astro/hoisted.BXIpL4v9.js","/_astro/hoisted.CCbPXMyB.js","/_astro/hoisted.CJFAsuIv.js","/_astro/hoisted.DabYzoR0.js","/_astro/hoisted.os4Yt8Au.js","/_astro/hoisted.Qv3mm9Uz.js","/_astro/hoisted.vIGn57dD.js","/_astro/hoisted.Y8f994Pb.js","/_astro/index.B52nOzfP.js","/_astro/InputField.BmvgOzA6.js","/_astro/InputField.C33CxFX_.js","/_astro/Navbar.astro_astro_type_script_index_0_lang.etmQtTSB.js","/_astro/PlanCreationContainer.DbNZn9On.js","/_astro/Sidebar.astro_astro_type_script_index_0_lang.DZqaJy4g.js"],"buildFormat":"directory","checkOrigin":false,"serverIslandNameMap":[],"key":"kWqOxxaQrDqOTgSl2UibUDQ72FPW4Jkz+Ihr0THIs9Q=","experimentalEnvGetSecretEnabled":false});

export { manifest };
