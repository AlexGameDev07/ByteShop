// Variable que guarda la ip para importarla en la ruta general del servidor

// URL base del servidor
export const SERVER_URL = `http://localhost:4000/api/`;

// Función que maneja las peticiones fetch
export default async function fetchData(filename, form = null) {
    // Opciones para la petición fetch
    const OPTIONS = {
        method: form ? 'POST' : 'GET', // Usa POST si se proporciona un formulario, de lo contrario usa GET
        ...(form && { body: form }) // Añade el cuerpo si se proporciona un formulario
    };

    try {
        // Construcción de la URL con los parámetros necesarios
        const PATH = new URL(SERVER_URL + filename);
        //PATH.searchParams.append('action', action);

        // Realización de la petición fetch
        const RESPONSE = await fetch(PATH.href, OPTIONS);

        // Verificación del estado de la respuesta
        if (!RESPONSE.ok) {
            throw new Error(`HTTP error! status: ${RESPONSE.status}`);
        }

        // Parseo del JSON de la respuesta
        const DATA = await RESPONSE.json();
        console.log('RESPONSE', DATA); // Para ver el JSON recibido
        return DATA;

    } catch (error) {
        console.error('Fetch error:', error);
        throw error; // Lanza el error para que useEffect pueda manejarlo
    }
};