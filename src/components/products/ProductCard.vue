<!-- src/components/RestaurantCard.vue -->
<template>
  <v-card :disabled="loading" :loading="loading" class="mx-auto my-6" max-width="374">
    <template v-slot:loader="{ isActive }">
      <v-progress-linear :active="isActive" color="deep-purple" height="4" indeterminate />
    </template>

    <v-card-item>
      <v-card-title>{{ product.producto }}</v-card-title>
      <v-card-subtitle>
        <span class="me-1">{{ product.categoriaProducto }}</span>
      </v-card-subtitle>
    </v-card-item>

    <v-card-text>
      <v-row align="center" class="mx-0"> </v-row>
      <div class="my-4 text-subtitle-1">Precio por unidad: $ {{ product.precio }}</div>
    </v-card-text>

    <v-divider class="mx-4 mb-1" />

    <v-card-title>Disponibilidad</v-card-title>

    <div class="px-4 mb-2">
      <v-chip-group
        v-model="selection"
        v-if="product.cantidad != 0"
        selected-class="bg-deep-purple-lighten-2"
      >
        <v-chip> {{ product.cantidad }} </v-chip>
      </v-chip-group>
      <span v-else>No hay productos</span>
    </div>

    <v-card-actions>
      <v-btn
        color="deep-purple-lighten-2"
        text="Añadir producto"
        block
        :disabled="product.cantidad == 0"
        border
        @click="$emit('reserve', product.idProducto, product.cantidad, product.precio)"
      />
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps({
  product: Object,
  loading: Boolean,
})

const selection = ref(null)
</script>
