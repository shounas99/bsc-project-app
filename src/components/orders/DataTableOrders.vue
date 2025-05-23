<template>
  <v-container>
    <v-data-table :items="orders" :headers="headers">
      <template v-slot:top>
        <v-toolbar flat color="lightYellow">
          <v-toolbar-title>
            <v-icon color="medium-emphasis" size="x-small" start></v-icon>
            Pedidos BSC
          </v-toolbar-title>
        </v-toolbar>
      </template>
    </v-data-table>
  </v-container>
</template>

<style scoped></style>

<script setup lang="ts">
import { getAllOrders } from '@/api/orders-api'
import { ref } from 'vue'
import { onMounted } from 'vue'

const orders = ref<Order[]>([])

type Order = {
  idPedido: number
  idEstatusPedidos: number
  estatusPedidos: string
  cantidad: number
  precioTotal: number
}

const headers = [
  { title: 'ID Pedido', key: 'idPedido', align: 'start' },
  { title: 'Cantidad', key: 'cantidad' },
  { title: 'Precio', key: 'precioTotal' },
  { title: 'Estatus del Pedido', key: 'estatusPedidos' },
]

async function getOrders() {
  const response = await getAllOrders()
  orders.value = response
}

onMounted(() => {
  getOrders()
})
</script>
