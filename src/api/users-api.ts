import { useLoginStore } from '@/stores/loginStore'

const baseUrl = import.meta.env.VITE_APP_API_BASE_URL

export async function getUsers() {
  const loginStore = useLoginStore()
  try {
    const response = await fetch(baseUrl + `users`, {
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

export async function getClients() {
  const loginStore = useLoginStore()
  try {
    const response = await fetch(baseUrl + `users/clients`, {
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

export async function updateStatus(idUsuario: number) {
  const loginStore = useLoginStore()

  try {
    const response = await fetch(baseUrl + `users/${idUsuario}`, {
      method: 'PUT',
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
