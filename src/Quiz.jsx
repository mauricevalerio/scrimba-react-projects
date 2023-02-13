import { useState, useEffect } from "react"
import Choices from './Choices'
import decode from 'html-entities-decode'
import './Quiz.css'

function Quiz(props) {
    const [selectedChoiceId, setSelectedChoiceId] = useState('')

    //every change of the state variable selectedChoiceId for each quizItem, run useEffect
        //modify the quizItem array of objects
            //return the quizItem object if choice changes add a property called user_choice
            //return same quizItem object if choice does not change
    useEffect(() => {
        props.add_user_choice(prevQuizItemProperties => {
            return prevQuizItemProperties.map(item => {
                return item.id === props.id ? { ...item, user_choice: selectedChoiceId } : item
            })
        })
    }, [selectedChoiceId])

    const choicesElements = props.choices.map(choice => { //for every choice
        return <Choices 
        key={choice.id}
        id={choice.id}
        choice={choice.incorrect_answer || choice.correct_answer}
        correct_answer={choice.correct_answer}
        selectedChoiceId={selectedChoiceId}
        handleSelectedChoiceId={handleSelectedChoiceId}
        is_correct={props.is_correct}
        />
      })
    
    function handleSelectedChoiceId(choiceId) {
        setSelectedChoiceId(choiceId)
    }

    return (
        <div className="quiz-item">
            <h3>{decode(props.question)}</h3>
            <div className="choices">
                {choicesElements}
            </div>
            <p>{props.correct_answer.correct_answer}</p>
        </div>
    )
}

export default Quiz