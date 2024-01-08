let questions = [
    {
        "question": "Wer hat HTML erfunden?",
        "answer_1": "Robbie Williams",
        "answer_2": "Lady Gaga",
        "answer_3": "Tim Berners-Lee",
        "answer_4": "Justin Bieber",
        "right_answer": 3
    },
    {
        "question": "welches Attribut kann man NICHT für Textarea verwenden?",
        "answer_1": "reedonly",
        "answer_2": "max",
        "answer_3": "from",
        "answer_4": "spellcheck",
        "right_answer": 1
    },
    {
        "question": "wie wählst du alle Elemente vom Typ &lt; a&gt; mit dem Attribut title aus?",
        "answer_1": "a[title]{…}",
        "answer_2": "a > title {...}",
        "answer_3": "a.title {...}",
        "answer_4": "a-title {...}",
        "right_answer": 1
    },
    {
        "question": "Wie definiert man in JavaScript eine Variable?",
        "answer_1": "let 100 = rate;",
        "answer_2": "100 let rate;",
        "answer_3": "rate = 100;",
        "answer_4": "let rate = 100;",
        "right_answer": 4
    },
    {
        "question": "Wofür steht CSS?",
        "answer_1": "Colorful Style Sheets",
        "answer_2": "Computer Style Sheets",
        "answer_3": "Cascading Style Sheets",
        "answer_4": "Creative Style Sheets",
        "right_answer": 3,
    },
    {
        "question": "Wie schreibt man eine IF-Bedingung in JavaScript?",
        "answer_1": "if i == 5 then",
        "answer_2": "if (i == 5)",
        "answer_3": "if i = 5",
        "answer_4": "if i = 5 then",
        "right_answer": 2,
    },
    {
        "question": "Welches Attribut kann man NICHT für Textarea verwenden?",
        "answer_1": "readonly",
        "answer_2": "max",
        "answer_3": "from",
        "answer_4": "spellcheck",
        "right_answer": 1,
    },
    {
        "question": "Welche CSS-Eigenschaft ändert die Textgröße?",
        "answer_1": "font-style",
        "answer_2": "text-style",
        "answer_3": "text-size",
        "answer_4": "font-size",
        "right_answer": 4,
    }
];


let currentQuestion = 0;
let rightQuestions = 0;
let AUDIO_RIGHT = new Audio('sounds/right.wav');
let AUDIO_FALSE = new Audio('sounds/wrong.wav');

function init() {
    document.getElementById('all-questions').innerHTML = questions.length;
    showQuestion();
}

function showQuestion() {
    if (gameIsOver()) {
        showEndscreen();
    } else { 
        updateProgressBar();
        updateToNextQuestion();
    }
}

function gameIsOver() {
    return currentQuestion >= questions.length;
}

function showEndscreen() {
    document.getElementById('card-body-endscreen').style = '';
    document.getElementById('card-body').style = 'display: none';
    document.getElementById('amount-of-questions').innerHTML = questions.length;
    document.getElementById('amount-of-right-questions').innerHTML = rightQuestions;
    document.getElementById('header-img').src = 'img/trophy.png';
}

function updateToNextQuestion() {
    let question = questions[currentQuestion];
    document.getElementById('question-number').innerHTML = currentQuestion + 1;
    document.getElementById("questiontext").innerHTML = question.question;

    for (let i = 1; i <= 4; i++) {
        document.getElementById("answer_" + i).innerHTML = question['answer_' + i];
    }
}

function updateProgressBar() {
    let percent = (currentQuestion + 1) / questions.length;
    percent = Math.round(percent * 100);

    document.getElementById('progress-bar').innerHTML = `${percent} %`;
    document.getElementById('progress-bar').style.width = `${percent}%`;
}

function answer(selection) {
    let question = questions[currentQuestion];
    let selectedAnswer = selection[selection.length - 1];
    let rightAnswerId = `answer_${question.right_answer}`;

    if (rightAnswerSelected(selectedAnswer, question)) {
        document.getElementById(selection).parentNode.classList.add('bg-success');
        AUDIO_RIGHT.play();
        rightQuestions++;
    } else {
        document.getElementById(selection).parentNode.classList.add('bg-danger');
        document.getElementById(rightAnswerId).parentNode.classList.add('bg-success');
        AUDIO_FALSE.play();
    }

    document.getElementById('next-btn').disabled = false;
}

function rightAnswerSelected(selectedAnswer, question) {
     return selectedAnswer == question.right_answer;
}

function nextQuestion() {
    currentQuestion++;
    showQuestion();
    resetCard();
}

function resetCard() {
    document.getElementById('next-btn').disabled = true;

    for (let i = 1; i <= 4; i++) {
        document.getElementById("answer_" + i).parentNode.classList.remove('bg-danger');
        document.getElementById("answer_" + i).parentNode.classList.remove('bg-success');
    }
}

function restartGame() {
    document.getElementById('header-img').src = 'img/main.jpg';
    document.getElementById('card-body').style = ''; //Question Body wieder anzeigen
    document.getElementById('card-body-endscreen').style = 'display: none'; //Endscreen ausblenden
    rightQuestions = 0;
    currentQuestion = 0;
    init();
}


