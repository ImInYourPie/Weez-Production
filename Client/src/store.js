import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: false,
    token: null,
    // USERS ARRAY
    users: [
      {
        id: 1,
        userType: "student",
        fullname: "Miguel Melo",
        username: "ImInYourPie",
        email: "1@email.com",
        password: "12345",
        registerDate: "01-12-2018",
        courseId: 1,
        profilePicture: "https://scontent.fopo3-2.fna.fbcdn.net/v/t1.0-9/46482080_2058551337569721_3549961134964473856_n.jpg?_nc_cat=102&_nc_ht=scontent.fopo3-2.fna&oh=df26edd7a35fd2cc7c1dd6b2bc2d67cb&oe=5D005321",
        allUpvotes: 2,
        allDownvotes: 5,
        allQuestions: 2,
        allAnswers: 0,
        experience: 100,
        trophies: {
          bronze: [1, 2, 3, 4],
          silver: [1, 2, 3],
          gold: [1, 2]
        }
      },
      {
        id: 2,
        userType: "student",
        fullname: "Gonçalo Santos",
        username: "GG_EZ",
        email: "2@email.com",
        password: "12345",
        registerDate: "01-12-2018",
        courseId: 1,
        profilePicture: "https://scontent.fopo3-1.fna.fbcdn.net/v/t1.0-9/49518556_1201985673303930_7283775002233536512_n.jpg?_nc_cat=106&_nc_ht=scontent.fopo3-1.fna&oh=7ca4395a0971f27c8d8f96a7ebc8c868&oe=5CF9F9C1",
        allUpvotes: 55,
        allDownvotes: 45,
        allQuestions: 2,
        allAnswers: 0,
        experience: 100,
        trophies: {
          bronze: [1, 2, 3],
          silver: [1, 2],
          gold: [1]
        }
      },
      {
        id: 3,
        userType: "student",
        fullname: "Ricardo Cunha",
        username: "Esquilo",
        email: "3@email.com",
        password: "12345",
        registerDate: "01-12-2018",
        courseId: 1,
        profilePicture: "https://scontent.fopo3-2.fna.fbcdn.net/v/t1.0-9/15894402_720400668114489_3679565347868962779_n.jpg?_nc_cat=102&_nc_ht=scontent.fopo3-2.fna&oh=ab609010015e40bcff846c8a16f1a44f&oe=5CC2AC98",
        allUpvotes: 220,
        allDownvotes: 2,
        allQuestions: 2,
        allAnswers: 0,
        experience: 100,
        trophies: {
          bronze: [1, 2, 3],
          silver: [1, 2],
          gold: [1]
        }
      },
      {
        id: 4,
        userType: "student",
        fullname: "Inés Oliveira",
        username: "InesSS",
        email: "4@email.com",
        password: "12345",
        registerDate: "01-12-2018",
        courseId: 1,
        profilePicture: "https://scontent.fopo3-2.fna.fbcdn.net/v/t1.0-9/40662268_2043367609060660_1033153051612938240_n.jpg?_nc_cat=102&_nc_ht=scontent.fopo3-2.fna&oh=22269a2da92baba0ac16d23065ae65d0&oe=5CC6A2D7",
        allUpvotes: 100,
        allDownvotes: 22,
        allQuestions: 2,
        allAnswers: 0,
        experience: 100,
        trophies: {
          bronze: [1, 2, 3],
          silver: [1, 2],
          gold: [1]
        }
      },
      {
        id: 5,
        userType: "student",
        fullname: "Sara Monteiro",
        username: "Sasa",
        email: "5@email.com",
        password: "12345",
        registerDate: "01-12-2018",
        courseId: 1,
        profilePicture: "https://scontent.fopo3-2.fna.fbcdn.net/v/t1.0-9/11921787_1173697175979148_2020454571316390451_n.jpg?_nc_cat=100&_nc_ht=scontent.fopo3-2.fna&oh=bfdf4d1c94424a81fe1638e09848a07c&oe=5CB46E5D",
        allUpvotes: 334,
        allDownvotes: 22,
        allQuestions: 2,
        allAnswers: 0,
        experience: 100,
        trophies: {
          bronze: [1, 2, 3],
          silver: [1, 2],
          gold: [1]
        }
      },
    ],
    // QUESTIONS ARRAY 
    questions: [
      {
        id: 1,
        userId: 1,
        title: "O professor Quéiros fez-nos usar Vue.js e eu não gosto!",
        description: "O vue é um cadito feio, não? E logo verde ainda por cima, que cor feia! O que são views afinal, e aquela cena do vuex? O Evan You devia tar com sono quando criou isto.",
        tags: ["Javascript", "CSS"],
        courseId: 1,
        classId: 1,
        views: 0,
        upvotes: 0,
        downvotes: 200,
        date: "12-12-2018",
        status: "open",
        answers: [{
          id: 30,
          userId: 5,
          comment: "Vou descobrir onde vives e vais ver! Vue is love!",
          upvotes: 10,
          downvotes: 0,
          date: "20-01-2019"
        }]
      },
      {
        id: 4,
        userId: 3,
        title: "Não sei escrever. Ajuda por favor!",
        description: "Ajuda por favor sou analfabeto!",
        tags: ["Português"],
        courseId: 1,
        classId: 1,
        views: 0,
        upvotes: 0,
        downvotes: 5,
        date: "12-12-2018",
        status: "open",
        answers: [{
          id: 12,
          userId: 2,
          comment: "Mas... acabaste de escrever...",
          upvotes: 0,
          downvotes: 0,
          date: "20-01-2019"
        }]
      },
      {
        id: 5,
        userId: 1,
        title: "Olá sou uma pergunta!",
        description: "Gostava de saber quando é que temos de entregar o trabalho de PW1 porque sou meio nabo e não me lembro!",
        tags: ["Javascript", "CSS"],
        courseId: 1,
        classId: 1,
        views: 0,
        upvotes: 20,
        downvotes: 3,
        date: "12-12-2018",
        status: "open",
        answers: []
      },
      {
        id: 6,
        userId: 1,
        title: "Quando é para entregar o trabalho de PW1?",
        description: "Gostava de saber quando é que temos de entregar o trabalho de PW1 porque sou meio nabo e não me lembro!",
        tags: ["Bases de Dados"],
        courseId: 1,
        classId: 1,
        views: 0,
        upvotes: 20,
        downvotes: 3,
        date: "12-12-2018",
        status: "open",
        answers: []
      },
      {
        id: 7,
        userId: 1,
        title: "Quando é para entregar o trabalho de PW1?",
        description: "Gostava de saber quando é que temos de entregar o trabalho de PW1 porque sou meio nabo e não me lembro!",
        tags: ["Javascript", "CSS"],
        courseId: 1,
        classId: 1,
        views: 0,
        upvotes: 20,
        downvotes: 3,
        date: "12-12-2018",
        status: "open",
        answers: []
      },
      {
        id: 8,
        userId: 1,
        title: "Quando é para entregar o trabalho de PW1?",
        description: "Gostava de saber quando é que temos de entregar o trabalho de PW1 porque sou meio nabo e não me lembro!",
        tags: ["Design"],
        courseId: 1,
        classId: 1,
        views: 0,
        upvotes: 20,
        downvotes: 3,
        date: "12-12-2018",
        status: "open",
        answers: []
      },
      {
        id: 9,
        userId: 1,
        title: "Quando é para entregar o trabalho de PW1?",
        description: "Gostava de saber quando é que temos de entregar o trabalho de PW1 porque sou meio nabo e não me lembro!",
        tags: ["Javascript", "CSS"],
        courseId: 1,
        classId: 1,
        views: 0,
        upvotes: 20,
        downvotes: 3,
        date: "12-12-2018",
        status: "open",
        answers: []
      },
      {
        id: 10,
        userId: 1,
        title: "Quando é para entregar o trabalho de PW1?",
        description: "Gostava de saber quando é que temos de entregar o trabalho de PW1 porque sou meio nabo e não me lembro!",
        tags: ["CSS"],
        courseId: 1,
        classId: 1,
        views: 0,
        upvotes: 20,
        downvotes: 3,
        date: "12-12-2018",
        status: "open",
        answers: []
      },
      {
        id: 11,
        userId: 1,
        title: "Quando é para entregar o trabalho de PW1?",
        description: "Gostava de saber quando é que temos de entregar o trabalho de PW1 porque sou meio nabo e não me lembro!",
        tags: ["Javascript", "CSS"],
        courseId: 1,
        classId: 1,
        views: 0,
        upvotes: 20,
        downvotes: 3,
        date: "12-12-2018",
        status: "open",
        answers: []
      },
      {
        id: 2,
        userId: 1,
        title: "Quando é para entregar o outro trabalho de PW1?",
        description: "Gostava de saber quando é que temos de entregar o trabalho de PW1 porque sou meio nabo e não me lembro!",
        tags: ["Javascript"],
        courseId: 1,
        classId: 1,
        views: 0,
        upvotes: 2,
        downvotes: 0,
        date: "10-01-2019",
        status: "open",
        answers: []
      },
      {
        id: 3,
        userId: 2,
        title: "Quando é para entregar o outro que é o mesmo trabalho de PW1?",
        description: "Gostava de saber quando é que temos de entregar o trabalho de PW1 porque sou meio nabo e não me lembro!",
        tags: ["Javascript", "CSS"],
        courseId: 1,
        classId: 1,
        views: 6,
        upvotes: 3,
        downvotes: 12,
        date: "20-11-2018",
        status: "closed",
        answers: [
          {
            id: 1,
            userId: 1,
            comment: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis perspiciatis eos temporibus ducimus sint nam, eum aperiam a similique laborum earum quae ipsa! Itaque cumque harum repellendus iste, ipsa quas..",
            upvotes: 2,
            downvotes: 1,
            date: "20-01-2019"
          },
          {
            id: 2,
            userId: 2,
            comment: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis perspiciatis eos temporibus ducimus sint nam, eum aperiam a similique laborum earum quae ipsa! Itaque cumque harum repellendus iste, ipsa quas.",
            upvotes: 5,
            downvotes: 0,
            date: "20-01-2019"
          },
        ]
      },
    ],
    // TAGS ARRAY
    tags: ["Javascript", "HTML", "CSS", "Bases de Dados", "Design", "POO", "PW1", "Português"],


    // COURSES ARRAY
    courses: [
      {
        id: 1,
        name: "Tecnologias e Sistemas de Informação para a Web",
        abrebiation: "TSIW",
      }
    ],

    // CLASSES ARRAY
    classes: [
      {
        id: 1,
        courseId: 1,
        name: "Programação para a Web I",
        abrebiation: "PW1",
        year: 2
      },
      {
        id: 2,
        courseId: 1,
        name: "Progamação Orientada a Objectos",
        abrebiation: "POO",
        year: 1
      },
      {
        id: 3,
        courseId: 1,
        name: "Bases de Dados",
        abrebiation: "BD",
        year: 2
      }
    ],


    bronze: [
      {
        id: 1,
        neededQuestions: 1,
        description: "Primeira pergunta!"
      },
      {
        id: 2,
        neededQuestions: 5,
        description: "Cinco perguntas!"
      },
      {
        id: 3,
        neededQuestions: 10,
        description: "Dez perguntas!"
      },
      {
        id: 4,
        neededQuestions: 20,
        description: "Vinte perguntas!"
      },
    ],
    silver: [
      {
        id: 1,
        neededAnswers: 1,
        description: "Primeira resposta!"
      },
      {
        id: 2,
        neededAnswers: 5,
        description: "Cinco respostas!"
      },
      {
        id: 3,
        neededAnswers: 10,
        description: "Dez respostas!"
      },
    ],
    gold: [
      {
        id: 1,
        neededUpvotes: 1,
        description: "Primeiro upvote!"
      },
      {
        id: 2,
        neededUpvotes: 5,
        description: "Cinco upvotes!"
      },
    ],


    // NOTIFICATIONS ARRAY
    notifications: [

    ]
  },

  mutations: {
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
    loginOnCreate(state, payload){
        for (let i = 0; i < state.users.length; i++) {
          if (payload == state.users[i].email) {
            state.token = state.users[i]
            localStorage.token = JSON.stringify(state.token);
          }
        }
    }
  },
  actions: {
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
