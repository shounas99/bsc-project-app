<template>
  <v-container>
    <v-sheet border rounded>
      <v-data-table :headers="headers" :items="products" color="primary">
        <template v-slot:top>
          <v-toolbar flat color="primary">
            <v-toolbar-title> Productos BSC </v-toolbar-title>

            <v-btn
              class="me-2"
              prepend-icon="mdi-plus"
              rounded="lg"
              text="Añadir Producto"
              border
              @click="add"
            ></v-btn>
          </v-toolbar>
        </template>

        <template v-slot:[`item.actions`]="{ item }">
          <div class="d-flex ga-2 justify-end">
            <v-icon color="golden" icon="mdi-pencil" size="large" @click="edit(item)"></v-icon>
            <v-icon
              color="red"
              icon="mdi-delete"
              size="large"
              @click="dialogRemove(item.idProducto)"
            ></v-icon>
          </div>
        </template>
      </v-data-table>
    </v-sheet>

    <v-dialog v-model="dialog" max-width="500">
      <v-card :subtitle="`${isEditing ? 'Actualizar' : 'Crear'} Producto`">
        <template v-slot:text>
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="form.producto" label="Nombre del Producto"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="form.precio" label="Precio por unidad"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="form.cantidad" label="Cantidad"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-select
                v-model="form.idCategoria"
                :items="categories"
                label="Categoria del Producto"
                item-title="categoriaProducto1"
                item-value="idCategoriaProducto"
              ></v-select>
            </v-col>
          </v-row>
        </template>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn text="Guardar" @click="save()" variant="tonal" elevation="3" color="blue"></v-btn>
          <v-btn
            text="Cancelar"
            variant="tonal"
            @click="cancel()"
            elevation="3"
            color="red"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <div class="text-center pa-4">
      <v-dialog v-model="dialogDelete" max-width="500" persistent>
        <v-card prepend-icon="mdi-alert-box" title="¿Desea eliminar el producto?">
          <template v-slot:actions>
            <v-btn
              text="Aceptar"
              variant="tonal"
              @click="remove"
              elevation="3"
              color="blue"
            ></v-btn>
            <v-btn
              text="Cancelar"
              variant="tonal"
              @click="dialogDelete = false"
              elevation="3"
              color="red"
            ></v-btn>
          </template>
        </v-card>
      </v-dialog>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { getProducts, addProduct, updateProduct, deleteProduct } from '@/api/products-api'
import { getCategoryProducts } from '@/api/catalogs-api'

const form = ref({
  idProducto: 0,
  producto: '',
  precio: 0,
  cantidad: 0,
  idCategoria: 0,
})

const dialog = ref(false)
const dialogDelete = ref(false)
const products = ref<Product[]>([])
const isEditing = ref(false)

const categories = ref({
  idCategoriaProducto: 0,
  categoriaProducto1: '',
})

type Product = {
  idProducto: number
  producto: string
  precio: number
  cantidad: number
  idCategoriaProducto: number
}

const headers = [
  { title: 'Producto', key: 'producto', align: 'start' },
  { title: 'Categoria', key: 'categoriaProducto' },
  { title: 'Precio', key: 'precio' },
  { title: 'Cantidad', key: 'cantidad' },
  { title: 'Acciones', key: 'actions', align: 'end', sortable: false },
]

async function getAllProducts() {
  const response = await getProducts()
  products.value = response
}

async function getCategories() {
  const response = await getCategoryProducts()
  categories.value = response
}

function resetForm() {
  form.value.idProducto = 0
  form.value.producto = ''
  form.value.precio = 0
  form.value.cantidad = 0
  form.value.idCategoria = 0
}
async function save() {
  if (isEditing.value) {
    //edit
    await updateProduct(
      form.value.idProducto,
      form.value.producto,
      form.value.precio,
      form.value.cantidad,
      form.value.idCategoria,
    )
  } else {
    //new
    await addProduct(
      form.value.producto,
      form.value.precio,
      form.value.cantidad,
      form.value.idCategoria,
    )
  }
  resetForm()
  getAllProducts()
  dialog.value = false
}

async function remove() {
  await deleteProduct(form.value.idProducto)
  getAllProducts()
  dialogDelete.value = false
}
async function dialogRemove(idProduct: number) {
  dialogDelete.value = true
  form.value.idProducto = idProduct
}

async function edit(item: Product) {
  isEditing.value = true

  form.value.idProducto = item.idProducto
  form.value.producto = item.producto
  form.value.precio = item.precio
  form.value.cantidad = item.cantidad
  form.value.idCategoria = item.idCategoriaProducto

  dialog.value = true
}

function cancel() {
  dialog.value = false
  resetForm()
}

function add() {
  isEditing.value = false

  dialog.value = true
}

onMounted(() => {
  getAllProducts()
  getCategories()
})
</script>
