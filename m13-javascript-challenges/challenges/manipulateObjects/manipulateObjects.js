import podcasts from "./data.js"

/* 🌴 Save the Weekend 🌴

Your best friend is a copywriter who writes product descriptions 
for a living. You want to use your hacking skills to help them 
automate their job so you both can spend the weekend on a 
tropical island. 

Use array methods and the existing podcast data to write a function that
can generate a description for each podcast. 

Add the description as a new property on each podcast object, and return
a new podcast array where each podcast has a description. 

Each description should look like this: 
[
    {
        id: 1,
        title: "Scrimba Podcast", 
        ...
        description: "Scrimba Podcast is a 50 minute education podcast hosted 
        by Alex Booker."
    }
    ...
]

If the podcast has more than one host, you can display only the first host.

Stretch goal: Display all three hosts in the description, seperated with commas: 

Example description: "Coding Corner is a 55 minute education podcast hosted by Treasure Porth, Guil Hernandez, and Tom Chant."
*/

function displayArray(items) {
    let strItems = ""
    if (items.length === 1) {
        return items
    } else if (items.length === 2) {
        items.forEach((item, index) => index === items.length - 1 ? strItems += `and ${item}` : strItems += `${item} `)
        return strItems
    }
    items.forEach((item, index) => index === items.length - 1 ? strItems += `and ${item}` : strItems += `${item}, `)
    return strItems
}

function createDescriptionsFor(data) {
    return data.map(podcast => {
        const { title, duration, genre, hosts } = podcast
        return {
            ...podcast,
            description: `${title} is a ${duration} minute podcast that's about ${genre} hosted by ${displayArray(hosts)}`
        }
    })
}

console.log(createDescriptionsFor(podcasts))