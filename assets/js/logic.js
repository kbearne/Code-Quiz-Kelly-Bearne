// variables for elements
const startButton = document.getElementById('start');
const timerSpan = document.getElementById('time');
const finalScoreSpan = document.getElementById('final-score');
// variables for screens
const startScreenDiv = document.getElementById('start-screen');
const questionsScreenDiv = document.getElementById('questions');
const endScreenDiv = document.getElementById('end-screen');
const feedbackDiv = document.getElementById('feedback');
// variables for game state
let start = false;
let finalScore = 0;

// countdown function (called by start button being clicked)
function countdown() {
    // set initial timer value to 60 seconds
    timeLeft = 60;

    // start timer countdown
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

// start quiz (display first question)
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
        const checkboxEl = document.createElement("input");
        checkboxEl.type = "checkbox";
        choiceEl.appendChild(checkboxEl);
        choiceEl.appendChild(document.createTextNode(choice));
        choicesContainer.appendChild(choiceEl);
    });

    // once user selects an answer, store it and load next question
        // event listener for click?
        // 

// For each question:
    // User clicks an answer
    // Their choice is compared to the correct answer as stored in the question's object
    // If correct, tell them
    // If incorrect, tell them AND subtract time from the timer
    // Either way, the question disappears after a few seconds and the next question appears

    /*
    for (let i = 0; i < maineCoonQuiz.length; i++) {
        questionTitle.innerText = maineCoonQuiz[0].questionTitle;
    }
    */
}

// end quiz after last question (display end screen)
function endQuiz() {
    // stop timer

    // hide questions screen and show end screen
    questionsScreenDiv.classList.toggle("hide");
    endScreenDiv.classList.toggle("show");

    // display final score
    finalScoreSpan.innerText = finalScore

    // allow user to enter their initials
}

// User submits form
  // Initials and score get stored in local storage
  // User is taken to the high scores page
  // High scores are listed, sorted highest to lowest
  // User has option to take the quiz again

// event listener for start button press
startButton.addEventListener('click', function() {
    start = true;
    countdown();
    startQuiz();
});