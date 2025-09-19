const startBtn = document.querySelector('.start-btn');
const popupInfo = document.querySelector('.popup-info');
const exitBtn = document.querySelector('.exit-btn');
const main = document.querySelector('.main');
const continueBtn = document.querySelector('.continue-btn');
const quizSection = document.querySelector('.quiz-section');
const quizBox = document.querySelector('.quiz-box');
const resultBox = document.querySelector('.result-box');
const tryAgainBtn = document.querySelector('.tryAgain-btn');
const goHomeBtn = document.querySelector('.goHome-btn');
const nextBtn = document.querySelector('.next-btn');
const optionList = document.querySelector('.option-list');

let selectedCategory = null;
let questionCount = 0;
let questionNumb = 1;
let userScore = 0;
let questions = []; //globally initialized

function selectCategory(category) {
    selectedCategory = category;

    if (category === "sports") {
        questions = sportsQuestions;
        document.querySelector('.quiz-box h1').textContent = "Sportsy Quizz";
    } else if (category === "tech") {
        questions = techQuestions;
        document.querySelector('.quiz-box h1').textContent = "Technoii Quiz";
    } else {
        questions = defaultQuestions;
        document.querySelector('.quiz-box h1').textContent = "Quizzzu";
    }

    questionCount = 0;
    questionNumb = 1;
    userScore = 0;

    popupInfo.classList.add('active');
    main.classList.add('active');
}


// IKOU! button -> load defaultQuestions
startBtn.onclick = () => {
    // if user already picked category, keep it
    if (!selectedCategory) {
        selectCategory("default");
    } else {
        // just open popup with previously selected category
        popupInfo.classList.add('active');
        main.classList.add('active');
    }
};

exitBtn.onclick = () => {
    popupInfo.classList.remove('active');
    main.classList.remove('active');   
};

continueBtn.onclick = () => {
    quizSection.classList.add('active');
    popupInfo.classList.remove('active');
    main.classList.remove('active');
    quizBox.classList.add('active');

    showQuestions(0);
    questionCounter(1);
    headerScore();
};

tryAgainBtn.onclick = () => {
    quizBox.classList.add('active');
    nextBtn.classList.remove('active');
    resultBox.classList.remove('active');
    
    questionCount = 0;
    questionNumb = 1;
    userScore = 0;

    showQuestions(questionCount);
    questionCounter(questionNumb);
    headerScore();
};

goHomeBtn.onclick = () => {
    quizSection.classList.remove('active');
    nextBtn.classList.remove('active');
    resultBox.classList.remove('active');
    
    questionCount = 0;
    questionNumb = 1;
    userScore = 0;

    showQuestions(questionCount);
    questionCounter(questionNumb);
};

nextBtn.onclick = () => {
    if (questionCount < questions.length - 1) {
        questionCount++;
        questionNumb++;
        showQuestions(questionCount);
        questionCounter(questionNumb);
        headerScore();

        nextBtn.classList.remove('active');
    }
    else {
        showResultBox();
    }
};

function showQuestions(index) {
    const questionText = document.querySelector('.question-text');
    questionText.textContent = `${questions[index].numb}. ${questions[index].question}`;

    let optionTag = `<div class="option"><span>${questions[index].options[0]}</span></div>
        <div class="option"><span>${questions[index].options[1]}</span></div> 
        <div class="option"><span>${questions[index].options[2]}</span></div>
        <div class="option"><span>${questions[index].options[3]}</span></div>`;
    
    optionList.innerHTML = optionTag;

    const options = document.querySelectorAll('.option');
    for (let i = 0; i < options.length; i++) {
        options[i].setAttribute('onclick', 'optionSelected(this)');   
    }
}

function optionSelected(answer) {
    let userAnswer = answer.textContent.trim().charAt(0); 
    let correctAnswer = questions[questionCount].answer;  
    let allOptions = optionList.children.length;

    if (userAnswer === correctAnswer) {
        answer.classList.add('correct');
        userScore += 1;  
        headerScore();  
    } 
    else {
        answer.classList.add('incorrect');

        for (let i = 0; i < allOptions; i++) {
            if (optionList.children[i].textContent.trim().charAt(0) === correctAnswer) {
                optionList.children[i].classList.add('correct');  
            }
        }
    }

    for (let i = 0; i < allOptions; i++) {
        optionList.children[i].classList.add('disabled');
    }

    nextBtn.classList.add('active');
}

function questionCounter(index) {
    const questionTotal = document.querySelector('.question-total');
    questionTotal.textContent = `${index} of ${questions.length} Questions`;
}

function headerScore() {
    const headerScoreText = document.querySelector('.header-score');
    headerScoreText.textContent = `Score: ${userScore} / ${questions.length}`;
}

function showResultBox() {
    quizBox.classList.remove('active');
    resultBox.classList.add('active');
  
    const scoreText = document.querySelector('.score-text');
    scoreText.textContent = `Your Score ${userScore} out of ${questions.length}`;
  
    const circularProgress = document.querySelector('.circular-progress');
    const progressValue = document.querySelector('.progress-value');
  
    let progressStartValue = -1;
    let progressEndValue = (userScore / questions.length) * 100;
  
    let speed = 20;
  
    let progress = setInterval(() => {
      progressStartValue++;
  
      progressValue.textContent = `${progressStartValue}%`;
  
      circularProgress.style.background = `conic-gradient(#c40094 ${progressStartValue * 3.6}deg, rgba(255, 255, 255, .1) 0deg)`;
  
      if (progressStartValue == progressEndValue) {
        clearInterval(progress);
      }
    }, speed);
}
