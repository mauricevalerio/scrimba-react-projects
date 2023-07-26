export default class Dog {
    constructor(data) {
        Object.assign(this, data)
    }
    getDogHtml() {
        const { name, avatar, age, bio, hasBeenSwiped, hasBeenLiked } = this

        return `
            <img src="${avatar}" alt="Avatar of ${name}" class="dog-avatar"/>

            ${hasBeenSwiped ?
                hasBeenLiked ? '<img src="images/badge-like.png" alt="Like Badge" class="badge like-badge"/>'
                    : '<img src="images/badge-nope.png" alt="Dislike Badge" class="badge dislike-badge"/>'
                : ''}
                
            <div class="dog-info-container">
                <p class="dog-name">${name}, <span class="dog-age">${age}</span></p>
                <p class="dog-bio">${bio}</p>
            </div>
        `
    }
}