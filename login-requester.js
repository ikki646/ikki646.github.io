document.getElementById('passwordForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent form from refreshing the page

    const password = document.getElementById('password').value;

    try {
        // Replace this URL with the actual Web API endpoint
        const response = await fetch('https://hallebardiers-warmste-week.onrender.com/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ password })
        });

        if (!response.ok) {
            throw new Error('Failed to validate password');
        }

        const result = await response.text();
        sessionStorage.setItem("auth", result);
        // Navigate to a new page with the returned string
        window.location.href = `router.html`;
    } catch (error) {
        window.location.href = 'https://www.google.com';
        alert('An error occurred: ' + error.message);
    }
});