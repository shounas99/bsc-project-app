import { useLoginStore } from '@/stores/loginStore'

const baseUrl = import.meta.env.VITE_APP_API_BASE_URL

export async function getProducts() {
  const loginStore = useLoginStore()

  try {
    const response = await fetch(baseUrl + `products`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${loginStore.dataLogin?.token}`,
      },
    })

    if (!response.ok) {
      throw new Error(`${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    throw error
  }
}

export async function addProduct(
  producto: string,
  precio: number,
  cantidad: number,
  idCategoria: number,
) {
  const loginStore = useLoginStore()

  try {
    const response = await fetch(baseUrl + `products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${loginStore.dataLogin?.token}`,
      },
      body: JSON.stringify({
        producto: producto,
        precio: precio,
        cantidad: cantidad,
        idCategoria: idCategoria,
      }),
    })

    if (!response.ok) {
      throw new Error(`${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    throw error
  }
}

export async function updateProduct(
  idProducto: number,
  producto: string,
  precio: number,
  cantidad: number,
  idCategoria: number,
) {
  const loginStore = useLoginStore()

  try {
    const response = await fetch(baseUrl + `products/${idProducto}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${loginStore.dataLogin?.token}`,
      },
      body: JSON.stringify({
        producto: producto,
        precio: precio,
        cantidad: cantidad,
        idCategoria: idCategoria,
      }),
    })

    if (!response.ok) {
      throw new Error(`${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    throw error
  }
}

export async function deleteProduct(idProducto: number) {
  const loginStore = useLoginStore()

  try {
    const response = await fetch(baseUrl + `products/${idProducto}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${loginStore.dataLogin?.token}`,
      },
    })

    if (!response.ok) {
      throw new Error(`${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    throw error
  }
}
