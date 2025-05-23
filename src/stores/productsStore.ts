import { ref } from 'vue'
import { defineStore } from 'pinia'

import type { IProducts } from '@/interfaces/IProducts'
import { getProducts } from '@/api/products-api'

export const useProductStore = defineStore('ProductStore', () => {
  const dataProducts = ref<IProducts>()

  async function loadProducts() {
    const response = await getProducts()
    dataProducts.value = response
  }

  async function addProduct(idProducto: number) {
    if (dataProducts.value) {
      const product = dataProducts.value.find((p) => p.idProducto === idProducto)
      if (product && product.cantidad > 0) {
        product.cantidad -= 1
      }
    }
  }

  return {
    /*state properties*/
    dataProducts,
    /*getters*/
    loadProducts,
    addProduct,
    /*actions*/
  }
})
