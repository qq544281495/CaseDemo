export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Case',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'assets/fonts/iconfont/iconfont.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    'plugins/plugin-bus.js',
    'plugins/element-ui.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/tailwindcss'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
  ],

  axios: {
    baseUrl: 'http://beta.ptcgvip.com',
    proxy: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    }
  },

  proxy: {
    '/api': {
      target: 'http://beta.ptcgvip.com',
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    babel: {
      plugins: [
        ["component", {
          "libraryName": "element-ui",
          "styleLibraryName": "theme-chalk"
        }]
      ]
    }
  }
}
