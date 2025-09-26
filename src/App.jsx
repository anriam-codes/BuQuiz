import { useState, useEffect } from "react";
import "./deco.css";
import { defaultQuestions, sportsQuestions, techQuestions } from "./ques";

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [questionCount, setQuestionCount] = useState(0);
  const [questionNumb, setQuestionNumb] = useState(1);
  const [userScore, setUserScore] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [nextActive, setNextActive] = useState(false);

  const selectCategory = (category) => {
    setSelectedCategory(category);

    if (category === "sports") {
      setQuestions(sportsQuestions);
    } else if (category === "tech") {
      setQuestions(techQuestions);
    } else {
      setQuestions(defaultQuestions);
    }

    setQuestionCount(0);
    setQuestionNumb(1);
    setUserScore(0);
    setShowPopup(true);
  };

  const startQuiz = () => {
    if (!selectedCategory) selectCategory("default");
    else setShowPopup(true);
  };

  const continueQuiz = () => {
    setShowQuiz(true);
    setShowPopup(false);
  };

  const tryAgain = () => {
    setQuestionCount(0);
    setQuestionNumb(1);
    setUserScore(0);
    setShowQuiz(true);
    setShowResult(false);
    setNextActive(false);
  };

  const goHome = () => {
    setShowQuiz(false);
    setShowResult(false);
    setQuestionCount(0);
    setQuestionNumb(1);
    setUserScore(0);
    setNextActive(false);
  };

  const nextQuestion = () => {
    if (questionCount < questions.length - 1) {
      setQuestionCount(questionCount + 1);
      setQuestionNumb(questionNumb + 1);
      setNextActive(false);
    } else {
      setShowQuiz(false);
      setShowResult(true);
    }
  };

  const optionSelected = (optionText) => {
    const userAnswer = optionText.charAt(0);
    const correctAnswer = questions[questionCount].answer;

    if (userAnswer === correctAnswer) setUserScore(userScore + 1);

    setNextActive(true);
  };

  return (
    <main className={`main ${showPopup ? "active" : ""}`}>
      {/* Header */}
      <header className="header">
        <a href="#" className="logo">Bunnu's Quiz!</a>
        <nav className="navbar">
          <a href="#" className="active">Home</a>
          <a href="#">About</a>
          <div className="dropdown">
            <a href="#">Categories ▾</a>
            <div className="dropdown-content">
              <button onClick={() => selectCategory("sports")}>Sports</button>
              <button onClick={() => selectCategory("tech")}>Tech</button>
            </div>
          </div>
          <a href="#">Contact</a>
        </nav>
      </header>

      {/* Home */}
      {!showQuiz && !showResult && (
        <section className="home">
          <div className="home-content">
            <h1>Quiz Game</h1>
            <p>Welcome to my quiz ride! This little project is my amusing experiment to explore more of JavaScript.</p>
            <button className="start-btn" onClick={startQuiz}>IKOU!</button>
          </div>
        </section>
      )}

      {/* Popup */}
      {showPopup && (
        <div className="popup-info active">
          <h2>The Guide</h2>
          <span className="info">1. Guessing is allowed, but thinking is cooler.</span>
          <span className="info">2. Take your time, it's not a race, unless you want it to be.</span>
          <span className="info">3. Every correct answer gets you closer to greatness.</span>
          <span className="info">4. This quiz is more about learning than stressing.</span>
          <span className="info">5. Don't worry if you miss one, you've got more to conquer.</span>

          <div className="btn-group">
            <button className="info-btn exit-btn" onClick={() => setShowPopup(false)}>Exit Quiz</button>
            <button className="info-btn continue-btn" onClick={continueQuiz}>Continue</button>
          </div>
        </div>
      )}

      {/* Quiz Section */}
      {showQuiz && (
        <section className="quiz-section active">
          <div className="quiz-box active">
            <h1>{selectedCategory === "sports" ? "Sportsy Quizz" : selectedCategory === "tech" ? "Technoii Quiz" : "Quizzzu"}</h1>
            <div className="quiz-header">
              <span>Quiz Tutorials</span>
              <span className="header-score">Score: {userScore}/{questions.length}</span>
            </div>
            <h2 className="question-text">{questions[questionCount].numb}. {questions[questionCount].question}</h2>
            <div className="option-list">
              {questions[questionCount].options.map((opt, i) => (
                <div
                  key={i}
                  className={`option`}
                  onClick={() => optionSelected(opt)}
                  style={{ pointerEvents: nextActive ? "none" : "auto" }}
                >
                  <span>{opt}</span>
                </div>
              ))}
            </div>
            <div className="quiz-footer">
              <span className="question-total">{questionNumb} of {questions.length} Questions</span>
              <button className={`next-btn ${nextActive ? "active" : ""}`} onClick={nextQuestion}>Next</button>
            </div>
          </div>
        </section>
      )}

      {/* Result Section */}
      {showResult && (
        <section className="quiz-section active">
          <div className="result-box active">
            <h2>Quiz Result!</h2>
            <div className="percentage-container">
              <div className="circular-progress">
                <span className="progress-value">{Math.round((userScore / questions.length) * 100)}%</span>
              </div>
              <span className="score-text">Your Score {userScore} out of {questions.length}</span>
            </div>
            <div className="buttons">
              <button onClick={tryAgain}>Try Again</button>
              <button onClick={goHome}>Go To Home</button>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

export default App;