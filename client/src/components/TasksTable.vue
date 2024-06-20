<template>
  <div class="container">
    <div
      class="d-flex justify-content-between pt-5 pb-3 align-items-center border-bottom mb-3"
    >
      <h3 class="m-0">Задачи</h3>
      <button class="btn btn-primary" @click="initCreate">Создать</button>
    </div>
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">Номер</th>
          <th scope="col">Название</th>
          <th scope="col">Описание</th>
          <th scope="col">Дата создания</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="task in tasks" :key="task._id">
          <th scope="row">{{ task._id }}</th>
          <td>{{ task.name }}</td>
          <td>{{ task.description }}</td>
          <td>{{ new Date(task.createdAt).toLocaleString() }}</td>
          <td>
            <div class="d-flex flex-nowrap justify-content-end">
              <button class="btn btn-outline-danger" @click="remove(task._id)">
                Удалить
              </button>
              <button
                class="btn btn-outline-primary ms-1"
                @click="initEdit(task)"
              >
                Редактировать
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">
            {{ editingTask ? 'Редактирование' : 'Создание' }} задачи
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="taskName" class="form-label">Название</label>
            <input v-model="taskForm.name" class="form-control" id="taskName" />
          </div>
          <div class="mb-3">
            <label for="taskDescription" class="form-label">Описание</label>
            <textarea
              class="form-control"
              id="taskDescription"
              rows="3"
              v-model="taskForm.description"
            ></textarea>
          </div>
          <div class="mb-3" v-if="editingTask">
            <label class="form-label">Метки</label>
            <vue-tags-input
              v-model="tag"
              :tags="taskForm.tags"
              @tags-changed="(newTags) => (taskForm.tags = newTags)"
            />
          </div>
          <div class="mb-3" v-if="editingTask">
            <label for="taskCompleted" class="form-label"
              >Дата завершения</label
            >
            <input
              type="date"
              v-model="taskForm.complete_date"
              class="form-control"
              id="taskCompleted"
            />
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Закрыть
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="editingTask ? edit() : create()"
          >
            {{ editingTask ? 'Сохранить' : 'Создать' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueTagsInput from '@sipec/vue3-tags-input';
export default {
  name: 'TasksTable',
  components: {
    VueTagsInput,
  },
  data() {
    return {
      taskForm: {
        name: '',
        description: '',
        tags: [],
        complete_date: null,
      },
      tasks: [],
      editingTask: null,
      modal: null,
      tag: '',
    };
  },
  mounted() {
    this.getTasks();
    this.modal = new window.bootstrap.Modal('#exampleModal', {
      keyboard: false,
    });
  },

  methods: {
    getTasks() {
      fetch('/api/tasks')
        .then((r) => r.json())
        .then((data) => {
          this.tasks = data;
        });
    },
    initCreate() {
      this.editingTask = null;
      this.taskForm = {
        name: '',
        description: '',
        tags: [],
        complete_date: null,
      };
      this.modal.show();
    },
    create() {
      fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
          name: this.taskForm.name,
          description: this.taskForm.description,
        }),
      }).then(() => {
        this.modal.hide();
        this.getTasks();
      });
    },

    initEdit(task) {
      this.taskForm = {
        ...task,
        complete_date: task.complete_date
          ? new Date(task.complete_date).toISOString().split('T')[0]
          : null,
      };
      this.editingTask = task;
      this.tags = task.tags;
      this.modal.show();
    },

    edit() {
      fetch('/api/tasks/' + this.editingTask._id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
          name: this.taskForm.name,
          description: this.taskForm.description,
          tags: this.taskForm.tags.map((t) => t.text || t),
          complete_date: this.taskForm.complete_date,
        }),
      }).then(() => {
        this.modal.hide();
        this.getTasks();
      });
    },

    remove(id) {
      fetch('/api/tasks/' + id, {
        method: 'DELETE',
      }).then(() => {
        this.getTasks();
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
