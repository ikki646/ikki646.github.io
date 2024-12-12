// URL to send the POST request

// Get references to the elements
const dateInput = document.getElementById('dateInput');
const timeInput = document.getElementById('timeInput');
const setStartTimeBtn = document.getElementById('setStartTimeBtn');

// Add click event listener to the button
setStartTimeBtn.addEventListener('click', () => {
    const postUrl = "https://hallebardiers-warmste-week.onrender.com/start-time/set";
    const dateValue = dateInput.value; // yyyy-mm-dd format
    const timeValue = timeInput.value; // HH:mm format

    // Validate that both date and time are selected
    if (!dateValue || !timeValue) {
      alert('Please select both a date and a time.');
      return;
    }

    // Combine date and time into a single ISO string
    const timestamp = new Date(`${dateValue}T${timeValue}:00`).toISOString();

    // Validate that the timestamp is correctly formed
    if (isNaN(new Date(timestamp))) {
      alert('Invalid date or time format.');
      return;
    }

    // Create the POST request
    fetch(postUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ timestamp }) // Send the value as JSON
    })
        .then(response => {
            if (response.ok) {
                alert("Value submitted successfully!");
            } else {
                alert("Failed to submit value.");
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("An error occurred while submitting the value.");
        });
});