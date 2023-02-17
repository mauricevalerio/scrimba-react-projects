import { useState, useEffect } from "react"
import { getQuestions } from "./services/fetch"
import topBlob from "./assets/top-blob.png"
import bottomBlob from "./assets/bottom-blob.png"
import "./App.css"
import Quiz from "./Quiz"
import QuizForm from "./QuizForm"

function App() {

  const [quizSetup, setQuizSetup] = useState({
    numberOfQuestions: '',
    category: '',
    difficulty: ''
  })

  const [hasNoResults, setHasNoResults] = useState(false)
  const [hasGameStarted, setHasGameStarted] = useState(false)
  const [quizData, setQuizData] = useState([])

  function shuffleChoices(choicesArray){ //fisher-yates shuffle
    let i = choicesArray.length
    while (--i > 0) { //decrements before comparing
       let temp = Math.floor(Math.random() * (i + 1)); //0 - 4 but not including 4
       [choicesArray[temp], choicesArray[i]] = [choicesArray[i], choicesArray[temp]]
    }
    return choicesArray
  }

  useEffect(() => {
    getQuestions(quizSetup)
      .then(data => {
        if (data) {
          setHasNoResults(false)
          setQuizData(data)
          //shuffles the choices and adds a property choices
          setQuizData(prevChoicesOrder => { 
            return prevChoicesOrder.map(quizItem => ({ ...quizItem, choices: shuffleChoices([...quizItem.incorrect_answers, quizItem.correct_answer])}))
          })
        } else {
          setHasNoResults(true)
        }
      })
  }, [quizSetup])

  return (
    <div className="app">
      <img src={topBlob} alt="Top Blob Image" className="blob top-blob" />
      <img src={bottomBlob} alt="Top Blob Image" className="blob bottom-blob" />

      {hasGameStarted ? 
        <main className="quiz-container">
          <Quiz 
          quizData={quizData}
          setHasGameStarted={setHasGameStarted}
          setQuizSetup={setQuizSetup}/>
        </main>
        : 
        <section className="landing-page">
          <h1>Quizzical</h1>
          <p className="game-caption">Test every bit of your brain cells!</p>
          <QuizForm 
          quizSetup={quizSetup}
          hasNoResults={hasNoResults}
          setQuizSetup={setQuizSetup}
          setHasGameStarted={setHasGameStarted}/>
        </section>
      }
    </div>
  )
}

export default App