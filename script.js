document.addEventListener("DOMContentLoaded", function () {
    const featuredStoriesContainer = document.getElementById("featured-stories");
    const latestStoriesContainer = document.getElementById("latest-stories");
    const allStoriesContainer = document.getElementById("all-stories");

    let stories = JSON.parse(localStorage.getItem("stories")) || [];

    function displayStories(container, storiesToShow) {
        if (!container) return;

        container.innerHTML = "";
        storiesToShow.forEach(story => {
            let storyCard = document.createElement("div");
            storyCard.classList.add("story-card");
            storyCard.innerHTML = `
                <img src="${story.coverImage}" alt="Story Cover">
                <div class="story-info">
                    <h3>${story.title}</h3>
                    <p>By: ${story.author}</p>
                    <button onclick="viewStory('${story.id}')">Read More</button>
                </div>
            `;
            container.appendChild(storyCard);
        });
    }

    // Show stories on different pages
    if (featuredStoriesContainer) {
        let featured = stories.slice(0, 4);
        displayStories(featuredStoriesContainer, featured);
    }

    if (latestStoriesContainer) {
        let latest = stories.reverse().slice(0, 4);
        displayStories(latestStoriesContainer, latest);
    }

    if (allStoriesContainer) {
        displayStories(allStoriesContainer, stories);
    }
});

function viewStory(storyId) {
    localStorage.setItem("currentStory", storyId);
    window.location.href = "story.html";
}
// script.js

// Get all the like buttons
const likeButtons = document.querySelectorAll('.like-btn');

likeButtons.forEach(button => {
    button.addEventListener('click', function() {
        const likeCount = this.nextElementSibling; // Find the like count span next to the button
        let currentLikes = parseInt(likeCount.textContent);
        likeCount.textContent = currentLikes + 1; // Increase the like count
    });
});
// script.js

// Get all the like buttons, like counts, and comment sections
const likeButtons = document.querySelectorAll('.like-btn');
const likeCounts = document.querySelectorAll('.like-count');
const commentBoxes = document.querySelectorAll('.comment-box');
const commentButtons = document.querySelectorAll('.comment-btn');
const commentsLists = document.querySelectorAll('.comments-list');

// Load the saved like counts from localStorage when the page loads
window.onload = function() {
    // Load and display saved like counts
    likeCounts.forEach((likeCount, index) => {
        const savedLikes = localStorage.getItem(`likeCount-${index}`);
        if (savedLikes !== null) {
            likeCount.textContent = savedLikes;
        }
    });

    // Load and display saved comments for each story
    commentBoxes.forEach((commentBox, index) => {
        const savedComments = JSON.parse(localStorage.getItem(`comments-${index}`)) || [];
        savedComments.forEach(comment => {
            const commentItem = document.createElement('div');
            commentItem.classList.add('comment-item');
            commentItem.textContent = comment;
            commentsLists[index].appendChild(commentItem);
        });
    });
};

// Handle like button click
likeButtons.forEach((button, index) => {
    button.addEventListener('click', function() {
        const likeCount = likeCounts[index];
        let currentLikes = parseInt(likeCount.textContent);
        currentLikes++;
        likeCount.textContent = currentLikes;

        // Save the updated like count to localStorage
        localStorage.setItem(`likeCount-${index}`, currentLikes);
    });
});

// Handle comment button click
commentButtons.forEach((button, index) => {
    button.addEventListener('click', function() {
        const commentBox = commentBoxes[index];
        const commentsList = commentsLists[index];

        const newComment = commentBox.value.trim();
        if (newComment) {
            // Create a new comment item and add it to the list
            const commentItem = document.createElement('div');
            commentItem.classList.add('comment-item');
            commentItem.textContent = newComment;
            commentsList.appendChild(commentItem);

            // Save the new comment to localStorage
            const existingComments = JSON.parse(localStorage.getItem(`comments-${index}`)) || [];
            existingComments.push(newComment);
            localStorage.setItem(`comments-${index}`, JSON.stringify(existingComments));

            // Clear the comment box
            commentBox.value = '';
        }
    });
});


