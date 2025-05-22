<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <!-- <v-img
          class="mx-auto my-6"
          max-width="228"
          src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-light.svg"
        ></v-img> -->

        <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="448" rounded="lg">
          <div class="text-subtitle-1 text-medium-emphasi">Correo eléctronico</div>

          <v-text-field
            density="compact"
            placeholder="Email address"
            prepend-inner-icon="mdi-email-outline"
            variant="outlined"
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
          ></v-text-field>

          <v-btn class="mb-8" color="blue" size="large" variant="tonal" block @click="login()">
            Entrar
          </v-btn>
          <!-- <v-row align="center" justify="center">
            <v-col cols="12">
              <v-btn size="x-small">Extra small Button</v-btn>
            </v-col>
          </v-row> -->
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const visible = ref(false)
function login() {
  router.replace({ path: '/home' })
}
</script>

<style scoped></style>
