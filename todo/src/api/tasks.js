import { HTTP } from './common'

export const Task = {
  create (config) {
    return HTTP.post('/tasks/', config).then(response => {
      return response.data
    })
  },
  delete (task) {
    return HTTP.delete(`/tasks/${task.id}/`)
  },
  list () {
    return HTTP.get('/tasks/').then(response => {
      return response.data
    })
  }
}