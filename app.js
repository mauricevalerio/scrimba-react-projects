import dogsData from './data.js'
import Dog from './Dogs.js'

let dog = getNewDogProfile()
let isWaiting = false //prevent unnecessary clicks

function getNewDogProfile() {
    const nextDogProfile = dogsData.shift()
    return nextDogProfile ? new Dog(nextDogProfile) : {}
}

function delayNextDogProfile() {
    setTimeout(() => {
        isWaiting = false;
        dog = getNewDogProfile()
        render()
        document.querySelector('.dog-profile-container').classList.remove('like-animation')
        document.querySelector('.dog-profile-container').classList.remove('dislike-animation')
    }, 1500)
}

function handleCrossBtn() {
    if (!isWaiting) {
        isWaiting = true
        document.querySelector('.dog-profile-container').classList.add('dislike-animation')
        dog.hasBeenSwiped = true
        render() //to display the badge
        delayNextDogProfile() //to display next dog profile with delay
    }
}

function handleHeartBtn() {
    if (!isWaiting) {
        isWaiting = true
        document.querySelector('.dog-profile-container').classList.add('like-animation')
        dog.hasBeenLiked = true
        dog.hasBeenSwiped = true
        render() //to display the badge
        delayNextDogProfile() //to display next dog profile with delay
    }
}

function render() {
    if (Object.keys(dog).length) {
        document.getElementById('dog-profile').innerHTML = dog.getDogHtml()
    } else {
        isWaiting = true;
        document.getElementById('dog-profile').innerHTML = endMessage()
    }
}

function endMessage() {
    document.querySelector('.tindog-icon').classList.add('scale-logo');
    return `
        <div class="end-message-container">
            <h1>No more dogs in the area.</h1>
            <h2>Please try again later.</h2>
        </div>
    `
}

render()

document.getElementById('cross-button').addEventListener('click', handleCrossBtn)
document.getElementById('heart-button').addEventListener('click', handleHeartBtn)

