export default defineNuxtConfig({
  // Having SSR allows us to use `nuxt generate`, turn it off if you don't care
  ssr: true,
  devtools: { enabled: true },

  hooks: {
    close: (nuxt) => {
      // FIXME: workaround for https://github.com/nuxt/cli/issues/193
      if (!nuxt.options._prepare) {
        setTimeout(() => {
          process.exit(0);
        }, 500);
      }
    },
  },

  app: {
    head: {
      title: "Nuxt + VueFire Spark Plan Example",
      link: [
        {
          href: "https://cdn.jsdelivr.net/npm/water.css@2/out/water.css",
          rel: "stylesheet",
        },
        {
          rel: "icon",
          type: "image/svg+xml",
          href: "/vuefire.svg",
        },
      ],
    },
  },

  css: ["~/assets/style.css"],

  nitro: {
    // NOTE: we don't want to use the firebase preset because this is a static website and the firebase preset is for SSR
    preset: "node", // the default
  },

  modules: ["nuxt-vuefire", "@vueuse/nuxt"],

  vuefire: {
    emulators: {
      // uncomment this line to run the application in production mode without emulators during dev
      // enabled: false,
      auth: {
        options: {
          disableWarnings: true,
        },
      },
    },
    auth: {
      enabled: true,
      sessionCookie: false,
    },

    appCheck: {
      provider: "ReCaptchaV3",
      // site key, NOT secret key
      key: "6Ldmc3EnAAAAABDuQi-PGLBObXMOsVlXOntAX6WQ",
      isTokenAutoRefreshEnabled: true,
    },

    config: {
      apiKey: "AIzaSyDzvWHVVIYY5IjjJT-GZGT0u906qqDAQ4M",
      authDomain: "nuxt-ea32e.firebaseapp.com",
      projectId: "nuxt-ea32e",
      storageBucket: "nuxt-ea32e.appspot.com",
      messagingSenderId: "767147140807",
      appId: "1:767147140807:web:112b3f335c21392e1600e2",
    },
  },

  experimental: {
    payloadExtraction: false,
  },

  // since we are only using SSR for generation, we can only use a few of these rules effectively
  // https://nuxt.com/docs/guide/concepts/rendering#hybrid-rendering
  routeRules: {
    "/": { isr: true },
    // Make some pages client only (since we have an SPA)
    // useful for authenticated pages that require the user to be logged in to be
    // displayed
    "/admin": { ssr: false },
    "/users": { ssr: false },
    "/posts/new": { ssr: false },
    "/emoji-panel": { ssr: false },
    "/login": { ssr: false },
  },
});
