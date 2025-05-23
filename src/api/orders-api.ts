import { useLoginStore } from '@/stores/loginStore'

const baseUrl = import.meta.env.VITE_APP_API_BASE_URL

export async function getAllOrders() {
  const loginStore = useLoginStore()

  try {
    const response = await fetch(baseUrl + `orders`, {
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

export async function addOrder(idCliente: number, cantidad: number, precio: number) {
  const loginStore = useLoginStore()

  try {
    const response = await fetch(baseUrl + `orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${loginStore.dataLogin?.token}`,
      },
      body: JSON.stringify({
        idCliente: idCliente,
        cantidad: cantidad,
        precio: precio,
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
