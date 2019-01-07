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
      component: chatscreen,
      props: Router => Object.assign({}, Router.params, Router.query),
    }
  ]
})
