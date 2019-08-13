import Vue from 'vue'
import Router from 'vue-router'
import baseLayout from './views/baseLayout.vue'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: baseLayout,
      props: (route) => ({ name: route.query.name, avatar_url: route.query.avatar_url,bio:route.query.bio}),
      children:[
        {
          path: '',
          name: 'index',
          component: () => import('./views/pages/index.vue')
        },
        {
          path: 'myCollect',
          name: 'myCollect',
          component: () => import('./views/pages/myCollect.vue')
        },

      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/login.vue')
    }
  ]
})
