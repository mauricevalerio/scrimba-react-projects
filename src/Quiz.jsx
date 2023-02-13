import { useState, useEffect } from "react"
import QuizItem from './QuizItem'
import './Quiz.css'

function Quiz(props) {

    const [quizQuestions, setQuizQuestions] = useState([])
    const [isQuizOver, setIsQuizOver] = useState(false)
    const [score, setScore] = useState(0) 
    
    useEffect(() => {
        setQuizQuestions(props.quizData)
    }, [])

    function handleCheckAnswers() {
        if (isQuizOver) {
            setScore(0)
            props.setHasGameStarted(false)
        }
        setIsQuizOver(prevBool => !prevBool)
    }

    const quizElements = quizQuestions.map(quizQuestion => {
        return <QuizItem
        key={quizQuestion.id} 
        id={quizQuestion.id}
        question={quizQuestion.question}
        choices={quizQuestion.choices}
        correctAnswer={quizQuestion.correct_answer} //object
        isQuizOver={isQuizOver}
        setScore={setScore}
        />
    })

    return (
        <>
            {quizElements}
            <button 
            className="btn check-answers-btn"
            onClick={handleCheckAnswers}>{isQuizOver ? "Play Again" : "Check Answers"}</button>
            {isQuizOver && <p className="results">You scored {score}/{quizQuestions.length} correct answers</p>}
        </>
    )
}

export default Quiz