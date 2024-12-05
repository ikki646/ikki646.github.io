// URL to send the POST request

// Get references to the elements
const addFiveEuroBtn = document.getElementById('addFiveEuroBtn');
const addMoneyBtn = document.getElementById('addMoneyBtn');
const moneyInput = document.getElementById('moneyInput');
const setMoneyBtn = document.getElementById('setMoneyBtn');
const multiplier = 100;

// Add click event listener to the button
addFiveEuroBtn.addEventListener('click', () => {
    const postUrl = "https://hallebardiers-warmste-week.onrender.com/money-raised/add";
    let value = 5 * multiplier;

    // Create the POST request
    fetch(postUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ value }) // Send the value as JSON
    })
        .then(response => {
            if (response.ok) {
                console.log("5 euro submitted")
            } else {
                alert("Failed to submit value.");
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("An error occurred while submitting the value.");
        });
});

addMoneyBtn.addEventListener('click', () => {
    const postUrl = "https://hallebardiers-warmste-week.onrender.com/money-raised/add";
    let value = moneyInput.value; // Get value from the textbox

    if (value.trim() === "") {
        alert("Please enter a value before submitting.");
        return;
    }

    value = Number(value) * multiplier;

    // Create the POST request
    fetch(postUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ value }) // Send the value as JSON
    })
        .then(response => {
            if (response.ok) {
                console.log(`${value / multiplier} submitted`)
            } else {
                alert("Failed to submit value.");
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("An error occurred while submitting the value.");
        });
});

setMoneyBtn.addEventListener('click', () => {
    const postUrl = "https://hallebardiers-warmste-week.onrender.com/money-raised/set";
    let value = moneyInput.value;

    if (value.trim() === "") {
        alert("Please enter a value before submitting.");
        return;
    }

    value = Number(value) * multiplier;

    // Create the POST request
    fetch(postUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ value }) // Send the value as JSON
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