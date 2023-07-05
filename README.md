# Password Generator

Solo Project for Module 3 - Making Websites Interactive under the **Scrimba's Frontend Developer Career Path**

A front-end web application to generate secure random passwords with the ability to include numbers, symbols, and uppercase letters.

## Installation and Setup Instructions

Clone down this repository. You will need `node` and `npm` installed globally on your machine.

- Installation: `npm install`
- Preview & Build: `npm run build` `npm run preview`
- Start Dev Server: `npm run dev`  
- Visit App: `https://passw0rdg3n3rat0r.netlify.app/`  

## Reflection
Converted Vanilla JavaScript code to React code to simplify code logic. Learned something new about handling functions such as accessing there function name. `getType` is an array that contains the functions that generates random lowercase, uppercase, symbols, and numbers.

`let tempPassword = ""`
`let typeAdder = getType[Math.floor(Math.random() * getType.length)]`
`if (requirements[typeAdder.name]) tempPassword += typeAdder()`

## Future Improvements
 - Store to local storage passwords then display as history.
