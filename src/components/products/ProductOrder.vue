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
                :items="['0-17', '18-29', '30-54', '54+']"
                label="Seleccionar cliente"
                required
              ></v-select>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="blue" text="Guardar" variant="tonal" @click="dialog = false"></v-btn>
          <v-btn text="Cerrar" color="red" variant="tonal" @click="dialog = false"></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { shallowRef } from 'vue'
import { useOrderStore } from '../../stores/orderStore'

const orderStore = useOrderStore()
const dialog = shallowRef(false)
</script>

<style scoped></style>
