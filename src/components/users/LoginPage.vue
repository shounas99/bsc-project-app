<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="448" rounded="lg">
          <div class="text-subtitle-1 text-medium-emphasi">Correo eléctronico</div>
          <v-text-field
            density="compact"
            placeholder="Email address"
            prepend-inner-icon="mdi-email-outline"
            variant="outlined"
            v-model="dataLogin.correo"
          ></v-text-field>
          <div
            class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
          >
            Contraseña
          </div>

          <v-text-field
            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
            :type="visible ? 'text' : 'password'"
            density="compact"
            placeholder="Enter your password"
            prepend-inner-icon="mdi-lock-outline"
            variant="outlined"
            @click:append-inner="visible = !visible"
            v-model="dataLogin.contrasenia"
          ></v-text-field>

          <v-btn class="mb-8" color="blue" size="large" variant="tonal" block @click="login()">
            Entrar
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useLoginStore } from '@/stores/loginStore'

const router = useRouter()
const loginStore = useLoginStore()

const visible = ref(false)
const dataLogin = ref({
  correo: '',
  contrasenia: '',
})

async function login() {
  await loginStore.getUserLogin(dataLogin.value.correo, dataLogin.value.contrasenia)
  if (loginStore.dataLogin?.isSuccess) {
    router.replace({ path: '/home' })
  } else {
  }
}
</script>

<style scoped></style>
