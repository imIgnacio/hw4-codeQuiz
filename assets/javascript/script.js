var question0 = {
    question: "Which of the following is correct about the features of JavaScript?",
    answers: ["JavaScript is is complementary to and integrated with HTML", "JavaScript is open and cross-platform","Both of the above","All of the above"],
    correctAnswer: 2,
}

var question1 = {
    question: "How can you get the type of arguments passed to a function?",
    answers: ["Using typeof operator","Using getType function", "Both of the above", "None of the above"],
    correctAnswer: 0,
}

var question2 = {
    question: "Which of the following function of the String object returns a number indicating the Unicode value of the character at the given index?",
    answers: ["CharAt()", "CharCodeAt()", "Concat()", "IndexOf()"],
    correctAnswer: 1,
}

var question3 = {
    question: "Which of the following function of the String object returns the index within the calling String object of the last occurrence of the specified value?",
    answers: ["LastIndexOf()", "Search()", "Substr()", "IndexOf()"],
    correctAnswer: 0,
}

var question4 = {
    question: "Which of the following function of the Array object returns a string representing the array and its elements?",
    answers: ["ToSource()", "Sort()", "Splice()", "ToString()"],
    correctAnswer: 3,
}

var questionArray = [question0, question1, question2, question3, question4];

var startButton = document.querySelector('#start-btn');
var textZone = document.querySelector(".text-zone");
var highscores = document.querySelector(".highscores");
var timerElement = document.querySelector("#timer");
var questionsElement = document.querySelector(".questions-div");
var questionId = document.querySelector("#question");

var timerCount;
var points;
var answers;

function startGame() {
    textZone.style.display = "none";
    highscores.style.display = "none";
    startButton.style.display = "none";

    startTimer();
    startQuiz();


}

function startTimer(){
    timerCount = 61;
    timer = setInterval(function() {
        timerCount--;
        timerElement.textContent = "Time left: " + timerCount;

        if (timerCount === 0) {
            // Clears interval
            clearInterval(timer);

            finishGame();
        }
    }, 1000);
}

function startQuiz() {
    questionsElement.style.display = "block";

    for(var i=0; i<questionArray.length; i++){
        questionId.textContent = questionArray[i].question;

        for(var j=0; j<4;j++){
            var answerAux = questionArray[i].answers[j];
            var btn = document.createElement("BUTTON");
            var li = document.createElement("LI");
            li.setAttribute("id", j);
            btn.innerHTML = answerAux;
            li.appendChild(btn);
            document.getElementById("answers").appendChild(li);

        }

        var indexAux = questionArray[i].correctAnswer;

    }
}

startButton.addEventListener('click', startGame);