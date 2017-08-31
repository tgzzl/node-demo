import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Hello = r => require.ensure([], () => r(require('../components/Hello.vue')), 'Hello')
const Log = r => require.ensure([], () => r(require('../components/Log.vue')), 'Log')


export default new Router({
  routes: [
    {
      path: '/',
      component: Hello,
      meta: {title: 'Hello'}
    },
    {
      path: '/log',
      component: Log,
      meta: {title: 'Log'}
    }
  ]
})

