//Quiz questions and answers
var questions=[
    {
        prompt:"1. Which program code doesn’t need preprocessing before being run? ",
        options:["Text","Script ","Both Text and Script ","Comment"],
        answer: "Script "
    },
    {
        prompt:"2. What is the significance of scripting?",
        options:["Convenient ","Dynamic","Reachable","Modular"],
        answer:"Dynamic"
    },
    {
        prompt:"3. Which API makes the user’s current location available to browser-based application?" ,
        options:["Java API","SDL API ","Object API","Geolocation API"],
        answer:"Geolocation API"
    },
    {
        prompt:"4. What is the necessity to have API?",
        options:["Guide to performing activities","Describe particular task ","Both performing activities and Describe particular task","Rearrangement of tasks"],
        answer:"Describe particular task "
    },
    {
        prompt:"5. When does one use the event ready?",
        options:["Before loading","During loading","After loading","During reloading"],
        answer:"After loading"
    }
]; 


//Elements
var questionsEl = document.querySelector("#questions");
var timerEl = document.querySelector("#time");
var choicesEl = document.querySelector("#options");
var submitBtn = document.querySelector("#submit");
var startBtn = document.querySelector("#start");
var nameEl = document.querySelector("#initials");
var feedbackEl = document.querySelector("#feedback");



//initial state
var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;


// Start quiz... and hide frontpage
function quizStart() {
    timerId = setInterval(TimerTime, 1000);
    timerEl.textContent = time;
    var landingScreenEl = document.getElementById("start-screen");
    landingScreenEl.setAttribute("class", "hide");
    questionsEl.removeAttribute("class");
    getQuestion();
}


// questions and answers 
function getQuestion() {
    var currentQuestion = questions[currentQuestionIndex];
  var promptEl = document.getElementById("question-title")
    promptEl.textContent = currentQuestion.prompt;
    choicesEl.innerHTML = "";
    currentQuestion.options.forEach(function(choices, i) {
        var optionBtn = document.createElement("button");
        optionBtn.setAttribute("value", choices);
        optionBtn.textContent = i + 1 + ". " + choices;
        optionBtn.onclick = questionClick;
        choicesEl.appendChild(optionBtn);
    });
}


// Check for right answers and reduce time for wrong one , then next question
function questionClick() {
  // console.log(this.value);
  // console.log(questions[currentQuestionIndex]);
  // console.log(questions[currentQuestionIndex].answer);
  // console.log(`===========================`);
    if (this.value !== questions[currentQuestionIndex].answer) {
      time -= 10;
      if (time < 0) {
        time = 0;
      }
      timerEl.textContent = time;
      feedbackEl.textContent = `👀Wrong! The correct answer was ${questions[currentQuestionIndex].answer}.`;
      feedbackEl.style.color = "orange";
    } else {
      feedbackEl.textContent = "🤩Correct!💃";
      feedbackEl.style.color = "purple";
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
    var endScreenEl = document.getElementById("end-screen");
    endScreenEl.removeAttribute("class");
    var finalScoreEl = document.getElementById("final-score");
    finalScoreEl.textContent = time;
    questionsEl.setAttribute("class", "hide");
}


// finish quiz  when timer is 0
function TimerTime() {
    time--;
    timerEl.textContent = time;
    if (time <= 0) {
      quizEnd();
    }
}

// Save  user name and score
function TopScore() {
    var name = nameEl.value.trim();
    if (name !== " ") {
      var highscores =JSON.parse(window.localStorage.getItem("highscores")) || [];
      var newScore = {
        score: time,
        name: name
      };
      highscores.push(newScore);
      window.localStorage.setItem("highscores", JSON.stringify(highscores));
    }
}

// Save users' score
function OnEnter(event) {
    if (event.key === "Enter") {
        TopScore();
    }
}
nameEl.onkeyup = OnEnter;



// Save score - clicking submit
submitBtn.onclick = TopScore;


// Start quiz - click start 
startBtn.onclick = quizStart;