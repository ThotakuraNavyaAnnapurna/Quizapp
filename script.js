const container = document.querySelector(".container");
const questionBox = document.querySelector(".question");
const choicesBox = document.querySelector(".choices");
const nextBtn = document.querySelector(".nextBtn");
const scoreCard = document.querySelector(".scoreCard");
const alert = document.querySelector(".alert");
const startBtn = document.querySelector(".startBtn");
const timer = document.querySelector(".timer");

// Make an array of objects that store questions, choices of questions and answer
const quiz = [
  {
    question: "Q.1 Javascript is an ___ language?",
    choices: [
      "Object-Oriented",
      "Object-Based",
      "Procedural",
      "None of the above",
    ],
    answer: "Object-Oriented",
  },
  {
    question:
      "Q.2 The full form of CSS is: ",
    choices: ["Color and Style Sheets", "Colored Special Sheet", "Cascading Style Sheets", "number"],
    answer: "Cascading Style Sheets",
  },
  {
    question: "Q.3 What is the use of the <noscript> tag in Javascript?",
    choices: [
      "The contents are displayed by non-JS-based browsers.",
      "Clears all the cookies and cache.",
      "Both A and B",
      "None of the above",
    ],
    answer: "The contents are displayed by non-JS-based browsers.",
  },
  {
    question:
      "Q.4 Which method is used to add an element to the end of an array in JavaScript?",
    choices: ["push()", "unshift()", "pop()", "shift()"],
    answer: "push()",
  },
  {
    question: "Q.5 How do you find the length of an array in JavaScript?",
    choices: ["array.size()", "array.length", "array.count()", "length(array)"],
    answer: "array.length",
  },
  {
    question:
      "Q.6 How can we write comments in CSS? ",
    choices: ["//", "/* */", "#", "All of the above"],
    answer: "/* */",
  },
];

let currentQuestionIndex = 0;
let score = 0;
let quizOver = true;
let timeLeft = 15;
let timerID = null;

// Arrow Function to Show Questions
const showQuestions = () => {
  const questionDetails = quiz[currentQuestionIndex];
  questionBox.textContent = questionDetails.question;

  choicesBox.textContent = "";
  for (let i = 0; i < questionDetails.choices.length; i++) {
    const currentChoice = questionDetails.choices[i];
    const choiceDiv = document.createElement("div");
    choiceDiv.textContent = currentChoice;
    choiceDiv.classList.add("choice");
    choicesBox.appendChild(choiceDiv);

    choiceDiv.addEventListener("click", () => {
      if (choiceDiv.classList.contains("selected")) {
        choiceDiv.classList.remove("selected");
      } else {
        choiceDiv.classList.add("selected");
      }
    });
  }

  if (currentQuestionIndex < quiz.length) {
    startTimer();
  }
};

// Function to check answers
const checkAnswer = () => {
  const selectedChoice = document.querySelector(".choice.selected");
  if (selectedChoice.textContent === quiz[currentQuestionIndex].answer) {
    displayAlert(Correct Answer!);
    score++;
  } else {
    displayAlert(
      Wrong Answer! — ${quiz[currentQuestionIndex].answer} is the Correct Answer
    );
  }
  timeLeft = 15;
  currentQuestionIndex++;
  if (currentQuestionIndex < quiz.length) {
    showQuestions();
  } else {
    stopTimer();
    showScore();
  }
};

// Function to Show Score
const showScore = () => {
  questionBox.textContent = "";
  choicesBox.textContent = "";
  scoreCard.textContent = You Scored ${score} out of ${quiz.length} !;
  displayAlert("You have completed this quiz!");
  nextBtn.textContent = "Play Again";
  quizOver = true;
  timer.style.display = "none";
};

// Function to show alert
const displayAlert = (msg) => {
  alert.style.display = "block";
  alert.textContent = msg;
  setTimeout(() => {
    alert.style.display = "none";
  }, 2000);
};

//Function to start timer
const startTimer = () => {
  clearInterval(timerID); // check for any exist timers
  timer.textContent = timeLeft;
  timeLeft--;

  const countDown = () => {
    timeLeft--;
    timer.textContent = timeLeft;

    if (timeLeft == 0) {
      const confirmUser = confirm(
        "Time Up!!! Do you want to play the quiz again"
      );
      if (confirmUser) {
        timeLeft = 15;
        startQuiz();
      } else {
        startBtn.style.display = "block";
        container.style.display = "none";
        return;
      }
    }
  };
  timerID = setInterval(countDown, 1000);
};

const stopTimer = () => {
  clearInterval(timerID);
};

const startQuiz = () => {
  timeLeft = 15;
  timer.style.display = "flex";
  showQuestions();
};

// Adding Event Listener to Start Button
startBtn.addEventListener("click", () => {
  startBtn.style.display = "none";
  container.style.display = "block";
  startQuiz();
});

nextBtn.addEventListener("click", () => {
  const selectedChoice = document.querySelector(".choice.selected");
  if (!selectedChoice && nextBtn.textContent === "Next") {
    displayAlert("Select Your Answer");
    return;
  }
  if (quizOver) {
    nextBtn.textContent = "Next";
    scoreCard.textContent = "";
    currentQuestionIndex = 0;
    quizOver = false;
    score = 0;
    startQuiz();
  } else {
    checkAnswer();
  }
});