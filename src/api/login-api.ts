const baseUrl = import.meta.env.VITE_APP_API_BASE_URL

export async function loginApi(email: string, password: string) {
  try {
    const response = await fetch(baseUrl + `access/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        correo: email,
        contrasenia: password,
      }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error en loginApi:', error)
    throw error
  }
}

export async function addUser(
  nombre: string,
  aPaterno: string,
  aMaterno: string,
  domicilio: string,
  telefono: string,
  correo: string,
  contrasenia: string,
  idPerfil: number,
) {
  try {
    const response = await fetch(baseUrl + `access/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nombre: nombre,
        aPaterno: aPaterno,
        aMaterno: aMaterno,
        domicilio: domicilio,
        telefono: telefono,
        correo: correo,
        contrasenia: contrasenia,
        idPerfil: idPerfil,
      }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error addUsers', error)
    throw error
  }
}
