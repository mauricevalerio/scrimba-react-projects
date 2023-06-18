import { initializeApp } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-database.js"

const firebaseConfig = {
    databaseURL: "https://realtime-database-b5356-default-rtdb.firebaseio.com/",
}

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)

const endorsementsRef = ref(database, "endorsements")

const textareaFieldEl = document.getElementById("textarea-field")
const publishButtonEl = document.getElementById("publish-button")
const endorsementsEl = document.getElementById("endorsements")
const fromFieldEl = document.getElementById("from-name")
const toFieldEl = document.getElementById("to-name")

publishButtonEl.addEventListener("click", function () {

    let inputValue = textareaFieldEl.value
    let fromValue = fromFieldEl.value
    let toValue = toFieldEl.value

    if (inputValue && fromValue && toValue) {

        textareaFieldEl.value = ""
        fromFieldEl.value = ""
        toFieldEl.value = ""

        push(endorsementsRef, {
            from: fromValue,
            to: toValue,
            message: inputValue
        })
    }
})

onValue(endorsementsRef, function (snapshot) {
    if (snapshot.exists()) {
        let things = Object.entries(snapshot.val())

        endorsementsEl.innerHTML = ""

        for (let i = things.length - 1; 0 <= i; i--) {
            endorsementsEl.innerHTML += `<li>
            <p class="bold">To: ${things[i][1].to}</p>
            <p>${things[i][1].message}</p>
            <div class="item-footer">
                <p class="bold">From: ${things[i][1].from}</p>
            </div>
            </li>`

        }
    } else {
        endorsementsEl.innerHTML = "No endorsements yet"
    }
})