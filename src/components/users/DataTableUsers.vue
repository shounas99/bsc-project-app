<template>
  <v-sheet border rounded>
    <v-data-table
      :headers="headers"
      :hide-default-footer="books.length < 11"
      :items="books"
      color="primary"
    >
      <template v-slot:top>
        <v-toolbar flat color="kingblue">
          <v-toolbar-title> Usuarios BSC </v-toolbar-title>

          <v-btn
            class="me-2"
            prepend-icon="mdi-plus"
            rounded="lg"
            text="Añadir Usuario"
            border
            @click="add"
          ></v-btn>
        </v-toolbar>
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <div class="d-flex ga-2 justify-end">
          <v-icon color="golden" icon="mdi-pencil" size="large" @click="edit(item.id)"></v-icon>

          <v-icon color="red" icon="mdi-delete" size="large" @click="remove(item.id)"></v-icon>
        </div>
      </template>

      <template v-slot:no-data>
        <v-btn
          prepend-icon="mdi-backup-restore"
          rounded="lg"
          text="Reset data"
          variant="text"
          border
          @click="reset"
        ></v-btn>
      </template>
    </v-data-table>
  </v-sheet>

  <v-dialog v-model="dialog" max-width="800">
    <v-card :subtitle="`${isEditing ? 'Actualizar' : 'Crear'} Usuario`">
      <template v-slot:text>
        <v-row>
          <v-col cols="4">
            <v-text-field v-model="record.title" label="Nombre"></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field v-model="record.title" label="Apellido paterno"></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field v-model="record.title" label="Apellido materno"></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-text-field v-model="record.author" label="Domicilio"></v-text-field>
          </v-col>

          <v-col cols="6" md="6">
            <v-text-field v-model="record.author" label="Correo"></v-text-field>
          </v-col>
          <v-col cols="6" md="6">
            <v-text-field v-model="record.author" label="Contraseña"></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-select
              v-model="record.genre"
              :items="['Fiction', 'Dystopian', 'Non-Fiction', 'Sci-Fi']"
              label="Asignar perfil"
            ></v-select>
          </v-col>
        </v-row>
      </template>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn text="Guardar" @click="save" variant="tonal" elevation="3" color="blue"></v-btn>
        <v-btn
          text="Cancelar"
          variant="tonal"
          @click="dialog = false"
          elevation="3"
          color="red"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { onMounted, ref, shallowRef } from 'vue'
import { useDate } from 'vuetify'

const adapter = useDate()

const DEFAULT_RECORD = {
  title: '',
  author: '',
  genre: '',
  year: adapter.getYear(adapter.date()),
  pages: 1,
}

const dialog = ref(false)
const record = ref<Book | null>(null)
const books = ref<Book[]>([])
const isEditing = shallowRef(false)

const headers = [
  { title: 'Nombre Completo', key: 'title', align: 'start' },
  { title: 'Correo', key: 'author' },
  { title: 'Estatus', key: 'genre' },
  // { title: 'Year', key: 'year', align: 'end' },
  // { title: 'Pages', key: 'pages', align: 'end' },
  { title: 'Acciones', key: 'actions', align: 'end', sortable: false },
]

onMounted(() => {
  reset()
})

function add() {
  isEditing.value = false
  record.value = DEFAULT_RECORD
  dialog.value = true
}

function edit(id) {
  isEditing.value = true

  const found = books.value.find((book) => book.id === id)

  record.value = {
    id: found.id,
    title: found.title,
    author: found.author,
    genre: found.genre,
    year: found.year,
    pages: found.pages,
  }

  dialog.value = true
}

function remove(id) {
  const index = books.value.findIndex((book) => book.id === id)
  books.value.splice(index, 1)
}

function save() {
  if (isEditing.value) {
    const index = books.value.findIndex((book) => book.id === record.value.id)
    books.value[index] = record.value
  } else {
    record.value.id = books.value.length + 1
    books.value.push(record.value)
  }

  dialog.value = false
}

function reset() {
  dialog.value = false
  record.value = DEFAULT_RECORD
  books.value = [
    {
      id: 1,
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      genre: 'Fiction',
      year: 1960,
      pages: 281,
    },
    { id: 2, title: '1984', author: 'George Orwell', genre: 'Dystopian', year: 1949, pages: 328 },
    {
      id: 3,
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      genre: 'Fiction',
      year: 1925,
      pages: 180,
    },
    {
      id: 4,
      title: 'Sapiens',
      author: 'Yuval Noah Harari',
      genre: 'Non-Fiction',
      year: 2011,
      pages: 443,
    },
    { id: 5, title: 'Dune', author: 'Frank Herbert', genre: 'Sci-Fi', year: 1965, pages: 412 },
  ]
}
</script>
