if (!localStorage.getItem('isAuthenticated') && !window.location.pathname.endsWith('login.html')) {
    window.location.href = 'login.html';
}
