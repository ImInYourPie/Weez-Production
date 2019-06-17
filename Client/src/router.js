import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Forum from './views/Forum.vue'
import Tags from './views/Tags.vue'
import Users from './views/Users.vue'
import Profile from './views/Profile.vue'
import AskQuestion from './views/AskQuestion.vue'
import Ranking from './views/Ranking.vue'
import QuestionPage from './views/QuestionPage.vue'
import store from "./store"


Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      beforeEnter: (to, from, next) => {
        if(store.state.token){
          next({path: '/forum' })
        } else {
          next()
        }
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      beforeEnter: (to, from, next) => {
        if(store.state.token){
          next({path: '/forum' })
        } else {
          next()
        }
      }
    },
    {
      path: '/forum/questions',
      name: 'forum',
      component: Forum
    },
    {
      path: '/forum/users',
      name: 'forum-users',
      component: Users
    },
    {
      path: '/forum/tags',
      name: 'forum-tags',
      component: Tags
    },
    {
      path: '/profile/:username',
      name: 'profile',
      component: Profile
    },
    {
      path: '/forum/ask-question',
      name: 'ask-question',
      component: AskQuestion
    },
    {
      path: '/ranking',
      name: 'ranking',
      component: Ranking
    },
    {
      path: '/forum/question/:questionId',
      name: 'question-page',
      component: QuestionPage
    },
    {
      path: "*",
      name: "forum",
      component: Forum
    }
    
  ]
})
