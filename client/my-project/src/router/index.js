import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// const Hello = r => require.ensure([], () => r(require('../components/Hello.vue')), 'Hello')
// const Log = r => require.ensure([], () => r(require('../components/Log.vue')), 'Log')

// 使用 命名 chunk，一个特殊的注释语法来提供chunk name(需要webpack > 2.4)
const Hello = () => import(/* webpackChunkName: 'hello' */ '../components/Hello.vue')
const Log = () => import(/* webpackChunkName: 'hello' */ '../components/Log.vue')

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

