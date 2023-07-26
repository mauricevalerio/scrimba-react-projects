import { useState, useEffect } from "react"
import { getCategories } from "./services/fetch"
import "./QuizForm.css"

function QuizForm(props) {

    const [categories, setCategories] = useState([])

    useEffect(() => {
        getCategories()
          .then(data => setCategories(data.trivia_categories))
    }, [])

    function handleForm(e) {
        const { name, value } = e.target
        props.setQuizSetup(prevSetup => ({ ...prevSetup, [name]: value }))
    }

    function handleStartGameBtn(e) {
        e.preventDefault()
        props.setHasGameStarted(prevStatus => !prevStatus)
    }

    const categoryElements = categories.map(category => {
        return <option key={category.id} value={category.id}>{category.name}</option>
      })

    return (
        <form className="game-setup">
            <label htmlFor="numberOfQuestions">Number of Questions: </label>
            <input 
              placeholder="10"
              id="numberOfQuestions"
              value={props.quizSetup.numberOfQuestions}
              onChange={handleForm}
              type="number" 
              name="numberOfQuestions"
             />

            <label htmlFor="category">Category: </label>
            <select 
                id="category"
                value={props.quizSetup.category}
                onChange={handleForm}
                name="category"
            >
              <option value="">Any Category</option>
              {categoryElements}
            </select>

            <label htmlFor="difficulty">Difficulty: </label>
            <select 
              id="difficulty"
              value={props.quizSetup.difficulty}
              onChange={handleForm}
              name="difficulty" 
            >
                <option value="">Any Difficulty</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>

              {props.hasNoResults && <p className="no-results-message">No results found based on your selected criteria!</p>}

              <button
            className="btn start-game-btn"
            onClick={props.hasNoResults ? undefined : handleStartGameBtn}>Start Quiz</button>
          </form>
    )
}

export default QuizForm