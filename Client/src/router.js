import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Forum from './views/Forum.vue'
import Profile from './views/Profile.vue'
import AskQuestion from './views/AskQuestion.vue'
import Ranking from './views/Ranking.vue'
import QuestionPage from './views/QuestionPage.vue'


Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/forum',
      name: 'forum',
      component: Forum
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
    }
  ]
})
