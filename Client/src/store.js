import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex, axios)

export default new Vuex.Store({
  state: {

    url: "http://localhost:3000",

    error: false,

    token: null,
    
    loggedUser: null,

    // USERS ARRAY
    users: [],

    // QUESTIONS ARRAY 
    questions: [],

    // TAGS ARRAY
    tags: [],

    // NOTIFICATIONS ARRAY
    notifications: [],

  },

  mutations: {
    
    SET_LOGGED_USER (state, user) {
      state.loggedUser = user;
    },

    SET_USERS (state, users) {
      state.users = users;
    },

    SET_QUESTIONS(state, questions){
      state.questions = questions;
    },


    createUser(state, payload) {
      state.users.push(payload);
    },
    createQuestion(state, payload) {
      state.questions.push(payload);
    },
    createAnswer(state, payload) {
      for (let i = 0; i < state.questions.length; i++) {
        if (state.questions[i].id === payload.question.id) {
          state.questions[i].answers.push(payload.newAnswer);
        }
      }
    },
    // FILLS TOKEN TO BE USED AS CURRENT USER LOGGED IN
    fillCurrentUser(state, payload) {
      state.token = payload;
    },

    // UPVOTE && DOWNVOTE QUESTION
    updateQuestionUpvote(state, payload) {
      for (let i = 0; i < state.questions.length; i++) {
        if (state.questions[i].id === payload.question.id) {
          state.questions[i].upvotes += payload.amount;
        }
      }
      for (let j = 0; j < state.users.length; j++) {
        if (state.users[j].id === payload.question.userId) {
          state.users[j].allUpvotes += payload.amount;
        }
      }
    },
    updateQuestionDownvote(state, payload) {
      for (let i = 0; i < state.questions.length; i++) {
        if (state.questions[i].id === payload.question.id) {
          state.questions[i].downvotes += payload.amount;
        }
      }
      for (let j = 0; j < state.users.length; j++) {
        if (state.users[j].id === payload.question.userId) {
          state.users[j].allDownvotes += payload.amount;
        }
      }
    },
    // LOGIN USER WHEN ACCOUNT IS CREATED
    loginOnCreate(state, payload) {
      for (let i = 0; i < state.users.length; i++) {
        if (payload == state.users[i].email) {
          state.token = state.users[i]
          localStorage.token = JSON.stringify(state.token);
        }
      }
    }
  },
  actions: {
    
    
    loginUser ({ commit }, data) {
      commit("SET_LOGGED_USER", data)
    },
    

    getUsers ({ commit, state }) {
      axios.get(state.url)
        .then(data => {
          // eslint-disable-next-line no-console
          console.log(data.data)
          let users = data.data
          commit('SET_USERS', users)
        })
        .catch(err => {
          // eslint-disable-next-line no-console
          console.log(err)
        })
    },

    getQuestions ({ commit, state }) {
      axios.get(state.url + "forum")
        .then(data => {
          // eslint-disable-next-line no-console
          console.log(data.data)
          let questions = data.data
          commit('SET_QUESTIONS', questions)
        })
        .catch(err => {
          // eslint-disable-next-line no-console
          console.log(err)
        })
    },



    createUser({ commit }, payload) {
      let newUser = {
        id: payload.id,
        userType: "student",
        fullname: "",
        username: payload.username,
        email: payload.email,
        password: payload.password,
        registerDate: payload.registerDate,
        institutionId: 0,
        profilePicture: payload.profilePicture,
        allUpvotes: 0,
        allDownvotes: 0,
        allQuestions: 0,
        allAnswers: 0,
        experience: 0,
        trophies: {
          bronze: [],
          silver: [],
          gold: []
        }
      }
      commit("createUser", newUser);
    },
    // CREATES QUESTION USING PAYLOAD FROM VIEW
    createQuestion({ commit }, payload) {
      let newQuestion = {
        id: payload.id,
        userId: payload.userId,
        title: payload.title,
        description: payload.description,
        tags: payload.tags,
        courseId: 1,
        classId: payload.classId,
        views: 0,
        upvotes: 0,
        downvotes: 0,
        date: payload.date,
        status: "open",
        answers: []
      }
      commit("createQuestion", newQuestion);
    },

    loginOnCreate({ commit }, payload) {
      commit("loginOnCreate", payload)
    },

    // CREATE ANSWER
    createAnswer({ commit }, payload) {
      commit("createAnswer", payload)
    },

    // UPVOTE && DOWNVOTE QUESTION
    updateQuestionUpvote({ commit }, payload) {
      commit("updateQuestionUpvote", payload)
    },
    updateQuestionDownvote({ commit }, payload) {
      commit("updateQuestionDownvote", payload)
    }

  },

  getters: {
    // COMMITS/VALIDATES LOGIN
    login: (state) => (user) => {
      let verification = false;
      for (let i = 0; i < state.users.length; i++) {
        if (state.users[i].email == user.email && state.users[i].password == user.password) {
          verification = true;
          state.token = state.users[i];
          localStorage.token = JSON.stringify(state.token);
        }
      }
      return verification;
    },
    // GET TODAYS DATE IN NORMAL FORMAT, NOT JS
    getTodaysDate() {
      let today = new Date();
      let dd = today.getDate();
      let mm = today.getMonth() + 1; //January is 0!
      let yyyy = today.getFullYear();

      if (dd < 10) {
        dd = "0" + dd;
      }

      if (mm < 10) {
        mm = "0" + mm;
      }
      today = dd + "-" + mm + "-" + yyyy;
      return today;
    },

    getQuestionById: state => id => {
      return state.questions.find(question => question.id === id);
    },
    getUserById: state => id => {
      return state.users.find(user => user.id === id);
    },
    getAnswersByQuestionId: state => id => {
      let array = [];
      for (let i = 0; i < state.questions.length; i++) {
        if (state.questions[i].id === id) {
          array = state.questions[i].answers;
        }
      }
      return array;
    },

    // ACTUAL GETTERS
    token(state) {
      return state.token;
    },
    users(state) {
      return state.users;
    },
    error(state) {
      return state.error;
    },
    questions(state) {
      return state.questions;
    },
    tags(state) {
      return state.tags;
    },
    courses(state) {
      return state.courses;
    },
    classes(state) {
      return state.classes;
    },
    bronze(state) {
      return state.bronze;
    },
    silver(state) {
      return state.silver;
    },
    gold(state) {
      return state.gold;
    }
  }
})
