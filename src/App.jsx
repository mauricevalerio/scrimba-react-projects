import { useState, useEffect } from "react"
import { nanoid } from "nanoid"
import "./App.css"
import Quiz from "./Quiz"

function App() {
  const [hasGameStarted, setHasGameStarted] = useState(false)
  const [quizItems, setQuizItems] = useState([])

  console.log(quizItems)
  
  function handleStartGameBtn() {
    setHasGameStarted(prevStatus => !prevStatus)
  }
  function handleCheckAnswers() {
    setQuizItems(prevObject => {
      return prevObject.map(item => {
        return item.correct_answer.id === item.user_choice ? {...item, is_correct: true} : {...item, is_correct: false}
      })
      
    })
  }

  const quizElements = quizItems.map(item => {
    return <Quiz 
      key={item.id}
      id={item.id}
      question={item.question}
      choices={item.choices}
      correct_answer={item.correct_answer}
      add_user_choice={setQuizItems}
      is_correct={item.is_correct}
    />
  })

  function shuffleChoices(choicesArray){ //fisher-yates shuffle
    let i = choicesArray.length
    while (--i > 0) { //decrements before comparing
       let temp = Math.floor(Math.random() * (i + 1)); //0 - 4 but not including 4
       [choicesArray[temp], choicesArray[i]] = [choicesArray[i], choicesArray[temp]]
    }
    return choicesArray
  }

  useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=4')
      .then(response => response.json())
      .then(data => 
        {
          setQuizItems(data.results.map(item => {
            return {
              ...item, 
              //adds unique id to quiz item object
              id: nanoid(), 

              //overwrites correct answer property from API
              correct_answer: { id: nanoid(), correct_answer: item.correct_answer },

              //overwrites incorrect answer property from API
              incorrect_answers: item.incorrect_answers.map(incorrect_answer => ({ id: nanoid(), incorrect_answer: incorrect_answer}))
            }
          }))
          //shuffles the choices
          setQuizItems(prevQuizOrder => { 
            return prevQuizOrder.map(item => ({ ...item, choices: shuffleChoices([...item.incorrect_answers, item.correct_answer])}))
          })
        })
  }, [])

  return (
    <div className="App">
      {hasGameStarted ? 
        <main>
          {quizElements}
          <button 
          className="btn check-answers-btn"
          onClick={handleCheckAnswers}>Check Answers</button>
        </main>
        : 
        <section className="landing-page">
          <h1>Quizzical</h1>
          <p>Some description if needed</p>
          <button
            className="btn start-game-btn"
            onClick={handleStartGameBtn}>Start Quiz</button>
        </section>
      }
    </div>
  )
}

export default App
