const btnGenerate = document.getElementById("generate-button");
const txtFirstPassword = document.getElementById("password-one");
const txtSecondPassword = document.getElementById("password-two");
const passwordLength = document.getElementById("password-length-input");
const errorMessage = document.getElementById("error-message");
const toggleSymbols = document.getElementById("toggle-symbols");
const toggleNumbers = document.getElementById("toggle-numbers");
const passwordDivs = document.getElementsByClassName("password-div");

passwordLength.required = true;
passwordLength.min = 8;
passwordLength.max = 32;

//generate index numbers 0 - 26 using ...Array(26)
//use from CharCode to convert them to small letters
//reference of CharCode https://www.w3schools.com/charsets/ref_html_ascii.asp
const alphabetLowerCaseArray = [...Array(26)].map((_, i) => String.fromCharCode(i + 97));
const alphabetUpperCaseArray = [...Array(26)].map((_, i) => String.fromCharCode(i + 65));
const numbersArray = [...Array(10)].map((_, i) => String.fromCharCode(i + 48));

const specialCharObject = {
	firstBatch: [...Array(15)].map((_, i) => String.fromCharCode(i + 33)), //special characters 33 - 47
	secondBatch: [...Array(7)].map((_, i) => String.fromCharCode(i + 58)), // special characters 58 - 64
	thirdBatch: [...Array(6)].map((_, i) => String.fromCharCode(i + 91)), // special characters 91 - 96
	fourthBatch: [...Array(4)].map((_, i) => String.fromCharCode(i + 123)) // special characters 123 - 126
};

const specialCharacters = [...specialCharObject.firstBatch, ...specialCharObject.secondBatch, 
...specialCharObject.thirdBatch, ...specialCharObject.fourthBatch];

function concatCharacters() {
	if (toggleSymbols.checked && toggleNumbers.checked) { 
		return [...alphabetLowerCaseArray, ...alphabetUpperCaseArray]; //exclude numbers and special characters
	} else if (toggleNumbers.checked) {
		return [...alphabetLowerCaseArray, ...alphabetUpperCaseArray, ...specialCharacters]; //exclude numbers
	} else if (toggleSymbols.checked) {
		return [...alphabetLowerCaseArray, ...alphabetUpperCaseArray, ...numbersArray]; //exclude symbols
	} else {
		return [...alphabetLowerCaseArray, ...alphabetUpperCaseArray, ...numbersArray, ...specialCharacters]; //include all
	}
};

function generateRandomIndex() {
	return Math.floor(Math.random() * concatCharacters().length);
};

btnGenerate.addEventListener(("click"), (e) => {
	e.preventDefault();
	if (passwordLength.value <= parseInt(passwordLength.max) && passwordLength.value >= parseInt(passwordLength.min)) {
		txtFirstPassword.textContent = "";
		txtSecondPassword.textContent = "";
		errorMessage.textContent = "";
		for (let i = 0; i < parseInt(passwordLength.value); i++) {
			txtFirstPassword.textContent += concatCharacters()[generateRandomIndex()];
			txtSecondPassword.textContent += concatCharacters()[generateRandomIndex()];
		}
		txtFirstPassword.classList.add("clipboard");
		txtSecondPassword.classList.add("clipboard");
		copytoClipboard();
	} else {
		txtFirstPassword.textContent = "";
		txtSecondPassword.textContent = "";
		errorMessage.textContent = "Length must be between 8-32 characters!"
	}
	
});

function copytoClipboard() {
for (let passwordDiv of passwordDivs) {
	passwordDiv.addEventListener("click", async (e) => {
		await navigator.clipboard.writeText(passwordDiv.textContent);
		txtFirstPassword.dataset.hover = "Password copied!"
		txtSecondPassword.dataset.hover = "Password copied!"
	})
	
	passwordDiv.addEventListener("mouseover", (e) => { //revert back to original hover text after copy to clipboard
		txtFirstPassword.dataset.hover = "Copy to clipboard"
		txtSecondPassword.dataset.hover = "Copy to clipboard"
	})
};
}