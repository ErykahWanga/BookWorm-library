document.addEventListener("DOMContentLoaded", function () {
    const storyContainer = document.getElementById("story-container");
    const storyId = localStorage.getItem("currentStory");
    const stories = JSON.parse(localStorage.getItem("stories")) || [];
    const story = stories.find(story => story.id === storyId);

    if (story && storyContainer) {
        storyContainer.innerHTML = `
            <h1>${story.title}</h1>
            <img src="${story.coverImage}" alt="Story Cover">
            <p><strong>By:</strong> ${story.author}</p>
            <p>${story.content}</p>
        `;
    } else {
        storyContainer.innerHTML = "<p>Story not found.</p>";
    }
});
