const SUPABASE_URL = 'https://edqvnhqcwiaqvgxfoesn.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkcXZuaHFjd2lhcXZneGZvZXNuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMxMzkzNTYsImV4cCI6MjA1ODcxNTM1Nn0.7CGCjT8hauwYXdWQ52OeNCRBq0fIBTjrfya-pUHxDT8';
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const loginRegisterContainer = document.getElementById('login-register-container');
const loginContainer = document.getElementById('login-container');
const registerContainer = document.getElementById('register-container');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('loginPassword');
const loginButton = document.getElementById('login-button');
const registerEmailInput = document.getElementById('registerEmail');
const registerPasswordInput = document.getElementById('registerPassword');
const registerButton = document.getElementById('register-button');
const registerLink = document.getElementById('register-link');
const loginLink = document.getElementById('login-link');

// ... (El resto del código para la aplicación permanece igual)

registerLink.addEventListener('click', (event) => {
    event.preventDefault();
    loginContainer.style.display = 'none';
    registerContainer.style.display = 'block';
});

loginLink.addEventListener('click', (event) => {
    event.preventDefault();
    registerContainer.style.display = 'none';
    loginContainer.style.display = 'block';
});

registerButton.addEventListener('click', async () => {
    const email = registerEmailInput.value;
    const password = registerPasswordInput.value;

    const { user, error } = await supabase.auth.signUp({ email, password });

    if (error) {
        console.error(error);
        alert('Error al registrar usuario.');
        return;
    }

    alert('Usuario registrado correctamente. Inicia sesión.');
    registerContainer.style.display = 'none';
    loginContainer.style.display = 'block';
});
