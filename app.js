const mainContainer = document.getElementById("main-container");

const classAttribute = {
    classHeaderPost: "header-post-container",
    classNameLocation: "name-location-container",
    classIconsContainer: "icons-container",
    classLikesCaptions: "likes-captions-container",
    classAvatar: "avatar",
    className: "name",
    classLocation: "location",
    classImagePost: "image-post",
    classIcons: "icons"
}

const iconImages = {
    iconHeart: "images/icon-heart.png",
    altHeart: "Icon Heart",
    iconComment: "images/icon-comment.png",
    altComment: "Icon Comment",
    icondDm: "images/icon-dm.png",
    altDm: "Icon Direct Message"
}

const postData = [
    {
        avatar: "images/avatar-vangogh.jpg",
        altAvatar: "Van Gogh Avatar",
        name: "Vincent van Gogh",
        location: "Zudert, Netherlands",
        imagePost: "images/post-vangogh.jpg",
        isPostLiked: false,
        altPost: "Van Gogh Image Post",
        likes: 20,
        captionsInfo: {
            username: "vincey1853",
            captionsText: " just took a few mushrooms lol"
        }
    },
    {
        avatar: "images/avatar-courbet.jpg",
        altAvatar: "Gustave Courbet Avatar",
        name: "Gustave Courbet",
        location: "Ornans, France",
        imagePost: "images/post-courbet.jpg",
        isPostLiked: false,
        altPost: "Gustave Courbet Image Post",
        likes: 5,
        captionsInfo: {
            username: "gus1819",
            captionsText: " i'm feelin a bit stressed tbh"
        }
    },
    {
        avatar: "images/avatar-ducreux.jpg",
        altAvatar: "Joseph Ducreux Avatar",
        name: "Joseph Ducreux",
        location: "Paris, France",
        imagePost: "images/post-ducreux.jpg",
        isPostLiked: false,
        altPost: "Joseph Ducreux Image Post",
        likes: 150,
        captionsInfo: {
            username: "jd1735",
            captionsText: " gm friends! which coin are YOU stacking up today?? post below and WAGMI!"
        }
    }

]

function renderPosts() {
    while (mainContainer.firstChild) {
        mainContainer.removeChild(mainContainer.firstChild); //clears DOM
    }
    for (let i = 0; i < postData.length; i++) {
        generatePost(i); //re-renders posts
    }
}

renderPosts();

function generatePost(i) {
    const sectionPost = createSectionPost();
    const divHeaderPost = createHeaderPostContainer(i);
    const divNameLocation = createNameLocationContainer(i);
    const imgPost = createImagePost(i);
    const imgIcons = createIconsContainer(i);
    const divLikesCaptions = createLikesCaptionsContainer(i);
    divHeaderPost.append(divNameLocation);
    sectionPost.append(divHeaderPost)
    sectionPost.append(imgPost);
    sectionPost.append(imgIcons);
    sectionPost.append(divLikesCaptions);
    mainContainer.append(sectionPost);

}

function createSectionPost() {
    const sectionPost = document.createElement("section");
    sectionPost.classList.add("post");
    return sectionPost;
}

function createHeaderPostContainer(i) {
    const divHeaderPost = document.createElement("div");
    const imgAvatar = document.createElement("img");

    divHeaderPost.classList.add(classAttribute.classHeaderPost);
    setAttributes(imgAvatar, { "src": postData[i].avatar, "alt": postData[i].altAvatar, "class": classAttribute.classAvatar })

    divHeaderPost.append(imgAvatar);

    return divHeaderPost;
}

function createNameLocationContainer(i) {
    const divNameLocation = document.createElement("div");
    const spanName = document.createElement("span");
    const spanLocation = document.createElement("span");

    divNameLocation.classList.add(classAttribute.classNameLocation);
    setAttributes(spanName, { "class": classAttribute.className });
    setAttributes(spanLocation, { "class": classAttribute.classLocation });

    spanName.textContent = postData[i].name;
    spanLocation.textContent = postData[i].location;

    divNameLocation.append(spanName);
    divNameLocation.append(spanLocation);

    return divNameLocation;
}

function createImagePost(i) {
    const imgPost = document.createElement("img");

    setAttributes(imgPost, { "src": postData[i].imagePost, "alt": postData[i].altPost, "class": classAttribute.classImagePost })

    imgPost.addEventListener("dblclick", e => {
        if (!postData[i].isPostLiked) {
            postData[i].likes += 1;
            postData[i].isPostLiked = true;
        } else {
            postData[i].likes -= 1;
            postData[i].isPostLiked = false;
        }
        renderPosts();
    });

    return imgPost;
}

function createIconsContainer(i) {
    const divIcons = document.createElement("div");
    const imgHeart = document.createElement("img");
    const imgComment = document.createElement("img");
    const imgDm = document.createElement("img");

    divIcons.classList.add(classAttribute.classIconsContainer);

    setAttributes(imgHeart, { "src": iconImages.iconHeart, "alt": iconImages.altHeart, "class": classAttribute.classIcons });

    if (postData[i].isPostLiked) {
        imgHeart.classList.add("liked");
    } else {
        imgHeart.classList.remove("liked");
    }

    imgHeart.addEventListener("click", e => {
        if (!postData[i].isPostLiked) {
            postData[i].likes += 1;
            postData[i].isPostLiked = true;
        } else {
            postData[i].likes -= 1;
            postData[i].isPostLiked = false;
        }
        renderPosts();
    })

    setAttributes(imgComment, { "src": iconImages.iconComment, "alt": iconImages.altComment, "class": classAttribute.classIcons });
    setAttributes(imgDm, { "src": iconImages.icondDm, "alt": iconImages.altDm, "class": classAttribute.classIcons });
    divIcons.append(imgHeart);
    divIcons.append(imgComment);
    divIcons.append(imgDm);

    return divIcons;
}

function createLikesCaptionsContainer(i) {
    const divLikesCaptions = document.createElement("div");
    const pLikesCount = document.createElement("p");
    const pCaptionsInfo = document.createElement("p");
    const spanUsername = document.createElement("span");
    const spanCaptions = document.createElement("span");

    divLikesCaptions.classList.add(classAttribute.classLikesCaptions);
    pLikesCount.classList.add("likes");
    pCaptionsInfo.classList.add("captions-info");
    spanUsername.classList.add("username");

    spanUsername.textContent = postData[i].captionsInfo.username;
    spanCaptions.textContent = postData[i].captionsInfo.captionsText;
    pLikesCount.textContent = postData[i].likes;

    divLikesCaptions.append(pLikesCount);
    pCaptionsInfo.append(spanUsername);
    pCaptionsInfo.append(spanCaptions);
    divLikesCaptions.append(pCaptionsInfo);

    return divLikesCaptions;
}

function setAttributes(el, attrs) {
    for (var key in attrs) {
        el.setAttribute(key, attrs[key]);
    }
}