// variables for elements
const startButton = document.getElementById('start');
const timerSpan = document.getElementById('time');
const finalScoreSpan = document.getElementById('final-score');
const imageEl = document.getElementById('image');
// variables for screens
const startScreenDiv = document.getElementById('start-screen');
const questionsScreenDiv = document.getElementById('questions');
const endScreenDiv = document.getElementById('end-screen');
const feedbackDiv = document.getElementById('feedback');
// variable for countdown timer function
var timeInterval = setInterval;
// variables for game state
let start = false;
let finalScore = 0;
// array of image URLs
const imageUrls = [
    './assets/images/cats/cats (1).jpg',
    './assets/images/cats/cats (2).jpg',
    './assets/images/cats/cats (3).jpg',
    './assets/images/cats/cats (4).jpg',
    './assets/images/cats/cats (5).jpg',
    './assets/images/cats/cats (6).jpg',
    './assets/images/cats/cats (7).jpg',
    './assets/images/cats/cats (8).jpg',
];

// generate a random image (get path from imageUrls array) and populate image element on page with it
function generateImage() {
    const imageIndex = Math.floor(Math.random () * imageUrls.length);
    return imageUrls[imageIndex];
}
imageEl.src = generateImage();

// countdown function (called by start button being clicked)
function countdown() {
    // set initial timer value to 60 seconds
    timeLeft = 60;

    // start timer countdown
    timeInterval = setInterval(function() {
        timeLeft--;
        timerSpan.innerText = timeLeft;

        // if countdown goes to 0 and quiz is not complete
        if (timeLeft === 0) {
            // ask the user if they want to try again
            let tryAgain = confirm("Sorry, time has run out, you lost! Do you want to try again?");
            // run end countdown function
            endCountdown();

            // if the user wants to try again; reload quiz, else take the user back to the start page
            if (tryAgain) {
                // TODO: not loading first question
                startQuiz();
            } else {
                alert("Thank you for playing");
                startScreenDiv.classList.toggle("show");
                // TODO: still showing first question
                questionsScreenDiv.classList.toggle("hide");
            }
        }
    }, 1000);
};

// end the countdown and clear it
function endCountdown() {
    start = false;
    clearInterval(timeInterval);
    // go back to start screen
}

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
    // hide questions screen and show end screen
    questionsScreenDiv.classList.toggle("hide");
    endScreenDiv.classList.toggle("show");

    // display final score
    finalScoreSpan.innerText = finalScore

    // end countdown
    endCountdown();

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