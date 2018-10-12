import Vue from 'vue'
import Vuex from 'vuex'
import { Task } from '../api/tasks'
import {
  ADD_TASK,
  REMOVE_TASK,
  SET_TASKS
} from './mutation-types.js'

Vue.use(Vuex)

// Состояние
const state = {
  tasks: []  // список заметок
}

// Геттеры
const getters = {
  tasks: state => state.tasks  // получаем список заметок из состояния
}

// Мутации
const mutations = {
  // Добавляем заметку в список
  [ADD_TASK] (state, task) {
    state.tasks = [task, ...state.tasks]
  },
  // Убираем заметку из списка
  [REMOVE_TASK] (state, { id }) {
    state.tasks = state.tasks.filter(task => {
      return task.id !== id
    })
  },
  // Задаем список заметок
  [SET_TASKS] (state, { tasks }) {
    state.tasks = tasks
  }
}

// Действия
const actions = {
  createTask ({ commit }, taskData) {
    Task.create(taskData).then(task => {
      commit(ADD_TASK, task)
    })
  },
  deleteTask ({ commit }, task) {
    Task.delete(task).then(response => {
      commit(REMOVE_TASK, task)
    })
  },
  getTasks ({ commit }) {
    Task.list().then(tasks => {
      commit(SET_TASKS, { tasks })
    })
  }
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})