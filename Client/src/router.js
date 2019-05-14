import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Register from './views/Register.vue'
import Forum from './views/Forum.vue'
import Profile from './views/Profile.vue'
import AskQuestion from './views/AskQuestion.vue'
import Ranking from './views/Ranking.vue'
import QuestionPage from './views/QuestionPage.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/forum',
      name: 'forum',
      component: Forum
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/ask-question',
      name: 'ask-question',
      component: AskQuestion
    },
    {
      path: '/ranking',
      name: 'ranking',
      component: Ranking
    },
    {
      path: '/question-page',
      name: 'question-page',
      component: QuestionPage
    }
  ]
})
