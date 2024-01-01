// variables for elements
const startButton = document.getElementById('start'),
    submitButton = document.getElementById('submit'),
    timerSpan = document.getElementById('time'),
    finalScoreSpan = document.getElementById('final-score'),
    imageEl = document.getElementById('image'),
    highScoreEl = document.getElementById('highscores');

// variables for screens
const startScreenDiv = document.getElementById('start-screen'),
    questionsScreenDiv = document.getElementById('questions'),
    endScreenDiv = document.getElementById('end-screen'),
    feedbackDiv = document.getElementById('feedback');

// variables for countdown timer
var timeInterval = setInterval,
    timeLeft = 0;

// variables for game state
let finalScore = 0,
    userInitials = "",
    start = false,
    existingHighScoresData = [];
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

// generate a random image for each quiz question (get path from imageUrls array) and populate image element on index.html with it
function generateImage() {
    const imageIndex = Math.floor(Math.random() * imageUrls.length);
    return imageUrls[imageIndex];
}
imageEl.src = generateImage();

// countdown function (called by start button being clicked)
function countdown() {
    // set initial timer value to 90 seconds
    timeLeft = 90;

    // start timer countdown (counts in seconds)
    timeInterval = setInterval(function () {
        timeLeft--;
        timerSpan.innerText = timeLeft;

        // if countdown goes to 0 and quiz is not complete then show timeleft as 0 on the page and run the timeRunout function
        if (timeLeft === 0) {
            timerSpan.innerText = "0";
            timeRunOut();
        }
    }, 1000);
}

// handle the end of the quiz - alert the user and run the endQuiz function
function timeRunOut() {
    alert(`Sorry, time has run out! You got ${finalScore} questions correct`);
    endQuiz();
}

// start the quiz and display the questions to the user
function startQuiz() {
    // variables
    const length = maineCoonQuiz.length;
    let userAnswer = "",
        currentQuestionIndex = 0;

    // hide start screen and show questions screen
    startScreenDiv.classList.add("hide");
    questionsScreenDiv.classList.add("show");

    // function that handles the display of quetions
    function displayQuestion() {
        // check if all questions have been answered, if so then exit this function and trigger the endQuiz function
        if (currentQuestionIndex >= length) {
            endQuiz();
            return;
        }

        // variables for elements
        const questionTitle = document.getElementById('question-title'),
            choicesContainer = document.getElementById('choices');

        // display the current question title
        questionTitle.innerText = maineCoonQuiz[currentQuestionIndex].questionTitle;

        // clear previous choices
        choicesContainer.innerHTML = "";

        // display the current question
        maineCoonQuiz[currentQuestionIndex].choices.forEach((choice, index) => {
            // create the question elements dynamically (to populate index.html)
            const choiceEl = document.createElement("p"),
                radioEl = document.createElement("input");
            radioEl.type = "radio";
            radioEl.name = "answer";
            choiceEl.appendChild(radioEl);
            choiceEl.appendChild(document.createTextNode(choice));
            choicesContainer.appendChild(choiceEl);

            // event listener for answer choice - when a radio button is clicked by the user
            radioEl.addEventListener('click', function () {
                // userAnswer variable is populated when a radio button is clicked
                userAnswer = choice;
                // disable all radio buttons after the first click
                disableRadioButtons();

                // alert the user if their answer was correct or not; if the answer is correct then increment the final score, if incorrect then deduct 10 seconds from the timer, if timer reaches 0 or less then trigger the timeRunOut function
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

                // increment the variable tracking the current question index
                currentQuestionIndex++;

                // display the next question
                displayQuestion();
            });
        });

        // disable all radio buttons after first click
        function disableRadioButtons() {
            const radioButtons = document.querySelectorAll('input[name="answer"]');
            radioButtons.forEach(button => {
                button.disabled = true;
            });
        }
    }

    // start displaying questions
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

    // validate user input
    if (userInitials === "") {
        alert("Please enter your initials.");
        return;
    }

    // store score together with user initials in local storage)
    const userEntry = { initial: userInitials, score: finalScore };

    // get existing highscores array
    existingHighScoresData = JSON.parse(localStorage.getItem('highScores')) || highScores;

    // push new entry to highscores array
    existingHighScoresData.push(userEntry);

    // save updated array to local storage
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