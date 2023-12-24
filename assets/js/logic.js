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

// generate a random image for quiz questions (get path from imageUrls array) and populate image element on page with it
function generateImage() {
    const imageIndex = Math.floor(Math.random() * imageUrls.length);
    return imageUrls[imageIndex];
}
imageEl.src = generateImage();

// start quiz (display first question)
function startQuiz() {
    // variables
    const length = maineCoonQuiz.length;

    // hide start screen and show questions screen
    startScreenDiv.classList.add("hide");
    questionsScreenDiv.classList.add("show");

    // variables for elements
    const questionTitle = document.getElementById('question-title');
    const choicesContainer = document.getElementById('choices');

    // display first question title
    questionTitle.innerText = maineCoonQuiz[0].questionTitle;

    // display first question choices
    maineCoonQuiz[0].choices.forEach((choice, index) => {
        const choiceEl = document.createElement("p");
        const checkboxEl = document.createElement("input");
        checkboxEl.type = "checkbox";
        choiceEl.appendChild(checkboxEl);
        choiceEl.appendChild(document.createTextNode(choice));
        choicesContainer.appendChild(choiceEl);

        // event listener for answer selection: listen for checkbox click and assign user answer to the userAnswer variable
        if (index === 0) {
            checkboxEl.addEventListener('click', function () {
                let userAnswer = checkboxEl.checked;
                console.log(choice);
            });
        }
    });
}

// countdown function (called by start button being clicked)
function countdown() {
    // set initial timer value to 20 seconds
    timeLeft = 20;

    // start timer countdown
    timeInterval = setInterval(function () {
        timeLeft--;
        timerSpan.innerText = timeLeft;

        // if countdown goes to 0 and quiz is not complete
        if (timeLeft === 0) {
            // run function to handle the end of the quiz
            timeRunOut();
        }
    }, 1000);
}

// function to handle the end of the quiz
function timeRunOut() {
    // ask the user if they want to try again
    alert(`Sorry, time has run out! You got ${finalScore} questions correct`);
    // run end countdown function
    endQuiz();
}

// end quiz (display end screen)
function endQuiz() {
    // end the countdown and clear it
    start = false;
    clearInterval(timeInterval);

    // hide questions screen and show end screen
    questionsScreenDiv.classList.remove("show");
    endScreenDiv.classList.add("show");

    // display final score
    finalScoreSpan.innerText = finalScore

    // allow user to enter their initials (score together with score in local storage)

    // take user to highscores page
    // high scores are sorted, highest to lowest
    // user has the option to take thw quiz again

}

// event listener for start button press
startButton.addEventListener('click', function () {
    start = true;
    countdown();
    startQuiz();
});

// once user selects an answer, store it and load next question
// event listener for click
// compare users answer (userAnswer) with maineCoonQuiz[i].answer
// runningScore++ if a match, and tell them
// otherwise continue (no score increment), tell them and subtract 10 seconds from the timer
// new question appears a few seconds later

// load next questions

/*
for (let i = 0; i < length; i++) {
    questionTitle.innerText = maineCoonQuiz[0].questionTitle;
}
*/