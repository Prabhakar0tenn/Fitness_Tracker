document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    // In a real app, you would validate credentials here
    // For this demo, we'll just redirect to dashboard
    window.location.href = 'dashboard.html';
});