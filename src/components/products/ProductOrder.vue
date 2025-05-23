<template>
  <div class="pa-4 text-center">
    <v-dialog v-model="dialog" max-width="600">
      <template v-slot:activator="{ props: activatorProps }">
        <v-row justify="center">
          <v-card width="300" height="150" elevation="5" rounded="10" color="gray">
            <div class="d-flex justify-center align-center" style="height: 100%">
              <v-btn
                class="text-none font-weight-regular"
                prepend-icon="mdi-account"
                text="Ver pedido actual"
                variant="tonal"
                color="primary"
                v-bind="activatorProps"
              ></v-btn>
            </div>
          </v-card>
        </v-row>
      </template>

      <v-card prepend-icon="mdi-archive" title="Pedido actual">
        <v-card-text>
          <v-row dense>
            <v-col cols="6">
              <v-text-field
                v-model="orderStore.cantidadProd"
                label="Cantidad total de productos"
                readonly
              ></v-text-field>
            </v-col>

            <v-col cols="6">
              <v-text-field
                v-model="orderStore.precioTotalProd"
                label="Total"
                readonly
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-select
                v-model="dataClient.idCliente"
                :items="clients"
                label="Seleccionar cliente"
                required
                item-title="nombreCompleto"
                item-value="idCliente"
              ></v-select>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="blue" text="Guardar" variant="tonal" @click="saveOrder()"></v-btn>
          <v-btn text="Cancelar Pedido" color="red" variant="tonal" @click="cancelOrder()"></v-btn>
          <v-btn text="Cerrar" color="red" variant="tonal" @click="dialog = false"></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onMounted, shallowRef } from 'vue'
import { useOrderStore } from '../../stores/orderStore'
import { getClients } from '@/api/users-api'
import { addOrder } from '@/api/orders-api'

const orderStore = useOrderStore()

const dialog = shallowRef(false)
const clients = ref<Client[]>([])
const dataClient = ref({
  idCliente: 0,
})

type Client = {
  idPersona: number
  idCliente: number
  nombreCompleto: string
}

async function getAllClients() {
  const response = await getClients()
  clients.value = response
}

async function saveOrder() {
  await addOrder(dataClient.value.idCliente, orderStore.cantidadProd, orderStore.precioTotalProd)
  dialog.value = false
  orderStore.resetOrder()
}

async function cancelOrder() {
  orderStore.resetOrder()
  dataClient.value.idCliente = 0
  await getAllClients()
  dialog.value = false
}

onMounted(() => {
  getAllClients()
})
</script>

<style scoped></style>
