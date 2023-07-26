const types = {
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
    symbols: "!@#$%^&*()_+~\`|}{[]:;?><,./-="
}

const getType = {

    // Method to randomly select an uppercase letter
    uppercase: function () {
        return types.uppercase[Math.floor(Math.random() * types.uppercase.length)]
    },

    // Method to randomly select an lowercase letter
    lowercase: function () {
        return types.lowercase[Math.floor(Math.random() * types.lowercase.length)]
    },

    // Method to randomly select a number
    numbers: function () {
        return types.numbers[Math.floor(Math.random() * types.numbers.length)]
    },

    // Method to randomly select a symbol
    symbols: function () {
        return types.symbols[Math.floor(Math.random() * types.symbols.length)]
    }
}

export { getType }