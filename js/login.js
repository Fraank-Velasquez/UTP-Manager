// Sistema de autenticación
const VALID_CREDENTIALS = {
    username: 'usuario',
    password: '123456',
    name: 'Usuario',
    email: 'user'
};

function handleLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (username === VALID_CREDENTIALS.username && password === VALID_CREDENTIALS.password) {
        // Guardar sesión
        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('userName', VALID_CREDENTIALS.name);
        sessionStorage.setItem('userEmail', VALID_CREDENTIALS.email);
        
        // Redirigir al dashboard
        window.location.href = '../index.html';
    } else {
        // Mostrar error
        const errorDiv = document.createElement('div');
        errorDiv.className = 'alert alert-danger alert-dismissible fade show mt-3';
        errorDiv.innerHTML = `
            <i class="bi bi-exclamation-triangle"></i> 
            Credenciales incorrectas. Usuario: usuario / Contraseña: 123456
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        document.querySelector('#loginForm').insertAdjacentElement('afterend', errorDiv);
        
        setTimeout(() => {
            errorDiv.remove();
        }, 3000);
    }
    
    return false;
}

// Verificar si ya está logueado
if (window.location.pathname.includes('login.html')) {
    if (sessionStorage.getItem('isLoggedIn') === 'true') {
        window.location.href = '../index.html';
    }
}
