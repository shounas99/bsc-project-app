<template>
  <v-row>
    <v-col cols="12">
      <ProductOrder />
    </v-col>
  </v-row>
  <v-container>
    <v-row>
      <v-col
        v-for="product in productStore.dataProducts"
        :key="product.idProducto"
        cols="12"
        md="4"
      >
        <ProductCard :product="product" :loading="loading" @reserve="handleReserve" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

import ProductCard from '@/components/products/ProductCard.vue'

import { useProductStore } from '@/stores/productsStore'
import { useOrderStore } from '@/stores/orderStore'

const productStore = useProductStore()
const orderStore = useOrderStore()
const loading = ref(false)

const handleReserve = (id: number, cantidad: number, precio: number) => {
  productStore.addProduct(id)
  orderStore.addOrder(id, cantidad, precio)
}

onMounted(() => {
  productStore.loadProducts()
})
</script>
