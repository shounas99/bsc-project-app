<template>
  <v-app-bar color="teal-darken-3" dark>
    <v-toolbar-title class="font-weight-bold">Panel de Administración BSC</v-toolbar-title>
    <v-spacer />

    <div class="d-flex gap-4">
      <v-btn
        v-for="item in navItems"
        :key="item.name"
        :to="item.to"
        variant="text"
        class="text-white"
        exact
        exact-active-class="active-link"
      >
        <v-icon start>{{ item.icon }}</v-icon>
        {{ item.name }}
      </v-btn>
    </div>
    <v-spacer />

    <v-btn color="red-darken-2" @click="logout" class="ml-2">
      <v-icon start>mdi-logout</v-icon>
      Salir
    </v-btn>
  </v-app-bar>
</template>

<script setup lang="ts">
const navItems = [
  { name: 'Productos', icon: 'mdi-store-outline', to: '/products' },
  { name: 'Pedidos', icon: 'mdi-package', to: '/orders' },
  { name: 'Usuarios', icon: 'mdi-account-multiple-outline', to: '/users' },
]

const logout = () => {
  console.log('Cerrar sesión')
}
</script>

<style scoped>
.active-link {
  background-color: #4db6ac;
  border-radius: 8px;
}
.gap-4 > * {
  margin-right: 1rem;
}
</style>
