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

publishButtonEl.addEventListener("click", function() {
    
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

onValue(endorsementsRef, function(snapshot) {
    console.log(Object.entries(snapshot.val()))
    if (snapshot.exists()) {
        let things = Object.values(snapshot.val())

        endorsements.innerHTML = ""
        
        for (let i = things.length - 1; 0 <= i; i--) {
            endorsements.innerHTML += `<li>
            <p class="bold">To: ${things[i].to}</p>
            <p>${things[i].message}</p>
            <div class="item-footer">
                <p class="bold">From: ${things[i].from}</p>
                <p class="bold">
                    <button>❤</button>
                </p>
            </div>
            </li>`
        }   
    } else {
        endorsements.innerHTML = "No endorsements yet"
    }
})