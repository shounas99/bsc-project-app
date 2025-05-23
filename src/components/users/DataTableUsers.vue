<template>
  <v-sheet border rounded>
    <v-data-table :headers="headers" :items="users" color="primary">
      <template v-slot:[`item.nombre`]="{ item }">
        <div class="justify-start">
          <p>{{ item.nombre + ' ' + item.aPaterno + ' ' + item.aMaterno }}</p>
        </div>
      </template>
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
          <v-icon color="golden" icon="mdi-pencil" size="large" @click="edit(item)"></v-icon>
          <v-icon color="red" icon="mdi-delete" size="large" @click="remove(item)"></v-icon>
        </div>
      </template>
    </v-data-table>
  </v-sheet>

  <v-dialog v-model="dialog" max-width="800">
    <v-card :subtitle="`${isEditing ? 'Actualizar' : 'Crear'} Usuario`">
      <template v-slot:text>
        <v-row>
          <v-col cols="4">
            <v-text-field v-model="form.nombre" label="Nombre"></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field v-model="form.aPaterno" label="Apellido paterno"></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field v-model="form.aMaterno" label="Apellido materno"></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field v-model="form.domicilio" label="Domicilio"></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field v-model="form.telefono" label="Teléfono"></v-text-field>
          </v-col>
          <v-col cols="6" md="6">
            <v-text-field v-model="form.correo" label="Correo"></v-text-field>
          </v-col>
          <v-col cols="6" md="6" v-if="!isEditing">
            <v-text-field
              v-model="form.contrasenia"
              label="Contraseña"
              type="password"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="12">
            <v-select
              v-model="form.idPerfil"
              :items="profiles"
              label="Asignar perfil"
              item-title="perfil"
              item-value="idPerfil"
            ></v-select>
          </v-col>
        </v-row>
      </template>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn text="Guardar" @click="save()" variant="tonal" elevation="3" color="blue"></v-btn>
        <v-btn text="Cancelar" variant="tonal" @click="cancel()" elevation="3" color="red"></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { getUsers } from '@/api/users-api'
import { getProfiles } from '@/api/catalogs-api'
import { addUser } from '@/api/login-api'
import { onMounted, ref } from 'vue'

const form = ref({
  idPersona: 0,
  nombre: '',
  aPaterno: '',
  aMaterno: '',
  domicilio: '',
  telefono: '',
  correo: '',
  contrasenia: '',
  idPerfil: 0,
})

const dialog = ref(false)
const users = ref<User[]>([])
const isEditing = ref(false)

const profiles = ref({
  idPerfil: 0,
  perfil: '',
})

type User = {
  idPersona?: number
  nombre: string
  aPaterno: string
  aMaterno: string
  domicilio: string
  telefono?: string
  fNacimiento?: string
  correo: string
  contrasenia?: string
  nombrePerfil: number
}

const headers = [
  { title: 'Nombre Completo', key: 'nombre', align: 'start' },
  { title: 'Correo', key: 'correo' },
  { title: 'Estatus', key: 'estatusUsuario' },
  { title: 'Acciones', key: 'actions', align: 'end', sortable: false },
]

async function getAllUsers() {
  const response = await getUsers()
  users.value = response
}
async function getAllProfiles() {
  const response = await getProfiles()
  profiles.value = response
}

function resetForm() {
  form.value.idPersona = 0
  form.value.nombre = ''
  form.value.aPaterno = ''
  form.value.aMaterno = ''
  form.value.domicilio = ''
  form.value.telefono = ''
  form.value.correo = ''
  form.value.contrasenia = ''
  form.value.idPerfil = 0
}
async function save() {
  if (isEditing.value) {
    //edit
  } else {
    //new
    await addUser(
      form.value.nombre,
      form.value.aPaterno,
      form.value.aMaterno,
      form.value.domicilio,
      form.value.telefono,
      form.value.correo,
      form.value.contrasenia,
      form.value.idPerfil,
    )
    resetForm()
    getAllUsers()
  }
  dialog.value = false
}

async function edit(item: User) {
  isEditing.value = true

  form.value.idPersona = item.idPersona
  form.value.nombre = item.nombre
  form.value.aPaterno = item.aPaterno
  form.value.aMaterno = item.aMaterno
  form.value.domicilio = item.domicilio
  form.value.telefono = item.telefono
  form.value.correo = item.correo
  form.value.idPerfil = item.nombrePerfil

  dialog.value = true
}

function cancel() {
  dialog.value = false
  resetForm()
}

function add() {
  isEditing.value = false
  dialog.value = true
}

onMounted(() => {
  getAllUsers()
  getAllProfiles()
})
</script>
