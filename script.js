// Obtener elementos del DOM
const mensajesDiv = document.getElementById('mensajes');
const mensajeInput = document.getElementById('mensajeInput');
const enviarBtn = document.getElementById('enviarBtn');

// Función para obtener los mensajes
async function obtenerMensajes() {
    try {
        const respuesta = await fetch('mensajes.json');
        const mensajes = await respuesta.json();
        mostrarMensajes(mensajes);
    } catch (error) {
        console.error('Error al obtener mensajes:', error);
    }
}

// Función para mostrar los mensajes
function mostrarMensajes(mensajes) {
    mensajesDiv.innerHTML = '';
    mensajes.forEach(mensaje => {
        const mensajeElemento = document.createElement('p');
        mensajeElemento.textContent = mensaje;
        mensajesDiv.appendChild(mensajeElemento);
    });
}

// Función para enviar un mensaje
async function enviarMensaje() {
    const mensaje = mensajeInput.value;
    if (mensaje) {
        try {
            const respuesta = await fetch('mensajes.json');
            const mensajes = await respuesta.json();
            mensajes.push(mensaje);
            //Aquí iria el código para actualizar el json en github, este es el punto más complejo.
            console.log(mensajes);
            mensajeInput.value = '';
            obtenerMensajes();
        } catch (error) {
            console.error('Error al enviar mensaje:', error);
        }
    }
}

// Eventos
enviarBtn.addEventListener('click', enviarMensaje);

// Actualizar mensajes cada 5 segundos
setInterval(obtenerMensajes, 5000);

// Obtener mensajes iniciales
obtenerMensajes();
