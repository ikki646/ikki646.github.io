let money = 0;

setInterval(async () => {
    try {
    const response = await fetch('https://hallebardiers-warmste-week.onrender.com/money-raised/');
    const data = await response.json();
    let newValue = data.money;
    let difference = newValue - money;

    // Update the UI with the new value
    if (difference !== 0) {
        let duration =3000;
        let stepTime = 10;
        let steps = duration / stepTime;
        let increment = difference / steps;

        console.log(`fetched, difference: ${difference}, steps: ${stepTime}, increment: ${increment}`);

        document.querySelectorAll('.count').forEach(function (element) {
        function updateCounter() {
            money += increment;
            if (money < newValue) {
            requestAnimationFrame(updateCounter);
            element.textContent = Math.ceil(money);
            } else {
            element.textContent = newValue;
            money = newValue;
            }
        }

        updateCounter();
        });
    }
    } catch (error) {
    console.error('Error fetching data:', error);
    }
}, 3000);  // Poll every 3 seconds
