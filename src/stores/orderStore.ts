import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useOrderStore = defineStore('OrderStore', () => {
  const cantidadProd = ref(0)
  const precioTotalProd = ref(0)

  async function addOrder(idProducto: number, cantidad: number, precio: number) {
    cantidadProd.value += 1
    precioTotalProd.value += precio
  }
  function resetOrder() {
    cantidadProd.value = 0
    precioTotalProd.value = 0
  }

  return {
    /*state properties*/
    cantidadProd,
    precioTotalProd,
    /*getters*/
    addOrder,
    /*actions*/
    resetOrder,
  }
})
