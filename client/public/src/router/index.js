import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/chatbox/login'
import chatscreen from '@/components/chatbox/chatScreen'
import register from '@/components/chatbox/register';
import dashboard from '@/components/chatbox/dashboard';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: dashboard
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register,
      props: Router => Object.assign({}, Router.params, Router.query),
    },
    {
      path: '/chatscreen',
      name: 'chatscreen',
      // doubt: below is changed to prevent error but need to find problem with directly using component: chatscreen
      component: require('@/components/chatbox/chatScreen.vue').default,
      props: Router => Object.assign({}, Router.params, Router.query),
    }
  ]
})
