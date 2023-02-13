import { nanoid } from 'nanoid'

function getQuestions(gameSetup) {
    const { numberOfQuestions = 10, category, difficulty } = gameSetup
    const url = new URL(`https://opentdb.com/api.php?amount=${numberOfQuestions}&category=${category}&difficulty=${difficulty}`) 
    //clean query strings if none specified
    //if number of questions is blank default to 10

    return fetch(url)
    .then(response => response.json())
    .then(data => {
        return data.results.map(item => {
            return {
              ...item, 

              //adds unique id to quiz item object
              id: nanoid(), 

              //overwrites correct answer property from API
              correct_answer: { id: nanoid(), correct_answer: item.correct_answer },

              //overwrites incorrect answer property from API
              incorrect_answers: item.incorrect_answers.map(incorrect_answer => ({ id: nanoid(), incorrect_answer: incorrect_answer}))
            }
        })
    })
}

function getCategories() {
    return fetch('https://opentdb.com/api_category.php')
        .then(response => response.json())
        .then(categories => categories)
}

export { getQuestions, getCategories }