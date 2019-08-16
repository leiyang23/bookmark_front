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
      props: (route) => ({ github_id:route.query.github_id,token:route.query.token,name: route.query.name, avatar_url: route.query.avatar_url,bio:route.query.bio}),
      children:[
        {
          path: '',
          name: 'commonNav',
          component: () => import('./views/bookmark/commonNav.vue')
        },
        {
          path: 'selfNav',
          name: 'selfNav',
          component: () => import('./views/bookmark/selfNav.vue')
        },
        {
          path: 'shareNav',
          name: 'shareNav',
          component: () => import('./views/bookmark/shareNav.vue')
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
