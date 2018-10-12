<template lang="pug">
  #app
    .card(v-for="task in tasks")
      .card-header
        button.btn.btn-clear.float-right(@click="deleteTask(task)")
        .card-title 
        .card-subtitle 
      .card-body 
</template>


<script>
import { mapGetters } from 'vuex'

export default {
  name: 'task-list',
  computed: mapGetters(['tasks']),
  methods: {
    deleteTask (task) {
      // Вызываем действие `deleteTask` из нашего хранилища, которое
      // попытается удалить заметку из нашех базы данных, отправив запрос к API
      this.$store.dispatch('deleteTask', task)
    }
  },
  beforeMount () {
    // Перед тем как загрузить страницу, нам нужно получить список всех
    // имеющихся заметок. Для этого мы вызываем действие `getTasks` из
    // нашего хранилища
    this.$store.dispatch('getTasks')
  }
}
</script>

<style>
  header {
    margin-top: 50px;
  }
</style>