/* toTitleCase
Write a function that will capitalize every word in a sentence.  

Example Input: "everything, everywhere, all at once"
Example Output: "Everything, Everywhere, All At Once"
*/

/* 
First, write a function that takes in one word and 
capitalizes the first letter of that word.

Example Input: "scrimba"
Example Output: "Scrimba"

Hint: Trying using slice() and .toUpperCase()
*/

//ANSWER
function capitalizeWord(word) {
    return word.slice(0, 1).toUpperCase() + word.slice(1);
}

function toTitleCase(str) {
    return str.split(' ').map(word => (capitalizeWord(word))).join(' ')
}

// Test your functions
console.log(capitalizeWord("pumpkin"))
console.log(toTitleCase("pumpkin pranced purposefully across the pond"))
console.log(toTitleCase("everything, everywhere, all at once"))