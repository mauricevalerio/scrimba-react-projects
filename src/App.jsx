import { useState, useEffect } from "react"
import { getQuestions, getCategories } from "./services/fetch"
import topBlob from "./assets/top-blob.png"
import bottomBlob from "./assets/bottom-blob.png"
import "./App.css"
import Quiz from "./Quiz"

function App() {
  const [gameSetup, setGameSetup] = useState({
    numberOfQuestions: '',
    category: '',
    difficulty: ''
  })
  const [categories, setCategories] = useState([])
  const [hasGameStarted, setHasGameStarted] = useState(false)
  const [quizData, setQuizData] = useState([])
  
  function handleStartGameBtn(e) {
    e.preventDefault()
    setHasGameStarted(prevStatus => !prevStatus)
  }

  function handleForm(e) {
    const { name, value } = e.target
    setGameSetup(prevSetup => ({ ...prevSetup, [name]: value }))
  }

  function shuffleChoices(choicesArray){ //fisher-yates shuffle
    let i = choicesArray.length
    while (--i > 0) { //decrements before comparing
       let temp = Math.floor(Math.random() * (i + 1)); //0 - 4 but not including 4
       [choicesArray[temp], choicesArray[i]] = [choicesArray[i], choicesArray[temp]]
    }
    return choicesArray
  }

  useEffect(() => {
    getQuestions(gameSetup)
      .then(data => {
        setQuizData(data)
        //shuffles the choices and adds a property choices
        setQuizData(prevChoicesOrder => { 
          return prevChoicesOrder.map(quizItem => ({ ...quizItem, choices: shuffleChoices([...quizItem.incorrect_answers, quizItem.correct_answer])}))
        })
      })
  }, [gameSetup])

  useEffect(() => {
    getCategories()
      .then(data => setCategories(data.trivia_categories))
  }, [])

  const categoryElements = categories.map(category => {
    return <option key={category.id} value={category.id}>{category.name}</option>
  })

  return (
    <div className="app">
      <img src={topBlob} alt="Top Blob Image" className="blob top-blob" />
      <img src={bottomBlob} alt="Top Blob Image" className="blob bottom-blob" />


      {hasGameStarted ? 
        <main className="quiz-container">
          <Quiz 
          quizData={quizData}
          setHasGameStarted={setHasGameStarted}
          setGameSetup={setGameSetup}/>
        </main>
        : 
        <section className="landing-page">
          <h1>Quizzical</h1>
          <p className="game-caption">Test every bit of your brain cells!</p>

          <form className="game-setup">
            <label htmlFor="numberOfQuestions">Number of Questions: </label>
            <input 
              id="numberOfQuestions"
              value={gameSetup.numberOfQuestions}
              onChange={handleForm}
              type="number" 
              name="numberOfQuestions"
             />

            <label htmlFor="category">Category: </label>
            <select 
                id="category"
                value={gameSetup.category}
                onChange={handleForm}
                name="category"
            >
              <option value="">Any Category</option>
              {categoryElements}
            </select>

            <label htmlFor="difficulty">Difficulty: </label>
            <select 
              id="difficulty"
              value={gameSetup.difficulty}
              onChange={handleForm}
              name="difficulty" 
            >
                <option value="">Any Difficulty</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>

              <button
            className="btn start-game-btn"
            onClick={handleStartGameBtn}>Start Quiz</button>
          </form>


        </section>
      }
    </div>
  )
}

export default App