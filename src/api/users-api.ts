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
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error getUsers', error)
    throw error
  }
}
