import { useState, useEffect } from 'react'
import './QuizItem.css'
import decode from 'html-entities-decode'

function QuizItem(props) {
    const [selectedChoiceId, setSelectedChoiceId] = useState('')

    function handleSelectedChoiceId(choiceId) {
        setSelectedChoiceId(choiceId)
    }

    useEffect(() => {
        if (selectedChoiceId === props.correctAnswer.id) {
            props.setScore(prevScore => prevScore + 1)
        }
    }, [props.isQuizOver])

    const choicesElements = (choicesData) => choicesData.map(choiceData => { //for every choice
        return (
            <p key={choiceData.id}
            className={`choice ${selectedChoiceId === choiceData.id ? "selected-choice" : ""}
            ${props.isQuizOver && props.correctAnswer.id === choiceData.id ? "correct-choice" :  //marks every correct answer
            props.isQuizOver && selectedChoiceId === choiceData.id ? "wrong-choice" : ""} 
            ${props.isQuizOver ? "disable-events" : ""}`} //finds the selectedChoiceId in every choice and marks it wrong
            //disable events if game is over
            onClick={() => handleSelectedChoiceId(choiceData.id)}>
                {decode(choiceData.incorrect_answer || choiceData.correct_answer)}
            </p>
        )
    })

    return (
        <div className="quiz-item-container">
            <h3 className="question">
                {decode(props.question)}
            </h3>
            <div className="choices-container">
                {choicesElements(props.choices)}
                
                <div className="marker">{props.isQuizOver && props.correctAnswer.id === selectedChoiceId ? <p className="marks check-mark">&#10003;</p>
                : props.isQuizOver && selectedChoiceId !== '' ? <p className="marks cross-mark">X</p>
                : props.isQuizOver ? <p>No selected answer<span className="marks cross-mark">X</span></p> : ""}</div>
            </div>
        </div>
    )
}

export default QuizItem