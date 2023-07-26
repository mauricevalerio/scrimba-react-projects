/* Alternating Caps 
 Write a function that takes in a string of letters
 and returns a sentence in which every other letter is capitalized.

Example input: "I'm so happy it's Monday"
Example output: "I'M So hApPy iT'S MoNdAy"
*/

//ANSWER
function altCaps(str) {
    const letters = str.split("")
    let newString = ""
    // return newStr;
    letters.forEach((letter, index) => {
        newString += index % 2 === 0 ? letter.toUpperCase() : letter.toLowerCase()
    })
    return newString
}

console.log(altCaps("When you visit Portland you have to go to VooDoo Donuts"))

console.log(altCaps("I'm so happy it's Monday"))