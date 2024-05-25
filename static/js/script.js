document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm_password').value;

    // Validate the form
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    // Create a user object
    const user = {
        name: name,
        email: email,
        password: password
    };

    // Save the user object to localStorage
    localStorage.setItem('user', JSON.stringify(user));

    // Notify the user of success
    alert('Signup successful!');

    // Redirect to login page or another appropriate page
    window.location.href = 'login.html';
});
