// variables for elements
const startButton = document.getElementById('start');
const submitButton = document.getElementById('submit');
const timerSpan = document.getElementById('time');
const finalScoreSpan = document.getElementById('final-score');
const imageEl = document.getElementById('image');
const highScoreEl = document.getElementById('highscores');

// variables for screens
const startScreenDiv = document.getElementById('start-screen');
const questionsScreenDiv = document.getElementById('questions');
const endScreenDiv = document.getElementById('end-screen');
const feedbackDiv = document.getElementById('feedback');

// variables for countdown timer function
var timeInterval = setInterval;
var timeLeft = 0;
let finalScore = 0;
let userInitials = "";

// variables for game state
let start = false;

// variable for highscore data
let existingHighScoresData = [];

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

// array of high scores
const highScores = [
    { initial: 'KB', score: 0 },
]

// generate a random image for quiz questions (get path from imageUrls array) and populate image element on page with it
function generateImage() {
    const imageIndex = Math.floor(Math.random() * imageUrls.length);
    return imageUrls[imageIndex];
}
imageEl.src = generateImage();

// TODO:
// once user selects an answer:
// compare userAnswer with maineCoonQuiz[i].answer
// alert them if wrong or right and:
// if correct increment finalScore
// if wrong deduct 10 seconds from timer
// load new question a few seconds later

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
    // prompt the user
    alert(`Sorry, time has run out! You got ${finalScore} questions correct`);
    // run end countdown function
    endQuiz();
}

// start quiz
// MOVE FIRST QUESTION TO NEW FUNCTION?
function startQuiz() {
    // variables
    const length = maineCoonQuiz.length;
    let userAnswer = "";

    // hide start screen and show questions screen
    startScreenDiv.classList.add("hide");
    questionsScreenDiv.classList.add("show");

    // variables for elements
    const questionTitle = document.getElementById('question-title');
    const choicesContainer = document.getElementById('choices');

    // display the first question title
    questionTitle.innerText = maineCoonQuiz[0].questionTitle;

    // display the first question
    maineCoonQuiz[0].choices.forEach((choice, index) => {
        // create the question elements dynamically
        const choiceEl = document.createElement("p");
        const radioEl = document.createElement("input");
        radioEl.type = "radio";
        radioEl.name = "answer";
        choiceEl.appendChild(radioEl);
        choiceEl.appendChild(document.createTextNode(choice));
        choicesContainer.appendChild(choiceEl);

        // event listener for answer choice - when a radio button is clicked
        radioEl.addEventListener('click', function () {
            // userAnswer variable is populated when a radio button is clicked
            userAnswer = choice;
            console.log(userAnswer);
            // disable all radio buttons after the first click
            disableRadioButtons();

            // tell the user if correct or not; if the answer is correct then increment the final score, if incorrect then deduct 10 seconds from the timer
            if (userAnswer === maineCoonQuiz[0].answer) {
                finalScore++;
                alert("Well done, that was correct!");
            } else {
                timeLeft = timeLeft - 10;
                alert("Sorry, that was incorrect! 10 seconds have been deducted from the timer!");
            }
        });
    });

    function disableRadioButtons() {
        const radioButtons = document.querySelectorAll('input[name="answer"]');
        // disable all radio buttons after first click
        radioButtons.forEach(button => {
            button.disabled = true;
        });
    }
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
    finalScoreSpan.innerText = finalScore;
}

// event listener for submitting highscore (and initials)
submitButton.addEventListener('click', function () {
    // allow user to enter their initials and store value in variable
    userInitials = document.getElementById('initials').value.trim();

    // Validate user input
    if (userInitials === "") {
        alert("Please enter your initials.");
        return;
    }

    // store score together with user initials in local storage)
    // create an object with final score and user initials
    const userEntry = { initial: userInitials, score: finalScore };

    // get existing highscores array
    existingHighScoresData = JSON.parse(localStorage.getItem('highScores')) || highScores;

    // push new entry to highscores array
    existingHighScoresData.push(userEntry);

    // save updated array back to local storage
    localStorage.setItem('highScores', JSON.stringify(existingHighScoresData));

    // navigate to highscores page and pass highScores as a query parameter
    window.location.href = `./assets/pages/highscores.html?highScores=${encodeURIComponent(JSON.stringify(existingHighScoresData))}`;
});

// event listener for start button press
startButton.addEventListener('click', function () {
    start = true;
    countdown();
    startQuiz();
    startButton.disabled = true;
});