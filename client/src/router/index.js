import Vue from 'vue'
import Router from 'vue-router'
import chatscreen from '@/components/chatbox/pages/chatscreen'
import chatWindow from '@/components/chatbox/pages/chatWindow'
import login from '@/components/chatbox/pages/login'
import register from '@/components/chatbox/pages/register';
import home from '@/components/chatbox/home';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home,
      children: [
        {
          path: 'login',
          name: 'login',
          component: login,
        },
        {
          path: 'register',
          name: 'register',
          component: register,
          // props: Router => Object.assign({}, Router.params, Router.query),
        },
        {
          path: '/chatscreen',
          name: 'chatscreen',
          component: chatscreen,
          // doubt: below is changed to prevent error but need to find problem with directly using component: chatscreen
          // component: require('@/components/chatbox/chatScreen.vue').default,
          props: Router => Object.assign({}, Router.params, Router.query),
        }
      ]
    },
    {
      path: '/chatWindow',
      name: 'chatWindow',
      component: chatWindow,
      // doubt: below is changed to prevent error but need to find problem with directly using component: chatscreen
      // component: require('@/components/chatbox/chatScreen.vue').default,
      props: Router => Object.assign({}, Router.params, Router.query),
    }
    // {
    //   path: '/login',
    //   name: 'login',
    //   component: login
    // },
    // {
    //   path: '/register',
    //   name: 'register',
    //   component: register,
    //   props: Router => Object.assign({}, Router.params, Router.query),
    // },
    // {
    //   path: '/chatscreen',
    //   name: 'chatscreen',
    //   // doubt: below is changed to prevent error but need to find problem with directly using component: chatscreen
    //   component: require('@/components/chatbox/chatScreen.vue').default,
    //   props: Router => Object.assign({}, Router.params, Router.query),
    // }
  ]
})
