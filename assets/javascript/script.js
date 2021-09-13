var question0 = {
    question: "Which of the following is correct about the features of JavaScript?",
    answers: ["JavaScript is is complementary to and integrated with HTML", "JavaScript is open and cross-platform","Both of the above","All of the above"],
    correctAnswer: 2,
};

var question1 = {
    question: "How can you get the type of arguments passed to a function?",
    answers: ["Using typeof operator","Using getType function", "Both of the above", "None of the above"],
    correctAnswer: 0,
};

var question2 = {
    question: "Which of the following function of the String object returns a number indicating the Unicode value of the character at the given index?",
    answers: ["CharAt()", "CharCodeAt()", "Concat()", "IndexOf()"],
    correctAnswer: 1,
};

var question3 = {
    question: "Which of the following function of the String object returns the index within the calling String object of the last occurrence of the specified value?",
    answers: ["LastIndexOf()", "Search()", "Substr()", "IndexOf()"],
    correctAnswer: 0,
};

var question4 = {
    question: "Which of the following function of the Array object returns a string representing the array and its elements?",
    answers: ["ToSource()", "Sort()", "Splice()", "ToString()"],
    correctAnswer: 3,
};
var questionArray = [question0, question1, question2, question3, question4];

var startButton = document.querySelector('#start-btn');
var textZone = document.querySelector(".text-zone");
var highscores = document.querySelector(".highscores");
var timerElement = document.querySelector("#timer");
var questionsElement = document.querySelector(".questions-div");
var questionId = document.querySelector("#question");
var liAlternatives = document.querySelectorAll(".alternatives");
var registerScoresElement = document.querySelector(".register-score");
var finalScoreElement = document.querySelector("#final-score");
var submitBtn = document.querySelector(".submit");
var scoreList = document.querySelector(".scores");
var inputElement = document.getElementById("name").value;

var questionIndex = 0;
var timerCount = 61;
var points = 0;
var answers;
var btn;
var li;
var questionSelected;
var allScores = [];

function startGame() {
    textZone.style.display = "none";
    highscores.style.display = "none";
    startButton.style.display = "none";
    questionsElement.style.display = "block";

    startQuiz();
    startTimer();
}

function startTimer(){
    timer = setInterval(function() {
        timerCount--;
        timerElement.textContent = "Time left: " + timerCount;

        if (timerCount === 0) {
            // Clears interval
            clearInterval(timer);
            finishGame();
            return;
        }
    }, 1000);
}

// WORKING FINE
function startQuiz() {
    // We first get the fisrt question from the array and increment index
    questionSelected = questionArray[questionIndex];
    questionIndex++;

    // Write the question to show on screen
    questionId.textContent = questionSelected.question;

    // Create 4 options to answer the question, we add data-index to indetify the correct answer
    liAlternatives.forEach(function(element, index) {
        var btn = document.createElement("BUTTON");
        btn.textContent = questionSelected.answers[index];
        btn.dataset.index = index;
        element.appendChild(btn);
    })        

    // Create a button for each li and we check if the one clicked is correct
    liAlternatives.forEach(function(element, index) {
        element.addEventListener("click", function() {
           if(questionSelected.correctAnswer == index){
               console.log("respuesta correcta");
               points +=10;
               setNextQuestion();
           }else{
               console.log("respuesta NO CORRECTA");
               if(timerCount <= 5){
                   finishGame();
                   return;
               }else{
                   timerCount -=5;
               }
           }
        })
    })
}

// WORKING FINE
function setNextQuestion() {
    questionSelected = questionArray[questionIndex];

    //Check if this was the last question, if it is finish the quiz to show score
    if(questionSelected === undefined){
        finishGame();
        return;
    }
    questionIndex++;

    // Remove all buttons created prevoiusly
    liAlternatives.forEach(function(element, index){
        element.removeChild(element.firstChild);
    })

    // Write the question to show on screen
    questionId.textContent = questionSelected.question;

    // Create 4 options to answer the question, we add data-index to indetify the correct answer
    liAlternatives.forEach(function(element, index) {
        var btn = document.createElement("BUTTON");
        btn.textContent = questionSelected.answers[index];
        btn.dataset.index = index;
        element.appendChild(btn);
    })   
}

function finishGame(event) {
    clearInterval(timer); //WORKING GOOD

    questionsElement.style.display = "none";
    registerScoresElement.style.display = "block";
    highscores.style.display = "flex";

    finalScoreElement.textContent = "Congratulations on finishing this Quiz. Your Score is: "+ points;

    // THIS NEED TO BE FIXED
    submitBtn.addEventListener("click", function() {
        saveLastScore();
        renderScores();
    })
}

// TODO
function saveLastScore() {
    var player = {
        name: inputElement,
        score: points,
    }

    localStorage.setItem("playerScore", JSON.stringify(player));
    allScores.push(player);
};

// TODO
function renderScores() {

    for (var i = 0; i < allScores.length; i++) {
        var todo = allScores[i];
    
        var li = document.createElement("li");
        li.textContent = todo.name + ": " + todo.score;
        li.setAttribute("data-index", i);
    
        scoreList.appendChild(li);
      }
  }



// Program starts here
renderScores();

registerScoresElement.style.display = "none";
startButton.addEventListener("click", startGame);

saveLastScore();
