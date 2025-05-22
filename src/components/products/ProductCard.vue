<!-- src/components/RestaurantCard.vue -->
<template>
  <v-card :disabled="loading" :loading="loading" class="mx-auto my-6" max-width="374">
    <template v-slot:loader="{ isActive }">
      <v-progress-linear :active="isActive" color="deep-purple" height="4" indeterminate />
    </template>

    <v-img :src="card.image" height="250" cover />

    <v-card-item>
      <v-card-title>{{ card.title }}</v-card-title>
      <v-card-subtitle>
        <span class="me-1">{{ card.subtitle }}</span>
        <v-icon color="error" icon="mdi-fire-circle" size="small" />
      </v-card-subtitle>
    </v-card-item>

    <v-card-text>
      <v-row align="center" class="mx-0">
        <v-rating
          :model-value="card.rating"
          color="amber"
          density="compact"
          size="small"
          half-increments
          readonly
        />
        <div class="text-grey ms-4">{{ card.rating }} ({{ card.reviews }})</div>
      </v-row>

      <div class="my-4 text-subtitle-1">{{ card.type }}</div>
      <div>{{ card.description }}</div>
    </v-card-text>

    <v-divider class="mx-4 mb-1" />

    <v-card-title>Disponibilidad</v-card-title>

    <div class="px-4 mb-2">
      <v-chip-group v-model="selection" selected-class="bg-deep-purple-lighten-2">
        <v-chip v-for="(time, i) in card.times" :key="i">
          {{ time }}
        </v-chip>
      </v-chip-group>
    </div>

    <v-card-actions>
      <v-btn
        color="deep-purple-lighten-2"
        text="Reservar"
        block
        border
        @click="$emit('reserve', card.id)"
      />
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps({
  card: Object,
  loading: Boolean,
})

const selection = ref(null)
</script>
