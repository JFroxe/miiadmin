const SUPABASE_URL = 'https://edqvnhqcwiaqvgxfoesn.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkcXZuaHFjd2lhcXZneGZvZXNuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMxMzkzNTYsImV4cCI6MjA1ODcxNTM1Nn0.7CGCjT8hauwYXdWQ52OeNCRBq0fIBTjrfya-pUHxDT8';
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const loginContainer = document.getElementById('login-container');
const appContainer = document.getElementById('app-container');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const loginButton = document.getElementById('login-button');
const solicitudesList = document.getElementById('solicitudes-list');
const openModalButton = document.getElementById('open-modal');
const solicitudModal = document.getElementById('solicitudModal');
const closeModalButton = document.querySelector('.close');
const solicitudForm = document.getElementById('solicitudForm');

let user = null;

async function fetchSolicitudes() {
    const { data, error } = await supabase
        .from('solicitudes')
        .select('*')
        .eq('user_id', user.id);

    if (error) {
        console.error(error);
        return;
    }

    solicitudesList.innerHTML = '';
    data.forEach(solicitud => {
        const li = document.createElement('li');
        li.textContent = `${solicitud.dispositivo} - ${solicitud.descripcion}`;
        solicitudesList.appendChild(li);
    });
}

loginButton.addEventListener('click', async () => {
    const email = emailInput.value;
    const password = passwordInput.value;

    const { user: supabaseUser, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
        console.error(error);
        alert('Error al iniciar sesión.');
        return;
    }

    user = supabaseUser;
    loginContainer.style.display = 'none';
    appContainer.style.display = 'block';
    fetchSolicitudes();
});

openModalButton.addEventListener('click', () => {
    solicitudModal.style.display = 'block';
});

closeModalButton.addEventListener('click', () => {
    solicitudModal.style.display = 'none';
});

solicitudForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const dispositivo = document.getElementById('dispositivo').value;
    const imei = document.getElementById('imei').value;
    const descripcion = document.getElementById('descripcion').value;
    const password = document.getElementById('password').value;
    const servicios = document.getElementById('servicios').value;
    const presupuesto = document.getElementById('presupuesto').value;
    const fechaIngreso = document.getElementById('fechaIngreso').value;
    const fechaCompromiso = document.getElementById('fechaCompromiso').value;
    const notas = document.getElementById('notas').value;

    const { data, error } = await supabase
        .from('solicitudes')
        .insert([{
            dispositivo, imei, descripcion, password, servicios, presupuesto, fechaIngreso, fechaCompromiso, notas, user_id: user.id
        }]);

    if (error) {
        console.error(error);
        alert('Error al enviar la solicitud.');
        return;
    }

    solicitudModal.style.display = 'none';
    solicitudForm.reset();
    fetchSolicitudes();
});

document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

        button.classList.add('active');
        document.getElementById(button.dataset.tab).classList.add('active');
    });
});
