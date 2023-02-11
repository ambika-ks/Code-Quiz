//Quiz questions and answers
var questions=[
    {
        prompt:"1. Which program code doesn’t need preprocessing before being run? ",
        choices:["a) Text"," b) Script ","c) Both Text and Script ","d) Comment"],
        answer: "b"
    },
    {
        prompt:"2. What is the significance of scripting?",
        choices:[" a) Convenient ","b) Dynamic"," c) Reachable"," d) Modular"],
        answer:"b"
    },
    {
        prompt:"3. Which API makes the user’s current location available to browser-based application?" ,
        choices:["a) Java API"," b) SDL API ","c) Object API"," d) Geolocation API"],
        answer:"d"
    },
    {
        prompt:"4. What is the necessity to have API?",
        Choices:[" a) Guide to performing activities"," b) Describe particular task ","c) Both performing activities and Describe particular task"," d) Rearrangement of tasks"],
        answer:"b"
    },
    {
        prompt:"5. 9. When does one use the event ready?",
        choices:["a) Before loading"," b) During loading","c) After loading"," d) During reloading"],
        answer:"c"
    }
]; 

var questionsEl = document.querySelector("#questions");
var timerEl = document.querySelector("#time");
var choicesEl = document.querySelector("#choices");
var submitBtn = document.querySelector("#submit");
var startBtn = document.querySelector("#start");
var nameEl = document.querySelector("#initials");
var feedbackEl = document.querySelector("#feedback");
var reStartBtn = document.querySelector("#restart");


//initial state

var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

// Start quiz... and hide frontpage

function quizStart() {
    timerId = setInterval(clockTick, 1000);
    timerEl.textContent = time;
    var landingScreenEl = document.getElementById("start-screen");
    landingScreenEl.setAttribute("class", "hide");
    questionsEl.removeAttribute("class");
    getQuestion();
}

// questions and answers  with buttons

function getQuestion() {
    var currentQuestion = questions[currentQuestionIndex];
  var promptEl = document.getElementById("question-words")
    promptEl.textContent = currentQuestion.prompt;
    choicesEl.innerHTML = "";
    currentQuestion.options.forEach(function(choice, i) {
        var choiceBtn = document.createElement("button");
        choiceBtn.setAttribute("value", choice);
        choiceBtn.textContent = i + 1 + ". " + choice;
        choiceBtn.onclick = questionClick;
        choicesEl.appendChild(choiceBtn);
    });
}

// Check for right answers and reduce time for wrong one , then next question

function questionClick() {
    if (this.value !== questions[currentQuestionIndex].answer) {
      time -= 10;
      if (time < 0) {
        time = 0;
      }
      timerEl.textContent = time;
      feedbackEl.textContent = `Wrong! The correct answer was ${questions[currentQuestionIndex].answer}.`;
      feedbackEl.style.color = "red";
    } else {
      feedbackEl.textContent = "Correct!";
      feedbackEl.style.color = "green";
    }
    feedbackEl.setAttribute("class", "feedback");
    setTimeout(function() {
      feedbackEl.setAttribute("class", "feedback hide");
    }, 2000);
    currentQuestionIndex++;
    if (currentQuestionIndex === questions.length) {
      quizEnd();
    } else {
      getQuestion();
    }
}

// End quiz .. stop timer.. display final score

function quizEnd() {
    clearInterval(timerId);
    var endScreenEl = document.getElementById("quiz-end");
    endScreenEl.removeAttribute("class");
    var finalScoreEl = document.getElementById("score-final");
    finalScoreEl.textContent = time;
    questionsEl.setAttribute("class", "hide");
}


// finish quiz  if timer=0

function clockTick() {
    time--;
    timerEl.textContent = time;
    if (time <= 0) {
      quizEnd();
    }
}

// Save score along with user name

function saveHighscore() {
    var name = nameEl.value.trim();
    if (name !== "") {
      var highscores =
        JSON.parse(window.localStorage.getItem("highscores")) || [];
      var newScore = {
        score: time,
        name: name
      };
      highscores.push(newScore);
      window.localStorage.setItem("highscores", JSON.stringify(highscores));
    }
}

// Save users' score

function checkForEnter(event) {
    if (event.key === "Enter") {
        saveHighscore();
    }
}
nameEl.onkeyup = checkForEnter;

// Save score - clicking submit

submitBtn.onclick = saveHighscore;

// Start quiz - click start 

startBtn.onclick = quizStart;