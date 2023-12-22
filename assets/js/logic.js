// Set of questions --> array of objects (stored in questions.js)
// Each question needs the following:
  // Question text X
  // Set of answers X
  // Which answer is correct X

// Landing page (div id start-screen):
  // Explanation of the quiz X
  // Start button X

// Click the start button (button id start):
  // Landing page goes away X
  // Timer starts X
  // The first question appears (with its answers) X

// For each question:
  // User clicks an answer
  // Their choice is compared to the correct answer as stored in the question's object
  // If correct, tell them
  // If incorrect, tell them AND subtract time from the timer
  // Either way, the question disappears after a few seconds and the next question appears

// After the last question:
  // Timer stops
  // Question disappears
  // Form appears for user to enter their initials
  // Display their score

// User submits form
  // Initials and score get stored in local storage
  // User is taken to the high scores page
  // High scores are listed, sorted highest to lowest
  // User has option to take the quiz again

// variables for elements
const startButton = document.getElementById('start');
const timerSpan = document.getElementById('time');
// variables for screens
const startScreenDiv = document.getElementById('start-screen');
const questionsScreenDiv = document.getElementById('questions');
const endScreenDiv = document.getElementById('end-screen');
const feedbackDiv = document.getElementById('feedback');

let start = false;

// countdown function (called by start button event listener)
function countdown() {
    timeLeft = 60;

    const timeInterval = setInterval(function() {
        timeLeft--;
        timerSpan.innerText = timeLeft;

        if (timeLeft === 0) {
            start = false;
            alert("Sorry, you lost! Try again");
            clearInterval(timeInterval);
            // go back to start screen
        }
    }, 1000);
};

// start quiz (display questions)
function startQuiz() {
    // hide start screen and show questions screen
    startScreenDiv.classList.toggle("hide");
    questionsScreenDiv.classList.toggle("show");

    // variables for elements
    const questionTitle = document.getElementById('question-title');
    const choicesContainer = document.getElementById('choices');

    // display first question title
    questionTitle.innerText = maineCoonQuiz[0].questionTitle;

    // display first question choices
    maineCoonQuiz[0].choices.forEach(choice => {
        const choiceEl = document.createElement("p");
        choiceEl.textContent = choice;
        choicesContainer.appendChild(choiceEl);
    });

    /*
    for (let i = 0; i < maineCoonQuiz.length; i++) {
        questionTitle.innerText = maineCoonQuiz[0].questionTitle;

    }
    */
}

// event listener for start button press
startButton.addEventListener('click', function() {
    start = true;
    countdown();
    startQuiz();
});