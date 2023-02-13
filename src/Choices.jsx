import './Choices.css'
import decode from 'html-entities-decode'
//
function Choices(props) {
    const correct_answer = props.correct_answer
    return (
        <p 
        className={`choice ${props.selectedChoiceId === props.id ? "selected-choice" : ""}
        ${props.is_correct !== undefined && props.selectedChoiceId === props.id ? 
            props.is_correct ? "correct-choice"
            : "wrong-choice"
        : ""}
        ${props.is_correct !== undefined ? "correct-choice": ""}`}
        onClick={() => props.handleSelectedChoiceId(props.id)}>  
            {decode(props.choice)}
        </p>
    )
}

export default Choices

{/* If choice is clicked, change the selectedChoiceId state variable to the id of the choice
so that it will trigger a re-render including Choices child component and check the ternary operator on the className*/}