// variables for elements
const clearButton = document.getElementById('clear'),
highScoresElement = document.getElementById('highscores');

document.addEventListener('DOMContentLoaded', function () {
    // Try to retrieve highScores from local storage
    const storedHighScores = localStorage.getItem('highScores');

    if (storedHighScores) {
        try {
            const highScores = JSON.parse(storedHighScores);
            displayHighScores(highScores);
        } catch (error) {
            console.error("Error parsing stored highScores:", error);
        }
    } else {
        console.error("Error: 'highScores' not found in local storage.");
    }
});

function displayHighScores(highScores) {
    highScores.forEach((entry, index) => {
        const listItemEl = document.createElement('li');
        listItemEl.textContent = `Score ${index + 1}: ${entry.initial} - ${entry.score}`;
        highScoresElement.appendChild(listItemEl);
    });
}

// event listener for clear highscores button press
if (clearButton) {
    clearButton.addEventListener('click', function () {
        // Clear high scores from local storage
        localStorage.removeItem('highScores');

        // Clear high scores displayed on the page
        highScoresElement.innerHTML = '';
    });
}