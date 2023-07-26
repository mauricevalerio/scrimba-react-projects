const numberInput = document.getElementById("number-input");
const convertButton = document.getElementById("convert-button");
const lengthText = document.getElementById("length-text");
const volumeText = document.getElementById("volume-text");
const massText = document.getElementById("mass-text");
const textPrompt = document.getElementById("text-prompt");


/*
1 meter = 3.28084 feet
1 liter =  0.264172 gallon
1 kilogram = 2.20462 pound
*/

function convertLength(length) {
	return `${length} meters = ${(length * 3.28084).toFixed(3)} feet | ${length} feet = ${(length / 3.281).toFixed(3)} meters`;
};

function convertVolume(volume) {
	return `${volume} liters = ${(volume * 0.264172).toFixed(3)} gallons | ${volume} gallons = ${(volume / 0.264172).toFixed(3)} liters`;
};

function convertMass(mass) {
	return `${mass} kilos = ${(mass * 2.20462).toFixed(3)} pounds | ${mass} pounds = ${(mass / 2.20462).toFixed(3)} kilos`;
}

convertButton.addEventListener("click",(e) => {
	e.preventDefault();
	if (numberInput.value) {
		textPrompt.textContent = "";
		lengthText.textContent = convertLength(numberInput.value);
		volumeText.textContent = convertVolume(numberInput.value);
		massText.textContent = convertMass(numberInput.value);
		numberInput.value = "";
	} else {
		textPrompt.textContent = "Please enter a number!";
	}
});





