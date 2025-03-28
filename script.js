const solicitudForm = document.getElementById('solicitudForm');
const mensajeDiv = document.getElementById('mensaje');

solicitudForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const modelo = document.getElementById('modelo').value;
    const descripcion = document.getElementById('descripcion').value;
    const nombre = document.getElementById('nombre').value;
    const telefono = document.getElementById('telefono').value;
    const imagen = document.getElementById('imagen').files[0];

    // Aquí iría el código para enviar la solicitud a la API
    // Por ahora, solo mostraremos un mensaje
    mensajeDiv.textContent = 'Solicitud enviada correctamente.';
});
