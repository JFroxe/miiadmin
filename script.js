const SUPABASE_URL = 'https://edqvnhqcwiaqvgxfoesn.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkcXZuaHFjd2lhcXZneGZvZXNuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMxMzkzNTYsImV4cCI6MjA1ODcxNTM1Nn0.7CGCjT8hauwYXdWQ52OeNCRBq0fIBTjrfya-pUHxDT8';
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const solicitudForm = document.getElementById('solicitudForm');
const mensajeDiv = document.getElementById('mensaje');

solicitudForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const modelo = document.getElementById('modelo').value;
    const descripcion = document.getElementById('descripcion').value;
    const nombre = document.getElementById('nombre').value;
    const telefono = document.getElementById('telefono').value;
    const imagen = document.getElementById('imagen').files[0];

    try {
        const { data, error } = await supabase
            .from('solicitudes')
            .insert([{ modelo, descripcion, nombre, telefono }]);

        if (error) {
            mensajeDiv.textContent = 'Error al enviar la solicitud.';
            console.error(error);
        } else {
            mensajeDiv.textContent = 'Solicitud enviada correctamente.';
            solicitudForm.reset();
        }
    } catch (error) {
        mensajeDiv.textContent = 'Error al enviar la solicitud.';
        console.error(error);
    }
});
