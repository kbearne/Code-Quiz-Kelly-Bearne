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

// variables for countdown timer
var timeInterval = setInterval;
var timeLeft = 0;

// variables for game state
let finalScore = 0;
let userInitials = "";
let start = false;
let existingHighScoresData = [];
const highScores = [
    { initial: 'KB', score: 0 },
]

// array of image URLs (to generate random images for the quiz questions)
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

// generate a random image for each quiz question (get path from imageUrls array) and populate image element on page with it
function generateImage() {
    const imageIndex = Math.floor(Math.random() * imageUrls.length);
    return imageUrls[imageIndex];
}
imageEl.src = generateImage();

// countdown function (called by start button being clicked)
function countdown() {
    // set initial timer value to 20 seconds
    timeLeft = 60;

    // start timer countdown
    timeInterval = setInterval(function () {
        timeLeft--;
        timerSpan.innerText = timeLeft;

        // if countdown goes to 0 and quiz is not complete
        if (timeLeft === 0) {
            // ensure 0 is displayed on screen
            timerSpan.innerText = "0";
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

function startQuiz() {
    // variables
    const length = maineCoonQuiz.length;
    let userAnswer = "";
    let currentQuestionIndex = 0;

    // hide start screen and show questions screen
    startScreenDiv.classList.add("hide");
    questionsScreenDiv.classList.add("show");

    function displayQuestion() {
        // Check if all questions have been answered
        if (currentQuestionIndex >= length) {
            // If all questions answered, end the quiz
            endQuiz();
            return;
        }

        // variables for elements
        const questionTitle = document.getElementById('question-title');
        const choicesContainer = document.getElementById('choices');

        // display the current question title
        questionTitle.innerText = maineCoonQuiz[currentQuestionIndex].questionTitle;

        // clear previous choices
        choicesContainer.innerHTML = "";

        // display the current question
        maineCoonQuiz[currentQuestionIndex].choices.forEach((choice, index) => {
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
                if (userAnswer === maineCoonQuiz[currentQuestionIndex].answer) {
                    finalScore++;
                    alert("Well done, that was correct!");
                } else {
                    timeLeft = timeLeft - 10;
                    alert("Sorry, that was incorrect! 10 seconds have been deducted from the timer!");
                    if (timeLeft <= 0) {
                        timeRunOut();
                    }
                }

                // Move to the next question
                currentQuestionIndex++;
                // Display the next question
                displayQuestion();
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

    // Start displaying questions
    displayQuestion();
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