<template>
  <h1>Dashboard</h1>
  <v-container>
    <v-row justify="center">
      <v-col cols="6" md="6">
        <v-card :color="color" variant="outlined" class="mx-auto">
          <v-card-item>
            <div>
              <div class="text-h6 mb-1">Productos</div>
              <div class="text-caption">Ver los productos disponibles</div>
            </div>
          </v-card-item>

          <v-card-actions>
            <v-btn @click="goToProducts()">Ver Productos</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="6" md="6">
        <v-card :color="color" variant="outlined" class="mx-auto">
          <v-card-item>
            <div>
              <div class="text-h6 mb-1">Panel de Administración - Productos</div>
              <div class="text-caption">Gestionar Productos</div>
            </div>
          </v-card-item>

          <v-card-actions>
            <v-btn @click="goToPanelProducts()"> Ver Panel </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

import { ref } from 'vue'

const router = useRouter()
const color = ref('indigo')

function goToProducts() {
  router.replace({ path: '/products/view' })
}
function goToPanelProducts() {
  router.replace({ path: '/products/panel' })
}
</script>
