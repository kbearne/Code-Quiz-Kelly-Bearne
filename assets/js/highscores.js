// variables for elements
const clearButton = document.getElementById('clear'),
highScoresElement = document.getElementById('highscores');

document.addEventListener('DOMContentLoaded', function () {
    // try to retrieve highScores from local storage
    const storedHighScores = localStorage.getItem('highScores');

    if (storedHighScores) {
        try {
            const highScores = JSON.parse(storedHighScores);
            displayHighScores(highScores);
        } catch (error) {
            console.error("Error parsing stored highScores:", error);
        }
    } else {
        // handle the case when 'highScores' is not found in local storage
        console.warn("No highScores found in local storage.");
    }
});

// display highscores dynamically on the page
function displayHighScores(highScores) {
    // sort the high scores in descending order based on the score values
    const sortedHighScores = highScores.sort((a, b) => b.score - a.score);

    // clear existing entries in the highScoresElement
    highScoresElement.innerHTML = '';

    // display the sorted high scores on the page
    sortedHighScores.forEach((entry, index) => {
        const listItemEl = document.createElement('li');
        listItemEl.textContent = `Score ${index + 1}: ${entry.initial} - ${entry.score}`;
        highScoresElement.appendChild(listItemEl);
    });
}

// event listener for clear highscores button press
if (clearButton) {
    clearButton.addEventListener('click', function () {
        // clear high scores from local storage
        localStorage.removeItem('highScores');

        // clear high scores displayed on the page
        highScoresElement.innerHTML = '';
    });
}