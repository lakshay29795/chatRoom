import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/chatbox/login'
import chatscreen from '@/components/chatbox/chatScreen'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
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
