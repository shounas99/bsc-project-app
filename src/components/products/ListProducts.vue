<template>
  <h1>List</h1>
  <v-container>
    <!-- <v-row justify="center">
      <v-col cols="6" md="6">
        <v-card :color="color" variant="outlined" class="mx-auto">
          <v-card-item>
            <div>
              <div class="text-overline mb-1">Productos</div>
              <div class="text-h6 mb-1">Productos</div>
              <div class="text-caption">Greyhound divisely hello coldly fonwderfully</div>
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
              <div class="text-overline mb-1">Panel de Administración - Productos</div>
              <div class="text-h6 mb-1">Panel de Administración - Productos</div>
              <div class="text-caption">Productos</div>
            </div>
          </v-card-item>

          <v-card-actions>
            <v-btn @click="goToPanelProducts()"> Ver Panel </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row> -->

    <!-- <DataTableProducts /> -->
    <v-row>
      <v-col v-for="card in cards" :key="card.id" cols="12" md="4">
        <ProductCard :card="card" :loading="loading" @reserve="handleReserve" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import ProductCard from '@/components/products/ProductCard.vue'

import { ref } from 'vue'

const router = useRouter()
const color = ref('indigo')

function goToProducts() {
  router.replace({ path: '/products/view' })
}
function goToPanelProducts() {
  router.replace({ path: '/products/panel' })
}

const loading = ref(false)

const cards = ref([
  {
    id: 1,
    image: 'https://cdn.vuetifyjs.com/images/cards/cooking.png',
    title: 'Cafe Badilico',
    subtitle: 'Local Favorite',
    rating: 4.5,
    reviews: 413,
    type: '$ • Italian, Cafe',
    description:
      'Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.',
    times: ['5:30PM', '7:30PM', '8:00PM', '9:00PM'],
  },
  {
    id: 2,
    image: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg',
    title: 'Sunshine Diner',
    subtitle: 'Popular Spot',
    rating: 4.2,
    reviews: 320,
    type: '$$ • American, Diner',
    description: 'Classic breakfast and lunch diner with a sunny terrace.',
    times: ['6:00PM', '7:00PM', '8:30PM'],
  },
  {
    id: 3,
    image: 'https://cdn.vuetifyjs.com/images/cards/cooking.png',
    title: 'Cafe Badilico',
    subtitle: 'Local Favorite',
    rating: 4.5,
    reviews: 413,
    type: '$ • Italian, Cafe',
    description:
      'Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.',
    times: ['5:30PM', '7:30PM', '8:00PM', '9:00PM'],
  },
  {
    id: 4,
    image: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg',
    title: 'Sunshine Diner',
    subtitle: 'Popular Spot',
    rating: 4.2,
    reviews: 320,
    type: '$$ • American, Diner',
    description: 'Classic breakfast and lunch diner with a sunny terrace.',
    times: ['6:00PM', '7:00PM', '8:30PM'],
  },
])

const handleReserve = (id: number) => {
  console.log('Reservar para ID:', id)
}
</script>
