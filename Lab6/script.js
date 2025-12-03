const questions = [
    { 
        // Questions array //
        question: "How many members are there in Enhypen?",
        options: ["5", "7", "9", "11"],
        answer: "7"
    },
    {
        question: "What survival show were Enhypen formed on?",
        options: ["Produce 101", "Boys Planet", "Produce X 101", "I-Land"],
        answer: "I-Land"
    },
    {
        question: "What is the title of Enhypen's debut song?",
        options: ["Given-Taken", "Drunk-Dazed", "Tamed-Dashed", "Blessed-Cursed"],
        answer: "Given-Taken"
    },
    {
        question: "Who is the leader of Enhypen?",
        options: ["Jungwon", "Heeseung", "Sunghoon", "Jay"],
        answer: "Jungwon"
    },
    {
        question: "Which member was a professional figure skater before debut?",
        options: ["Heeseung", "Ni-ki", "Sunghoon", "Jake"],
        answer: "Sunghoon"
    },
    {
        question: "What is the name of Enhypen's fandom?",
        options: ["Carat", "Engene", "E.L.F", "Wannable"],
        answer: "Engene"
    },
    {
        question: "Who is the maknae of Enhypen?",
        options: ["Sunoo", "Ni-ki", "Jake", "Jungwon"],
        answer: "Ni-ki"
    },
    {
        question: "When did Enhypen debut?",
        options: ["October 2020", "November 2019", "December 2020", "November 2020"],
        answer: "October 2020"
    },
    {
        question: "Which Enhypen member used to live in Australia?",
        options: ["Sunoo", "Ni-ki", "Jay", "Jake"],
        answer: "Jake"
    },
    {
        question: "Who is the eldest member in Enhypen?",
        options: ["Sunoo", "Sunghoon", "Jay", "Heeseung"],
        answer: "Heeseung"
    }
];

let shuffledQuestions = []; 
let currentQuestionIndex = 0;
let score = 0;
let timer; 
let timeLeft = 30;

function shuffleQuestions() { // Shuffle questions //
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
}

function startTimer() { // Timer //
    timeLeft = 30;
    document.getElementById("time").textContent = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("time").textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            checkAnswer();
        }
    }, 1000);
}

function displayQuestion() { // Display questions //
    const questionObj = shuffledQuestions[currentQuestionIndex];
    document.getElementById("question-container").textContent = questionObj.question;
    const optionsContainer = document.getElementById("options-container");
    optionsContainer.innerHTML = "";
    questionObj.options.forEach(option => {
        const btn = document.createElement("button");
        btn.textContent = option;
        btn.onclick = () => {
            document.querySelectorAll("#options-container button").forEach(b => b.disabled = true);
            btn.classList.add("selected");
        };
        optionsContainer.appendChild(btn);
    });
    document.getElementById("feedback").textContent = "";
    document.getElementById("submit-btn").style.display = "inline-block";
    document.getElementById("next-btn").style.display = "none";
    startTimer();
}

function checkAnswer() {
    clearInterval(timer);
    const selected = document.querySelector("#options-container .selected");
    const feedback = document.getElementById("feedback");
    if (!selected) {
        feedback.textContent = "No answer selected.";
    } else {
        const answer = shuffledQuestions[currentQuestionIndex].answer;
        if (selected.textContent === answer) {
            feedback.textContent = "Correct!";
            score++;
        } else {
            feedback.textContent = `Incorrect. The correct answer was ${answer}.`;
        }
    }
    document.getElementById("submit-btn").style.display = "none";
    document.getElementById("next-btn").style.display = "inline-block";
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < shuffledQuestions.length) {
        displayQuestion();
    } else {
        document.getElementById("quiz").style.display = "none";
        document.getElementById("score-container").textContent = `Your score: ${score} / ${shuffledQuestions.length}`;
    }
}

function startQuiz() {
    shuffleQuestions();
    currentQuestionIndex = 0;
    score = 0;
    displayQuestion();
}

document.getElementById("submit-btn").onclick = checkAnswer;
document.getElementById("next-btn").onclick = nextQuestion;
startQuiz();