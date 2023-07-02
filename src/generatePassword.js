const types = {
    upperCase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowerCase: "abcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
    symbols: "!@#$%^&*()_+~\`|}{[]:;?><,./-="
}

//  One of these types will be randomly selected to match the set password length
//  We have functions to select each one of these types
//  All these functions will be stored in an array, getType
const getType = [

    // Function to randomly select an uppercase letters
    function uppercase() {
        return types.upperCase[Math.floor(Math.random() * types.upperCase.length)]
    },

    // Function to randomly select an lowercase letters
    function lowercase() {
        return types.lowerCase[Math.floor(Math.random() * types.lowerCase.length)]
    },

    // Function to randomly select a number
    function numbers() {
        return types.numbers[Math.floor(Math.random() * types.numbers.length)]
    },

    // Function to randomly select a symbol
    function symbols() {
        return types.symbols[Math.floor(Math.random() * types.symbols.length)]
    }
]

export { getType }